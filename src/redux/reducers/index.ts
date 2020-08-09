import { combineReducers } from 'redux';
import listReducer from '../reducers/listReducer';
import collectionReducer from '../reducers/collectionReducer';
import { ITodoState } from '../types';

export default combineReducers<ITodoState>(
  {
    todoList: listReducer,
    todoCollection: collectionReducer,
  }
);
