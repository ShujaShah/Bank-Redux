// using conventional way
// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { configureStore } from "@reduxjs/toolkit";

// import CustomerReducer from "./features/customers/customerSlice";
// import AccountReducer from "./features/accounts/accountSlice";

// const rootReducer = combineReducers({
//   account: AccountReducer,
//   customer: CustomerReducer,
// });
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );

// export default store;
// ========================================= using Redux Toolkit============================
import { configureStore } from "@reduxjs/toolkit";

import CustomerReducer from "./features/customers/customerSlice";
import AccountReducer from "./features/accounts/accountSlice";

const store = configureStore({
  reducer: {
    account: AccountReducer,
    customer: CustomerReducer,
  },
});

export default store;
