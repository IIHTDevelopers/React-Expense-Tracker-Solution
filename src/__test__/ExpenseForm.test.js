import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseForm from '../components/ExpenseForm';

const addExpenseMock = jest.fn();
const updateExpenseMock = jest.fn();

describe('boundary', () => {
    test('ExpenseFormComponent boundary it is rendered', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('ExpenseFormComponent boundary it has "Add an Expense" h2', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Add an Expense');
    });

    test('ExpenseFormComponent boundary it has "Edit Expense" h2 when in edit mode', () => {
        render(<ExpenseForm editExpense={{ title: 'Edit Expense' }} updateExpense={updateExpenseMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Edit Expense');
    });

    test('ExpenseFormComponent boundary it has title input field', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        const titleInput = screen.getByLabelText('Title:');
        expect(titleInput).toBeTruthy();
    });

    test('ExpenseFormComponent boundary it has amount input field', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        const amountInput = screen.getByLabelText('Amount:');
        expect(amountInput).toBeTruthy();
    });

    test('ExpenseFormComponent boundary it has category input field', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        const categoryInput = screen.getByLabelText('Category:');
        expect(categoryInput).toBeTruthy();
    });

    test('ExpenseFormComponent boundary it has an "Add Expense" button', () => {
        render(<ExpenseForm addExpense={addExpenseMock} />);
        const addButton = screen.getByRole('button', { name: 'Add Expense' });
        expect(addButton).toBeTruthy();
    });

    test('ExpenseFormComponent boundary it has an "Update Expense" button when in edit mode', () => {
        render(<ExpenseForm editExpense={{ title: 'Edit Expense' }} updateExpense={updateExpenseMock} />);
        const updateButton = screen.getByRole('button', { name: 'Update Expense' });
        expect(updateButton).toBeTruthy();
    });
});
