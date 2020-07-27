import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { ITodoList, TodoActionType } from '../redux/types';
import TodoItem from '../containers/TodoItem';

interface Props {
  items: ITodoList;
  reorderList: (ids: Array<string>) => TodoActionType;
}

interface ItemProps {
  item: string;
  index?: number;
  drag: () => void;
  isActive?: boolean;
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 40,
  },
  item: {
    textAlign: 'left',
    color: 'black',
  },
  itemdone: {
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
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
    <TodoItem id={itemProps.item} styles={styles} drag={itemProps.drag} />
  );

  render(): JSX.Element {
    return (
      <DraggableFlatList
        style={styles.list}
        data={this.props.items}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => this.props.reorderList(data)}
      />
    );
  }
}
