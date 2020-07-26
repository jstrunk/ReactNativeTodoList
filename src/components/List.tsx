import React, {Component} from 'react';
import {FlatList,StyleSheet,Text, Pressable} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Todo, TodoActionType, ITodoList } from '../redux/types';

interface Props {
  items: ITodoList;
  toggleItem: (index: number) => TodoActionType;
  deleteItem: (index: number) => TodoActionType;
}

interface ItemProps {
  item: Todo;
  index: number;
}

const styles = StyleSheet.create({
  list: {
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
    <ListItem
      title={itemProps.item.key}
      titleStyle={styles.item}
      checkBox={{
        right: true,
        checked: itemProps.item.done,
        onIconPress: () => this.props.toggleItem(itemProps.index),
      }}
      rightElement={<Pressable onPress={() => this.props.deleteItem(itemProps.index)}>
          <Text style={styles.remove}>X</Text>
        </Pressable>
        }
    />
  );

  render(): JSX.Element {
    return (
      <FlatList
        style={styles.list}
        data={this.props.items}
        renderItem={this.renderItem}
      />
    );
  }
}
