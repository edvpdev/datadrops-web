import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import logger from 'redux-logger';
import { baseApi } from './apis/baseApi';
import { rootEpic } from './epics/root';

const epicMiddleware = createEpicMiddleware();

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(
        process.env.NODE_ENV === 'development'
          ? [baseApi.middleware, epicMiddleware, logger]
          : [baseApi.middleware, epicMiddleware]
      )
  });

  epicMiddleware.run(rootEpic);
  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

const store = makeStore();
export default store;
