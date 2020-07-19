import 'react-native';
import React from 'react';
import AddItem from '../../src/containers/AddItem';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react-native'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('AddItem container', () => {
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

  it('renders an AddItem', () => {
    const { asJSON } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );
    expect(asJSON()).toMatchSnapshot();
  });

  it('should dispatch an add item action', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );

    const element = getByPlaceholderText('Add new item');

    fireEvent.changeText(element, 'Hello World!');
    fireEvent.submitEditing(element);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.addItem('Hello World!')
    );
  });

  it('should not dispatch an add item action on empty input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );

    const element = getByPlaceholderText('Add new item');

    fireEvent.changeText(element, '');
    fireEvent.submitEditing(element);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});