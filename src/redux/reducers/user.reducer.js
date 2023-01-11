const user = (state = {}, action) => {
  switch (action.type) {
    case "GOT_USER_DATA":
      return action.payload.data;
    case "DELETE_USER_DATA":
      return {};
    default:
      return state;
  }
};

export default user;
