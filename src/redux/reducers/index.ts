import { combineReducers } from 'redux';
import listReducer from '../reducers/listReducer';
import itemReducer from '../reducers/itemReducer';
import { ITodoState } from '../types';

export default combineReducers<ITodoState>(
  {
    todoList: listReducer,
    todoItems: itemReducer,
  }
);
