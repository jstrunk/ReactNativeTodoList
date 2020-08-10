import * as types from '../../../src/redux/types';
import reducer from '../../../src/redux/reducers/collectionReducer';

describe('collectionReducer', () => {
  it('should add an list to the empty state', () => {
    expect(
      reducer(types.defaultCollection, {
        type: types.REGISTER_LIST,
        id: 'abc1',
        name: 'Todo List 1',
      })
    ).toEqual({
      listIds: [{id: 'abc1', name: 'Todo List 1'}],
    });
  });

  it('should set an active list', () => {
    expect(
      reducer({
        listIds: [{id: 'abc1', name: 'Todo List 1'}],
      }, {
        type: types.SET_ACTIVE_LIST,
        id: 'abc1',
      })
    ).toEqual({
      listIds: [{id: 'abc1', name: 'Todo List 1'}],
      activeList: 'abc1',
    });
  });
});