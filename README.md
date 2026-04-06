# Finance Dashboard

A simple and clean finance dashboard built with **React (JSX)** and **Tailwind CSS**.

## Features

- **Dashboard Overview** — Total Balance, Income, and Expenses summary cards
- **Income vs Expenses Chart** — Monthly bar chart for last 7 months
- **Spending by Category** — Progress bars showing expense breakdown
- **Transactions Table** — Search, filter by type, sort by date or amount
- **Insights Section** — Highest spending category, monthly comparison, avg daily spending, savings rate
- **Role Based UI** — Toggle between Viewer (read-only) and Admin (can add transactions)
- **Data Persistence** — Data saved in localStorage so it stays after refresh
- **Responsive Design** — Works on mobile, tablet, and desktop

## Tech Stack

- React 18 (JSX — no TypeScript)
- Tailwind CSS
- Vite
- Lucide React (icons)

## Project Structure

```
src/
├── App.jsx                        # Root component, handles view routing
├── main.jsx                       # Entry point
├── index.css                      # Tailwind imports
├── context/
│   └── FinanceContext.jsx         # Global state (transactions, role, filters)
├── components/
│   ├── Dashboard.jsx              # Dashboard overview page
│   ├── DashboardCard.jsx          # Summary card (balance/income/expense)
│   ├── LineChart.jsx              # Income vs Expenses bar chart
│   ├── PieChart.jsx               # Spending by category chart
│   ├── TransactionTable.jsx       # Transactions list with search/filter/sort
│   ├── AddTransactionModal.jsx    # Modal form for adding a transaction (admin only)
│   ├── Insights.jsx               # Financial insights page
│   ├── Sidebar.jsx                # Navigation sidebar
│   ├── Header.jsx                 # Top header with role toggle
│   └── RoleToggle.jsx             # Button to switch between Viewer / Admin
└── utils/
    ├── mockData.js                # Generates 50 fake transactions for demo
    └── localStorage.js            # Save/load transactions and role from localStorage
```

## Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

## Role Based UI

Use the **Admin / Viewer** button in the top-right header to switch roles.

| Role   | What they can do                        |
|--------|-----------------------------------------|
| Viewer | See all data, charts, and insights      |
| Admin  | Everything Viewer can + Add transactions|

## State Management

Global state is managed using **React Context API** (`FinanceContext.jsx`):

- `transactions` — list of all transactions
- `userRole` — current role (viewer or admin)
- `filters` — search term, type filter, sort field, sort order
- `stats` — computed totals (balance, income, expenses)

## Notes

- All data is mock/static — no backend required
- Data persists in `localStorage` between page refreshes
- To reset data, clear localStorage in browser DevTools
