import 'react-native';
import React from 'react';
import List from '../../src/components/List';

import { render, fireEvent } from '@testing-library/react-native'

describe('List component', () => {
  const items = [
    {
      key: 'Run the tests',
      done: false,
      id: 'abc1',
    },
    {
      key: 'foo',
      done: true,
      id: 'def2',
    },
  ];

  const mockToggleItem = jest.fn();
  const mockDeleteItem = jest.fn();


  test('renders correctly', () => {
    const { asJSON } = render(
      <List items={items} toggleItem={mockToggleItem} deleteItem={mockDeleteItem} />);
    expect(asJSON()).toMatchSnapshot();
  });

  it('has items', () => {
    const { getAllByText } = render(
      <List items={items} toggleItem={mockToggleItem} deleteItem={mockDeleteItem} />
    );

    const fooElements = getAllByText('foo');
    const checkedElements = getAllByText('');
    const deleteElements = getAllByText('X');
    expect(fooElements).toHaveLength(1);
    expect(checkedElements).toHaveLength(1);
    expect(deleteElements).toHaveLength(2);

    checkedElements.forEach((e) => fireEvent.press(e));
    deleteElements.forEach((e) => fireEvent.press(e.parentNode));

    expect(mockToggleItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteItem).toHaveBeenCalledTimes(2);
  });



});
