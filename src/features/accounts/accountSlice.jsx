const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanReason: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  // USING REDUX THUNK
  return async function (dispatch, getState) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}=10&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const convertedBalance = data.rates.USD;
    dispatch({ type: "account/deposite", payload: convertedBalance });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, reason) {
  return {
    type: "account/requestLoan",
    payload: { amount, reason },
  };
}
export function payloan() {
  return { type: "account/payLoan" };
}
