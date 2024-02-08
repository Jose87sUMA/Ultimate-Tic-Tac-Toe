import React from "react";
import { fireEvent, render, waitFor, act } from "@testing-library/react-native";
import ReplayScreen from "../../src/StatisticsScreen/ReplayScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Game from "../../src/GameLogic/Game";


jest.mock('sentry-expo', () => ({
Native: { captureException: jest.fn() },
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
useTheme: jest.fn().mockReturnValue({ colors: { text: 'gray' } }), // Add your mocked theme colors here
}));

const fakeNavigation = { navigate: jest.fn(), addListener: jest.fn() };

const game = new Game(' ');
game.makeMove(6,0);
game.makeMove(0,6);
game.makeMove(6,1);
game.makeMove(1,6);
game.makeMove(6,2); 
game.makeMove(2,6);
game.makeMove(7,0);
game.makeMove(0,7);
game.makeMove(7,1);
game.makeMove(1,7);
game.makeMove(7,2);
game.makeMove(2,7);
game.makeMove(8,0);
game.makeMove(0,8);
game.makeMove(8,1);
game.makeMove(1,8);
game.makeMove(8,2);


describe("StatisticsScreen", () => {{
    it('renders correctly', async () => {
        const { getByText } = render(<ReplayScreen route={{ params: { game: game } }} navigation={{}} />);
        expect(getByText('O turn')).toBeTruthy();
    });

    it('renders BigBoard correctly', async () => {
        const { getByTestId } = render(<ReplayScreen route={{ params: { game: game } }} navigation={{}} />);
        expect(getByTestId('bigBoard')).toBeTruthy();
    });

    it('when undo button is pressed, the game reverts to the previous move', async () => {
        const { getByTestId, getByText } = render(<ReplayScreen route={{ params: { game: game } }} navigation={{}} />);
        const cell = getByTestId('cell-8-2');
        expect(cell.props.value === 'X');
        const undoButton = getByTestId('undoButton');
        await act( async () => {
            fireEvent.press(undoButton);
        });
        expect(cell.props.value === ' ');
    });

    it('when redo button is pressed, the game moves forward to the previous move', async () => {
        const { getByTestId, getByText } = render(<ReplayScreen route={{ params: { game: game } }} navigation={{}} />);
        const cell = getByTestId('cell-8-2');

        expect(cell.props.value === 'X');

        await act( async () => {
            fireEvent.press(getByTestId('undoButton'));
        });

        expect(cell.props.value === ' ');
        
        await act( async () => {
            fireEvent.press(getByTestId('redoButton'));
        });

        expect(cell.props.value === 'X');
    });



}});