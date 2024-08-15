import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon, StarIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";

const data = [
  {
    p_pd: "15002",
    name: "Dolo 650",
    manufacturer: "Healthcare pvt.ltd",
    category: "Allopathy",
    ratings: 3,
    date: "12th may 2023",
  },

  {
    p_pd: "15002",
    name: "Dolo 650",
    manufacturer: "Healthcare pvt.ltd",
    category: "Allopathy",
    ratings: 3,
    date: "12th may 2023",
  },

  {
    p_pd: "15002",
    name: "Dolo 650",
    manufacturer: "Healthcare pvt.ltd",
    category: "Allopathy",
    ratings: 3,
    date: "12th may 2023",
  },

  {
    p_pd: "15002",
    name: "Dolo 650",
    manufacturer: "Healthcare pvt.ltd",
    category: "Allopathy",
    ratings: 3,
    date: "12th may 2023",
  },
];

function ProductRequestTable({ tableData = data, setTableData }) {
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
            <th className=" p-1 text-xs md:text-base md:p-2">Product ID</th>
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
                {row.p_id}
              </td>
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
                <div className="flex space-x-1">
                  {[row.ratings].map((item, index) => (
                    <StarIcon className="w-4 text-yellow-400" />
                  ))}
                </div>
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">{row.date}</td>
              <td className=" p-1 text-xs md:text-base md:p-2 flex justify-center">
                <button
                  onClick={() => {
                    router.push("doctors");
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

export default ProductRequestTable;
