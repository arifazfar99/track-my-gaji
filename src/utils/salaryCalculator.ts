import { SalaryBreakdown, SalarySummary } from './../types/index';
import { eisTable } from "./eisTable";
import { socsoTable } from "./socsoTable";
import { taxTable } from "./taxTable";

function calculateSocso(gross: number): number {
    const match = socsoTable.find((range) => gross >= range.min && gross <= range.max);
    return match ? match.employee : 0;
}

function calculateEis(gross: number): number {
    const match = eisTable.find((range) => gross >= range.min && gross <= range.max);
    return match ? match.employee : 0;
}

export function calculatePCB(): number {
    const data:SalaryBreakdown = JSON.parse(localStorage.getItem("salaryCalculator") || "{}");

    const annualIncome = (data.salaryDetails.gross * 12) + (data.salaryDetails.bonus || 0);
    let annualTaxableIncome = 0; 
    let additionalTax= 0
    let totalAnnualTax= 0

    if (data.salaryDetails.taxCategory === 'single'){
        annualTaxableIncome = annualIncome - 9000 - 4000
    }

    const match = taxTable.find((range) => annualTaxableIncome >=range.min && annualTaxableIncome <= range.max)

    if(match){
        additionalTax = (annualTaxableIncome - match.min) * match.taxRate
        totalAnnualTax = additionalTax + match.baseTax
    }

    return totalAnnualTax / 12
}

export function calculateNetSalary(gross: number, epfRate: number): SalarySummary {
    const epf = gross * epfRate;
    const socso = calculateSocso(gross);
    const eis = calculateEis(gross);
    const pcb = calculatePCB()

    const totalDeductions = epf + socso + eis + pcb;
    const netSalary = gross - totalDeductions;

    return { netSalary, epf, socso, eis, pcb };
}