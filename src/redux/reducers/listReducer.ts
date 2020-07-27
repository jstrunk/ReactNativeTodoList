import { ADD_ITEM,
  DELETE_ITEM,
  DELETE_COMPLETED,
  REORDER_LIST,
  TodoActionType,
  defaultState,
  ITodoList, 
  TOGGLE_ITEM} from '../types';


function todoListReducer(state: ITodoList = defaultState, action: TodoActionType): ITodoList {
  const items = {...state.byId};
  switch(action.type) {
    case ADD_ITEM:
      if (action.text != '' && action.id) {
        items[action.id] = {key: action.text, done: false};
        return {
          byId: items,
          allItems: [...state.allItems, action.id]
        };
      }
      else return state;
    case TOGGLE_ITEM:
      items[action.id].done = !items[action.id].done;
      const allItems = [...state.allItems];
      allItems.sort((a: string, b: string): number => {
        if (items[a].done && items[b].done) return 0;
        else if (items[a].done && !items[b].done) return 1;
        else if (!items[a].done && items[b].done) return -1;
        else return 0;
      });
      return {
        byId: items,
        allItems: allItems,
      };
    case DELETE_ITEM:
      delete items[action.id];
      return {
        byId: items,
        allItems: state.allItems.filter((item: string) => item != action.id)
      };
    case DELETE_COMPLETED:
      action.ids.forEach((id: string) => delete items[id]);
      return {
        byId: items,
        allItems: state.allItems.filter((item) => !action.ids.includes(item)),
      };
    case REORDER_LIST:
      return {
        byId: state.byId,
        allItems: action.ids,
      }
    default:
      return state;
  }
}

export default todoListReducer;
