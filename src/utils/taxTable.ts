interface taxTableProps {
    min: number;
    max: number;
    taxRate: number;
    baseTax: number;
}

export const taxTable: taxTableProps[] = [
    { min: 0, max: 5000, taxRate: 0, baseTax: 0 },
    { min: 5001, max: 20000, taxRate: 0.01, baseTax: 0 },
    { min: 20001, max: 35000, taxRate: 0.03, baseTax: 150 },
    { min: 35001, max: 50000, taxRate: 0.06, baseTax: 600 },
    { min: 50001, max: 70000, taxRate: 0.11, baseTax: 1500 },
    { min: 70001, max: 100000, taxRate: 0.19, baseTax: 3700 },
    { min: 100001, max: 400000, taxRate: 0.25, baseTax: 9400 },
    { min: 400001, max: 600000, taxRate: 0.26, baseTax: 84400 },
    { min: 600001, max: 2000000, taxRate: 0.28, baseTax: 136400 },
    { min: 2000001, max: Infinity, taxRate: 0.30, baseTax: 528400 }
]