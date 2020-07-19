/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux/store';
import FlashMessage from 'react-native-flash-message';

import TodoList from './src/containers/TodoList';
import AddItem from './src/containers/AddItem';
import Footer from './src/components/Footer';
import Title from './src/components/Title';

const { store, persistor } = configureStore();

type Props = {};

export default class App extends Component<Props> {

  render() {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
