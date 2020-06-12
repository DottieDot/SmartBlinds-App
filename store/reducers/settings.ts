import { Settings } from '../model'

export const SET_THEME = 'SETTINGS:SET_THEME'

const defaultSettings: Settings = {
  theme: 'system'
}

export default (state: Settings = defaultSettings, action: any) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.theme,
      }
    default:
      return state;
  }
}
