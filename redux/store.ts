import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { providersApi } from './apis/providersApi';
import { synchronizationsApi } from './apis/synchronizationsApi';
// import { qrApi } from './apis/qrApi';
// import { authApi } from './apis/authApi';
// import { accountApi } from './apis/accountsApi';
// import { chatApi } from './apis/chatApi';
// import { qrHistoryApi } from './apis/qrHistory';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      providersApi.middleware,
      synchronizationsApi.middleware,
      //   authApi.middleware,
      //   accountApi.middleware,
      //   chatApi.middleware,
      //   qrHistoryApi.middleware,
      logger
    ])
  // TODO: remove logger in production
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
