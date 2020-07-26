import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import DeleteCompleted from '../../src/containers/DeleteCompleted';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import configureStore, { MockStore } from 'redux-mock-store';

const mockStore = configureStore([]);

describe('DeleteCompleted container', () => {
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

  it('should dispatch a delete completed items action', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DeleteCompleted>
          <Text>Delete Completed</Text>
        </DeleteCompleted>
      </Provider>
    );

    const element = getByText('Delete Completed');
    fireEvent.press(element);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.deleteCompleted(['abc1'])
    );
  });
});
