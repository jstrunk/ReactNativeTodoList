/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import List from '../components/List';
import { reorderList } from '../redux/actions';
import { ITodoState } from '../redux/types';

const mapStateToProps = (state: ITodoState) => ({
  order: state.todoList,
})

const mapDispatch = {
  reorderList: (ids: Array<string>) => reorderList(ids)
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TodoList = (props: PropsFromRedux) => {
  return (<List items={props.order} reorderList={props.reorderList} />);
}

export default connector(TodoList);
