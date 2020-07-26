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
  styles?: typeof styles;
}

const mapStateToProps = (state: ITodoState) => ({
  items: state.todoItems,
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
  const item = props.items[props.id];
  const style = props.styles ? props.styles : styles;
  return (
    <ListItem
      title={item.key}
      titleStyle={style.item}
      checkBox={{
        right: true,
        checked: item.done,
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
