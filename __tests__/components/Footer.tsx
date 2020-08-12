import 'react-native';
import React from 'react';
import Footer from '../../src/components/Footer';
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

describe('Footer component', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore(oneListOneItemDone);

    store.dispatch = jest.fn();
  });

  it('renders correctly', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <Footer>Delete Completed</Footer>
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should dispatch a delete completed items action', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Footer>Delete Completed</Footer>
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