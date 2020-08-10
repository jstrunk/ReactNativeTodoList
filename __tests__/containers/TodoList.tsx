import 'react-native';
import React from 'react';
import TodoList from '../../src/containers/TodoList';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native'
import configureStore, { MockStore } from 'redux-mock-store';
import { oneListOneItemDone } from '../../test/testStates';
jest.mock('../../src/containers/TodoItem');

const mockStore = configureStore([]);

describe('TodoList container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

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

  it('has items', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider >
    );

    const fooElements = getAllByText('def2');
    expect(fooElements).toHaveLength(1);
  });
});
