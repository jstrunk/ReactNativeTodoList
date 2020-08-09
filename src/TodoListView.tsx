import React from 'react';
import {View} from 'react-native';

import TodoList from './containers/TodoList';
import AddItem from './containers/AddItem';
import Footer from './components/Footer';
import { TodoListScreenNavigationProp, TodoListScreenRouteProp } from './navigation/types';
import { ITodoState } from './redux/types';
import { connect, ConnectedProps } from 'react-redux';
import styles from './styles';
import { loadList } from './redux/actions';

interface Props {
  navigation: TodoListScreenNavigationProp;
  route: TodoListScreenRouteProp;
}

const mapStateToProps = (state: ITodoState) => ({
  name: state.todoList.name,
})

const mapDispatch = {
  loadList: (id: string) => loadList(id),
};

const connector = connect(
  mapStateToProps,
  mapDispatch,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CombinedProps = Props & PropsFromRedux;

const TodoListView = (props: CombinedProps): JSX.Element => {
  React.useEffect(() => {
    props.navigation.setOptions({
      title: props.name
    })
  }, [props.name]);

  React.useEffect(() => {
    console.log('hook call loadList ' + props.route.params.id);
    props.loadList(props.route.params.id);
  }, [props.route.params.id]);

  return (
    <View style={styles.container}>
      <AddItem />
      <TodoList />
      <Footer>Remove completed items</Footer>
    </View>
  );
}

export default connector(TodoListView);
