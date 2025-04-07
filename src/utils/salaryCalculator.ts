import { eisTable } from "./eisTable";
import { socsoTable } from "./socsoTable";

export interface SalaryBreakdown {
    grossSalary: number;
    epf: number;
    socso: number;
    eis: number;
    totalDeductions: number;
    netSalary: number;
}

function calculateSocso(gross: number): number {
    const match = socsoTable.find((range) => gross >= range.min && gross <= range.max);
    return match ? match.employee : 0;
}

function calculateEis(gross: number): number {
    const match = eisTable.find((range) => gross >= range.min && gross <= range.max);
    return match ? match.employee : 0;
}

export function calculateNetSalary(gross: number, epfRate: number): SalaryBreakdown {
    const epf = gross * epfRate;
    const socso = calculateSocso(gross);
    const eis = calculateEis(gross);

  
    const totalDeductions = epf + socso + eis;
    const netSalary = gross - totalDeductions;
  
    return { grossSalary: gross, epf, socso, eis, totalDeductions, netSalary };
}