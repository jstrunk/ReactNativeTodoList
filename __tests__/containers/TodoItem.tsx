import { StyleSheet } from 'react-native';
import React from 'react';
import TodoItem from '../../src/containers/TodoItem';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import configureStore, { MockStore } from 'redux-mock-store';

const mockStore = configureStore([]);

const styles = StyleSheet.create({
  item: {
    textAlign: 'left',
    color: 'black',
  },
  itemdone: {
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  remove: {
    textAlign: 'center',
    color: 'red',
  },
  checkBox: {
    color: '#bfbfbf',
  },
});

describe('TodoItem container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      todoList: {
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
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders a TodoItem', () => {
    const { asJSON } = render(
      <Provider store={store}>
        <TodoItem id='abc1' styles={styles} />
      </Provider>
    );
    expect(asJSON()).toMatchSnapshot();
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
  });
});
