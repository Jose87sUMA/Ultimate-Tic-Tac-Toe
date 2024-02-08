import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import RulesScreen from "../../RulesScreen";

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

describe("RulesScreen", () => {
    
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        it('renders correctly', async () => {
            const { getByText } = render(<RulesScreen navigation={{}} />);
            expect(getByText('Rules')).toBeTruthy();
        });
    
        it('renders RulesComponent correctly', async () => {
            const { getByText } = render(<RulesScreen navigation={{}} />);
            expect(getByText(`
                Game play ends when either a player wins the global board or there are no legal moves remaining, in which case the game is a draw.`
            )).toBeTruthy();
        });
    
        it('Tutorial button sends to tutorial', async () => {
            const { getByText} = render(<RulesScreen navigation={fakeNavigation} />);
            fireEvent.press(getByText('TUTORIAL'));
            expect(fakeNavigation.navigate).toHaveBeenCalledWith('Tutorial');
        }); 
});