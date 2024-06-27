export type ExpenseType = 'air' | 'rail' | 'food' | 'hotel';

export interface ExpenseItem {
    user: number;
    cost: number;
    expenses: ExpenseType[];
}

export type ExpenseSummary = {
    [key in ExpenseType]: number;
};

export const EXPENSE_SUMMARY_DEFAULT: ExpenseSummary = {
    air: 0,
    rail: 0,
    food: 0,
    hotel: 0,
};

export interface SummaryItem {
    user: number;
    cost: number; // total cost
    expenses: ExpenseSummary;
}

export const MONTHLY_EXPENSE_REPORTS: ExpenseItem[] = [
    { user: 8, cost: 50, expenses: ['air'] },
    { user: 7, cost: 150, expenses: ['rail', 'food'] },
    { user: 1, cost: 10, expenses: ['food'] },
    { user: 7, cost: 100, expenses: ['hotel', 'rail'] },
    { user: 7, cost: 200, expenses: ['hotel'] },
    { user: 2, cost: 200, expenses: ['air'] },
    { user: 2, cost: 200, expenses: ['air', 'hotel', 'food'] },
];

export function summarizeExpenseType(
    accumExpense: ExpenseSummary,
    expenseType: ExpenseType,
) {
    if (accumExpense[expenseType] == null) {
        accumExpense[expenseType] = 0;
    }
    accumExpense[expenseType] += 1;
    return accumExpense;
}

export function summarize(
    userID: number,
    expenseItems: ExpenseItem[],
): SummaryItem {
    const userExpenseItems = [...expenseItems].filter(
        ({ user }) => user === userID,
    );

    const summary: SummaryItem = userExpenseItems.reduce(
        (accumSummary: SummaryItem, expenseItem: ExpenseItem): SummaryItem => ({
            ...accumSummary,
            cost: accumSummary.cost + expenseItem.cost,
            expenses: expenseItem.expenses.reduce(
                summarizeExpenseType,
                accumSummary.expenses,
            ),
        }),
        {
            user: userID,
            cost: 0,
            expenses: { ...EXPENSE_SUMMARY_DEFAULT },
        },
    );

    return summary;
}
