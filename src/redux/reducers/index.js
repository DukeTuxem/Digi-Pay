import { combineReducers } from "redux";
import authReducer from "./authReducer";
import NavigationReducer from "./navReducer";
import paymentReducer from "./paymentReducer";

const rootReducer = combineReducers({
  nav: NavigationReducer,
  authReducer,
  paymentReducer
});

export default rootReducer;
