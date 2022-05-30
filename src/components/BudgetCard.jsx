import { currencyFormatter } from "../utils"

export default function BudgetCard({ 
    name, 
    amount, 
    max, 
    isGray = false, 
    onAddExpenseClick, 
    hideButtons = false,
    onViewExpensesClick
}) {
    const classNames = [];
    if (amount > max)
        classNames.push("has-background-danger-light");
    if (isGray)
        classNames.push("has-background-light");

    return (
        <div className="column is-4-widescreen is-6-desktop is-12-tablet is-fullheight">
            <div className={"box px-3 " + classNames.join(" ")}>
                <div className="is-size-4 has-text-weight-bold is-flex is-justify-content-space-between my-3">
                    <div>{name}</div>
                    <div>{currencyFormatter.format(amount)}<span className="has-text-weight-normal is-size-5">{max && ("/" + currencyFormatter.format(max))}</span></div>
                </div>
                {
                    max && (<progress className={"progress " + getProgressBarColor(amount, max)} value={amount} max={max}></progress>)
                }
                {
                    !hideButtons && (
                        <div className="is-flex is-justify-content-flex-end">
                            <button className="button is-primary is-light mx-2" onClick={onAddExpenseClick}>Add Expense</button>
                            <button className="button is-light is-info mx-2" onClick={onViewExpensesClick}>View Budget</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const getProgressBarColor = (amount, max) => {
    const ratio = amount / max;
    if (ratio < .5) return "is-primary";
    if (ratio < .75) return "is-warning";
    return "is-danger";
}