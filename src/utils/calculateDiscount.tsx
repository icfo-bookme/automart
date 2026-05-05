export const calculateDiscount = (
    regular: number | string,
    sales: number | string
): number => {
    const r = Number(regular);
    const s = Number(sales);
    if (!r || r <= s) return 0;
    return Math.round(((r - s) / r) * 100);
};