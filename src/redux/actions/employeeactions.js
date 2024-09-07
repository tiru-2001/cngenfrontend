import { createAsyncThunk } from '@reduxjs/toolkit';
import configuredUrl from '../../utilities/request';
import { toast } from 'react-toastify';

const employeeRegisterAction = createAsyncThunk(
  'employeeRegisterAction',
  async (inpdata, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await configuredUrl.post(
        '/employee/register',
        inpdata,
        config
      );
      if (data.success) {
        console.log(data);
        return data.savedData;
      }
    } catch (e) {
      console.log(e.response);
      return rejectWithValue(e.response.data.message);
    }
  }
);
const employeeLoginAction = createAsyncThunk(
  'employeeLoginAction',
  async (loginData, { rejectWithValue }) => {
    try {
      console.log(loginData);
      const { data } = await configuredUrl.post('/employee/login', loginData);
      console.log(data);
      if (data.success) {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('employee', JSON.stringify(data.userExist));
        toast.success('user logged in successfully');
        return data.userExist;
      }
    } catch (e) {
      toast.error('wrong credentials');
      console.log(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export { employeeRegisterAction, employeeLoginAction };
