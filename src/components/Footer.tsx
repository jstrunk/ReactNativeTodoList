import React, {Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import DeleteCompleted from '../containers/DeleteCompleted';

interface Props {
  children: string;
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'white',
    padding: 15,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  remove: {
    textAlign: 'center',
    color: 'red',
  },
});

export default class Footer extends Component<Props> {
  render(): JSX.Element {
    return (
      <DeleteCompleted style={styles.footer}>
        <Text style={styles.remove}>{this.props.children}</Text>
      </DeleteCompleted>
    );
  }
}
