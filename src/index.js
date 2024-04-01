import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import store from "./Store";
store.dispatch({ type: "account/deposit", payload: 1000 });
store.dispatch({
  type: "customer/createCustomer",
  payload: {
    fullname: "John Doe",
    nationalId: "123456789",
    createdAt: new Date().toISOString(),
  },
});
console.log(store.getState());

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
