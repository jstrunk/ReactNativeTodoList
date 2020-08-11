import 'react-native';
import React from 'react';
import CreateListButton from '../../src/containers/CreateListButton';
import { render, fireEvent } from '@testing-library/react-native';

describe('CreateListButton container', () => {
  let toggleCreateListModal: jest.Mock<any,any>;

  beforeEach(() => {
    toggleCreateListModal = jest.fn();
  });

  it('renders an CreateListButton', () => {
    const { toJSON } = render(
      <CreateListButton toggleCreateListModal={toggleCreateListModal} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call toggleCreateListModal', async () => {
    const { UNSAFE_getByProps } = render(
      <CreateListButton toggleCreateListModal={toggleCreateListModal} />
    );

    const element = UNSAFE_getByProps({name: 'plus-circle'});

    fireEvent.press(element);

    expect(toggleCreateListModal).toHaveBeenCalledTimes(1);
  });
});