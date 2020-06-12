import { Settings } from '../model'
import { SET_THEME } from '../reducers/settings'

export const setTheme = (theme: Settings['theme']) => ({
  type: SET_THEME,
  theme,
})
