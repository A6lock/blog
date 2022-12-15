/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articlesData: [],
  page: 1,
  articlesCount: 0,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeArticlesCount: (state, action) => {
      state.articlesCount = action.payload;
    },
    getArtList: (state, action) => {
      state.articlesData = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
  },
});

const { actions, reducer } = mainSlice;

export const { changePage, changeArticlesCount, getArtList } = actions;

export default reducer;
