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

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  console.log(persistedToken);

  if (!persistedToken) {
    return thunkAPI.rejectWithValue(null);
  }

  try {
    setAuthHeader(persistedToken);
    const resp = await axios.get('/users/current');

    return resp.data;
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(error);
  }
});
