import React from 'react';
import TodoItem from '../../src/containers/TodoItem';
import * as types from '../../src/redux/types';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import styles from '../../src/styles';
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { oneListOneItemDone } from '../../test/testStates';

jest.mock('../../src/redux/actions');

type DispatchExts = ThunkDispatch<types.ITodoState, void, types.CombinedActionType>;
const middlewares = [thunk];
const mockStore = configureMockStore<types.ITodoState,DispatchExts>(middlewares);


describe('TodoItem container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

    store.dispatch = jest.fn();
  });

  it('renders a TodoItem', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <TodoItem id='abc1' styles={styles} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('has items', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoItem id='def2' />
      </Provider >
    );

    const fooElements = getAllByText('foo');
    expect(fooElements).toHaveLength(1);
  });

  it('should dispatch a toggle item action', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoItem id='abc1' />
      </Provider>
    );

    const checkedElements = getAllByText('');
    expect(checkedElements).toHaveLength(1);

    checkedElements.forEach((e) => fireEvent.press(e));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.toggleItem('abc1')
    );
  });

  it('should dispatch a delete item action', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoItem id='abc1' />
      </Provider>
    );

    const deleteElements = getAllByText('X');
    expect(deleteElements).toHaveLength(1);

    deleteElements.forEach((e) => fireEvent.press(e));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.deleteItem('abc1')
    );
    expect(actions.deleteItem).toHaveBeenCalledWith('abc1');
  });
});
