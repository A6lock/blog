/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { fetchArticlesData } from '../main/mainSlice';

const initialState = {
  articlesData: [],
};

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesData.fulfilled, (state, action) => {
        state.articlesData = action.payload.articles;
      })
      .addCase(fetchArticlesData.rejected, (state) => {
        state.articlesData = [];
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = articleListSlice;

export const { changePage } = actions;

export default reducer;
