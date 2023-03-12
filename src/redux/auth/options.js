import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const resp = await axios.post('/users/signup', {
        name,
        email,
        password,
      });

      setAuthHeader(resp.data.token);

      console.log(resp.data);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await axios.post('/users/login', {
        email,
        password,
      });

      setAuthHeader(resp.data.token);

      console.log(resp.data);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const resp = await axios.post('/users/logout');

    clearAuthHeader();

    console.log(resp.data);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});