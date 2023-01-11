import login from "./login.reducer";
import user from "./user.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login,
  user,
});

export default rootReducer;
