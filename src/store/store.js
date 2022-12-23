import { configureStore } from '@reduxjs/toolkit';

// Импорт редьюсеров из слайсов
import articleList from '../components/articleList/articleListSlice';
import appSlice from '../components/app/appSlice';

const store = configureStore({
  reducer: { articleList, appSlice },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
