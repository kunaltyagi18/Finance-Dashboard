// Generates 50 fake transactions for demo purposes
export const generateMockTransactions = () => {
  const categories = {
    income: ['Salary', 'Freelance', 'Investments', 'Bonus'],
    expense: ['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Transportation', 'Healthcare', 'Shopping', 'Dining'],
  };

  const transactions = [];
  const today = new Date();

  for (let i = 0; i < 50; i++) {
    const isIncome = Math.random() > 0.7;
    const type = isIncome ? 'income' : 'expense';
    const categoryList = isIncome ? categories.income : categories.expense;
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];

    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    transactions.push({
      id: `txn-${i + 1}`,
      date: date.toISOString().split('T')[0],
      amount: isIncome
        ? Math.floor(Math.random() * 5000) + 1000
        : Math.floor(Math.random() * 500) + 10,
      category,
      type,
      description: `${category} transaction`,
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};