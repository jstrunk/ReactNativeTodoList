import * as types from '../../../src/redux/types';
import reducer from '../../../src/redux/reducers/listReducer';

describe('listReducer', () => {
  it('should add an item to the empty state', () => {
    expect(
      reducer(types.defaultListState, {
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


  it('should add a new item before done items', () => {
    expect(
      reducer({
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
      }, {
        type: types.ADD_ITEM,
        text: 'bar',
        id: 'ghi3',
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
        ghi3: {
          key: 'bar',
          done: false,
        }
      },
      allItems: ['abc1', 'ghi3', 'def2'],
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

  it('should reorder items on completion', () => {
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
        id: 'abc1',
      })
    ).toEqual({
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
      allItems: ['def2', 'abc1'],
    });
  });

  it('should reorder items on completion done to undone', () => {
    expect(
      reducer({
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
          done: false,
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

  it('should reorder the list', () => {
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
        type: types.REORDER_LIST,
        ids: ['def2', 'abc1'],
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
      allItems: ['def2', 'abc1'],
    });
  });

  it('should load the list', () => {
    expect(
      reducer({
        byId: {},
        allItems: [],
      }, {
        type: types.LOAD_LIST,
        payload: {
          name: 'foo',
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
          allItems: ['def2', 'abc1'], 
        }
      })
    ).toEqual({
      name: 'foo',
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
      allItems: ['def2', 'abc1'], 
    });
  });

  it('should load the list with no name', () => {
    expect(
      reducer({
        byId: {},
        allItems: [],
      }, {
        type: types.LOAD_LIST,
        payload: {
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
          allItems: ['def2', 'abc1'], 
        }
      })
    ).toEqual({
      name: 'Unnamed Todo List',
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
      allItems: ['def2', 'abc1'], 
    });
  });

  it('should set the list status', () => {
    expect(
      reducer({
        byId: {},
        allItems: [],
      }, {
        type: types.SET_LIST_STATUS,
        status: 'loaded'
      })
    ).toEqual({
      byId: {},
      allItems: [],
      status: 'loaded',
    });

    expect(
      reducer({
        byId: {},
        allItems: [],
      }, {
        type: types.SET_LIST_STATUS,
        status: 'error'
      })
    ).toEqual({
      byId: {},
      allItems: [],
      status: 'error',
    });

    expect(
      reducer({
        byId: {},
        allItems: [],
      }, {
        type: types.SET_LIST_STATUS,
        status: 'fetching'
      })
    ).toEqual({
      byId: {},
      allItems: [],
      status: 'fetching',
    });
  });
});
