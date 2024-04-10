document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
});

let currentEditingId = null;

function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    if (isNaN(amount) || description.trim() === '') {
        alert('Please enter valid values for description and amount.');
        return;
    }

    const expense = {
        id: new Date().getTime(),
        description: description,
        amount: amount,
        category: category,
    };

    let expenses = getExpenses();
    expenses.push(expense);
    saveExpenses(expenses);
    clearForm();
    loadExpenses();
    selectCategory(currentCategory);
}

function deleteExpense(id) {
    let expenses = getExpenses();
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(expenses);
    loadExpenses();
    selectCategory(currentCategory);
}

function editExpense(id) {
    let expenses = getExpenses();
    const expenseToEdit = expenses.find(expense => expense.id === id);

    if (expenseToEdit) {
        // Set values in the form for editing
        document.getElementById('expenseDescription').value = expenseToEdit.description;
        document.getElementById('expenseAmount').value = expenseToEdit.amount;
        document.getElementById('expenseCategory').value = expenseToEdit.category;

        // Save the ID for reference when saving edits
        currentEditingId = id;
    }
}

function saveEditedExpense() {
    const editedDescription = document.getElementById('expenseDescription').value;
    const editedAmount = parseFloat(document.getElementById('expenseAmount').value);
    const editedCategory = document.getElementById('expenseCategory').value;

    if (!isNaN(editedAmount) && editedDescription.trim() !== '') {
        let expenses = getExpenses();
        const index = expenses.findIndex(expense => expense.id === currentEditingId);

        if (index !== -1) {
            expenses[index].description = editedDescription;
            expenses[index].amount = editedAmount;
            expenses[index].category = editedCategory;

            saveExpenses(expenses);
            loadExpenses();
            selectCategory(currentCategory);

            // Clear the form after saving
            clearForm();
        }
    }

    // Reset the currentEditingId after saving
    currentEditingId = null;
}

let currentCategory = 'all';

function selectCategory(category) {
    currentCategory = category;
    updateCategoryTabs();
    loadExpenses();
}

function updateCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tabs button');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.category-tabs button[data-category="${currentCategory}"]`).classList.add('active');
}

function loadExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    const expenses = getExpenses();

    expenses.forEach(expense => {
        if (currentCategory === 'all' || expense.category === currentCategory) {
            const listItem = document.createElement('li');
            listItem.classList.add('expense-item');
            listItem.innerHTML = `
                <span>${expense.description} - $${expense.amount.toFixed(2)}</span>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(listItem);
        }
    });
}

function getExpenses() {
    const expensesJSON = localStorage.getItem('expenses');
    return expensesJSON ? JSON.parse(expensesJSON) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function clearForm() {
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'food'; // Default category
}