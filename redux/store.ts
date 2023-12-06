import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import logger from 'redux-logger';
import { baseApi } from './apis/baseApi';
import { rootEpic } from './epics/root';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([baseApi.middleware, epicMiddleware, logger])
  // TODO: remove logger in production
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
