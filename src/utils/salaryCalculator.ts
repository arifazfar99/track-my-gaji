export interface SalaryBreakdown {
    grossSalary: number;
    epf: number;
    socso: number;
    eis: number;
    pcb: number;
    totalDeductions: number;
    netSalary: number;
}

export function calculateNetSalary(gross: number, epfRate: number): SalaryBreakdown {
    const epf = gross * epfRate;
    const socso = gross * 0.005;
    const eis = gross * 0.002;
  
    let pcb = 0;
    if (gross > 5000) pcb = gross * 0.05;
    else if (gross > 3000) pcb = gross * 0.03;
  
    const totalDeductions = epf + socso + eis + pcb;
    const netSalary = gross - totalDeductions;
  
    return { grossSalary: gross, epf, socso, eis, pcb, totalDeductions, netSalary };
}