import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders Navbar and its buttons', () => {
    render(<App />);

    const setStartNodeButton: HTMLElement = screen.getByRole('button', {
      name: /run algorithm/i,
    });
    expect(setStartNodeButton).toBeInTheDocument();

    const setTargetNodeButton: HTMLElement = screen.getByRole('button', {
      name: /set start node/i,
    });
    expect(setTargetNodeButton).toBeInTheDocument();

    const setWallsButton: HTMLElement = screen.getByRole('button', {
      name: /set target node/i,
    });
    expect(setWallsButton).toBeInTheDocument();

    const clearBoardButton: HTMLElement = screen.getByRole('button', {
      name: /clear board/i,
    });
    expect(clearBoardButton).toBeInTheDocument();

    const runAlgoButton: HTMLElement = screen.getByRole('button', {
      name: /run algorithm/i,
    });
    expect(runAlgoButton).toBeInTheDocument();
  });
});
