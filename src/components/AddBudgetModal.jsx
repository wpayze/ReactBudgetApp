import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ show, closeModal }) {
    const nameRef = useRef();
    const maxRef = useRef();
    const { addBudget } = useBudgets();

    function saveBudget() {
        addBudget({
            name: nameRef.current.value,
            max: maxRef.current.value
        });
        closeModal();
        reset();
    }

    function reset() {
        nameRef.current.value = "";
        maxRef.current.value = "";
    }

    return (
        <div className={"modal " + (show ? "is-active" : "")}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">New Budget</p>
                    <button className="delete" onClick={closeModal} aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input ref={nameRef} className="input" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Maximum Spending</label>
                        <div className="control">
                            <input ref={maxRef} className="input" type="number" />
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={saveBudget}>Save Budget</button>
                    <button className="button" onClick={closeModal}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
