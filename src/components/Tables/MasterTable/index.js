import { deleteData } from "@/api/common";
import ConfirmationDialog from "@/components/Dialogs/ConfirmationDialog";
import SpinnerLoader from "@/components/SpinnerLoader";
import {
  DocumentDownloadIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import moment from "moment/moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MasterTable = ({
  getUrl,
  data,
  columns,
  itemsPerPage,
  total,
  handlePageChange,
  fetchData,
  currentPage,
  setCurrentPage,
  viewDetails,
  deleteUrl,
  editHandler,
  actions = "on",
  dialog = false,
  on,
  setOn,
  setCurrentRow,
  limit,
  setLimit,
  sorting,
  sort,
  setSort,
  customActions = false,
  custom: CustomComponent,
  open,
  setOpen,
}) => {
  //   const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const [currentItems, setCurrentItems] = useState([]);
  const [serialNumber, setSerialNumber] = useState(1); // Initialize serial number
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const dropdownOptions = [
    { label: "10" },
    { label: "20" },
    { label: "30" },
    { label: "50" },
    { label: "100" },
  ];

  const totalPages = Math.ceil(total / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      console.log(pageNumber);
      setCurrentPage(pageNumber);
      fetchData(pageNumber);
      //   handlePageChange(pageNumber);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtons = 10;

    let startPage = currentPage - Math.floor(maxButtons / 2);
    let endPage = startPage + maxButtons - 1;

    if (totalPages <= maxButtons) {
      // Less than 10 pages, display all pages.
      startPage = 1;
      endPage = totalPages;
    } else {
      // Ensure that the buttons are centered around the current page.
      if (startPage < 1) {
        startPage = 1;
        endPage = maxButtons;
      } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxButtons + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mr-2 rounded-lg ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  //   useEffect(() => {
  //     fetchData(currentPage);
  //   }, [currentPage]);

  useEffect(() => {
    console.log(data);
    if (data) {
      setCurrentItems([...data]);
    }
  }, [data]);

  function getColumnValue(item, key) {
    const keys = key.split(".");
    let value = item;

    for (const nestedKey of keys) {
      if (nestedKey && value[nestedKey] !== undefined) {
        value = value[nestedKey];
      } else {
        return "N/A";
      }
    }

    return value;
  }

  function renderCellData(item, column) {
    const { key, dataType } = column;

    if (dataType === "image") {
      // Check if the key represents an array
      if (Array.isArray(getColumnValue(item, key))) {
        const attachments = getColumnValue(item, key);

        return (
          <div>
            {attachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment.link}
                alt="Attachment"
                width="100"
              />
            ))}
          </div>
        );
      }
    } else if (dataType === "avatar") {
      const value = getColumnValue(item, key);
      if (value === "N/A") {
        return "N/A";
      } else if (value.length > 0) {
        return (
          <img src={value} alt="Attachment" className="rounded-md w-12 h-12" />
        );
      } else {
        return "N/A";
      }
    } else if (dataType === "doc") {
      // console.log(item);
      const value = getColumnValue(item, key);
      if (value === "N/A") {
        return "N/A";
      } else if (value.length > 0) {
        return (
          <a href={value} target="_blank">
            <DocumentDownloadIcon className="text-bluePrimary w-6" />
          </a>
        );
      } else {
        return "N/A";
      }
    } else if (dataType === "arrayOfObjects") {
      if (Array.isArray(getColumnValue(item, key))) {
        const value = getColumnValue(item, key);

        return (
          <div>
            {value.map((a, index) => (
              <div>
                {a[column.subKey]} {index > value.length + 1 ? ", " : ""}
              </div>
            ))}
          </div>
        );
      } else if (value === "N/A") {
        return "N/A";
      }
    } else if (dataType === "arrayOfString") {
      if (Array.isArray(getColumnValue(item, key))) {
        const value = getColumnValue(item, key);
        if (value.length === 0) {
          return <div>N/A</div>;
        }
        return (
          <div>
            {value.map((a, index) => (
              <div>
                {a} {index > value.length + 1 ? ", " : ""}
              </div>
            ))}
          </div>
        );
      }
    } else if (dataType === "date") {
      const value = getColumnValue(item, key);
      if (value === "N/A") {
        return "N/A";
      } else if (value.length > 0) {
        return <div>{moment(value).format("Do MMMM YY")}</div>;
      } else {
        return "N/A";
      }
    } else if (dataType === "conditional") {
      const value = getColumnValue(item, key);
      if (value === "N/A") {
        return "N/A";
      } else if (value) {
        return <div>{column.value[value]}</div>;
      } else {
        return "N/A";
      }
    } else if (dataType === "gender") {
      const value = getColumnValue(item, key);

      if (value === 1) {
        return "Male";
      }

      if (value === 2) {
        return "Female";
      }

      return "Others";
    } else {
      const value = getColumnValue(item, key);
      if (value === "N/A") {
        return "N/A";
      } else if (JSON.stringify(value).length > 0) {
        return value;
      } else {
        return "N/A";
      }
    }
  }

  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteData(`${deleteUrl}${currentId}`);
      const _data = [...data];
      setCurrentItems([..._data.filter((item) => item._id !== response._id)]);
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong!");
    }
  };

  return (
    <div>
      <div className=" flex-1 flex justify-end border-b-0 border p-2 rounded-md">
        <div className="flex-1 text-left">Total : {total}</div>
        <div className=" flex justify-between  items-center space-x-2 w-80">
          {sorting && (
            <div
              className="w-20 border border-[#2F80ED] cursor-pointer text-center rounded-md text-xs p-1 hover:bg-gray-100"
              onClick={() => setSort((prev) => (prev === -1 ? 1 : -1))}
            >
              {sort === -1 ? "Newest" : "Oldest"}
            </div>
          )}
          <div className="w-40 flex justify-end items-center space-x-2 ">
            <div className="whitespace-nowrap">Rows per page :</div>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setLimit(e.target.value);
              }}
              className="row-select px-2 border w-14 border-[#2F80ED] rounded-md outline-none"
            >
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {data?.length > 0 ? (
        <div>
          <div>{/* <input type="search" value={} />  */}</div>
          <table className="table-auto w-full border-collapse border border-t-0 bg-white rounded-t-xl ">
            <thead className=" ">
              <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
                <th className="p-1 text-xs md:text-base md:p-2 border text-left  rounded-tl-md">
                  S No.
                </th>
                {/* Add the Sno column header */}
                {columns?.map((column, index) => (
                  <th className={`border text-left px-4 py-2`} key={index}>
                    {column.label}
                  </th>
                ))}
                {actions === "on" ? (
                  <th className="border text-left rounded-tr-md">Details</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 w-24  ">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  {columns?.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${column.label === "Avatar" && "w-24"} ${
                        column.label.includes("Name") && "font-semibold"
                      } border px-4 py-2`}
                    >
                      {/* {getColumnValue(item, column.key)} */}
                      {renderCellData(item, column)}
                    </td>
                  ))}
                  {actions === "on" ? (
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2 items-center">
                        <div>
                          {viewDetails && viewDetails?.trim() !== "" && (
                            <EyeIcon
                              className="text-gray-500 cursor-pointer bg-blue-100 rounded-sm p-1 w-7"
                              onClick={() =>
                                router.push(`${viewDetails}/${item._id}`)
                              }
                            />
                          )}
                        </div>
                        <div>
                          {dialog && (
                            <EyeIcon
                              className="text-gray-500 cursor-pointer bg-blue-100 rounded-sm p-1 w-7"
                              onClick={() => {
                                setOn(true);
                                setCurrentRow(item);
                              }}
                            />
                          )}
                        </div>
                        <div>
                          {editHandler && (
                            <EyeIcon
                              className="text-gray-500 cursor-pointer bg-blue-100 rounded-sm p-1 w-7"
                              onClick={() => {
                                editHandler(item);
                              }}
                            />
                          )}
                        </div>
                        <div>
                          {deleteUrl && deleteUrl?.trim() !== "" && (
                            <div>
                              {/* {deleteLoading ? (
                              <SpinnerLoader />
                            ) : ( */}
                              <TrashIcon
                                className="text-red-500 cursor-pointer bg--100 rounded-sm p-1 w-7"
                                onClick={() => {
                                  setCurrentId(item?._id);
                                  setDeleteOpen(true);
                                }}
                              />
                              {/* )} */}
                            </div>
                          )}
                        </div>
                        <div>
                          {customActions && (
                            <div
                              onClick={() => {
                                setOpen(true);
                                setCurrentRow(item);
                              }}
                            >
                              <CustomComponent />
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination mt-4 mx-auto w-max">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mr-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-500 text-white"
              }`}
            >
              Prev
            </button>
            {renderPageButtons()}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mr-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 font-medium text-lg">
          No data available for now
        </div>
      )}
      <div>
        <ConfirmationDialog
          on={deleteOpen}
          setOn={setDeleteOpen}
          callback={() => deleteHandler()}
        />
      </div>
    </div>
  );
};

export default MasterTable;
