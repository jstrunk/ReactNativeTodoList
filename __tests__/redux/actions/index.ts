import * as actions from '../../../src/redux/actions';
import * as types from '../../../src/redux/types';

describe('actions', () => {
  it('should create an action to add an item', () => {
    const text = 'foo';
    const id = 'abc1';
    const expectedAction = {
      type: types.ADD_ITEM,
      text,
      id,
    };
    expect(actions.addItem(text, id)).toEqual(expectedAction);
  });

  it('should create an action to toggle an item', () => {
    const id = 'abc1';
    const expectedAction = {
      type: types.TOGGLE_ITEM,
      id,
    };
    expect(actions.toggleItem(id)).toEqual(expectedAction);
  });

  it('should create an action to delete an item', () => {
    const id = 'abc1';
    const expectedAction = {
      type: types.DELETE_ITEM,
      id,
    };
    expect(actions.deleteItem(id)).toEqual(expectedAction);
  });

  it('should create an action to delete completed items', () => {
    const ids = ['abc1'];
    const expectedAction = {
      type: types.DELETE_COMPLETED,
      ids,
    };
    expect(actions.deleteCompleted(ids)).toEqual(expectedAction);
  });
});