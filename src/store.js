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

// CREATING ACTION STORE
function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, reason) {
  return {
    type: "account/requestLoan",
    payload: { amount, reason },
  };
}
function payloan() {
  return { type: "account/payLoan" };
}
store.dispatch(deposite(1000));
store.dispatch(withdraw(300));
store.dispatch(requestLoan(1000, "to buy clothes"));
store.dispatch(payloan());
console.log(store.getState());
