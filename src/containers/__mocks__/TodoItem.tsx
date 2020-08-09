/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { ListItem } from 'react-native-elements';
import styles from '../../styles';

interface OwnProps {
  id: string;
}

type Props = OwnProps;

const TodoItem = (props: Props): JSX.Element => {
  return (
    <ListItem
      title={props.id}
      titleStyle={styles.item}
    />
  );
}

export default TodoItem;
