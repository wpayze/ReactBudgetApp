import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";

const UncategorizedBudgetCard = (props) => {

    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0);

    if (amount === 0) return;

    return (
        <BudgetCard amount={amount} name="Uncategorized" isGray {...props} />
    );
}

export default UncategorizedBudgetCard;
