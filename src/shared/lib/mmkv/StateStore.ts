import { STORAGE_ID, STORAGE_KEY } from '@env'
import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

// Create an MMKV instance
export const storage = new MMKV({
  id: STORAGE_ID,
  encryptionKey: STORAGE_KEY,
})

// Configure Zustand to use MMKV for state persistence
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    try {
      storage.set(name, value)
    } catch (e) {
      console.error('[MMKV] setItem failed', e)
    }
  },
  getItem: name => {
    try {
      const value = storage.getString(name)
      return value ?? null
    } catch (e) {
      console.error('[MMKV] getItem failed', e)
      return null
    }
  },
  removeItem: name => {
    try {
      storage.delete(name)
    } catch (e) {
      console.error('[MMKV] removeItem failed', e)
    }
  },
}

export default zustandStorage
