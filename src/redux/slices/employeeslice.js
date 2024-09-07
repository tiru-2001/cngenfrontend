import { createSlice } from '@reduxjs/toolkit';
import {
  employeeLoginAction,
  employeeRegisterAction,
} from '../actions/employeeactions';
const initialState = {
  employeeLoginInfo: localStorage.getItem('employee')
    ? JSON.parse(localStorage.getItem('employee'))
    : null,
  employeeRegisterInfo: null,
  employeeToken: localStorage.getItem('employeeToken')
    ? localStorage.getItem('employeeToken')
    : null,
  error: null,
  loading: false,
};
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    employeeLogout(state) {
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('employee');
      state.loading = false;
      state.employeeLoginInfo = null;
      state.employeeRegisterInfo = null;
      state.error = null;
      state.employeeToken = null;
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employeeLoginAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employeeLoginInfo = action.payload;
      })
      .addCase(employeeLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(employeeRegisterAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeRegisterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employeeRegisterInfo = action.payload;
      })
      .addCase(employeeRegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
const { employeeLogout } = employeeSlice.actions;
export { employeeLogout };
