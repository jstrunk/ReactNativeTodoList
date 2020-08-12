import 'react-native';
import React from 'react';
import TodoList from '../../src/containers/TodoList';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native'
import configureStore, { MockStore } from 'redux-mock-store';
import { oneListOneItemDone } from '../../test/testStates';
import { ActivityIndicator } from 'react-native';
import List from '../../src/components/List';
jest.mock('../../src/containers/TodoItem');

const mockStore = configureStore([]);

describe('TodoList container', () => {
  let store: MockStore;

  it('renders a TodoList', () => {
    store = mockStore(oneListOneItemDone);
    const { toJSON } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('has items without loaded status', () => {
    store = mockStore(oneListOneItemDone);
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider >
    );

    const fooElements = getAllByText('def2');
    expect(fooElements).toHaveLength(1);
  });

  it('shows an activity indicator on status=fetching', () => {
    const fetchingState = oneListOneItemDone;
    fetchingState.todoList.status = 'fetching';
    store = mockStore(fetchingState);
    const { UNSAFE_getByType } = render(
      <Provider store={store}>
        <TodoList />
      </Provider >
    );

    const element = UNSAFE_getByType(ActivityIndicator);
    expect(element).toBeDefined();
  });

  it('shows an error on status=error', () => {
    const fetchingState = oneListOneItemDone;
    fetchingState.todoList.status = 'error';
    store = mockStore(fetchingState);
    const { getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider >
    );

    const element = getByText('Failed to load list.');
    expect(element).toBeDefined();
  });

  it('shows a list on status=loaded', () => {
    const fetchingState = oneListOneItemDone;
    fetchingState.todoList.status = 'loaded';
    store = mockStore(fetchingState);
    const { UNSAFE_getByType } = render(
      <Provider store={store}>
        <TodoList />
      </Provider >
    );

    const element = UNSAFE_getByType(List);
    expect(element).toBeDefined();
  });
});
