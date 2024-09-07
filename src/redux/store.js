import { configureStore } from '@reduxjs/toolkit';
import userslice from './slices/userslice';
import employeeslice from './slices/employeeslice';
import adminslice from './slices/adminslice';
const store = configureStore({
  reducer: {
    userslice: userslice,
    employeeslice: employeeslice,
    adminslice: adminslice,
  },
});

export { store };
