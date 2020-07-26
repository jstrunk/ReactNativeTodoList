import 'react-native';
import React from 'react';
import TodoList from '../../src/containers/TodoList';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import configureStore, { MockStore } from 'redux-mock-store';

const mockStore = configureStore([]);

describe('TodoList container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      todoItems: {
        abc1: {
          key: 'Run the tests',
          done: true,
        },
        def2: {
          key: 'foo',
          done: false,
        },
      },
      todoList: ['abc1', 'def2'],
    });

    store.dispatch = jest.fn();
  });

  it('renders a TodoList', () => {
    const { asJSON } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    expect(asJSON()).toMatchSnapshot();
  });

  it('should dispatch a toggle item action', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const checkedElements = getAllByText('');
    expect(checkedElements).toHaveLength(1);

    checkedElements.forEach((e) => fireEvent.press(e));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.toggleItem('def2')
    );
  });

  it('should dispatch a delete item action', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const deleteElements = getAllByText('X');
    expect(deleteElements).toHaveLength(2);

    deleteElements.forEach((e) => fireEvent.press(e));

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.deleteItem('abc1')
    );
  });
});
