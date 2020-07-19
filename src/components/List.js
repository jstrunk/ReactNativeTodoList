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
  checkBox: {
    color: '#bfbfbf',
  },
});

export default class List extends Component {
  renderItem = ({item, index}) => (
    <ListItem
      title={item.key}
      titleStyle={styles.item}
      checkBox={{
        right: true,
        style: styles.checkBox,
        checked: item.done,
        onIconPress: () => this.props.toggleItem(index),
      }}
      rightElement={
        <TouchableOpacity onPress={() => this.props.deleteItem(index)}>
          <Text style={styles.remove}>X</Text>
        </TouchableOpacity>
      }
    />
  );

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