/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { toggleItem, deleteItem } from '../redux/actions';
import List from '../components/List';
import { ITodoState } from '../redux/types';

const mapStateToProps = (state: ITodoState) => ({
  items: state.todoList,
})

const mapDispatch = {
  toggleItem: (index: number) => toggleItem(index),
  deleteItem: (index: number) => deleteItem(index),
};

const connector = connect(
  mapStateToProps,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TodoList = (props: PropsFromRedux) => (
  <List items={props.items} toggleItem={props.toggleItem} deleteItem={props.deleteItem} />
)

export default connector(TodoList);
