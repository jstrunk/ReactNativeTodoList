import { ADD_ITEM,
  DELETE_ITEM,
  DELETE_COMPLETED,
  TodoActionType,
  ITodoList } from '../types';


function todoListReducer(state: ITodoList = [], action: TodoActionType): ITodoList {
  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '' && action.id) {
        return [...state, action.id];
      }
      else return state;
    case DELETE_ITEM:
      return state.filter((item) => item != action.id);
    case DELETE_COMPLETED:
      return state.filter((item) => !action.ids.includes(item));
    default:
      return state;
  }
}

export default todoListReducer;
