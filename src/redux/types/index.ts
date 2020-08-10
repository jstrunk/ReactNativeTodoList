export interface Todo {
  key: string;
  done: boolean;
}

export interface ITodoList {
  byId: Record<string,Todo>;
  allItems: Array<string>;
  name?: string;
  status?: 'fetching' | 'loaded' | 'error';
}

export interface ITodoIndex {
  id: string;
  name: string;
}
export interface ITodoCollection {
  listIds: Array<ITodoIndex>;
  activeList?: string;
}

export interface ITodoState {
  todoList: ITodoList;
  todoCollection: ITodoCollection;
}

export const defaultListState: ITodoList = {
  byId: {},
  allItems: [],
};

export const defaultCollection: ITodoCollection = {
  listIds: [],
};

export const ADD_ITEM = "ADD_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_COMPLETED = "DELETE_COMPLETED";
export const REORDER_LIST = "REORDER_LIST";
export const SET_LIST_STATUS = "SET_LIST_STATUS";

export const NEW_LIST = "NEW_LIST";
export const LOAD_LIST = "LOAD_LIST";

export const REGISTER_LIST = "REGISTER_LIST";
export const SET_ACTIVE_LIST = "SET_ACTIVE_LIST";

interface AddItemAction {
  type: typeof ADD_ITEM;
  text: string;
  id: string;
}

interface ToggleItemAction {
  type: typeof TOGGLE_ITEM;
  id: string;
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  id: string;
}

interface DeleteCompletedAction {
  type: typeof DELETE_COMPLETED;
  ids: Array<string>;
}

interface ReorderListAction {
  type: typeof REORDER_LIST;
  ids: Array<string>;
}

interface SetListStatus {
  type: typeof SET_LIST_STATUS;
  status: 'fetching' | 'loaded' | 'error';
}

export type TodoActionType = AddItemAction | ToggleItemAction |
  DeleteItemAction | DeleteCompletedAction | ReorderListAction |
  LoadListAction | SetListStatus;

interface LoadListAction {
  type: typeof LOAD_LIST;
  payload: ITodoList;
}

interface SetActiveListAction {
  type: typeof SET_ACTIVE_LIST;
  id: string;
}

interface RegisterListAction {
  type: typeof REGISTER_LIST;
  id: string;
  name: string;
}

export type CollectionActionType = RegisterListAction | SetActiveListAction;

export type CombinedActionType = TodoActionType | CollectionActionType;