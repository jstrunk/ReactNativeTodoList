import 'react-native';
import React from 'react';
import List from '../../src/components/List';
import { render, fireEvent } from '@testing-library/react-native'
jest.mock('../../src/containers/TodoItem');

describe('List component', () => {
  const items = ['abc1', 'def2' ];

  test('renders correctly', () => {
    const { asJSON } = render(
      <List items={items} />);
    expect(asJSON()).toMatchSnapshot();
  });

  it('has items', () => {
    const { getAllByText } = render(
        <List items={items} />
    );

    const fooElements = getAllByText('def2');
    expect(fooElements).toHaveLength(1);
  });



});
