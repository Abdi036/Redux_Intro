import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanReason: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, reason) {
        return {
          payload: { amount, reason },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanReason = action.payload.reason;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanReason = "";
    },

    isLoading(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  // USING REDUX THUNK
  return async function (dispatch, getState) {
    dispatch({ type: "account/isLoading" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}=10&from=${currency}&to=USD`
    );
    const data = await res.json();
    const convertedBalance = data.rates.USD;
    dispatch({ type: "account/deposite", payload: convertedBalance });
  };
}
export default accountSlice.reducer;
