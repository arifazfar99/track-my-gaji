import type { SalaryDetails } from "../types";
import { GrMoney } from "react-icons/gr";

interface SalaryDetailsProps {
  salaryDetails: SalaryDetails;
  setSalaryDetails: React.Dispatch<React.SetStateAction<SalaryDetails>>;
  onCalculate: () => void;
}

const SalaryDetailsForm = ({
  salaryDetails,
  setSalaryDetails,
  onCalculate,
}: SalaryDetailsProps) => {
  const handleChange = (field: keyof SalaryDetails, value: string | number) => {
    setSalaryDetails((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" && field !== "taxCategory"
          ? Number(value)
          : value,
    }));
  };

  return (
    <div className="w-1/2 p-7">
      <h1 className="font-semibold text-lg mb-4 flex items-center">
        <span>
          <GrMoney className="mr-2" />
        </span>
        Salary Details
      </h1>

      {/* Gross Salary */}
      <label className="block mb-2 font-medium">
        Monthly Gross Salary (RM)
      </label>
      <input
        type="number"
        value={salaryDetails.gross}
        onChange={(e) => handleChange("gross", e.target.value)}
        placeholder="Enter gross salary"
        className="border p-2 w-full mb-4 rounded"
      />

      {/* Annual Bonus */}
      <label className="block mb-2 font-medium">
        Annual Bonus (RM) - Optional
      </label>
      <input
        type="number"
        value={salaryDetails.bonus}
        onChange={(e) => handleChange("bonus", e.target.value)}
        placeholder="Enter total annual bonus"
        className="border p-2 w-full mb-4 rounded"
      />

      {/* EPF */}
      <label className="block mb-2 font-medium">EPF Contribution Rate</label>
      <select
        value={salaryDetails.epfRate}
        onChange={(e) => handleChange("epfRate", e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="0.11">11%</option>
        <option value="0.09">9%</option>
      </select>

      {/* Tax Category */}
      <label className="block mb-2 font-medium">Tax Category</label>
      <select
        value={salaryDetails.taxCategory}
        onChange={(e) => handleChange("taxCategory", e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="single">Single</option>
        <option value="married_working" disabled>
          Married - Spouse working (soon)
        </option>
        <option value="married_not_working" disabled>
          Married - Spouse not working (soon)
        </option>
      </select>

      {/* Number of child */}
      {salaryDetails.taxCategory !== "single" && (
        <>
          <label className="block mb-2 font-medium">Number of Child</label>
          <input
            type="number"
            value={salaryDetails.child}
            onChange={(e) => handleChange("child", e.target.value)}
            placeholder="Enter total number of child"
            className="border p-2 w-full mb-4 rounded"
          />
        </>
      )}

      <div className="flex justify-end">
        <button
          onClick={onCalculate}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition-all duration-300 cursor-pointer"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default SalaryDetailsForm;
