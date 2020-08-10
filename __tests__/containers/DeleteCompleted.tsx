import 'react-native';
import React from 'react';
import {Text} from 'react-native';
import DeleteCompleted from '../../src/containers/DeleteCompleted';
import * as types from '../../src/redux/types';
import * as actions from '../../src/redux/actions';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react-native'
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { oneListOneItemDone } from '../../test/testStates';

jest.mock('../../src/redux/actions');

type DispatchExts = ThunkDispatch<types.ITodoState, void, types.CombinedActionType>;
const middlewares = [thunk];
const mockStore = configureMockStore<types.ITodoState,DispatchExts>(middlewares);

describe('DeleteCompleted container', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

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
    expect(actions.deleteCompleted).toHaveBeenCalledWith(['abc1']);
  });
});
