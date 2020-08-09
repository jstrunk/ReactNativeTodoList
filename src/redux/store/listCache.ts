import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-community/async-storage';


const cache = new Cache({
  namespace: 'todoLists',
  policy: {
    maxEntries: 100,
  },
  backend: AsyncStorage,
});

export default cache;