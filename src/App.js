import './App.css';

import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import ViewExpensesModal from './components/ViewExpensesModal';

import { useState } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import TotalBudgetCard from './components/TotalBudgetCard';
import EditBudgetModal from './components/EditBudgetModal';

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [editBudgetId, setEditBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  function openExpenseModal(budgetId = UNCATEGORIZED_BUDGET_ID) {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <div className="App">

        <div className="container my-4 has-text-centered">
          <div className="columns">
            <div className="column">
              <h1 className="title">Budgets</h1>
            </div>
            <div className="column">
              <button className="button is-primary mx-1" onClick={() => setShowBudgetModal(true)}>Add Budget</button>
              <button className="button mx-1" onClick={() => openExpenseModal()}>Add Expense</button>
            </div>
          </div>
        </div>

        <div className="container">
          {
            budgets.length == 0 &&
            (
              <>
                <hr />
                <h2 className="subtitle">No budgets created. Click "Add Budget"</h2>
              </>
            )
          }
          <div className="columns is-multiline">
            {
              budgets.map((budget) => {
                const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0);
                return <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={() => openExpenseModal(budget.id)}
                  onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}
                />
              })
            }
          </div>
          <hr />
          <div className="columns is-multiline">
            <UncategorizedBudgetCard onAddExpenseClick={() => openExpenseModal()} onViewExpensesClick={() => setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)} />
            <TotalBudgetCard />
          </div>
        </div>

      </div>

      <AddBudgetModal show={showBudgetModal} closeModal={() => setShowBudgetModal(false)} onAddExpenseClick={() => openExpenseModal()} />
      <AddExpenseModal show={showExpenseModal} defaultBudgetId={addExpenseModalBudgetId} closeModal={() => setShowExpenseModal(false)} />
      <ViewExpensesModal budgetId={viewExpensesBudgetId} closeModal={() => setViewExpensesBudgetId()} onShowEditBudgetModal={()=> setEditBudgetId(viewExpensesBudgetId) } />
      <EditBudgetModal budgetId={editBudgetId} closeModal={() => setEditBudgetId()} />
    </>
  );
}

export default App;
