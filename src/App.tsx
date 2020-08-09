import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoSelectView from './TodoSelectView';
import TodoListView from './TodoListView';
import { RootStackParamList } from './navigation/types';
import styles from './styles';

const { store, persistor } = configureStore();

const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <FlashMessage position="top" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName='TodoSelect'>
              <Stack.Screen
                name='TodoSelect'
                component={TodoSelectView}
                options={{ title: 'Todo Lists', headerStyle: styles.header }}
              />
              <Stack.Screen name='TodoList' component={TodoListView} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}

export default App;
