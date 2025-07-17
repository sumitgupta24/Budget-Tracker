document.addEventListener('DOMContentLoaded', () => {
  const description = document.getElementById('description');
  const amount = document.getElementById('amount');
  const incomeBtn = document.getElementById('add__income');
  const expenseBtn = document.getElementById('add__expense');
  const incomeList = document.getElementById('income__container');
  const expenseList = document.getElementById('expenses__container');
  const moneyEarned = document.getElementById('amount__earned');
  const moneySpent = document.getElementById('amount__spent');
  const moneyAvailable = document.getElementById('amount__available');

  let items = JSON.parse(localStorage.getItem('budgetItems')) || [];

  function updateLocalStorage() {
    localStorage.setItem('budgetItems', JSON.stringify(items));
  }

  function updateUI() {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    let income = 0, expense = 0;

    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `${item.description} (${item.category}) - ₹${item.amount.toFixed(2)} <button class="delete-btn" data-id="${item.id}">×</button>`;


      if (item.type === 'income') {
        income += item.amount;
        incomeList.appendChild(li);
      } else {
        expense += item.amount;
        expenseList.appendChild(li);
      }
    });

    const available = income - expense;

    moneyEarned.textContent = `₹${income.toFixed(2)}`;
    moneySpent.textContent = `₹${expense.toFixed(2)}`;
    moneyAvailable.textContent = `₹${available.toFixed(2)}`;
  }

  const category = document.getElementById('category');

function addItem(type) {
  const desc = description.value.trim();
  const amt = parseFloat(amount.value.trim());
  const cat = category.value;

  if (!desc || isNaN(amt) || amt <= 0 || !cat) return;

  const newItem = {
    id: Date.now(),
    description: desc,
    amount: amt,
    category: cat,
    type: type
  };

  items.push(newItem);
  updateLocalStorage();
  updateUI();

  description.value = '';
  amount.value = '';
  category.value = '';
}


  incomeBtn.addEventListener('click', () => addItem('income'));
  expenseBtn.addEventListener('click', () => addItem('expense'));

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      items = items.filter(item => item.id !== id);
      updateLocalStorage();
      updateUI();
    }
  });

  // Initialize UI on load
  updateUI();
});
