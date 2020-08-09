/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import CollectionList from '../components/CollectionList';
import { loadList } from '../redux/actions';
import { ITodoState } from '../redux/types';
import { ThunkDispatch } from 'redux-thunk';
import { TodoSelectScreenNavigationProp } from '../navigation/types';

interface Props {
  navigation: TodoSelectScreenNavigationProp;
}

const mapStateToProps = (state: ITodoState) => ({
  listIds: state.todoCollection.listIds,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    loadList: (id: string) => {
      dispatch(loadList(id));
    }
  }
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CombinedProps = Props & PropsFromRedux;

const SelectList = (props: CombinedProps) => {
  return (<CollectionList items={props.listIds} loadList={props.loadList} navigation={props.navigation} />);
}

export default connector(SelectList);
