import { combineReducers } from 'redux';
import listReducer from '../reducers/listReducer';
import { ITodoState } from '../types';

export default combineReducers<ITodoState>(
  {
    todoList: listReducer,
  }
);
