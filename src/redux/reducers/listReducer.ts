import { ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM,
  DELETE_COMPLETED,
  TodoActionType,
  ITodoList } from '../types';

function todoApp(state: ITodoList = [], action: TodoActionType): ITodoList {
  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '') return [...state, {key: action.text, done: false}];
      else return [...state];
    case TOGGLE_ITEM:
      return state.map((item, index) => {
        return {...item,
          ...(index === action.index) && { done: !item.done},
        };
      });
    case DELETE_ITEM:
      return state.filter((item, index) => index != action.index);
    case DELETE_COMPLETED:
      return state.filter(item => !item.done);
    default:
      return state;
  }
}

export default todoApp;
