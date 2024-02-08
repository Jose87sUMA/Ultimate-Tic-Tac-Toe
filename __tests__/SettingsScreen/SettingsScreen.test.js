import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import SettingsScreen from "../../src/SettingsScreen/SettingsScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../../src/Firebase/firebaseConfig";

jest.mock('firebase/firestore', () => ({
    collection: jest.fn().mockReturnValue('gamesRef'),
    doc: jest.fn().mockReturnThis(),
    setDoc: jest.fn(),
    getDocs: jest.fn().mockReturnValue({
        docs: [{ 
            data: jest.fn().mockReturnValue({ id: '3', finishedGamesJSON: 'gameJSON' })
        }],

        // Define a forEach method to iterate over the list
        forEach: function(callback) {
            for (let i = 0; i < this.docs.length; i++) {
                // Invoke the callback function for each element in the list
                callback(this.docs[i], i, this.docs);
            }
        }
    }),
    update: jest.fn(),
    delete: jest.fn(),
    onSnapshot: jest.fn(),
    where: jest.fn().mockReturnValue("where"),
    query: jest.fn().mockReturnValue("gamesQuery"),
    doc: jest.fn().mockReturnValue("doc"),

}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn().mockReturnValue({user: 'mockedUser'}),
    createUserWithEmailAndPassword: jest.fn().mockReturnValue({user: 'mockedUser'}),
    onAuthStateChanged: jest.fn(),
}))


jest.mock('sentry-expo', () => ({
  Sentry:{Native: {captureException: jest.fn()}},
}));

jest.mock('../../src/Firebase/firebaseConfig', () => ({
    auth: {
        signOut: jest.fn(),
    },
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

const games = [
    {
      getWinner: (() => 'X'), // Ensure a valid getWinner method
      finishedDate: "date1",
      moves: [1,2], // Ensure that 'moves' property is present
    },
    {
      getWinner: (() => 'O'), // Ensure a valid getWinner method
      finishedDate: "date2",
      moves: [1], // Ensure that 'moves' property is present
    }
  ];

  // Mock JSON.parse
jest.spyOn(JSON, 'parse').mockImplementation((jsonString) => {
    try {
      return games;
    } catch (error) {
      // Handle the error or return a specific value for testing purposes
      console.error('Error parsing JSON:', error);
      return null;
    }
  });

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

    it('renders the Login button', async () => {
        const { getByText } = render(<SettingsScreen navigation={{}} />);
        expect(getByText('Login/Register')).toBeTruthy();
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

    it('resets the colors and theme to default', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={{}} />);
        await act(async () => {
            fireEvent.press(getByText('Revert'));
            await new Promise(resolve => setTimeout(resolve, 500));

            await waitFor(() => {
                expect(AsyncStorage.setItem).toHaveBeenCalledWith('COLORX', JSON.stringify(1))
                expect(AsyncStorage.setItem).toHaveBeenCalledWith('COLORO', JSON.stringify(0))
                expect(AsyncStorage.setItem).toHaveBeenCalledWith('THEME', JSON.stringify('light'))
            });
        });
    });

    it('opens authentication modal when login button is pressed', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
        });
        expect(getByText('Login or Register')).toBeTruthy();
    });

    it('calls signInWithEmailAndPassword when login button is pressed', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.changeText(getByTestId('emailInput'), 'email@email.com')
            fireEvent.changeText(getByTestId('passwordInput'), 'password')
            fireEvent.press(getByText('Login'));
        });
        expect(require('firebase/auth').signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'email@email.com', 'password');
    });

    it ('calls createUserWithEmailAndPassword when register button is pressed', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.changeText(getByTestId('emailInput'), 'email@email.com')
            fireEvent.changeText(getByTestId('passwordInput'), 'password')
            fireEvent.press(getByText('Register'));
        });
        expect(require('firebase/auth').createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'email@email.com', 'password');

    });

    it ('closes authentication modal when close button is pressed', async () => {
        const { getByText, getByTestId, queryByText } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.press(getByText('Cancel'));
        });
        expect(queryByText('Login or Register')).toBeNull();
    });

    it ('shows cloud storage buttons when user is logged in', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.changeText(getByTestId('emailInput'), 'email@email.com')
            fireEvent.changeText(getByTestId('passwordInput'), 'password')  
            fireEvent.press(getByText('Login'))
        });
        expect(getByText('Save to Cloud')).toBeTruthy();
        expect(getByText('Sync from Cloud')).toBeTruthy();
        expect(getByText('Delete Games from Cloud')).toBeTruthy();
        expect(getByText('Logout')).toBeTruthy();
    });

    it ('calls signOut when logout button is pressed', async () => {
        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.changeText(getByTestId('emailInput'), 'email@email.com')
            fireEvent.changeText(getByTestId('passwordInput'), 'password')  
            fireEvent.press(getByText('Login'))
            await new Promise(resolve => setTimeout(resolve, 500))
            fireEvent.press(getByText('Logout'))
            await new Promise(resolve => setTimeout(resolve, 1000));
        })
        expect(auth.signOut).toHaveBeenCalled();
        expect(getByText('Login/Register')).toBeTruthy(); 
    });

    it ('calls saveToCloud when save to cloud button is pressed', async () => {
        AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value

        const { getByText, getByTestId } = render(<SettingsScreen navigation={fakeNavigation} />);
        await act(async () => {
            fireEvent.press(getByText('Login/Register'));
            await new Promise(resolve => setTimeout(resolve, 500));
            fireEvent.changeText(getByTestId('emailInput'), 'email@email.com')
            fireEvent.changeText(getByTestId('passwordInput'), 'password')  
            fireEvent.press(getByText('Login'))
            await new Promise(resolve => setTimeout(resolve, 500))
            fireEvent.press(getByText('Save to Cloud'))
        });
        expect(require('firebase/firestore').collection).toHaveBeenCalledWith(require('../../src/Firebase/firebaseConfig').firestore, 'finishedGames');
        expect(require('firebase/firestore').query).toHaveBeenCalledWith('gamesRef', require('firebase/firestore').where("uid", "==", "mockedUser"));
        expect(require('firebase/firestore').getDocs).toHaveBeenCalledWith('gamesQuery');
        expect(require('firebase/firestore').setDoc).toHaveBeenCalledWith(require('firebase/firestore').doc('gamesRef', '3'), {finishedGamesJSON: JSON.stringify(games),}, { merge: true });
    });
});