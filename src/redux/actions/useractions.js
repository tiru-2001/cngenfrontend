import { createAsyncThunk } from '@reduxjs/toolkit';
import configuredUrl from '../../utilities/request';
import { toast } from 'react-toastify';
const userLoginAction = createAsyncThunk(
  'userloginAction',
  async (loginData, { rejectWithValue }) => {
    try {
      console.log(loginData);
      const { data } = await configuredUrl.post('/user/login', loginData);
      if (data.success) {
        toast.success('user logged successfully');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userExist));
        return data.userExist;
      }
    } catch (e) {
      toast.error('wrong credentials');
      console.log(e.response.data.message);
      return rejectWithValue(e.response.data.message);
    }
  }
);

const userRegisterAction = createAsyncThunk(
  'userregisterAction',
  async (inpdata, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // };

      const { data } = await configuredUrl.post('/user/register', inpdata);
      console.log(data);

      if (data.success) {
        toast.success('user registered successfully');
        console.log(data);
        return data.savedUserData;
      }
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export { userRegisterAction, userLoginAction };
