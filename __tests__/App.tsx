/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

import { render, act } from '@testing-library/react-native';

jest.useFakeTimers();

it('renders correctly', async () => {
  const result = render(<App />);
  await act(async () => { expect(result).toMatchSnapshot(); });
});
