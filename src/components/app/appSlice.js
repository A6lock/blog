/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  username: localStorage.getItem('username') || null,
  bio: localStorage.getItem('bio') || null,
  image: localStorage.getItem('image') || null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    clearData: (state) => {
      // Почему не работает диспатч?
      console.log('dispatch');
      state.token = null;
      state.email = null;
      state.username = null;
    },
    userDataFilling: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },
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
  clearData,
  userDataFilling,
} = actions;

export default reducer;
