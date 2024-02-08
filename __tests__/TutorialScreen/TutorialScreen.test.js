import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import TutorialScreen from "../../TutorialScreen";
import Game from "../../GameLogic/Game";

// Create a mock ColorContext for testing
const MockColorContext = React.createContext({
    valueX: 'blue',
    valueO: 'red',
});

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

describe("TutorialScreen", () => {
        
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        const { getByText } = render(<TutorialScreen navigation={{}} />);
        expect(getByText('Welcome to the Ultimate Tic Tac Toe!')).toBeTruthy();
    });

    it('renders BigBoard correctly', async () => {
        const { getByTestId } = render(<TutorialScreen navigation={{}} />);
        expect(getByTestId('bigBoard')).toBeTruthy();
    });

    it('when next button is pressed changes message', async () => {
        const { getByText, findByText } = render(<TutorialScreen navigation={{}} />);
        expect(getByText('Welcome to the Ultimate Tic Tac Toe!')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('Right now you will learn how to play this game. If you already know how to play, you can skip this tutorial at any time.')).toBeTruthy();
    });

    it('when skip tutorial button is pressed navigates to HomeScreen', async () => {
        const { getByText } = render(<TutorialScreen navigation={fakeNavigation} />);
        fireEvent.press(getByText('Skip Tutorial'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('HomeScreen');
    });

    it('when next button is pressed and it is the last message closes tutorial window', async () => {
        const { getByText, queryByText, findByText } = render(<TutorialScreen navigation={fakeNavigation} />);
        fireEvent.press(getByText('Next'));
        expect(await findByText('Right now you will learn how to play this game. If you already know how to play, you can skip this tutorial at any time.')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('Let\'s start with the basics. The game is played on a 3x3 grid like normal Tic Tac Toe. ')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('The difference is that each cell of the grid is another 3x3 grid.')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('You start on this game so try to make a move. You can tap on any highlighted cell of the grid to make a move.')).toBeTruthy();
        fireEvent.press(getByText('Continue'));
        await new Promise(resolve => setTimeout(resolve, 500));
        expect(queryByText("Skip Tutorial")).toBeNull();
    });

    it('when the user plays a move, the tutorial window appears', async () => {
        const { getByTestId, findByText, getByText } = render(<TutorialScreen navigation={fakeNavigation} />);

        fireEvent.press(getByText('Next'));
        expect(await findByText('Right now you will learn how to play this game. If you already know how to play, you can skip this tutorial at any time.')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('Let\'s start with the basics. The game is played on a 3x3 grid like normal Tic Tac Toe. ')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('The difference is that each cell of the grid is another 3x3 grid.')).toBeTruthy();
        fireEvent.press(getByText('Next'));
        expect(await findByText('You start on this game so try to make a move. You can tap on any highlighted cell of the grid to make a move.')).toBeTruthy();
        fireEvent.press(getByText('Continue'));
        await new Promise(resolve => setTimeout(resolve, 500));

        const cell = getByTestId('cell-0-0');
        fireEvent.press(cell);
        expect(await findByText('Good job! As you can see, your symbol was placed on the cell you pressed.')).toBeTruthy();
    });
    
});