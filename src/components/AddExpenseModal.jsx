import { useRef } from "react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

export default function AddExpenseModal({ show, defaultBudgetId , closeModal }) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();

    const { addExpense, budgets } = useBudgets();

    function saveExpense() {
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
        })
        closeModal();
        reset();
    }

    function reset() {
        descriptionRef.current.value = "";
        amountRef.current.value = "";
        budgetIdRef.current.value = "";
    }
    
    return (
        <div className={"modal " + (show ? "is-active" : "")}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">New Expense</p>
                    <button className="delete" onClick={closeModal} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input ref={descriptionRef} className="input" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Amount</label>
                        <div className="control">
                            <input ref={amountRef} className="input" type="number" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Budget</label>
                        <div className="control">
                            <div className="select">
                                <select ref={budgetIdRef} value={defaultBudgetId}>
                                    <option value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                                    {
                                        budgets.map((budget) => (
                                            <option key={budget.id} value={budget.id} >{budget.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={saveExpense}>Save Expense</button>
                    <button className="button" onClick={closeModal}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
