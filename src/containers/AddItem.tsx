import React, {Component} from 'react';
import {TextInput,StyleSheet} from 'react-native';
import { connect, ConnectedProps } from 'react-redux'
import { addItem } from '../redux/actions'
import { ITodoState } from '../redux/types';
import itemId from '../lib/itemId';

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

const mapStateToProps = (state: ITodoState) => ({
  order: state.todoList.allItems,
})

const mapDispatch = {
  addItem: (text: string, id: string) => addItem(text, id),
}

const connector = connect(
  mapStateToProps,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AddItemState = {
  newItem: string;
};

class AddItem extends Component<PropsFromRedux, AddItemState> {
  addItemInput: React.RefObject<TextInput>;
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      newItem: '',
    };
    this.addItemInput = React.createRef<TextInput>();
  }

  onChangeText = (text: string) => {
    this.setState({newItem: text});
  }

  submitItem = async () => {
    if (this.state.newItem == '') return;
    let newId = await itemId(this.state.newItem);
    if (this.props.order.includes(newId)) {
      newId = await itemId(this.state.newItem + '1');
    }
    this.props.addItem(this.state.newItem, newId);
    this.setState({newItem: ''});
    if (this.addItemInput !== null && this.addItemInput.current !== null) {
      this.addItemInput.current.setNativeProps({text: ''});
    }
  }

  render() {
    return (
      <TextInput
        ref={this.addItemInput}
        style={styles.addItem}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.submitItem}
        placeholder="Add new item"
      />
    );
  }
}

export default connector(AddItem)
