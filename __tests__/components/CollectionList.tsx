import 'react-native';
import React from 'react';
import CollectionList from '../../src/components/CollectionList';
import { render, fireEvent } from '@testing-library/react-native';
import { ITodoIndex } from '../../src/redux/types';

describe('CollectionList component', () => {
  const items: Array<ITodoIndex> = [{id: 'list1', name: 'Test List1'}, {id: 'list2', name: 'Test List2'}];
  let loadList: jest.Mock<any,any>;
  const navigation: Record<string,unknown> = {};

  beforeEach(() => {
    loadList = jest.fn();
    
    navigation.navigate = jest.fn();
  });

  test('renders correctly', () => {
    const { toJSON } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ts(2769) for incorrect type of mocked navigation
      <CollectionList items={items} loadList={loadList} navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('has items', () => {
    const { getAllByText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ts(2769) for incorrect type of mocked navigation
      <CollectionList items={items} loadList={loadList} navigation={navigation} />
    );

    const fooElements = getAllByText('Test List2');
    expect(fooElements).toHaveLength(1);
  });

  it('fires a navigation event on press', () => {
    const { getByText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: ts(2769) for incorrect type of mocked navigation
      <CollectionList items={items} loadList={loadList} navigation={navigation} />
    );

    const fooElement = getByText('Test List2');
    
    fireEvent.press(fooElement);

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith('TodoList', {id: 'list2'});
  });
});