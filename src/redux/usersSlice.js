import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersThunk } from './operations';

const initialState = { users: [], loading: false, error: null };
const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })
      .addCase(fetchUsersThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchUsersThunk.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
