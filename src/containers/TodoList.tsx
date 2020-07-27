/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import List from '../components/List';
import { ITodoState } from '../redux/types';

const mapStateToProps = (state: ITodoState) => ({
  order: state.todoList.allItems,
})

const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TodoList = (props: PropsFromRedux) => {
  return (<List items={props.order} />);
}

export default connector(TodoList);
