import { combineReducers } from 'redux';
// import { accountApi } from './apis/accountsApi';
// import { authApi } from './apis/authApi';
// import { chatApi } from './apis/chatApi';

// import { qrApi } from './apis/qrApi';
// import { qrHistoryApi } from './apis/qrHistory';
import { providersReducer } from './slices/providersSlice';
import { providersApi } from './apis/providersApi';
import { synchronizationsApi } from './apis/synchronizationsApi';
// import { addBellReducer } from './slices/addBellSlice';
// import { notificationsReducer } from './slices/notificationsSlice';
// import { pushNotificationsReducer } from './slices/pushNotificationsSlice';
// import { qrCodesReducer } from './slices/qrCodesSlice';

const rootReducer = combineReducers({
  //   auth: authReducer,
  providers: providersReducer,
  //   toast: toastReducer,
  //   qrCodes: qrCodesReducer,
  //   addBell: addBellReducer,
  //   pushNotifications: pushNotificationsReducer,
  //   notifications: notificationsReducer,
  [providersApi.reducerPath]: providersApi.reducer,
  [synchronizationsApi.reducerPath]: synchronizationsApi.reducer
  //   [authApi.reducerPath]: authApi.reducer,
  //   [accountApi.reducerPath]: accountApi.reducer,
  //   [chatApi.reducerPath]: chatApi.reducer,
  //   [qrHistoryApi.reducerPath]: qrHistoryApi.reducer,
});

export default rootReducer;
