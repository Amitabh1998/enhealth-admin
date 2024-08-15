import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import { Switch } from "@headlessui/react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon } from "@heroicons/react/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination, Navigation } from "swiper/modules";

function CitiesTable({
  tableData,
  setTableData,
  data,
  setData,
  limit,
  setLimit,
  skip,
  setSkip,
  handlePageChange,
  handleEdit,
}) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const [enabled, setEnabled] = useState(
    tableData.map((data) => (data.status === 1 ? true : false))
  );

  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const [active, setActive] = useState(1);

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
    handlePageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
    handlePageChange(active - 1);
  };

  const calculatePagination = () => {
    const totalPages = Math.ceil(data.total / data.limit);
    setTotalPages(totalPages);

    const startIndex = data.skip;
    setStartIndex(startIndex);

    const endIndex = startIndex + data.limit;
    setEndIndex(endIndex);

    const currentPageData = data.data.slice(0, 20);
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

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/city/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setTableData(tableData.filter((row) => row._id !== response.data._id));
        setData({
          ...data,
          data: tableData.filter((row) => row._id !== response.data._id),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSwitchChange = async (index, row) => {
    const token = localStorage.getItem("vitmedsAdminToken");
    let data = JSON.stringify({
      status: row.status === 1 ? 2 : 1,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/city/${row._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const updatedEnabled = [...enabled]; // Create a copy of the enabled state array
        updatedEnabled[index] = !updatedEnabled[index]; // Toggle the value of the corresponding index
        setEnabled(updatedEnabled); // Update the enabled state
        console.log(index);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="flex w-full bg-gray-100 text-left">
            <th className="w-20 p-1 text-xs md:text-base md:p-2">S no.</th>
            <th className="flex-1 p-1 text-xs md:text-base md:p-2">Name</th>
            <th className="flex-1 p-1 text-xs md:text-base md:p-2">State</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData?.map((row, index) => (
            <tr key={row._id} className={`hover:bg-gray-50 flex w-full`}>
              <td className="w-20 p-1 text-xs md:text-base md:p-2">
                {index + 1}
              </td>
              <td className="flex-1 p-1 text-xs md:text-base md:p-2">
                {row?.name}
              </td>
              <td className="flex-1 py-1 text-xs md:text-base md:py-2">
                {row?.state?.name}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <div className="flex space-x-3">
                  {handleEdit && (
                    <button
                      onClick={() => {
                        handleEdit(row);
                      }}
                      className="rounded-sm p-1 text-gray-500 cursor-pointer bg-blue-100"
                    >
                      <EyeIcon className="w-5 h-5 " />
                    </button>
                  )}
                  <Switch
                    checked={enabled[index]} // Use the enabled state for the current index
                    onChange={() => handleSwitchChange(index, row)} // Pass the index to the handler
                    className={`${
                      enabled[index] ? "bg-green-500" : "bg-gray-600"
                    }
                      relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        enabled[index] ? "translate-x-7" : "translate-x-0"
                      }
                      pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <button
                    onClick={() => {
                      setOn(true);
                      setCurrentRow(row._id);
                    }}
                    className="rounded-sm p-1 bg-red-500"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
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

      {/* <div className="flex items-center gap-8">
        <button
          size="sm"
          variant="outlined"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </button>
        <div color="gray" className="font-normal">
          Page <strong className="text-gray-900">{active}</strong> of{" "}
          <strong className="text-gray-900">{totalPages}</strong>
        </div>
        <button
          size="sm"
          variant="outlined"
          onClick={next}
          disabled={active === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </button>
      </div> */}
      <ConfirmationDialog
        on={on}
        setOn={setOn}
        callback={() => handleDeleteClick(currentRow)}
      />
    </>
  );
}

export default CitiesTable;
