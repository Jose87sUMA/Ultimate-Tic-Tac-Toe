import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SettingsScreen from "../../src/SettingsScreen/SettingsScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('firebase/firestore', () => ({

    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    onSnapshot: jest.fn(),
    where: jest.fn().mockReturnThis(),
    query: jest.fn().mockReturnThis(),

}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
}))

jest.mock('sentry-expo', () => ({
  Sentry:{Native: {captureException: jest.fn()}},
}));

jest.mock('../../src/Firebase/firebaseConfig', () => ({
    auth: {},
    firestore: {},
}));

jest.mock('../../src/styles/contexts/ColorContext', () => ({
    ColorContext: {
        valueX: 2,
        setValueX: jest.fn(),
        valueO: 1,
        setValueO: jest.fn(),
    },
}));

jest.mock('../../src/styles/contexts/ThemeContext', () => ({
    ThemeContext: {
        theme: 'light',
        setTheme: jest.fn(),
    },
}));

// Mock the useContext hook
jest.mock('react', () => ({
...jest.requireActual('react'),
useContext: jest.fn().mockImplementation((context) => context),
}));

// Mock useTheme hook
jest.mock('@react-navigation/native', () => ({
...jest.requireActual('@react-navigation/native'),
useTheme: jest.fn().mockReturnValue({ colors: {text: 'gray'} }), // Add your mocked theme colors here
}));

fakeNavigation = {navigate: jest.fn()};
describe("SettingsScreen", () => {

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

    it('saves color changes when a new color is selected ', async () => {
        const { getByText, getByTestId, findByText } = render(<SettingsScreen navigation={{}} />);
        const colorPickerX = getByTestId('colorPickerX');
        
        await act(async () => {
            fireEvent.press(colorPickerX);
            expect(await findByText('Select a color for X')).toBeTruthy();
            fireEvent.press(getByTestId('color-4'));
            // Wait for AsyncStorage.setItem to be called
            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(AsyncStorage.setItem).toHaveBeenCalledWith('COLORX', JSON.stringify(4))
            });
        });
    });

    it('saves the theme when the theme is changed', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={{}} />);
        await act(async () => {
            fireEvent(getByTestId('themeSwitch'), 'valueChange', true);
            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(AsyncStorage.setItem).toHaveBeenCalledWith('THEME', JSON.stringify('dark'))
            });
        });
    });



  
});