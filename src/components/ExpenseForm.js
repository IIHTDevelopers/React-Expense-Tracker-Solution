import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense, editExpense, updateExpense }) => {
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        category: '',
    });

    useEffect(() => {
        if (editExpense) {
            setExpense({ ...editExpense });
        } else {
            setExpense({
                title: '',
                amount: '',
                category: '',
            });
        }
    }, [editExpense]);

    const isEditForm = !!editExpense;

    const isFormIncomplete = !expense.title || !expense.amount || !expense.category;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            updateExpense(expense);
        } else {
            addExpense(expense);
        }
        setExpense({ title: '', amount: '', category: '' });
    };

    return (
        <div>
            <h2>{isEditForm ? 'Edit Expense' : 'Add an Expense'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:
                    <input
                        id="title"
                        type="text"
                        value={expense.title}
                        onChange={(e) => setExpense({ ...expense, title: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="amount">
                    Amount:
                    <input
                        id="amount"
                        type="number"
                        value={expense.amount}
                        onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="category">
                    Category:
                    <input
                        id="category"
                        type="text"
                        value={expense.category}
                        onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                        required
                    />
                </label>
                <button type="submit" disabled={isFormIncomplete}>
                    {isEditForm ? 'Update Expense' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
