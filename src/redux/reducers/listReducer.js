import { ADD_ITEM, DELETE_ITEM, TOGGLE_ITEM, DELETE_COMPLETED } from '../constants';

function todoApp(state = [], action) {
  switch(action.type) {
    case ADD_ITEM:
      return [
        ...state,
        ...(action.text != '') && [{key: action.text, done: false}],
      ];
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