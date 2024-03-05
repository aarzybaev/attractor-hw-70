import {Apicontact, Contact} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createContact, editContact, fetchAll, fetchOne, removeContact} from './contactThunks';
import {RootState} from '../app/store';

interface ContactsState {
  items: Contact[];
  item: Apicontact | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  editLoading: boolean;
  removeLoading: boolean;
}

const initialState: ContactsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  editLoading: false,
  removeLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAll.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchAll.fulfilled, (state, {payload: contacts}) => {
      state.fetchLoading = false;
      state.items = contacts;
    }).addCase(fetchAll.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    }).addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOne.pending, (state) => {
      state.fetchOneLoading = true;
    }).addCase(fetchOne.fulfilled, (state, {payload: oneContact}) => {
      state.fetchOneLoading = false;
      state.item = oneContact;
    }).addCase(fetchOne.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(editContact.pending, (state) => {
      state.editLoading = true;
    }).addCase(editContact.fulfilled, (state) => {
      state.editLoading = false;
    }).addCase(editContact.rejected, (state) => {
      state.editLoading = false;
    });

    builder.addCase(removeContact.pending, (state) => {
      state.removeLoading = true;
    }).addCase(removeContact.fulfilled, (state) => {
      state.removeLoading = false;
    }).addCase(removeContact.rejected, (state) => {
      state.removeLoading = false;
    });
  }
});

export const contactsReducer = contactsSlice.reducer;
export const selectContacts = (state: RootState) => state.contacts.items;
export const selectOneContact = (state: RootState) => state.contacts.item;
export const selectFetchAllLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.contacts.fetchOneLoading;
export const selectCreateLoading = (state: RootState) => state.contacts.createLoading;
export const selectEditLoading = (state: RootState) => state.contacts.editLoading;
export const selectRemoveLoading = (state: RootState) => state.contacts.removeLoading;