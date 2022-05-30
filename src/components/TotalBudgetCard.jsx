import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetsContext";

const TotalBudgetCard = () => {

    const { expenses, budgets } = useBudgets()

    const amount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const max = budgets.reduce((total, budget) => total + parseFloat(budget.max), 0);

    if (max === 0) return null

    return (
        <BudgetCard amount={amount} name="Total" isGray max={max} hideButtons={true}/>
    );
}

export default TotalBudgetCard;
