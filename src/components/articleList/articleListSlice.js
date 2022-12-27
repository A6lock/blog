/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RealWorldService from '../../services/RealWorldService';

const initialState = {
  articlesData: [],
  page: 1,
  articlesCount: 0,
  loadingStatus: 'inactive',
};

export const fetchArticlesData = createAsyncThunk(
  'mian/fetchArticlesData',
  (page) => {
    const realWorldService = new RealWorldService();
    return realWorldService.getArticles(page, localStorage.getItem('token'));
  }
);

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeArticlesCount: (state, action) => {
      state.articlesCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.articlesCount = 0;
      })
      .addCase(fetchArticlesData.fulfilled, (state, action) => {
        state.loadingStatus = 'inactive';
        state.articlesData = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticlesData.rejected, (state) => {
        state.articlesData = [];
        state.loadingStatus = 'error';
        state.articlesCount = 0;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = articleListSlice;

export const { changePage } = actions;

export default reducer;
