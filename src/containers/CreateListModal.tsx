import React, { Component } from 'react';
import { Modal, TextInput, View } from 'react-native';
import { createList } from '../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import itemId from '../lib/itemId';
import { ITodoState, ITodoIndex } from '../redux/types';
import styles from '../styles';

interface IProps {
  isCreateListModalVisible: boolean;
  toggleCreateListModal: () => void;
}

const mapStateToProps = (state: ITodoState) => ({
  collection: state.todoCollection.listIds,
})

const MapDispatch = {
  createList: (id: string, name: string) => createList(id, name),
};

const connector = connect(
  mapStateToProps,
  MapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = IProps & PropsFromRedux;

type CreateListState = {
  name: string;
}

class CreateListModal extends Component<Props, CreateListState> {
  createListInput: React.RefObject<TextInput>;
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
    };
    this.createListInput = React.createRef<TextInput>();
  }
  onChangeText = (text: string): void => {
    this.setState({name: text});
  }

  submitItem = async () => {
    if (this.state.name == '') return;
    let newId = await itemId(this.state.name);
    if (this.props.collection.some((item: ITodoIndex) => newId === item.id)) {
      newId = await itemId(this.state.name + '1');
    }
    this.props.createList(newId, this.state.name);
    this.setState({name: ''});
    if (this.createListInput !== null && this.createListInput.current !== null) {
      this.createListInput.current.setNativeProps({text: ''});
    }
    this.props.toggleCreateListModal();
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <Modal visible={this.props.isCreateListModalVisible} transparent={true} >
          <View style={styles.centeredView}>
            <View style={styles.modalView} >
              <TextInput
                ref={this.createListInput}
                style={styles.createListTextInput}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.submitItem}
                placeholder='Create new list'
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

}

export default connector(CreateListModal);