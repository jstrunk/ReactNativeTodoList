import { ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM,
  DELETE_COMPLETED,
  TodoActionType, } from '../types';

export function addItem(text: string): TodoActionType {
  return { type: ADD_ITEM, text };
}

export function toggleItem(index: number): TodoActionType {
  return { type: TOGGLE_ITEM, index };
}

export function deleteItem(index: number): TodoActionType {
  return { type: DELETE_ITEM, index };
}

export function deleteCompleted(): TodoActionType {
  return { type: DELETE_COMPLETED };
}
