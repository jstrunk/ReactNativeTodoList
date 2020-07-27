export interface Todo {
  key: string;
  done: boolean;
}

export interface ITodoList {
  byId: Record<string,Todo>;
  allItems: Array<string>;
}

export interface ITodoState {
  todoList: ITodoList;
}

export const defaultState: ITodoList = {
  byId: {},
  allItems: [],
};

export const ADD_ITEM = "ADD_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_COMPLETED = "DELETE_COMPLETED";

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

export type TodoActionType = AddItemAction | ToggleItemAction |
  DeleteItemAction | DeleteCompletedAction;
