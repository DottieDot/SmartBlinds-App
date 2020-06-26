import { Settings } from '../model'
import { SET_THEME } from './names'

export const setTheme = (theme: Settings['theme']) => ({
  type: SET_THEME,
  theme,
})
