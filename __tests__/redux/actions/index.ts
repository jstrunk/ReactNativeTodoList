import * as actions from '../../../src/redux/actions';
import * as types from '../../../src/redux/types';

describe('actions', () => {
  it('should create an action to add an item', () => {
    const text = 'foo';
    const expectedAction = {
      type: types.ADD_ITEM,
      text,
    };
    expect(actions.addItem(text)).toEqual(expectedAction);
  });

  it('should create an action to toggle an item', () => {
    const index = 1;
    const expectedAction = {
      type: types.TOGGLE_ITEM,
      index,
    };
    expect(actions.toggleItem(index)).toEqual(expectedAction);
  });

  it('should create an action to delete an item', () => {
    const index = 1;
    const expectedAction = {
      type: types.DELETE_ITEM,
      index,
    };
    expect(actions.deleteItem(index)).toEqual(expectedAction);
  });

  it('should create an action to delete completed items', () => {
    const expectedAction = {
      type: types.DELETE_COMPLETED,
    };
    expect(actions.deleteCompleted()).toEqual(expectedAction);
  });
});