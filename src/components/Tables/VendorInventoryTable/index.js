import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon, StarIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";

const data = [
  {
    id: 1,
    name: "Dolo 650",
    manufacturer: "Health care pvt lts",
    category: "Allopathy",
    ModifiedOn: "12th sept, 2022",
  },
  {
    id: 2,
    name: "Dolo 650",
    manufacturer: "Health care pvt lts",
    category: "Allopathy",
    ModifiedOn: "12th sept, 2022",
  },
  {
    id: 3,
    name: "Dolo 650",
    manufacturer: "Health care pvt lts",
    category: "Allopathy",
    ModifiedOn: "12th sept, 2022",
  },
];

function VendorInventoryTable({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
        <thead className="rounded-t-md">
          <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
            <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
              S No.
            </th>
            <th className=" p-1 text-xs md:text-base md:p-2">Title</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Manufacturer</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Category</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Ratings</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Modified On</th>
            <th className="flex justify-center p-1 text-xs md:text-base md:p-2 rounded-tr-xl">
              View Details
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id} className={`hover:bg-gray-50`}>
              <td className=" p-1 text-xs md:text-base md:p-2">{index + 1}</td>
              <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                {row.name}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row.manufacturer}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row.category}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {" "}
                <div className="flex space-x-2 items-center">
                  {[1, 2, 3].map((item, index) => (
                    <StarIcon className="w-5 text-yellow-400" />
                  ))}
                </div>
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row.ModifiedOn}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2 flex justify-center">
                <button
                  onClick={() => {
                    router.push("#");
                  }}
                  className="rounded-sm p-1 bg-blue-100"
                >
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default VendorInventoryTable;
