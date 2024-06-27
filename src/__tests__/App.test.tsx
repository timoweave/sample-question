import { describe, expect, test } from 'vitest';
import {
    act,
    renderHook,
    RenderHookResult,
    waitFor,
} from '@testing-library/react';

import { Product, UseProducts, useProducts } from '../App';

function useProductSample(rendered: RenderHookResult<UseProducts, void>) {
    const { result } = rendered;
    const products = () => result.current.products;
    const setProducts = (data: Product[]) => result.current.setProducts(data);
    const filteredProducts = () => result.current.filteredProducts;
    const brands = () => result.current.brands;
    const selectedBrand = () => result.current.selectedBrand;
    const setSelectedBrand = (name: string | null) =>
        result.current.setSelectedBrand(name);

    return {
        products,
        setProducts,
        filteredProducts,
        brands,
        selectedBrand,
        setSelectedBrand,
    };
}

describe('useProducts hook', () => {
    test('initialized', () => {
        const rendered = renderHook<UseProducts, void>(() => useProducts());
        const sample = useProductSample(rendered);

        expect(sample.products()).toHaveLength(30);
        expect(sample.filteredProducts()).toHaveLength(30);
        expect(sample.selectedBrand()).toBeNull();
    });

    test('filter 3 apple ', async () => {
        const rendered = renderHook<UseProducts, void>(() => useProducts());
        const sample = useProductSample(rendered);

        act(() => {
            sample.setSelectedBrand('Apple');
        });
        await waitFor(() => {
            expect(sample.filteredProducts()).toHaveLength(3);
        });
        expect(sample.products()).toHaveLength(30);
    });

    test('filter 2 samsung ', async () => {
        const rendered = renderHook<UseProducts, void>(() => useProducts());
        const sample = useProductSample(rendered);

        act(() => {
            sample.setSelectedBrand('Samsung');
        });
        await waitFor(() => {
            expect(sample.filteredProducts()).toHaveLength(2);
        });
        expect(sample.products()).toHaveLength(30);
    });

    test('filter 2 OPPO, then reset all ', async () => {
        const rendered = renderHook<UseProducts, void>(() => useProducts());
        const sample = useProductSample(rendered);

        act(() => {
            sample.setSelectedBrand('OPPO');
        });
        await waitFor(() => {
            expect(sample.filteredProducts()).toHaveLength(1);
        });
        expect(sample.products()).toHaveLength(30);

        act(() => {
            sample.setSelectedBrand(null);
        });
        await waitFor(() => {
            expect(sample.filteredProducts()).toHaveLength(30);
        });
        expect(sample.products()).toHaveLength(30);
    });
});
