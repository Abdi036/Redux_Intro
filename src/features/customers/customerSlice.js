const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
  };
  
   export default function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
      case "customer/createAccount":
        return {
          ...state,
          fullName: action.payload.fullName,
          nationalID: action.payload.nationalID,
          createdAt: action.payload.createdAt,
        };
  
      case "customer/updateCustomerName":
        return { ...state, fullName: action.payload };
  
      default:
        return state;
    }
  }

  export function createCustomer(fullName, nationalID) {
    return {
      type: "customer/createAccount",
      payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
  }
  export function updateCustomerName(fullName) {
    return {
      type: "customer/updateCustomerName",
      payload: fullName,
    };
  }