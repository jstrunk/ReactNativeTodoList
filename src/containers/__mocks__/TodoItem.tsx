/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
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

type Props = OwnProps;

const TodoItem = (props: Props): JSX.Element => {
  const style = props.styles ? props.styles : styles;
  return (
    <ListItem
      title={props.id}
      titleStyle={style.item}
    />
  );
}

export default TodoItem;
