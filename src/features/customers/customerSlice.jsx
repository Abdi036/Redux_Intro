import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    prepare(fullName, nationalId) {
      return {
        payload: fullName,
        nationalId,
        createdAt: new Date().toISOString(),
      };
    },
    createAccount: {
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateCustomerName(state, action) {
      state.fullName = action.payload;
    },
  },
});
export const { createAccount, updateCustomerName } = customerSlice.actions;
export default customerSlice.reducer;
