import { ADD_ITEM, DELETE_ITEM, TOGGLE_ITEM, DELETE_COMPLETED } from '../constants';

export function addItem(text) {
  return { type: ADD_ITEM, text };
}

export function toggleItem(index) {
  return { type: TOGGLE_ITEM, index };
}

export function deleteItem(index) {
  return { type: DELETE_ITEM, index };
}

export function deleteCompleted() {
  return { type: DELETE_COMPLETED };
}
