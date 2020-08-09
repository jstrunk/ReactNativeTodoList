import { REGISTER_LIST,
  SET_ACTIVE_LIST,
  CollectionActionType,
  ITodoCollection,
  defaultCollection,
} from '../types';
import produce from 'immer';

const collectionReducer = produce((draft: ITodoCollection, action: CollectionActionType) => {
  switch(action.type) {
    case REGISTER_LIST:
      draft.listIds.push({id: action.id, name: action.name});
      break;
    case SET_ACTIVE_LIST:
      draft.activeList = action.id;
      break;
  }
}, defaultCollection);

export default collectionReducer;
