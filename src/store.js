import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/accounts/accountSlice";

// ROOT REDUCER TO COMBINE TWO OR MORE REDUCERS
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
export default store;
