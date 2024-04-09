import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanReason: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanReason: action.payload.reason,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loanReason: "",
        loan: 0,
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposite", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 200 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, reason: "To buy stuff" },
});
store.dispatch({ type: "account/payLoan" });

console.log(store.getState());
