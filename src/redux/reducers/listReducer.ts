import { ADD_ITEM,
  DELETE_ITEM,
  DELETE_COMPLETED,
  REORDER_LIST,
  TodoActionType,
  defaultListState,
  ITodoList, 
  TOGGLE_ITEM,
  LOAD_LIST,
  SET_LIST_STATUS,
} from '../types';
import produce from 'immer';

const todoListReducer = produce((draft: ITodoList, action: TodoActionType) => {
  function sortItems(a: string, b: string): number {
    if (draft.byId[a].done && !draft.byId[b].done) return 1;
    else if (!draft.byId[a].done && draft.byId[b].done) return -1;
    else return 0;
  }

  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '' && action.id) {
        draft.byId[action.id] = {key: action.text, done: false};
        draft.allItems.push(action.id);
        draft.allItems.sort(sortItems);
      }
      break;
    case TOGGLE_ITEM:
      draft.byId[action.id].done = !draft.byId[action.id].done;
      draft.allItems.sort(sortItems);
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
    case LOAD_LIST:
      draft.name = action.payload.name || 'Unnamed Todo List';
      draft.allItems = action.payload.allItems;
      draft.byId = action.payload.byId;
      break;
    case SET_LIST_STATUS:
      draft.status = action.status;
      break;
  }
}, defaultListState);

export default todoListReducer;
