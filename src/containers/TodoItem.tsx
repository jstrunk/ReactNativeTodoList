/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Pressable, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { toggleItem, deleteItem } from '../redux/actions';
import { ITodoState } from '../redux/types';
import { ListItem } from 'react-native-elements';
import styles from '../styles';

interface OwnProps {
  id: string;
  drag?: () => void;
}

const mapStateToProps = (state: ITodoState, ownProps: OwnProps) => ({
  item: state.todoList.byId[ownProps.id],
})

const mapDispatch = {
  toggleItem: (id: string) => toggleItem(id),
  deleteItem: (id: string) => deleteItem(id),
};

const connector = connect(
  mapStateToProps,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = OwnProps & PropsFromRedux;

const TodoItem = (props: Props) => {
  return (
    <ListItem
      title={props.item.key}
      titleStyle={props.item.done? styles.itemdone : styles.item}
      onLongPress={props.drag}
      checkBox={{
        right: true,
        checked: props.item.done,
        onIconPress: () => props.toggleItem(props.id),
      }}
      rightElement={<Pressable onPress={() => props.deleteItem(props.id)}>
          <Text style={styles.remove}>X</Text>
        </Pressable>
        }
    />
  );
}

export default connector(TodoItem);
