export const gotUserData = (data) => {
  return {
    type: "GOT_USER_DATA",
    payload: {
      data: data,
    },
  };
};

export const isLogin = () => {
  return {
    type: "USER_IS_LOGGED_IN",
    payload: {
      data: true,
    },
  };
};

export const isLoggedOut = () => {
  return {
    type: "USER_IS_LOGGED_OUT",
    payload: {
      data: false,
    },
  };
};

export const removeUser = () => {
  return {
    type: "DELETE_USER_DATA",
  };
};
