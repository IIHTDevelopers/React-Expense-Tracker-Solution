import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    try {
      const addedExpense = await axios.post('http://localhost:4000/expenses', expense);
      setExpenses([...expenses, addedExpense.data]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:4000/expenses/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const updateExpense = async (expense) => {
    try {
      await axios.put(`http://localhost:4000/expenses/${expense.id}`, expense);
      setExpenses(
        expenses.map((e) => (e.id === expense.id ? { ...e, ...expense } : e))
      );
      setEditExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div>
      <h2>Welcome to Your Expense Tracker</h2>
      <h2>Add Expense</h2>
      <ExpenseForm addExpense={addExpense} editExpense={editExpense} updateExpense={updateExpense} />
      <h2>Expenses List</h2>
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        setEditExpense={setEditExpense}
      />
    </div>
  );
}

export default App;
