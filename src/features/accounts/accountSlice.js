// //=============================== Conventional way ======================================
// const initialStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   isLoading: false,
// };

// export default function AccountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return { ...state, loan: 0, balance: state.balance - state.loan };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     //API Call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
//     );
//     const data = await res.json();
//     console.log(data);
//     const converted = data.rates.USD;
//     //Return Action Call
//     dispatch({
//       type: "account/deposit",
//       payload: converted,
//     });
//   };
// }

// export function withdraw(amount) {
//   return {
//     type: "account/withdraw",
//     payload: amount,
//   };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: {
//       amount,
//       purpose,
//     },
//   };
// }

// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }

// =====================================Using Redux toolkit====================================

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    //when we have more than one argument, this is the way we need to go
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan; // order needs to be like this otherwise, we are setting the loan to 0 in the next line
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
