import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://6401de160a2a1afebef3e345.mockapi.io';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchContacts = createAsyncThunk(
  'tasks/fetchContacts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'tasks/addContact',
  async function ({ name, number: phone }, { rejectWithValue }) {
    try {
      const contact = { name, phone };
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'tasks/deleteContact',
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
