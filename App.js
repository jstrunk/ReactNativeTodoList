/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, AsyncStorage} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import TodoList from './src/containers/TodoList';

type Props = {};

export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <TodoList />
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
