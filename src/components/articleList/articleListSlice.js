/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  some: 0,
};

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {},
});

const { actions, reducer } = articleListSlice;

export const { changePage } = actions;

export default reducer;
