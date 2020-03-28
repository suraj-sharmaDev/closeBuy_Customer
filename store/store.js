import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import userReducer from './reducers/userReducer';
import shopReducer from './reducers/shopReducer';
import cartReducer from './reducers/cartReducer';
import searchReducer from './reducers/searchReducer';
import addressReducer from './reducers/addressReducer';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1 // see "Merge Process" section for details.
}

const rootReducer = combineReducers({
  user : persistReducer(userPersistConfig,userReducer),
  shop : shopReducer,
  cart : cartReducer,
  search : searchReducer,
  address : addressReducer
});


// const rootReducer = combineReducers({
//   user : userReducer,
//   cart : cartReducer,
//   search : searchReducer,
//   address : addressReducer
// });

export const configureStore = createStore(rootReducer);
export const persistor = persistStore(configureStore);