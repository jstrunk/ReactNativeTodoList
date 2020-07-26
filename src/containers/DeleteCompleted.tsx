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

const mapDispatch = {
  deleteCompleted: () => deleteCompleted()
};

const connector = connect(
  null,
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

  return (
  // eslint-disable-next-line react/prop-types
  <Pressable style={pressableStyle} onPress={props.deleteCompleted}>
    {props.children}
  </Pressable>
)};

export default connector(DeleteCompleted);
