import 'react-native';
import React from 'react';
import List from '../../src/components/List';
import { render, fireEvent, NativeTestEvent } from '@testing-library/react-native'
jest.mock('../../src/containers/TodoItem');

describe('List component', () => {
  const items = ['abc1', 'def2' ];
  const reorderList = jest.fn();

  test('renders correctly', () => {
    const { asJSON } = render(
      <List items={items} reorderList={reorderList} />);
    expect(asJSON()).toMatchSnapshot();
  });

  it('has items', () => {
    const { getAllByText } = render(
        <List items={items} reorderList={reorderList} />
    );

    const fooElements = getAllByText('def2');
    expect(fooElements).toHaveLength(1);
  });

  it('dispatches reorderList on drag end', () => {
    const { getAllByText } = render(
        <List items={items} reorderList={reorderList} />
    );

    const fooElements = getAllByText('def2');
    fireEvent(fooElements[0],
      new NativeTestEvent('dragEnd', { nativeEvent: { value: ['def2', 'abc1']}}),
    );
    expect(fooElements).toHaveLength(1);
    expect(reorderList).toHaveBeenCalledTimes(1);
  });
});
