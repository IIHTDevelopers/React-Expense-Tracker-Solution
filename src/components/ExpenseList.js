import React, { useState } from 'react';

const ExpenseList = ({ expenses, deleteExpense, setEditExpense }) => {
    const [filters, setFilters] = useState({ title: '' });

    const filteredExpenses = expenses.filter((expense) => {
        return expense.title.toLowerCase().includes(filters.title.toLowerCase());
    });

    const handleDelete = (id) => {
        deleteExpense(id);
    };

    const handleEdit = (expense) => {
        setEditExpense(expense);
    };

    return (
        <div>
            <div>
                <label htmlFor="name">
                    Filter by Title:
                    <input
                        id="name"
                        type="text"
                        value={filters.title}
                        onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                    />
                </label>
            </div>
            <ul>
                {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                        <li key={expense.id}>
                            <strong>Title:</strong> {expense.title}
                            <br />
                            <strong>Amount:</strong> {expense.amount}
                            <br />
                            <strong>Category:</strong> {expense.category}
                            <br />
                            <button onClick={() => handleEdit(expense)}>Edit</button>
                            <button onClick={() => handleDelete(expense.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No expenses found</li>
                )}
            </ul>
        </div>
    );
};

export default ExpenseList;
