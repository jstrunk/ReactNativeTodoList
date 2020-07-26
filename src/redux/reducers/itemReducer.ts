import { ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM,
  DELETE_COMPLETED,
  TodoActionType,
  ITodoItems } from '../types';

function todoApp(state: ITodoItems = {}, action: TodoActionType): ITodoItems {
  const newstate = {...state};
  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '' && action.id != '') {
        newstate[action.id] = {key: action.text, done: false};
        return newstate;
      }
      else return state;
    case TOGGLE_ITEM:
      newstate[action.id].done = !state[action.id].done;
      return newstate;
    case DELETE_ITEM:
      delete newstate[action.id];
      return newstate;
    case DELETE_COMPLETED:
      action.ids.forEach((id: string) => delete newstate[id]);
      return newstate;
    default:
      return state;
  }
}

export default todoApp;
