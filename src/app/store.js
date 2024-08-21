import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../redux-services/cryptoascApi';
import { newsApi } from '../redux-services/newsApi';
import coinReducer from '../redux-services/slices/coinSlice'

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    coin: coinReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(newsApi.middleware),
});

export default store;
