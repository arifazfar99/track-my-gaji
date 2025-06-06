export type Commitment = {
  name: string;
  amount: number;
  note?: string;
}

export type SalaryDetails = {
  gross: number;
  bonus: number;
  epfRate: number;
  taxCategory: string;
  child: number;
};

export type SalarySummary = {
  netSalary: number;
  epf: number
  socso: number;
  eis: number;
  pcb: number;
}

export type SalaryBreakdown = {
  salaryDetails: SalaryDetails;
  salarySummary: SalarySummary;
  commitments?: Commitment[]
}