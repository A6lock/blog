/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  token: null,
  email: null,
  username: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    loading: (state) => {
      state.loading = true;
    },
    upLoaded: (state) => {
      state.loading = false;
    },
    isError: (state) => {
      state.error = true;
    },
    noError: (state) => {
      state.error = false;
    },
  },
});

const { actions, reducer } = appSlice;

export const {
  changeToken,
  loading,
  upLoaded,
  isError,
  noError,
  changeEmail,
  changeUsername,
} = actions;

export default reducer;
