import 'react-native';
import React from 'react';
import AddItem from '../../src/containers/AddItem';
import * as types from '../../src/redux/types';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { oneListOneItemDone } from '../../test/testStates';

jest.mock('../../src/lib/itemId');

jest.mock('../../src/redux/actions');

type DispatchExts = ThunkDispatch<types.ITodoState, void, types.CombinedActionType>;
const middlewares = [thunk];
const mockStore = configureMockStore<types.ITodoState,DispatchExts>(middlewares);

describe('AddItem container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

    store.dispatch = jest.fn();
  });

  it('renders an AddItem', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should dispatch an add item action', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );

    const element = getByPlaceholderText('Add new item');

    fireEvent.changeText(element, 'Hello World!');
    fireEvent(element, 'submitEditing');

    await new Promise((r) => setTimeout(r, 2000));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.addItem('Hello World!', 'Hello World!')
    );
  });

  it('should handle id collisions', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <AddItem />
      </Provider>
    );

    const element = getByPlaceholderText('Add new item');

    fireEvent.changeText(element, 'def2');
    fireEvent(element, 'submitEditing');

    await new Promise((r) => setTimeout(r, 2000));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.addItem('def2', 'def21')
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
    fireEvent(element, 'submitEditing');

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});
