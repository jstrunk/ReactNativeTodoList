export interface Todo {
  key: string;
  done: boolean;
}

export type ITodoItems = Record<string,Todo>;
export type ITodoList = Array<string>;

export interface ITodoState {
  todoItems: ITodoItems;
  todoList: ITodoList;
}

export const defaultTodoState: ITodoItems = {};
export const defaultListState: ITodoList = [];

export const ADD_ITEM = "ADD_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_COMPLETED = "DELETE_COMPLETED";
export const REORDER_LIST = "REORDER_LIST";

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

export type TodoActionType = AddItemAction | ToggleItemAction |
  DeleteItemAction | DeleteCompletedAction | ReorderListAction;
