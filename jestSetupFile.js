import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));

jest.mock("react-native-reanimated", () =>
	jest.requireActual("./node_modules/react-native-reanimated/mock"),
);