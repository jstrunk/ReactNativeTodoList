import AsyncStorage from '@react-native-community/async-storage';
import { createStore, Store, applyMiddleware, CombinedState } from 'redux';
import { persistStore, persistReducer, Persistor, PersistConfig } from 'redux-persist';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { ITodoState } from '../types';

const persistConfig: PersistConfig<CombinedState<ITodoState>,any,any,any> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['todoList'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export interface PersistStore {
  store: Store,
  persistor: Persistor,
}

const composeEnhancers = composeWithDevTools({ name: 'todolist', hostname: 'localhost', port: 8000 });
const configureStore = (): PersistStore => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore;
