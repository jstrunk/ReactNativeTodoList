import React, {Component} from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'white',
    padding: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  remove: {
    textAlign: 'center',
    color: 'red',
  },
});

export default class Footer extends Component {

  _onPressButton() {
    let items = [];
    this.props.items.map((item) => {
      if (!item.done) items.push(item);
    });
    this.props.onUpdate(items);
  }

  render() {
    return (
      <TouchableOpacity style={styles.footer} onPress={this._onPressButton.bind(this)}>
        <Text style={styles.remove}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}