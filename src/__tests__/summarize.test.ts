import { describe, expect, test } from 'vitest';
import { MONTHLY_EXPENSE_REPORTS, summarize } from '../summarize';

describe('summarize expense', () => {
    const [ans1, ans2, ans3, ans7, ans8] = [
        { user: 1, cost: 10, expenses: { food: 1, air: 0, hotel: 0, rail: 0 } },
        {
            user: 2,
            cost: 400,
            expenses: { food: 1, hotel: 1, air: 2, rail: 0 },
        },
        { user: 3, cost: 0, expenses: { food: 0, hotel: 0, air: 0, rail: 0 } },
        {
            user: 7,
            cost: 450,
            expenses: { food: 1, hotel: 2, rail: 2, air: 0 },
        },
        { user: 8, cost: 50, expenses: { food: 0, hotel: 0, rail: 0, air: 1 } },
    ];

    test('user 1', () => {
        const data = summarize(1, MONTHLY_EXPENSE_REPORTS);
        expect(data).toMatchObject(ans1);
    });

    test('user 2', () => {
        const data = summarize(2, MONTHLY_EXPENSE_REPORTS);
        expect(data).toMatchObject(ans2);
    });

    test('user 3', () => {
        const data = summarize(3, MONTHLY_EXPENSE_REPORTS);
        expect(data).toEqual(ans3);
    });

    test('user 7', () => {
        const data = summarize(7, MONTHLY_EXPENSE_REPORTS);
        expect(data).toMatchObject(ans7);
    });

    test('user 8', () => {
        const data = summarize(8, MONTHLY_EXPENSE_REPORTS);
        expect(data).toMatchObject(ans8);
    });

    test('user 1 and user 2', () => {
        const data1 = summarize(1, MONTHLY_EXPENSE_REPORTS);
        const data2 = summarize(2, MONTHLY_EXPENSE_REPORTS);

        expect(data1).toMatchObject(ans1);
        expect(data2).toMatchObject(ans2);
    });

    test('user 1 and user 2', () => {
        const data1 = summarize(1, MONTHLY_EXPENSE_REPORTS);
        const data2 = summarize(2, MONTHLY_EXPENSE_REPORTS);
        const data3 = summarize(3, MONTHLY_EXPENSE_REPORTS);
        const data7 = summarize(7, MONTHLY_EXPENSE_REPORTS);
        const data8 = summarize(8, MONTHLY_EXPENSE_REPORTS);

        expect(data1).toMatchObject(ans1);
        expect(data2).toMatchObject(ans2);
        expect(data3).toMatchObject(ans3);
        expect(data7).toMatchObject(ans7);
        expect(data8).toMatchObject(ans8);
    });
});
