import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';

const expenses = [
    { id: 1, title: 'Expense 1', amount: 19.99, category: 'Food' },
    { id: 2, title: 'Expense 2', amount: 29.99, category: 'Transportation' },
];

const deleteExpense = jest.fn();
const setEditExpense = jest.fn();

describe('boundary', () => {
    beforeEach(() => {
        render(
            <ExpenseList
                expenses={expenses}
                deleteExpense={deleteExpense}
                setEditExpense={setEditExpense}
            />
        );
    });

    test('ExpenseListComponent boundary it has a "Filter by Title" text field', () => {
        const titleInput = screen.getByLabelText('Filter by Title:');
        expect(titleInput).toBeTruthy();
    });

    test('ExpenseListComponent boundary it displays the Title of an expense after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Title:');
        fireEvent.change(filterInput, { target: { value: 'Expense 1' } });
        const strongElement = await screen.findByText('Title:');
        expect(strongElement).toBeTruthy();
    });

    test('ExpenseListComponent boundary it displays the Amount of an expense after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Title:');
        fireEvent.change(filterInput, { target: { value: 'Expense 1' } });
        const strongElement = await screen.findByText('Amount:');
        expect(strongElement).toBeTruthy();
    });

    test('ExpenseListComponent boundary it displays the Category of an expense after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Title:');
        fireEvent.change(filterInput, { target: { value: 'Expense 1' } });
        const strongElement = await screen.findByText('Category:');
        expect(strongElement).toBeTruthy();
    });

    test('ExpenseListComponent boundary it displays the "Edit" button to edit the expense', async () => {
        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toBeTruthy();
    });

    test('ExpenseListComponent boundary it calls deleteExpense when "Delete" button is clicked', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(deleteExpense).toHaveBeenCalledWith(expenses[0].id);
    });

    test('ExpenseListComponent boundary it removes the expense after clicking the "Delete" button', () => {
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Title: Expense 1')).toBeNull();
        expect(screen.queryByText('Amount: 19.99')).toBeNull();
        expect(screen.queryByText('Category: Food')).toBeNull();
    });

    test('ExpenseListComponent boundary it displays "No expenses found" when there are no expenses', async () => {
        render(
            <ExpenseList expenses={[]} deleteExpense={deleteExpense} setEditExpense={setEditExpense} />
        );
        const noExpensesMessage = await screen.findByText('No expenses found');
        expect(noExpensesMessage).toBeTruthy();
    });
});
