/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { toggleItem, deleteItem } from '../redux/actions';
import { ITodoState } from '../redux/types';
import { ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  item: {
    textAlign: 'left',
    color: 'black',
  },
  itemdone: {
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  remove: {
    textAlign: 'center',
    color: 'red',
  },
  checkBox: {
    color: '#bfbfbf',
  },
});

interface OwnProps {
  id: string;
  drag?: () => void;
  styles?: typeof styles;
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
  const style = props.styles ? props.styles : styles;
  return (
    <ListItem
      title={props.item.key}
      titleStyle={props.item.done? style.itemdone : style.item}
      onLongPress={props.drag}
      checkBox={{
        right: true,
        checked: props.item.done,
        onIconPress: () => props.toggleItem(props.id),
      }}
      rightElement={<Pressable onPress={() => props.deleteItem(props.id)}>
          <Text style={style.remove}>X</Text>
        </Pressable>
        }
    />
  );
}

export default connector(TodoItem);
