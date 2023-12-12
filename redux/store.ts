import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import logger from 'redux-logger';
import { baseApi } from './apis/baseApi';
import { rootEpic } from './epics/root';

const epicMiddleware = createEpicMiddleware();

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(
        process.env.NODE_ENV === 'development'
          ? [baseApi.middleware, epicMiddleware, logger]
          : [baseApi.middleware, epicMiddleware]
      )
  });
}

export const store = setupStore({});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
