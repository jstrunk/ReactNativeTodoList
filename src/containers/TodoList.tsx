/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import List from '../components/List';
import { reorderList } from '../redux/actions';
import { ITodoState } from '../redux/types';
import { ThunkDispatch } from 'redux-thunk';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from '../styles';

const mapStateToProps = (state: ITodoState) => ({
  todoList: state.todoList,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    reorderList: (ids: Array<string>) => {
      dispatch(reorderList(ids));
    }
  }
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TodoList = (props: PropsFromRedux) => {
  switch (props.todoList.status) {
    case 'fetching':
      return (
        <View style={styles.centeredView}>
          <ActivityIndicator size='large' />
        </View>
      );
    case 'error':
      return (
        <View style={styles.centeredView}>
          <Text>Failed to load list.</Text>
        </View>
      );
    case 'loaded':
    default:
      return (<List items={props.todoList.allItems} reorderList={props.reorderList} />);
  }
}

export default connector(TodoList);
