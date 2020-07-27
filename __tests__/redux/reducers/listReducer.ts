import * as types from '../../../src/redux/types';
import reducer from '../../../src/redux/reducers/listReducer';

describe('listReducer', () => {
/*  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
*/
  it('should add an item to the empty state', () => {
    expect(
      reducer(types.defaultState, {
        type: types.ADD_ITEM,
        text: 'Run the tests',
        id: 'abc1',
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
      },
      allItems: ['abc1'],
    });
  });

  it('should add an item to the non-empty state', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: false,
          },
        },
        allItems: ['abc1'],
      }, {
        type: types.ADD_ITEM,
        text: 'foo',
        id: 'def2',
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      },
      allItems: ['abc1', 'def2'],
    });
  });

  it('should do nothing on empty ADD_ITEM', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: false,
          },
        },
        allItems: ['abc1'],
      }, {
        type: types.ADD_ITEM,
        text: '',
        id: 'ghi3',
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
      },
      allItems: ['abc1'],
    });
  });

  it('should delete an item from the state', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: false,
          },
          def2: {
            key: 'foo',
            done: false,
          },
        },
        allItems: ['abc1', 'def2'],
      }, {
        type: types.DELETE_ITEM,
        id: 'def2',
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
      },
      allItems: ['abc1'],
    });
  });

  it('should toggle an item in the state', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: false,
          },
          def2: {
            key: 'foo',
            done: false,
          },
        },
        allItems: ['abc1', 'def2'],
      }, {
        type: types.TOGGLE_ITEM,
        id: 'def2',
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: true,
        },
      },
      allItems: ['abc1', 'def2'],
    });
  });

  it('should delete all completed items from the state NO-OP', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: false,
          },
          def2: {
            key: 'foo',
            done: false,
          },
        },
        allItems: ['abc1', 'def2'],
      }, {
        type: types.DELETE_COMPLETED,
        ids: [],
      })
    ).toEqual({
      byId: {
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      },
      allItems: ['abc1', 'def2'],
    });
  });

  it('should delete all completed items from the state', () => {
    expect(
      reducer({
        byId: {
          abc1: {
            key: 'Run the tests',
            done: true,
          },
          def2: {
            key: 'foo',
            done: false,
          },
        },
        allItems: ['abc1', 'def2'],
      }, {
        type: types.DELETE_COMPLETED,
        ids: ['abc1'],
      })
    ).toEqual({
      byId: {
        def2: {
          key: 'foo',
          done: false,
        },
      },
      allItems: ['def2'],
    });
  });

});
