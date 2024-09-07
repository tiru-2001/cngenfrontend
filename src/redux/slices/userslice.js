import { createSlice } from '@reduxjs/toolkit';
import { userLoginAction, userRegisterAction } from '../actions/useractions.js';
const initialState = {
  userLoginInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  userRegisterInfo: null,
  userToken: localStorage.getItem('userToken')
    ? localStorage.getItem('token')
    : null,
  error: null,
  loading: false,
  bookingInfo: {},
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.loading = false;
      state.userLoginInfo = null;
      state.userRegisterInfo = null;
      state.error = null;
      state.userToken = null;
      window.location.reload();
    },

    addBookingInfo(state, action) {
      state.bookingInfo = { ...state.bookingInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userLoginInfo = action.payload;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userRegisterAction.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userRegisterInfo = action.payload;
      })
      .addCase(userRegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
const { userLogout, addBookingInfo } = userSlice.actions;
export { userLogout, addBookingInfo };
