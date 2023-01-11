const login = (state = false, action) => {
  switch (action.type) {
    case "USER_IS_LOGGED_IN":
      return action.payload.data;
    case "USER_IS_LOGGED_OUT":
      return action.payload.data;
    default:
      return state;
  }
};

export default login;
