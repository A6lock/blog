import { configureStore } from '@reduxjs/toolkit';

// Импорт редьюсеров из слайсов
import main from '../components/main/mainSlice';
import articleList from '../components/articleList/articleListSlice';

const store = configureStore({
  reducer: { main, articleList },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
