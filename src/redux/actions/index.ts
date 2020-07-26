import { ADD_ITEM,
  DELETE_ITEM,
  TOGGLE_ITEM,
  DELETE_COMPLETED,
  TodoActionType, } from '../types';

export function addItem(text: string, id: string): TodoActionType {
  return { type: ADD_ITEM, text, id };
}

export function toggleItem(id: string): TodoActionType {
  return { type: TOGGLE_ITEM, id };
}

export function deleteItem(id: string): TodoActionType {
  return { type: DELETE_ITEM, id };
}

export function deleteCompleted(ids: Array<string>): TodoActionType {
  return { type: DELETE_COMPLETED, ids };
}
