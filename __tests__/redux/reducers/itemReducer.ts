import * as types from '../../../src/redux/types';
import reducer from '../../../src/redux/reducers/itemReducer';

describe('itemReducer', () => {
/*  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
*/
  it('should add an item to the empty state', () => {
    expect(
      reducer({}, {
        type: types.ADD_ITEM,
        text: 'Run the tests',
        id: 'abc1',
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      }
    });
  });

  it('should add an item to the non-empty state', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: false,
        }
      }, {
        type: types.ADD_ITEM,
        text: 'foo',
        id: 'def2',
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      },
      def2: {
        key: 'foo',
        done: false,
      },
    });
  });

  it('should do nothing on empty ADD_ITEM', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: false,
        }
      }, {
        type: types.ADD_ITEM,
        text: '',
        id: 'ghi3',
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      }
    });
  });

  it('should delete an item from the state', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      }, {
        type: types.DELETE_ITEM,
        id: 'def2',
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      },
    });
  });

  it('should toggle an item in the state', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      }, {
        type: types.TOGGLE_ITEM,
        id: 'def2',
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      },
      def2: {
        key: 'foo',
        done: true,
      },
    });
  });

  it('should delete all completed items from the state NO-OP', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: false,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      }, {
        type: types.DELETE_COMPLETED,
        ids: [],
      })
    ).toEqual({
      abc1: {
        key: 'Run the tests',
        done: false,
      },
      def2: {
        key: 'foo',
        done: false,
      },
    });
  });

  it('should delete all completed items from the state', () => {
    expect(
      reducer({
        abc1: {
          key: 'Run the tests',
          done: true,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      }, {
        type: types.DELETE_COMPLETED,
        ids: ['abc1'],
      })
    ).toEqual({
      def2: {
        key: 'foo',
        done: false,
      },
    });
  });

});
