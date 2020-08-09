import React, {Component, ReactNode} from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import TodoItem from '../containers/TodoItem';
import styles from '../styles';

interface Props {
  items: Array<string>;
  reorderList: (ids: Array<string>) => void;
}

interface ItemProps {
  item: string;
  index?: number;
  drag: () => void;
  isActive?: boolean;
}

export default class List extends Component<Props> {
  renderItem = (itemProps: ItemProps): ReactNode => (
    <TodoItem id={itemProps.item} drag={itemProps.drag} />
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
