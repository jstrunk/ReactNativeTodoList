import React, {Component} from 'react';
import {TextInput,Text,StyleSheet} from 'react-native';
import { connect } from 'react-redux'
import { addItem } from '../redux/actions'

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

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
    }
  }

  onChangeText = (text) => {
    this.setState({newItem: text});
  }

  submitItem = () => {
    if (this.state.newItem == '') return;
    this.props.addItem(this.state.newItem);
    this.setState({newItem: ''});
    this.addItemInput.setNativeProps({text: ''});
  }

  render() {

    return (
      <TextInput
        ref={submitItem => this.addItemInput = submitItem }
        style={styles.addItem}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.submitItem}
        placeholder="Add new item"
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: text => dispatch(addItem(text)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddItem)