import { Settings } from '../model'
import { SET_THEME } from '../actions/names';

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
