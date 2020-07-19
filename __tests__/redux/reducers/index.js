import * as actions from '../../../src/redux/actions';
import * as types from '../../../src/redux/constants';
import reducer from '../../../src/redux/reducers/index';

describe('combined reducers', () => {
  it('has listReducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('todoList');
  });

});