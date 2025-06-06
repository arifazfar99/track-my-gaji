import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

import CommitmentForm from "./components/CommitmentForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SalaryDetailsForm from "./components/SalaryDetailsForm";
import SalarySummaryTable from "./components/SalarySummaryTable";
import { calculateNetSalary } from "./utils/salaryCalculator";

import {
  Commitment,
  SalaryBreakdown,
  SalaryDetails,
  SalarySummary,
} from "./types";

// icons
import { CgCalculator } from "react-icons/cg";

function App() {
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>({
    gross: 0,
    bonus: 0,
    epfRate: 0.11,
    taxCategory: "single",
    child: 0,
  });

  const [result, setResult] = useState<SalarySummary | null>(null);

  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [totalCommitments, setTotalCommitments] = useState<number>(0);

  const handleCalculate = () => {
    const salaryCalculatorData = {
      salaryDetails: {
        gross: salaryDetails.gross,
        bonus: salaryDetails.bonus,
        epfRate: salaryDetails.epfRate,
        taxCategory: salaryDetails.taxCategory,
      },
      commitments,
    };

    if (
      !isNaN(salaryCalculatorData.salaryDetails.gross) &&
      !isNaN(salaryCalculatorData.salaryDetails.epfRate)
    ) {
      localStorage.setItem(
        "salaryCalculator",
        JSON.stringify(salaryCalculatorData)
      );
      const breakdown = calculateNetSalary(
        salaryCalculatorData.salaryDetails.gross,
        salaryCalculatorData.salaryDetails.epfRate
      );
      setResult(breakdown);
    }
  };

  const addCommitment = () => {
    const existingData = JSON.parse(
      localStorage.getItem("salaryCalculator") || "{}"
    );
    const newCommitments = [...commitments, { name: "", amount: 0, note: "" }];
    const updatedData = {
      ...existingData,
      commitments: newCommitments,
    };
    setCommitments(newCommitments);
    localStorage.setItem("salaryCalculator", JSON.stringify(updatedData));
    calculateTotalCommitments(newCommitments);
  };

  const handleCommitmentChange = <K extends keyof Commitment>(
    index: number,
    field: K,
    value: Commitment[K]
  ) => {
    const existingData = JSON.parse(
      localStorage.getItem("salaryCalculator") || "{}"
    );
    const updatedCommitments = [...commitments];
    updatedCommitments[index][field] = value;
    const updatedData = {
      ...existingData,
      commitments: updatedCommitments,
    };
    setCommitments(updatedCommitments);
    localStorage.setItem("salaryCalculator", JSON.stringify(updatedData));
    calculateTotalCommitments(updatedCommitments);
  };

  const handleDeleteCommitment = (index: number) => {
    const existingData = JSON.parse(
      localStorage.getItem("salaryCalculator") || "{}"
    );
    const updatedCommitments = commitments.filter((_, i) => i !== index);
    const updatedData = {
      ...existingData,
      commitments: updatedCommitments,
    };
    setCommitments(updatedCommitments);
    localStorage.setItem("salaryCalculator", JSON.stringify(updatedData));
    calculateTotalCommitments(updatedCommitments);
  };

  const calculateTotalCommitments = (updatedCommitments: Commitment[]) => {
    const total = updatedCommitments.reduce(
      (acc, commitment) => acc + commitment.amount,
      0
    );
    setTotalCommitments(total);
  };

  useEffect(() => {
    const data: SalaryBreakdown = JSON.parse(
      localStorage.getItem("salaryCalculator") || "{}"
    );

    const savedGross = data?.salaryDetails?.gross;
    const savedBonus = data?.salaryDetails?.bonus;
    const savedEpf = data?.salaryDetails?.epfRate;
    const savedTaxCategory = data?.salaryDetails?.taxCategory;
    const savedCommitments = data.commitments;

    if (savedGross && savedBonus && savedEpf) {
      setSalaryDetails((prev) => ({
        ...prev,
        gross: savedGross,
        bonus: savedBonus,
        epfRate: savedEpf,
        taxCategory: savedTaxCategory,
      }));
    }

    if (savedCommitments) {
      setCommitments(savedCommitments);
      calculateTotalCommitments(savedCommitments);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="sm:max-w-6xl mx-auto p-6 flex-grow space-y-8">
        <section className="flex flex-col w-full justify-center text-center">
          <h1 className="text-xl sm:text-4xl font-bold mb-4 flex items-center justify-center">
            <span>
              <CgCalculator className="mr-2" />
            </span>
            Salary Calculator Malaysia {new Date().getFullYear()}
          </h1>
          <p className="mb-4 sm:px-60">
            Calculate your net pay after all standard Malaysian deductions. You
            can also track your monthly commitments and see how much balance you
            have left.
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-md sm:flex">
          <SalaryDetailsForm
            salaryDetails={salaryDetails}
            setSalaryDetails={setSalaryDetails}
            onCalculate={handleCalculate}
          />
          <div className="border-r-2 my-7"></div>
          <SalarySummaryTable result={result} />
        </section>

        <CommitmentForm
          commitments={commitments}
          onAdd={addCommitment}
          onChange={handleCommitmentChange}
          total={totalCommitments}
          netSalary={result?.netSalary || 0}
          onDelete={handleDeleteCommitment}
        />
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
