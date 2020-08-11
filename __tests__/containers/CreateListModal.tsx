import 'react-native';
import React from 'react';
import CreateListModal from '../../src/containers/CreateListModal';
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

describe('CreateListModal container', () => {
  let store: MockStore;
  let toggleCreateListModal: jest.Mock<any,any>;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

    store.dispatch = jest.fn();
    toggleCreateListModal = jest.fn();
  });

  it('renders an CreateListModal', () => {
    const visible = true;
    const { toJSON } = render(
      <Provider store={store}>
        <CreateListModal toggleCreateListModal={toggleCreateListModal} isCreateListModalVisible={visible} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should dispatch a create list action', async () => {
    const visible = true;
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateListModal toggleCreateListModal={toggleCreateListModal} isCreateListModalVisible={visible} />
      </Provider>
    );

    const element = getByPlaceholderText('Create new list');

    fireEvent.changeText(element, 'Hello World!');
    fireEvent(element, 'submitEditing');

    await new Promise((r) => setTimeout(r, 2000));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.createList('Hello World!', 'Hello World!')
    );
    expect(toggleCreateListModal).toHaveBeenCalledTimes(1);
  });

  it('should handle id collisions', async () => {
    const visible = true;
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateListModal toggleCreateListModal={toggleCreateListModal} isCreateListModalVisible={visible} />
      </Provider>
    );

    const element = getByPlaceholderText('Create new list');

    fireEvent.changeText(element, 'list1');
    fireEvent(element, 'submitEditing');
  
    await new Promise((r) => setTimeout(r, 2000));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      actions.createList('list11', 'list1')
    );
    expect(toggleCreateListModal).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch on empty input', async () => {
    const visible = true;
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateListModal toggleCreateListModal={toggleCreateListModal} isCreateListModalVisible={visible} />
      </Provider>
    );

    const element = getByPlaceholderText('Create new list');

    fireEvent.changeText(element, '');
    fireEvent(element, 'submitEditing');

    await new Promise((r) => setTimeout(r, 2000));

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});