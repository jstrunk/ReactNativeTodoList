import React, {Component} from 'react';
import {FlatList,StyleSheet} from 'react-native';
import { ITodoList } from '../redux/types';
import TodoItem from '../containers/TodoItem';

interface Props {
  items: ITodoList;
}

interface ItemProps {
  item: string;
  index?: number;
  separators?: any;
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 40,
  },
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

export default class List extends Component<Props> {
  renderItem = (itemProps: ItemProps): any => (
    <TodoItem id={itemProps.item} styles={styles}/>
  );

  render(): JSX.Element {
    return (
      <FlatList
        style={styles.list}
        data={this.props.items}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
