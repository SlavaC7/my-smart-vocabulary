import { FIREBASE_WEB_CLIENT_ID } from '@env'
import appleAuth from '@invertase/react-native-apple-authentication'
import auth, {
  FirebaseAuthTypes,
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getIdToken,
  updatePhoneNumber,
  updateProfile,
  signInWithCredential,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import * as Sentry from '@sentry/react-native'

import Toast from 'react-native-toast-message'

import { firebaseErrors } from './config'

type TPhoneAuthState = 'sent' | 'timeout' | 'verified' | 'error'

GoogleSignin.configure({
  webClientId: FIREBASE_WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'openid'],
})

class FirebaseService {
  private confirmation: FirebaseAuthTypes.ConfirmationResult | undefined
  private snapshot: FirebaseAuthTypes.PhoneAuthSnapshot | undefined
  private unsubscribeInstance?: () => void

  // Auth state changed
  public subscribe(cb: (user: FirebaseAuthTypes.User | null) => void) {
    this.unsubscribeInstance = onAuthStateChanged(getAuth(), cb)

    return this.unsubscribeInstance
  }

  public unsubscribe() {
    this?.unsubscribeInstance?.()
  }

  // Google login
  public async signInWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const localUser = GoogleSignin.getCurrentUser()

    if (localUser) {
      try {
        await GoogleSignin.revokeAccess()
      } catch {}
    }

    const result = await GoogleSignin.signIn()

    let idToken = result.data?.idToken
    if (!idToken) {
      idToken = (result as unknown as { idToken: string })?.idToken
    }
    if (!idToken) {
      throw new Error('No ID token found')
    }

    const googleCredential = GoogleAuthProvider.credential(idToken)

    const signInResult = await signInWithCredential(getAuth(), googleCredential)

    const profile = signInResult?.additionalUserInfo?.profile

    const user = getAuth()?.currentUser
    if (!user) return
    await updateProfile(user, {
      displayName: profile?.name,
      photoURL: profile?.picture,
    })
  }

  // Sign in with apple
  public async signInWithApple() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned')
    }
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    await signInWithCredential(getAuth(), appleCredential)

    const givenName = appleAuthRequestResponse?.fullName?.givenName
    const middleName = appleAuthRequestResponse?.fullName?.middleName
    const familyName = appleAuthRequestResponse?.fullName?.familyName

    const displayName = `${givenName ? givenName : ''}${
      middleName ? ` ${middleName}` : ''
    }${familyName ? ` ${familyName}` : ''}`

    const user = getAuth()?.currentUser
    if (!user) return

    await updateProfile(user, {
      displayName: getAuth()?.currentUser?.displayName || displayName || '',
    })
  }

  // Sign in with phone
  public async signInWithPhone(
    phoneNumber: string,
    resend: boolean | undefined = false,
  ) {
    const codeConfirm = await signInWithPhoneNumber(
      getAuth(),
      phoneNumber,
      undefined,
      resend,
    )
    this.confirmation = codeConfirm
  }

  // Confirm verification code
  public async confirmCode(code: string) {
    if (!this.confirmation) throw Error('Nothing to confirm')
    await this.confirmation?.confirm(code)
  }

  // Verify phone number
  public async verifyPhoneNumber(
    phone: string,
    resend: boolean | undefined = false,
    callbackSuccess?: (state: TPhoneAuthState) => void,
    callbackFailure?: (state: TPhoneAuthState) => void,
  ) {
    return getAuth()
      .verifyPhoneNumber(phone, resend)
      .on('state_changed', snap => {
        if (snap?.state === 'sent' || snap?.state === 'verified') {
          this.snapshot = snap
          callbackSuccess?.(snap?.state)
        } else {
          callbackFailure?.(snap?.state)
        }
      })
      .catch(err => {
        this.validateError(err)
      })
  }

  // Link phone number
  public async linkPhoneNumber(code: string) {
    const user = getAuth()?.currentUser
    if (!this.snapshot) throw Error('Nothing to confirm')
    if (!user) throw Error('User not found')

    const credential = auth.PhoneAuthProvider.credential(
      this.snapshot.verificationId,
      code,
    )
    return updatePhoneNumber(user, credential)
  }

  // Unlink phone number
  public async unlinkUserPhone() {
    return getAuth().currentUser?.unlink(auth.PhoneAuthProvider.PROVIDER_ID)
  }

  // Get current user
  public getUser() {
    const user = getAuth()?.currentUser
    return user
  }

  // Sign out user
  public async signOut() {
    await signOut(getAuth())
  }

  // Get token
  public async getToken() {
    const user = getAuth().currentUser
    if (!user) return ''
    return getIdToken(user, true)
  }

  public async validateError(error: unknown) {
    console.log(error)
    const err = error as { code?: string; message?: string }

    if (err.code) {
      Sentry.captureException(error)
      const existError = firebaseErrors.includes(err.code)

      if (existError) {
        Toast.show({ type: 'error', text1: `firebase_error.${err.code}` })
      }
    }
  }

  public async getIdToken(newToken?: boolean) {
    try {
      const user = getAuth().currentUser
      if (!user) return null
      const token = await getIdToken(user, !!newToken)
      return token
    } catch (e) {
      return null
    }
  }
}

export default new FirebaseService()
