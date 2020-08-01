import { ADD_ITEM,
  DELETE_ITEM,
  DELETE_COMPLETED,
  REORDER_LIST,
  TodoActionType,
  defaultListState,
  ITodoList, 
  TOGGLE_ITEM} from '../types';
import produce from 'immer';


//function todoListReducer(state: ITodoList = defaultState, action: TodoActionType): ITodoList {
const todoListReducer = produce((draft: ITodoList, action: TodoActionType) => {
  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '' && action.id) {
        draft.byId[action.id] = {key: action.text, done: false};
        draft.allItems.push(action.id);
      }
      break;
    case TOGGLE_ITEM:
      draft.byId[action.id].done = !draft.byId[action.id].done;
      draft.allItems.sort((a: string, b: string): number => {
        if (draft.byId[a].done && !draft.byId[b].done) return 1;
        else if (!draft.byId[a].done && draft.byId[b].done) return -1;
        else return 0;
      });
      break;
    case DELETE_ITEM:
      delete draft.byId[action.id];
      draft.allItems = draft.allItems.filter((item: string) => item != action.id);
      break;
    case DELETE_COMPLETED:
      action.ids.forEach((id: string) => delete draft.byId[id]);
      draft.allItems = draft.allItems.filter((item) => !action.ids.includes(item));
      break;
    case REORDER_LIST:
      draft.allItems = action.ids;
      break;
  }
}, defaultListState);

export default todoListReducer;
