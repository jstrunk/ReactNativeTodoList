export interface Todo {
  key: string;
  done: boolean;
}

export type ITodoList = Array<Todo>;

export interface ITodoState {
  todoList: ITodoList;
}

export const ADD_ITEM = "ADD_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_COMPLETED = "DELETE_COMPLETED";

interface AddItemAction {
  type: typeof ADD_ITEM;
  text: string;
}

interface ToggleItemAction {
  type: typeof TOGGLE_ITEM;
  index: number;
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  index: number;
}

interface DeleteCompletedAction {
  type: typeof DELETE_COMPLETED;
}

export type TodoActionType = AddItemAction | ToggleItemAction |
  DeleteItemAction | DeleteCompletedAction;
