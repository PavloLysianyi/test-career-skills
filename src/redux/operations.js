import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const instance = axios.create({
  baseURL: 'https://65da7a98bcc50200fcdcf62f.mockapi.io/',
});

export const fetchUsersThunk = createAsyncThunk(
  'users',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('users');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
