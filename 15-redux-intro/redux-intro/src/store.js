import { combineReducers, createStore } from "redux";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rooReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rooReducer);

export default store;
