import * as types from '../../../src/redux/types';
import reducer from '../../../src/redux/reducers/listReducer';

describe('listReducer', () => {
/*  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
*/
  it('should add an item to the empty state', () => {
    expect(
      reducer([], {
        type: types.ADD_ITEM,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      }
    ]);
  });

  it('should add an item to the non-empty state', () => {
    expect(
      reducer([
        {
          key: 'Run the tests',
          done: false,
        }
      ], {
        type: types.ADD_ITEM,
        text: 'foo'
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      },
      {
        key: 'foo',
        done: false,
      },
    ]);
  });

  it('should do nothing on empty ADD_ITEM', () => {
    expect(
      reducer([
        {
          key: 'Run the tests',
          done: false,
        }
      ], {
        type: types.ADD_ITEM,
        text: ''
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      },
    ]);
  });

  it('should delete an item from the state', () => {
    expect(
      reducer([
        {
          key: 'Run the tests',
          done: false,
        },
        {
          key: 'foo',
          done: false,
        },
      ], {
        type: types.DELETE_ITEM,
        index: 1,
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      },
    ]);
  });

  it('should toggle an item in the state', () => {
    expect(
      reducer([
        {
          key: 'Run the tests',
          done: false,
        },
        {
          key: 'foo',
          done: false,
        },
      ], {
        type: types.TOGGLE_ITEM,
        index: 1,
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      },
      {
        key: 'foo',
        done: true,
      },
    ]);
  });

  it('should delete all completed items from the state', () => {
    expect(
      reducer([
        {
          key: 'Run the tests',
          done: false,
        },
        {
          key: 'foo',
          done: false,
        },
      ], {
        type: types.DELETE_COMPLETED,
      })
    ).toEqual([
      {
        key: 'Run the tests',
        done: false,
      },
      {
        key: 'foo',
        done: false,
      },
    ]);

    expect(
      reducer([
        {
          key: 'Run the tests',
          done: true,
        },
        {
          key: 'foo',
          done: false,
        },
      ], {
        type: types.DELETE_COMPLETED,
      })
    ).toEqual([
      {
        key: 'foo',
        done: false,
      },
    ]);
  });

});
