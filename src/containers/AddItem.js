import React, {Component} from 'react';
import {TextInput,Text,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addItem: {
    padding: 15,
    textAlign: 'left',
    color: 'grey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
});

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
    }
  }

  onChangeText = (text) => {
    this.setState({newItem: text});
  }

  addItem = () => {
    if (this.state.newItem == '') return;

    let items = [...this.props.items];
    items.push({key: this.state.newItem, done: false});
    this.props.onUpdate(items);
    this.setState({newItem: ''});
    this.addItemInput.setNativeProps({text: ''});
  }

  render() {

    return (
      <TextInput
        ref={addItem => this.addItemInput = addItem }
        style={styles.addItem}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.addItem}
        placeholder="Add new item"
      />
    );
  }
}