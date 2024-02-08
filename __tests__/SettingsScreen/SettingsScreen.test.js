import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SettingsScreen from "../../SettingsScreen/SettingsScreen";
import MockStorage from '../__mocks__/MockStorage';
const { mockCollection } = require('firestore-jest-mock/mocks/firestore');
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)


// Create a mock ColorContext for testing
const MockColorContext = React.createContext({
    valueX: 'blue',
    valueO: 'red',
});

jest.mock('sentry-expo', () => ({
  Sentry:{Native: {captureException: jest.fn()}},
}));

jest.mock('../../Firebase/firebaseConfig', () => ({
    auth: {},
    firestore: {},
}));

// Use this mock context in your tests
jest.mock('../../styles/contexts/ColorContext', () => ({
ColorContext: MockColorContext,
}));

// Mock the useContext hook
jest.mock('react', () => ({
...jest.requireActual('react'),
useContext: jest.fn().mockImplementation(() => MockColorContext),
}));

// Mock useTheme hook
jest.mock('@react-navigation/native', () => ({
...jest.requireActual('@react-navigation/native'),
useTheme: jest.fn().mockReturnValue({ colors: {text: 'gray'} }), // Add your mocked theme colors here
}));

fakeNavigation = {navigate: jest.fn()};
describe("SettingsScreen", () => {
        
    beforeEach(() => {
        firebase.firestore = firestoreMock
        firestoreMock.reset()
        firebase.auth = firebaseAuthMock
    });

    it('renders correctly', async () => {
        const { getByText } = render(<SettingsScreen navigation={{}} />);
        expect(getByText('Settings')).toBeTruthy();
    });

    it('renders Theme Component correctly', async () => {
        const { getByText } = render(<SettingsScreen navigation={{}} />);
        expect(getByText('Theme')).toBeTruthy();
    });

    it('renders ColorPickerComponent correctly', async () => {
        const { getByText } = render(<SettingsScreen navigation={{}} />);
        expect(getByText('Personalise colors')).toBeTruthy();
    });

    it('renders revert to default', async () => {
        const { getByText } = render(<SettingsScreen navigation={{}} />);
        expect(getByText('Default Settings')).toBeTruthy();
    });

    it('when Save button is pressed saves color changes', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={{}} />);
        const colorPickerX = getByTestId('colorPickerX');
        fireEvent.press(getByTestId('colorPickerX'));
        fireEvent.press(getByTestId('color-4'));
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('COLORX', JSON.stringify(4));
    });


  
});