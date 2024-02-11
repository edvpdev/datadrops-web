import { combineReducers } from 'redux';
import { userProvidersReducer } from './slices/providersSlice';
import { baseApi } from './apis/baseApi';
import { userSyncsReducer } from './slices/synchronizationsSlice';
import { syncOverviewReducer } from './slices/syncsOverviewSlice';
import { userEntitiesReducer } from './slices/entitiesSlice';
import { confirmModalReducer } from './slices/confirmModalSlice';

const rootReducer = combineReducers({
  userProviders: userProvidersReducer,
  userEntities: userEntitiesReducer,
  syncOverview: syncOverviewReducer,
  userSyncs: userSyncsReducer,
  confirmationModal: confirmModalReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export default rootReducer;
