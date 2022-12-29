import { configureStore } from '@reduxjs/toolkit';

// Импорт редьюсеров из слайсов
import articleList from './articleListSlice';
import appSlice from './appSlice';

const store = configureStore({
  reducer: { articleList, appSlice },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
