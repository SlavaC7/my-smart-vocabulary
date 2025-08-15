import { FIREBASE_WEB_CLIENT_ID, FIREBASE_IOS_CLIENT_ID } from '@env'
import appleAuth from '@invertase/react-native-apple-authentication'
import auth, { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import LogRocket from '@logrocket/react-native'
import * as Sentry from '@sentry/react-native'

import Toast from 'react-native-toast-message'

import { firebaseErrors } from './config'

type TPhoneAuthState = 'sent' | 'timeout' | 'verified' | 'error'

console.log('ENV =>', FIREBASE_IOS_CLIENT_ID, FIREBASE_WEB_CLIENT_ID)

GoogleSignin.configure({
  iosClientId: FIREBASE_IOS_CLIENT_ID,
  webClientId: FIREBASE_WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'openid'],
})

class FirebaseService {
  private confirmation: FirebaseAuthTypes.ConfirmationResult | undefined
  private snapshot: FirebaseAuthTypes.PhoneAuthSnapshot | undefined
  private unsubscribeInstance?: () => void

  public subscribe(cb: (user: FirebaseAuthTypes.User | null) => void) {
    this.unsubscribeInstance = getAuth().onAuthStateChanged(cb)
    return this.unsubscribeInstance
  }

  public unsubscribe() {
    this.unsubscribeInstance && this.unsubscribeInstance()
  }

  public async signInWithEmailAndPassword(email: string, password: string) {
    return getAuth().signInWithEmailAndPassword(email, password)
  }

  // Google login
  public async signInWithGoogle() {
    console.log('1')
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    console.log('2')

    const localUser = GoogleSignin.getCurrentUser()
    console.log('3')

    if (localUser) {
      try {
        console.log('4')

        await GoogleSignin.revokeAccess()
      } catch {}
    }
    console.log('5')

    const signInResult = await GoogleSignin.signIn()
    console.log('6')

    let idToken = signInResult.data?.idToken

    if (!idToken) {
      idToken = (signInResult as never as { idToken: string })?.idToken
    }

    if (!idToken) {
      throw new Error('No ID token found')
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return getAuth().signInWithCredential(googleCredential)
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

    await getAuth().signInWithCredential(appleCredential)

    const firstName = appleAuthRequestResponse?.fullName?.givenName || ''
    const secondName =
      appleAuthRequestResponse?.fullName?.middleName ||
      appleAuthRequestResponse?.fullName?.familyName

    const newDisplayName = firstName + (secondName ? ` ${secondName}` : '')

    await getAuth().currentUser?.updateProfile({
      displayName: getAuth()?.currentUser?.displayName || newDisplayName,
    })
  }

  // Sign in with phone
  public async signInWithPhone(
    phoneNumber: string,
    resend: boolean | undefined = false,
  ) {
    let codeConfirm: FirebaseAuthTypes.ConfirmationResult | null = null

    const code = await getAuth().signInWithPhoneNumber(phoneNumber, resend)

    codeConfirm = code

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
    callbackFailure?: () => void,
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
        callbackFailure?.()
        this.validateError(err)
      })
  }

  // Link phone number
  public async linkPhoneNumber(code: string) {
    if (!this.snapshot) throw Error('Nothing to confirm')

    const credential = auth.PhoneAuthProvider.credential(
      this.snapshot.verificationId,
      code,
    )
    return getAuth().currentUser?.updatePhoneNumber(credential)
  }

  // Get current user
  public getUser() {
    const user = getAuth()?.currentUser
    return user
  }

  // Sign out user
  public async signOut() {
    await getAuth()?.signOut?.()
  }

  // Get token
  public async getToken() {
    return getAuth()?.currentUser?.getIdToken(true)
  }

  public async validateError(error: unknown) {
    console.log('validateError =>', error)
    const err = error as { code?: string; message?: string }

    if (err.code) {
      Sentry.withScope(scope => {
        scope.setExtra('Error:', error)

        Sentry.captureException(error)
      })
      // LogRocket.captureException(error)

      const existError = firebaseErrors.includes(err.code)

      if (existError) {
        console.log('err.code =>', err.code)
        Toast.show({ type: 'error', text1: `firebase_error.${err.code}` })
      }
    }
  }

  public async getIdToken(newToken?: boolean) {
    try {
      const token = await getAuth().currentUser?.getIdToken(!!newToken)
      return token
    } catch (e) {
      return null
    }
  }
}

export default new FirebaseService()
