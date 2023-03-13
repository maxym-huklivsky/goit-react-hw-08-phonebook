import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './options';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    correctOn: { on: false, number: null, name: null, id: null },
  },
  reducers: {
    correctContact(state, action) {
      state.correctOn.on = true;
      state.correctOn.name = action.payload.name;
      state.correctOn.number = action.payload.number;
      state.correctOn.id = action.payload.id;
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(updateContact.fulfilled, state => {
        state.correctOn = { on: false, number: null, name: null, id: null };
      })
      .addMatcher(
        isAnyOf(addContact.fulfilled, updateContact.fulfilled),
        (state, action) => {
          state.items.unshift(action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          updateContact.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled,
          updateContact.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const { correctContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
