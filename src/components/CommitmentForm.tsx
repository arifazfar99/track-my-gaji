import { TiDeleteOutline } from "react-icons/ti";
import { PiListChecksFill } from "react-icons/pi";
import { Commitment } from "../types";

interface CommitmentFormProps {
  commitments: Commitment[];
  onAdd: () => void;
  onChange: (index: number, field: keyof Commitment, value: any) => void;
  total: number;
  netSalary: number;
  onDelete: (index: number) => void;
}

const CommitmentForm: React.FC<CommitmentFormProps> = ({
  commitments,
  onAdd,
  onChange,
  total,
  netSalary,
  onDelete,
}) => {
  return (
    <div className="mt-8 p-6 rounded-2xl shadow-md bg-white">
      <h1 className="font-semibold text-lg mb-4 flex items-center">
        <span>
          <PiListChecksFill className="mr-2" />
        </span>
        Your Commitments
      </h1>

      {commitments.map((item, index) => (
        <div key={index} className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            className="border p-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Amount"
            value={item.amount}
            onChange={(e) =>
              onChange(index, "amount", parseFloat(e.target.value))
            }
            className="border p-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Notes"
            value={item.note}
            onChange={(e) => onChange(index, "note", e.target.value)}
            className="border p-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            onClick={() => onDelete(index)}
            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            <TiDeleteOutline />
          </button>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={onAdd}
          className="bg-black text-white py-2 px-6 rounded shadow-md hover:bg-gray-700 transition-all duration-300 cursor-pointer"
        >
          Add Commitment
        </button>
      </div>

      <div className="mt-6 font-medium">
        <div className="flex justify-between border-b-1 py-2">
          <span className="text-red-600">Total Commitments:</span>
          <span className="font-semibold text-red-600">
            RM {(total || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold border-b-1 py-2">
          <span className="text-green-600">Remaining Balance:</span>
          <span className="text-xl text-green-600">
            RM {(netSalary - total || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommitmentForm;
