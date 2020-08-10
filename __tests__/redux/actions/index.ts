import * as actions from '../../../src/redux/actions';
import * as types from '../../../src/redux/types';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import cache from '../../../src/redux/store/listCache';

type DispatchExts = ThunkDispatch<types.ITodoState, void, types.CombinedActionType>;
const middlewares = [thunk];
const mockStore = configureMockStore<types.ITodoState,DispatchExts>(middlewares);

const emptyState: types.ITodoState = {
  todoList: types.defaultListState,
  todoCollection: types.defaultCollection,
};

const loadedListState: types.ITodoState = {
  todoCollection: {
    listIds: [{id: 'list1', name: 'foo'}],
    activeList: 'list1',
  },
  todoList: {
    status: 'loaded',
    name: 'foo',
    allItems: ['abc1', 'def2'],
    byId: {
      abc1: {
        key: 'hello',
        done: false,
      },
      def2: {
        key: 'hello',
        done: true,
      },
    }
  }
};

describe('actions', () => {
  beforeEach(() => {
    cache.set(
      'list1',
      JSON.stringify({
        name: 'foo',
        allItems: ['abc1', 'def2'],
        byId: {
          abc1: {
            key: 'hello',
            done: false,
          },
          def2: {
            key: 'hello',
            done: true,
          },
        }
      })
    )
  });

  it('should create an action to add an item', () => {
    const store = mockStore(loadedListState);
    const text = 'foo';
    const id = 'abc1';
    const expectedAction = {
      type: types.ADD_ITEM,
      text,
      id,
    };
   
    return store.dispatch(actions.addItem(text, id)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to toggle an item', () => {
    const store = mockStore(loadedListState);
    const id = 'abc1';
    const expectedAction = {
      type: types.TOGGLE_ITEM,
      id,
    };

    return store.dispatch(actions.toggleItem(id)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to delete an item', () => {
    const store = mockStore(loadedListState);
    const id = 'abc1';
    const expectedAction = {
      type: types.DELETE_ITEM,
      id,
    };

    return store.dispatch(actions.deleteItem(id)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to delete completed items', () => {
    const store = mockStore(loadedListState);
    const ids = ['abc1'];
    const expectedAction = {
      type: types.DELETE_COMPLETED,
      ids,
    };

    return store.dispatch(actions.deleteCompleted(ids)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create an action to reorder items', () => {
    const store = mockStore(loadedListState);
    const ids = ['abc1', 'def2'];
    const expectedAction = {
      type: types.REORDER_LIST,
      ids,
    };
  
    return store.dispatch(actions.reorderList(ids)).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });

  it('should create and action to create a list', async () => {
    const store = mockStore(emptyState);
    const name = 'bar';
    const id = 'list2';

    const expectedActions = [{
      type: types.REGISTER_LIST,
      id,
      name,
    }];

    return store.dispatch(actions.createList(id, name)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create actions to load a list successfully', () => {
    const store = mockStore(emptyState);
    const id = 'list1';
    const payload: types.ITodoList = {
      name: 'foo',
      allItems: ['abc1', 'def2'],
      byId: {
        abc1: {
          key: 'hello',
          done: false,
        },
        def2: {
          key: 'hello',
          done: true,
        },
      }
    };

    const expectedActions = [
      {
        type: types.SET_LIST_STATUS,
        status: 'fetching',
      },
      {
        type: types.LOAD_LIST,
        payload,
      },
      {
        type: types.SET_LIST_STATUS,
        status: 'loaded',
      },
      {
        type: types.SET_ACTIVE_LIST,
        id,
      }
    ];

    return store.dispatch(actions.loadList(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  it('should create actions to fail to load a non-existent list', () => {
    const store = mockStore(emptyState);
    const id = 'nonexistentlist1';

    const expectedActions = [
      {
        type: types.SET_LIST_STATUS,
        status: 'fetching',
      },
      {
        type: types.SET_LIST_STATUS,
        status: 'error',
      },
    ];

    return expect(store.dispatch(actions.loadList(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })).rejects.toMatch(/Unable to load nonexistentlist1 from cache./);

  });
});