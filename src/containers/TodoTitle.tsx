/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ITodoState } from '../redux/types';
import Title from '../components/Title';

const mapStateToProps = (state: ITodoState) => ({
  name: state.todoList.name,
})


const connector = connect(
  mapStateToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TodoTitle = (props: PropsFromRedux) => {
return (<Title>{name ? name : "Todo List"}</Title>);
}

export default connector(TodoTitle);
