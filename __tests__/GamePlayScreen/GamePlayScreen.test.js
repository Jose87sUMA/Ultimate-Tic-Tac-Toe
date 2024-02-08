import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import GamePlayScreen from "../../GamePlayScreen/GamePlayScreen";
import Game from "../../GameLogic/Game";

const gameInstance = new Game('O');

jest.mock('sentry-expo', () => ({
  Sentry:{Native: {captureException: jest.fn()}},
}));

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


describe("GamePlayScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders correctly', async () => {
    const { getByText } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: 'O' } }} navigation={{}} />);
    expect(getByText('X turn')).toBeTruthy();
  });

  it('renders BigBoard correctly', async () => {
    const { getByTestId } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: 'O' } }} navigation={{}} />);
    expect(getByTestId('bigBoard')).toBeTruthy();
  });

  it('when a cell is pressed changes cell value', async () => {
    const { getByTestId } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: 'O' } }} navigation={{}} />);
    const cell = getByTestId('cell-0-0');
    expect(cell.props.value === ' ')
    await act( async () => {
      fireEvent.press(cell);
    });
    expect(cell.props.value === 'X')
  });

  it('when a cell is pressed changes player turn', async () => {
    const { getByTestId, getByText } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: ' ' } }} navigation={{}} />);
    const cell = getByTestId('cell-0-0');

    expect(getByText('X turn')).toBeTruthy();
    await act( async () => {
      fireEvent.press(cell);
    });
    expect(getByText('O turn')).toBeTruthy();
  });

  it('when a player wins a small board, the small board turns to a cell', async () => {
    const { getByTestId, getByText } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: ' ' } }} navigation={{}} />);
    const cell = getByTestId('cell-0-6');
    await act( async () => {
      fireEvent.press(cell);
    });
    const cell1 = getByTestId('cell-6-0');
    await act( async () => {
      fireEvent.press(cell1);
    });
    const cell2 = getByTestId('cell-0-7');
    await act( async () => {
      fireEvent.press(cell2);
    });
    const cell3 = getByTestId('cell-7-0');
    await act( async () => {
      fireEvent.press(cell3);
    });
    const cell4 = getByTestId('cell-0-8');
    await act( async () => {
      fireEvent.press(cell4);
    });
    expect(getByTestId('cell-0-undefined')).toBeTruthy();
  });

  it('when a player wins 3 small boards, the winner modal appears', async () => {
    const { getByTestId, getByText } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: ' ' } }} navigation={{}} />);

    await act( async () => {
      fireEvent.press(getByTestId('cell-0-6'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-6-0'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-0-7'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-7-0'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-0-8'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-8-0'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-1-6'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-6-1'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-1-7'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-7-1'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-1-8'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-8-1'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-2-6'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-6-2'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-2-7'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-7-2'));
    });
    await act( async () => {
      fireEvent.press(getByTestId('cell-2-8'));
    });
    expect(getByText('X wins!')).toBeTruthy();
  });

  it('when playing against the AI, the AI makes a move after the player', async () => {

    const { getByTestId, getByText } = render(<GamePlayScreen route={{ params: { continuingGame: false, AIMoveSymbol: 'O' } }} navigation={{}} />);
    
    const cell = getByTestId('cell-0-0');
    await act( async () => {
      fireEvent.press(cell);
    });

    await new Promise(resolve => setTimeout(resolve, 3000));
    expect(getByText('X turn')).toBeTruthy();
    
  });

});

