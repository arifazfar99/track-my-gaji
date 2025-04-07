import { TiDeleteOutline } from "react-icons/ti";

export interface Commitment {
  name: string;
  amount: number;
}

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
    <div className="mt-8 border p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Your Commitments
      </h2>

      {commitments.map((item, index) => (
        <div key={index} className="mb-4 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            className="border p-3 rounded-lg w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Amount"
            value={item.amount}
            onChange={(e) =>
              onChange(index, "amount", parseFloat(e.target.value))
            }
            className="border p-3 rounded-lg w-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            onClick={() => onDelete(index)}
            className="ml-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            <TiDeleteOutline />
          </button>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300"
      >
        Add Commitment
      </button>

      <div className="mt-6 font-medium">
        <div className="flex justify-between">
          <span>📉 Total Commitments:</span>
          <span className="font-semibold text-red-600">
            RM {(total || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-2 text-lg font-bold">
          <span>🧮 Remaining Balance:</span>
          <span className="text-xl text-green-600">
            RM {(netSalary - total || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommitmentForm;
