import {Apicontact, Apicontacts, Contact} from '../types';
import axiosAPI from '../axiosAPI';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchAll = createAsyncThunk<Contact[], void>(
  'contacts/fetchAll',
  async () => {
    const {data: contacts} = await axiosAPI.get<Apicontacts | null>("/contacts.json");
    if (contacts) {
      return Object
        .keys(contacts)
        .map((id: string) => {
          return ({...contacts[id], id});
        });
    } else {
      return [];
    }
  }
);

export const createContact = createAsyncThunk<void, Apicontact>(
  'contacts/create',
  async (contactData) => {
    await axiosAPI.post("/contacts.json", contactData);
  }
);

export const editContact = createAsyncThunk<void, Contact>(
  'contacts/edit',
  async (contactData) => {
    await axiosAPI.put("/contacts/" + contactData.id + ".json", {
      name: contactData.name,
      phone: contactData.phone,
      email: contactData.email,
      photo: contactData.photo
    });
  }
);

export const fetchOne = createAsyncThunk<Apicontact, string>(
  'contacts/fetchOne',
  async (id) => {
    const {data} = await axiosAPI.get<Apicontact | null>('/contacts/' + id + '.json');
    if (data === null) {
      throw new Error('Not found');
    }
    return data;
  }
);