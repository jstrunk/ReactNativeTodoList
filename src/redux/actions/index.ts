import { ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM,
  DELETE_COMPLETED,
  REORDER_LIST,
  TodoActionType,
  LOAD_LIST,
  ITodoList,
  CollectionActionType,
  REGISTER_LIST,
  SET_ACTIVE_LIST,
  ITodoState,
  SET_LIST_STATUS,
  CombinedActionType,
} from '../types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import listCache from '../store/listCache';
import { showMessage } from 'react-native-flash-message';

function _addItem(text: string, id: string): TodoActionType {
  return { type: ADD_ITEM, text, id };
}

export const addItem = (text: string, id: string): ThunkAction<Promise<void>, ITodoState, void, TodoActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, TodoActionType>, getState: () => ITodoState): Promise<void> => {
    dispatch(_addItem(text, id));
    const state = getState();
    if (state.todoCollection.activeList) {
      await listCache.set(state.todoCollection.activeList, JSON.stringify(state.todoList));
    }
  }
}

function _toggleItem(id: string): TodoActionType {
  return { type: TOGGLE_ITEM, id };
}

export const toggleItem = (id: string): ThunkAction<Promise<void>, ITodoState, void, TodoActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, TodoActionType>, getState: () => ITodoState): Promise<void> => {
    dispatch(_toggleItem(id));
    const state = getState();
    if (state.todoCollection.activeList) {
      await listCache.set(state.todoCollection.activeList, JSON.stringify(state.todoList));
    }
  }
}

function _deleteItem(id: string): TodoActionType {
  return { type: DELETE_ITEM, id };
}

export const deleteItem = (id: string): ThunkAction<Promise<void>, ITodoState, void, TodoActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, TodoActionType>, getState: () => ITodoState): Promise<void> => {
    dispatch(_deleteItem(id));
    const state = getState();
    if (state.todoCollection.activeList) {
      await listCache.set(state.todoCollection.activeList, JSON.stringify(state.todoList));
    }
  }
}

function _deleteCompleted(ids: Array<string>): TodoActionType {
  return { type: DELETE_COMPLETED, ids };
}

export const deleteCompleted = (ids: Array<string>): ThunkAction<Promise<void>, ITodoState, void, TodoActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, TodoActionType>, getState: () => ITodoState): Promise<void> => {
    dispatch(_deleteCompleted(ids));
    const state = getState();
    if (state.todoCollection.activeList) {
      await listCache.set(state.todoCollection.activeList, JSON.stringify(state.todoList));
    }
  }
}

function _reorderList(ids: Array<string>): TodoActionType {
  return { type: REORDER_LIST, ids };
}

export const reorderList = (ids: Array<string>): ThunkAction<Promise<void>, ITodoState, void, TodoActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, TodoActionType>, getState: () => ITodoState): Promise<void> => {
    dispatch(_reorderList(ids));
    const state = getState();
    if (state.todoCollection.activeList) {
      await listCache.set(state.todoCollection.activeList, JSON.stringify(state.todoList));
    }
  }
}

function _loadList(payload: ITodoList): TodoActionType {
  return { type: LOAD_LIST, payload };
}

function setListStatus(status: 'fetching' | 'loaded' | 'error'): TodoActionType {
  return { type: SET_LIST_STATUS, status };
}

export function registerList(id: string, name: string): CollectionActionType {
  return { type: REGISTER_LIST, id, name };
}

export function setActiveList(id: string): CollectionActionType {
  return { type: SET_ACTIVE_LIST, id };
}

export const createList = (id: string, name: string): ThunkAction<Promise<void>, ITodoState, void, CollectionActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, CollectionActionType>): Promise<void> => {
    dispatch(registerList(id, name));

    await listCache.set(id, JSON.stringify({name: name, byId: {}, allItems: []}));

    return Promise.resolve();
  }
}

export const loadList = (id: string): ThunkAction<Promise<void>, ITodoState, void, CombinedActionType> => {
  return async (dispatch: ThunkDispatch<ITodoState, void, CombinedActionType>): Promise<void> => {
    dispatch(setListStatus('fetching'));
    const result: string | void | undefined = await listCache.get(id)
      .catch((err) => {
        console.error('unable to load ' + id + ' from cache: ' + err);
        showMessage({message: 'Unable to load todo list.', type: 'danger'});
      });
    if (!result) {
      dispatch(setListStatus('error'));
      return Promise.reject('Unable to load ' + id + ' from cache.');
    }
    let todoList: ITodoList;
    try {
      todoList = JSON.parse(result);
    } catch (err) {
      dispatch(setListStatus('error'));
      console.error('unable to parse JSON ' + id + ' from cache: ' + err); 
      showMessage({message: 'Unable to load todo list.', type: 'danger'});
      return Promise.reject('unable to parse JSON ' + id + ' from cache');
    }
    dispatch(_loadList(todoList));
    dispatch(setListStatus('loaded'));
    dispatch(setActiveList(id));
    return Promise.resolve();
  }
}