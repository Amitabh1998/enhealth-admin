import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Switch } from "@headlessui/react";
import { EyeIcon, PencilIcon } from "@heroicons/react/solid";
import { getAllStates } from "@/api/states";
import ConfirmationDialog from "@/components/Dialogs/ConfirmationDialog";

function CommonTable({
  tableData,
  setTableData,
  data,
  setData,
  limit,
  setLimit,
  skip,
  setSkip,
  handlePageChange,
  handleDeleteClick,
  handleEdit,
}) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const [enabled, setEnabled] = useState(
    data.data.map((data) => (data.status === 1 ? true : false))
  );
  const [isOpen, setIsOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const calculatePagination = () => {
    const totalPages = Math.ceil(data.total / data.limit);
    setTotalPages(totalPages);

    const startIndex = data.skip;
    setStartIndex(startIndex);

    const endIndex = startIndex + data.limit;
    setEndIndex(endIndex);

    const currentPageData = data.data.slice(0, 10);
    setCurrentPageData(currentPageData);
    console.log(
      "calculations function current page data",
      totalPages,
      startIndex,
      endIndex,
      currentPageData
    );
  };

  useEffect(() => {
    calculatePagination();
    setEnabled(data.data.map((data) => (data.status === 1 ? true : false)));
    console.log("table rendered");
    console.log(data);
  }, [data, tableData, limit, skip]);

  return (
    <>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-100 text-left flex">
            <th className="w-20 p-1 text-xs md:text-base md:p-2">S No.</th>
            <th className=" flex-1 p-1 text-xs md:text-base md:p-2">Name</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, index) => (
            <tr key={row._id} className={`hover:bg-gray-50 flex`}>
              <td className="w-20 p-1 text-xs md:text-base md:p-2">
                {index + 1}
              </td>
              <td className="flex-1 p-1 text-xs md:text-base md:p-2">
                {row?.name ? row?.name : row?.code ? row?.code : "N/A"}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <div className="flex space-x-3">
                  <div>
                    {handleEdit && (
                      <EyeIcon
                        className="text-gray-500 cursor-pointer bg-blue-100 rounded-sm p-1 w-7"
                        onClick={() => {
                          handleEdit(row);
                        }}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setOn(true);
                      setCurrentRow(row._id);
                    }}
                    className="rounded-sm p-1 bg-red-500"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                  {/* <button
                    onClick={() => {
                      setisOpen(true);
                      setCurrentRow(row._id);
                    }}
                    className="rounded-sm p-1 bg-yellow-400"
                  >
                    <PencilIcon className="w-5 h-5 text-white" />
                  </button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the pagination */}
      <div className="flex flex-wrap space-y-2 justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-2 py-1 rounded ${
                startIndex / data.limit + 1 === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
      <ConfirmationDialog
        on={on}
        setOn={setOn}
        callback={() => handleDeleteClick(currentRow)}
      />
    </>
  );
}

export default CommonTable;
