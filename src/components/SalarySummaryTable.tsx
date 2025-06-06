import { SalarySummary } from "../types";

// icons
import { Tooltip } from "antd";
import { BiDetail } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

interface SalarySummaryTableProps {
  result: SalarySummary | null;
}

const text = `**Disclaimer**: This tool is provided for informational and
              reference purposes only. Actual deductions may vary depending on
              your specific circumstances and changes in government policies.`;

const SalarySummaryTable = ({ result }: SalarySummaryTableProps) => {
  return (
    <div className="w-1/2 p-7">
      <section className="flex justify-between mb-4">
        <h1 className="font-semibold text-lg flex items-center">
          <span>
            <BiDetail className="mr-2" />
          </span>
          Salary Summary
        </h1>
        <Tooltip title={text}>
          <FaInfoCircle />
        </Tooltip>
      </section>
      <div className="border rounded-lg p-2 text-center mb-4">
        <p className="text-sm mb-2">Your Net Monthly Salary</p>
        <h1 className="text-3xl font-bold text-green-700">
          RM {result?.netSalary.toFixed(2) || 0}
        </h1>
      </div>
      <div>
        <p className="font-semibold">Deductions</p>
        <ul>
          <li className="flex justify-between border-b-1 py-4">
            <span>EPF - Employees Provident Fund</span>
            <span className="font-semibold">
              RM {result?.epf.toFixed(2) || 0}
            </span>
          </li>
          <li className="flex justify-between border-b-1 py-4">
            <span>SOCSO - Social Security Organisation</span>
            <span className="font-semibold">
              RM {result?.socso.toFixed(2) || 0}
            </span>
          </li>
          <li className="flex justify-between border-b-1 py-4">
            <span>EIS - Employment Insurance Scheme</span>
            <span className="font-semibold">
              RM {result?.eis.toFixed(2) || 0}
            </span>
          </li>
          <li className="flex justify-between border-b-1 py-4">
            <span>PCB - Potongan Cukai Berjadual</span>
            <span className="font-semibold">
              RM {result?.pcb.toFixed(2) || 0}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SalarySummaryTable;
