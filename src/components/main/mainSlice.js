/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import RealWorldService from '../../services/RealWorldService';

const initialState = {
  page: 1,
  articlesCount: 0,
  loadingStatus: 'inactive',
};

export const fetchArticlesData = createAsyncThunk(
  'mian/fetchArticlesData',
  (page) => {
    const realWorldService = new RealWorldService();
    return realWorldService.getArticles(page);
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.articlesCount = 0;
      })
      .addCase(fetchArticlesData.fulfilled, (state, action) => {
        state.loadingStatus = 'inactive';
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticlesData.rejected, (state) => {
        state.loadingStatus = 'error';
        state.articlesCount = 0;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = mainSlice;

export const { changePage, changeArticlesCount, getArtList } = actions;

export default reducer;
