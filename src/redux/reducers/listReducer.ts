import { ADD_ITEM,
  DELETE_ITEM,
  DELETE_COMPLETED,
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
      return {
        byId: items,
        allItems: state.allItems,
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
    default:
      return state;
  }
}

export default todoListReducer;
