import React, {Component} from 'react';
import {FlatList,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';

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
});

export default class List extends Component {


  renderItem = ({item, index}) => (
    <ListItem
      title={item.key}
      titleStyle={styles.item}
      checkBox={{
        right: true,
        checked: this.props.items[index].done,
        onIconPress: () => {
          let items = [...this.props.items];
          let item = {...items[index]};
          item.done = !item.done;
          items[index] = item;
          this.props.onUpdate(items);
        },
      }}
      rightElement={
        <TouchableOpacity onPress={this.removeItem(index)}>
          <Text style={styles.remove}>X</Text>
        </TouchableOpacity>
      }
    />
  );

  removeItem(index) {
    return () => {
      let items = [...this.props.items];
      items.splice(index,1);
      this.props.onUpdate(items);
    }
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.props.items}
        renderItem={this.renderItem}
      />
    );
  }
}