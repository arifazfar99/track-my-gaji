import { useEffect, useState } from "react";
import { calculateNetSalary, SalaryBreakdown } from "./utils/salaryCalculator";
import { Analytics } from "@vercel/analytics/react";

import CommitmentForm from "./components/CommitmentForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface Commitment {
  name: string;
  amount: number;
}

function App() {
  const [gross, setGross] = useState<string>("");
  const [epfRate, setEpfRate] = useState<string>("0.11");
  const [result, setResult] = useState<SalaryBreakdown | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [totalCommitments, setTotalCommitments] = useState<number>(0);

  useEffect(() => {
    const savedGross = localStorage.getItem("grossSalary");
    const savedEpf = localStorage.getItem("epfRate");
    const savedCommitments = localStorage.getItem("commitments");

    if (savedGross) setGross(savedGross);
    if (savedEpf) setEpfRate(savedEpf);
    if (savedCommitments) {
      const parsed = JSON.parse(savedCommitments);
      setCommitments(parsed);
      calculateTotalCommitments(parsed);
    }
  }, []);

  const handleCalculate = () => {
    const grossNum = parseFloat(gross);
    const epfNum = parseFloat(epfRate);
    if (!isNaN(grossNum) && !isNaN(epfNum)) {
      localStorage.setItem("grossSalary", gross);
      localStorage.setItem("epfRate", epfRate);
      const breakdown = calculateNetSalary(grossNum, epfNum);
      setResult(breakdown);
    }
  };

  const addCommitment = () => {
    const newCommitments = [...commitments, { name: "", amount: 0 }];
    setCommitments(newCommitments);
    localStorage.setItem("commitments", JSON.stringify(newCommitments));
    calculateTotalCommitments(newCommitments);
  };

  const handleCommitmentChange = <K extends keyof Commitment>(
    index: number,
    field: K,
    value: Commitment[K]
  ) => {
    const updatedCommitments = [...commitments];
    updatedCommitments[index][field] = value;
    setCommitments(updatedCommitments);
    localStorage.setItem("commitments", JSON.stringify(updatedCommitments));
    calculateTotalCommitments(updatedCommitments);
  };

  const handleDeleteCommitment = (index: number) => {
    const updatedCommitments = commitments.filter((_, i) => i !== index);
    setCommitments(updatedCommitments);
    localStorage.setItem("commitments", JSON.stringify(updatedCommitments));
    calculateTotalCommitments(updatedCommitments);
  };

  const calculateTotalCommitments = (updatedCommitments: Commitment[]) => {
    const total = updatedCommitments.reduce(
      (acc, commitment) => acc + commitment.amount,
      0
    );
    setTotalCommitments(total);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-xl mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold mb-4">
          Malaysia Salary Deduction & Commitment Tool
        </h1>

        <p className="mb-4">
          Enter your monthly gross salary and let this tool calculate your net
          pay after all standard Malaysian deductions. You can also track your
          monthly commitments and see how much balance you have left.
        </p>

        <label className="block mb-2 font-medium">
          Monthly Gross Salary (RM)
        </label>
        <input
          type="number"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
          placeholder="Enter gross salary"
          className="border p-2 w-full mb-4 rounded"
        />

        <label className="block mb-2 font-medium">EPF Contribution Rate</label>
        <select
          value={epfRate}
          onChange={(e) => setEpfRate(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        >
          <option value="0.11">11%</option>
          <option value="0.09">9%</option>
        </select>

        <div className="flex justify-end">
          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
          >
            Calculate
          </button>
        </div>

        {result && (
          <>
            <div className="mt-6 border p-6 rounded-lg shadow-xl bg-white">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Salary Breakdown
              </h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>EPF - Employees Provident Fund</span>
                  <span className="font-semibold ">
                    RM {result.epf.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>SOCSO - Social Security Organisation</span>
                  <span className="font-semibold ">
                    RM {result.socso.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>EIS - Employment Insurance Scheme:</span>
                  <span className="font-semibold ">
                    RM {result.eis.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between mt-4 text-lg font-bold">
                  <span>💰 Net Salary:</span>
                  <span className="text-xl text-green-700">
                    RM {result.netSalary.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>

            <CommitmentForm
              commitments={commitments}
              onAdd={addCommitment}
              onChange={handleCommitmentChange}
              total={totalCommitments}
              netSalary={result.netSalary}
              onDelete={handleDeleteCommitment}
            />
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-4 text-sm text-gray-500 italic">
          <p>
            **Disclaimer**: This tool is provided for informational and
            reference purposes only. Actual deductions may vary depending on
            your specific circumstances and changes in government policies.
            Please consult with a financial advisor for more accurate
            calculations.
          </p>
        </div>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
