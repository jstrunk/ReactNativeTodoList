import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import DeletePressable from '../../src/containers/DeletePressable';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react-native'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('DeletePressable container', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      todoList: [
        {
          key: 'Run the tests',
          done: true,
        },
        {
          key: 'foo',
          done: false,
        },
      ],
    });

    store.dispatch = jest.fn();
  });

  it('should dispatch a delete completed items action', () => {
    const { getByText, asJSON } = render(
      <Provider store={store}>
        <DeletePressable>
          <Text>Delete Completed</Text>
        </DeletePressable>
      </Provider>
    );

    const element = getByText('Delete Completed');
    fireEvent.press(element);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.deleteCompleted()
    );
  });
});