import React, {Component} from 'react';
import {View,Text} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles';

interface Props {
  children: string;
  back?: () => void;
}

export default class Title extends Component<Props> {

  render(): JSX.Element {
    return (
      <View style={styles.header}>
        {this.props.back &&
          <Icon
            name='arrow-left'
            type='font-awesome-5'
            iconStyle={styles.backbutton}
            onPress={this.props.back}
           />}
        <Text style={styles.title}>{this.props.children}</Text>
      </View>
    );
  }
}
