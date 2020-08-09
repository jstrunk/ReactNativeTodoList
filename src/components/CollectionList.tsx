import React, {Component} from 'react';
import {FlatList} from 'react-native';
import { ITodoIndex } from '../redux/types';
import { TodoSelectScreenNavigationProp } from '../navigation/types';
import styles from '../styles';
import { ListItem } from 'react-native-elements';

interface Props {
  items: Array<ITodoIndex>;
  loadList: (id: string) => void;
  navigation: TodoSelectScreenNavigationProp;
}

interface ItemProps {
  item: ITodoIndex;
}

export default class CollectionList extends Component<Props> {
  pressList(id: string): void {
    console.log('navigating to ' + id);
    this.props.navigation.navigate('TodoList', {id});
  }

  renderItem = (itemProps: ItemProps): JSX.Element => (
    <ListItem titleStyle={styles.item} onPress={() => this.pressList(itemProps.item.id)} title={itemProps.item.name} />
  ); 

  render(): JSX.Element {
    return (
      <FlatList
        style={styles.list}
        data={this.props.items}
        renderItem={this.renderItem}
        keyExtractor={(item: ITodoIndex) => item.id }
      />
    );
  }
}
