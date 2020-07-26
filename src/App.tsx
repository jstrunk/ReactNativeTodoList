import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
import FlashMessage from 'react-native-flash-message';

import TodoList from './containers/TodoList';
import AddItem from './containers/AddItem';
import Footer from './components/Footer';
import Title from './components/Title';

const { store, persistor } = configureStore();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <Title>Todo List</Title>
          <AddItem />
          <TodoList />
          <Footer>Remove completed items</Footer>
          <FlashMessage position="top" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
