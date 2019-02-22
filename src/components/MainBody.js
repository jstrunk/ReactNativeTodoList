import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import AddItem from '../containers/AddItem';
import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class MainBody extends Component {
  render() {

    return (
      <View style={styles.container}>
        <AddItem items={this.props.items} onUpdate={this.props.onUpdate} />
        <List items={this.props.items} onUpdate={this.props.onUpdate} />
      </View>
    );
  }
}