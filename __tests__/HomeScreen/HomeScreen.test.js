import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import HomeScreen from "../../src/HomeScreen/HomeScreen";

// Create a mock ColorContext for testing
const MockColorContext = React.createContext({
valueX: 'blue',
valueO: 'red',
});

// Use this mock context in your tests
jest.mock('../../src/styles/contexts/ColorContext', () => ({
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

describe("HomeScreen", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', async () => {
        const { getByText } = render(<HomeScreen navigation={{}} />);
        expect(getByText('NEW GAME')).toBeTruthy();
    });

    it('renders HomeTitleComponent correctly', async () => {
        const { getByText } = render(<HomeScreen navigation={{}} />);
        expect(getByText('ULTIMATE')).toBeTruthy();
    });

    it('NEW GAME button opens game creation modal', async () => {
        const { getByText, queryByText } = render(<HomeScreen navigation={{}} />);
        const button = getByText('NEW GAME');
        expect(queryByText ('Create Game')).toBeNull();
        fireEvent.press(button);
        expect(getByText('Create Game')).toBeTruthy();
    });

    it('Create Game button sends to GamePlayScreen without AI', async () => {
        const { getByText, getByTestId, findByText } = render(<HomeScreen navigation={fakeNavigation} />);

        fireEvent.press(getByText('NEW GAME'));
        fireEvent.press(getByText('Create Game'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tic_Tac_Toe', {"AIMoveSymbol": " ", "continuingGame": false});
    }); 

    it('Create Game button sends to GamePlayScreen with O AI', async () => {
        const { getByText, getByTestId, findByText } = render(<HomeScreen navigation={fakeNavigation} />);

        fireEvent.press(getByText('NEW GAME'));
        fireEvent(getByTestId('AISwitch'), 'valueChange', true);
        fireEvent.press(getByText('Create Game'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tic_Tac_Toe', {"AIMoveSymbol": "O", "continuingGame": false});
    });

    it('Create Game button sends to GamePlayScreen with X AI', async () => {
        const { getByText, getByTestId, findByText } = render(<HomeScreen navigation={fakeNavigation} />);

        fireEvent.press(getByText('NEW GAME'));
        fireEvent(getByTestId('AISwitch'), 'valueChange', true);
        fireEvent.press(getByText('O'));
        fireEvent.press(getByText('Create Game'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tic_Tac_Toe', {"AIMoveSymbol": "X", "continuingGame": false});
    });

    it('Create Game modal closes when clicking outside', async () => {
        const { getByText, getByTestId, queryByText } = render(<HomeScreen navigation={{}} />);
        const button = getByText('NEW GAME');
        fireEvent.press(button);
        expect(getByText('Create Game')).toBeTruthy();
        fireEvent.press(getByTestId('ModalCloser'));
        expect(queryByText('Create Game')).toBeNull();
    });

    it('CONTINUE button sends to GamePlayScreen', async () => {
        const { getByText } = render(<HomeScreen navigation={fakeNavigation} />);
        fireEvent.press(getByText('CONTINUE'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tic_Tac_Toe', {"continuingGame": true});
    });

    it('TUTORIAL button sends to TutorialScreen', async () => {
        const { getByText } = render(<HomeScreen navigation={fakeNavigation} />);
        fireEvent.press(getByText('TUTORIAL'));
        expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tutorial');
    });
}); 