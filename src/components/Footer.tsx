import React, {Component} from 'react';
import {Text} from 'react-native';
import DeleteCompleted from '../containers/DeleteCompleted';
import styles from '../styles';

interface Props {
  children: string;
}

export default class Footer extends Component<Props> {
  render(): JSX.Element {
    return (
      <DeleteCompleted style={styles.footer}>
        <Text style={styles.remove}>{this.props.children}</Text>
      </DeleteCompleted>
    );
  }
}
