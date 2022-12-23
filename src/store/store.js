import { configureStore } from '@reduxjs/toolkit';

// Импорт редьюсеров из слайсов
import articleList from '../components/articleList/articleListSlice';

const store = configureStore({
  reducer: { articleList },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
