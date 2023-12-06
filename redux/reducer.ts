import { combineReducers } from 'redux';
import { userProvidersReducer } from './slices/providersSlice';
import { baseApi } from './apis/baseApi';
import { userSyncsReducer } from './slices/synchronizationsSlice';
import { syncOverviewReducer } from './slices/syncsOverviewSlice';
import { userEntitiesReducer } from './slices/entitiesSlice';

const rootReducer = combineReducers({
  userProviders: userProvidersReducer,
  userEntities: userEntitiesReducer,
  syncOverview: syncOverviewReducer,
  userSyncs: userSyncsReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export default rootReducer;
