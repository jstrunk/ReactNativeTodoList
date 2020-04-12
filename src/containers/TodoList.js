/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage, {showMessage, hideMessage} from 'react-native-flash-message';

import Title from '../components/Title';
import MainBody from '../components/MainBody';
import Footer from '../components/Footer';

type Props = {};

export default class TodoList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.loadData().done();
  }

  loadData = async () => {
    try {
      const items = await AsyncStorage.getItem('items');
      if (items !== null) {
        this.setState({items: JSON.parse(items)});
      } else {
        this.setState({items: []});
        this.storeData([]);
      }
    } catch (error) {
      showMessage({
        message: 'Error loading data',
        type: 'danger',
        autoHide: false,
      })
    }
  }

  storeData = async (items) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(items));
    } catch (error) {
      // Error saving data
      showMessage({
        message: 'Error saving data',
        type: 'danger',
        autoHide: false,
      });
    }
  };

  onUpdate (items) {
    this.setState({items});
    this.storeData(items);
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>Todo List</Title>
        <MainBody items={this.state.items} onUpdate={this.onUpdate.bind(this)} />
        <Footer items={this.state.items} onUpdate={this.onUpdate.bind(this)}>Remove completed items</Footer>
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
