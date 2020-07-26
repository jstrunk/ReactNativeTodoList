/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import {  deleteCompleted } from '../redux/actions';
import { ITodoList, ITodoState } from '../redux/types';

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'white',
    padding: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state: ITodoState) => ({
  items: state.todoItems,
  order: state.todoList,
})

const mapDispatch = {
  deleteCompleted: (ids: ITodoList) => deleteCompleted(ids)
};

const connector = connect(
  mapStateToProps,
  mapDispatch
);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  children: JSX.Element;
  style?: typeof styles.default;
}

const DeleteCompleted = (props: Props) => {
  let pressableStyle: typeof styles.default;
  if (props.style) {
    pressableStyle = props.style;
  }
  else {
    pressableStyle = styles.default;
  }

  // eslint-disable-next-line react/prop-types
  const completed = props.order.filter((id: string) => props.items[id].done);
  return (
  // eslint-disable-next-line react/prop-types
  <Pressable style={pressableStyle} onPress={() => props.deleteCompleted(completed)}>
    {props.children}
  </Pressable>
)};

export default connector(DeleteCompleted);
