import AsyncStorage from '@react-native-community/async-storage';
import { createStore, Store } from 'redux';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export interface PersistStore {
  store: Store,
  persistor: Persistor,
}
const configureStore = (): PersistStore => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
