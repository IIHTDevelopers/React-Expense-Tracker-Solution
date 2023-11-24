import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

describe('boundary', () => {
    test('AppComponent boundary renders without crashing', () => {
        render(<App />);
    });

    test('AppComponent boundary has "Welcome to Your Expense Tracker" h2', () => {
        render(<App />);
        expect(screen.queryByText('Welcome to Your Expense Tracker')).toBeInTheDocument();
    });

    test('AppComponent boundary has "Add Expense" h2', () => {
        render(<App />);
        expect(screen.queryAllByText('Add Expense')).toBeTruthy();
    });

    test('AppComponent boundary has "Expenses List" h2', () => {
        render(<App />);
        expect(screen.queryByText('Expenses List')).toBeInTheDocument();
    });
});
