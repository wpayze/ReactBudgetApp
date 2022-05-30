import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";
import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({
    budgetId,
    closeModal,
    onShowEditBudgetModal
}) {

    const { budgets, getBudgetExpenses, deleteExpense, deleteBudget } = useBudgets();

    const budget = (budgetId === UNCATEGORIZED_BUDGET_ID) ? { name: UNCATEGORIZED_BUDGET_ID, id: UNCATEGORIZED_BUDGET_ID } : budgets.find((b) => b.id === budgetId);

    if (!budget)
        return;

    const expenses = getBudgetExpenses(budgetId);

    function deleteBudgetClick() {
        deleteBudget(budget);
        closeModal();
    }

    return (
        <div className={"modal " + (budgetId !== null ? "is-active" : "")}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Expenses of <strong>{budget.name}</strong></p>
                    <button className="delete" onClick={closeModal} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <ul className="expensesList">
                        {
                            expenses.length === 0 && (<li>No expenses to show.</li>)
                        }
                        {
                            expenses.map((expense) => (
                                <li key={expense.id} className="expenseListItem">
                                    <div className="is-flex is-justify-content-space-between py-2">
                                        <span>{expense.description}</span>
                                        <div>
                                            <span className="mr-2 is-size-5 has-text-weight-semibold">{currencyFormatter.format(expense.amount)}</span>
                                            <button className="button is-danger is-small is-outlined" onClick={() => deleteExpense(expense)}>&times;</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <footer className="modal-card-foot">
                    {
                        budgetId !== UNCATEGORIZED_BUDGET_ID && (
                            <>
                                <button className="button is-warning" onClick={onShowEditBudgetModal}>Edit Budget</button>
                                <button className="button is-danger" onClick={deleteBudgetClick} >Delete Budget</button>
                            </>
                        )
                    }
                    <button className="button" onClick={closeModal}>Close</button>
                </footer>
            </div>
        </div>
    )
}
