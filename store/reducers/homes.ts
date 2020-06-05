
export default (state = [], action: any) => {
  switch (action.type) {
    case 'ADD_HOME':
      return [
        ...state,
        action.home
      ]
    case 'SET_HOMES':
      return [
        action.homes
      ]
    default:
      return state;
  }
}
