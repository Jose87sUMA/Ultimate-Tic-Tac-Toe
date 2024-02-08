import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import StatisticsScreen from "../../src/StatisticsScreen/StatisticsScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../../src/GameLogic/Game', () => ({
    fromState: jest.fn((game) => game),
  }));

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

// Mock AsyncStorage getItem and setItem
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const fakeNavigation = { navigate: jest.fn(), addListener: jest.fn() };

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

describe("StatisticsScreen", () => {
  it("renders the StatisticsScreen", () => {
    const { getByText } = render(<StatisticsScreen navigation={fakeNavigation} />);
    expect(getByText("Statistics")).not.toBeNull();
  });

  it("fetches data from AsyncStorage", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value
    await render(<StatisticsScreen navigation={fakeNavigation} />);
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('finishedGames'));
  });

  it("renders the list of games", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value
    const { getByText } = render(<StatisticsScreen navigation={fakeNavigation} />);
    await waitFor(() => expect(getByText("Statistics")).not.toBeNull());
    await waitFor(() => expect(getByText("X VICTORY - date1")).not.toBeNull());
    await waitFor(() => expect(getByText("O VICTORY - date2")).not.toBeNull());
  });

  it("renders the number of victories", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value
    const { getByText } = render(<StatisticsScreen navigation={fakeNavigation} />);
    await waitFor(() => expect(getByText("Statistics")).not.toBeNull());
    await waitFor(() => expect(getByText("X VICTORIES: 1")).not.toBeNull());
    await waitFor(() => expect(getByText("O VICTORIES: 1")).not.toBeNull());
  });

  it("opens game details when a game is pressed", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value
    const { getByText, getByTestId } = render(<StatisticsScreen navigation={fakeNavigation} />);
    await waitFor(() => expect(getByText("Statistics")).not.toBeNull());
    fireEvent.press(getByText("X VICTORY - date1"));
    await waitFor(() => expect(getByText("2 moves")).not.toBeNull());
    fireEvent.press(getByText("O VICTORY - date2"));
    await waitFor(() => expect(getByText("1 moves")).not.toBeNull());
  });
  
  it("goes to ReplayScreen when a game replay is pressed", async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(games)); // Mock the resolved value
    const { getByText, getByTestId } = render(<StatisticsScreen navigation={fakeNavigation} />);
    await waitFor(() => expect(getByText("Statistics")).not.toBeNull());
    fireEvent.press(getByText("X VICTORY - date1"));
    await waitFor(() => expect(getByText("2 moves")).not.toBeNull());
    fireEvent.press(getByText("Show Replay"));
    await waitFor(() => expect(fakeNavigation.navigate).toHaveBeenCalledWith('ReplayScreen', {game: games[0]}));
  });

});
