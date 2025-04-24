import { MMKV } from 'react-native-mmkv'

const mmkv = new MMKV()

type Keys = 'isOnboardingPassed'

export const mmkvStorage = {
  setItem: (key: Keys, value: any) => {
    if (value) {
      mmkv.set(key, JSON.stringify(value));
    }
  },
  getItem: (key: Keys) => {
    const value = mmkv.getString(key);
    
    if (!value) {
      return null
    }
    
    return JSON.parse(value);
  }
}
