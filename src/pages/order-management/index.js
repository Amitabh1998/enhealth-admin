import PrimaryButton from "@/components/Buttons/PrimaryButton";
import ConsultationTable from "@/components/Tables/ConsultationTable";
import LabTestTable from "@/components/Tables/LabTestTable";
import OrderManagentTable from "@/components/Tables/OrderMangementTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const tabs = [
  {
    name: "Medicines & Products",
    status: 1,
  },
  {
    name: "Lab Tests",
    status: 2,
  },
  {
    name: "Doctor Consultations",
    status: 3,
  },
];

const index = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Shubham Kanungo",
      paymentId: "PE12000291P22",
      price: "1000",
      product: "Dolo 650",
      date: "23rd June 2023",
    },
    {
      id: 2,
      name: "Shubham Kanungo",
      paymentId: "PE12000291P22",
      price: "1000",
      product: "Dolo 650",
      date: "23rd June 2023",
    },
    {
      id: 3,
      name: "Shubham Kanungo",
      paymentId: "PE12000291P22",
      price: "1000",
      product: "Dolo 650",
      date: "23rd June 2023",
    },
    {
      id: 4,
      name: "Shubham Kanungo",
      paymentId: "PE12000291P22",
      price: "1000",
      product: "Dolo 650",
      date: "23rd June 2023",
    },
    {
      id: 5,
      name: "Shubham Kanungo",
      paymentId: "PE12000291P22",
      price: "1000",
      product: "Dolo 650",
      date: "23rd June 2023",
    },
  ]);

  const [status, setStatus] = useState(1);

  return (
    <div>
      {" "}
      {/* ------------------BREADCRUMBS--------------------- */}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Order Management
              </a>
            </div>
          </li>
        </ol>
        {/* -----------TABLE--------------- */}
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Order Management
        </div>

        {/* TABS */}
        <div className="w-full grid grid-cols-3 bg-white shadow rounded-md mt-10 text-gray-500 font-medium">
          {tabs.map((item, index) => (
            <div
              onClick={() => setStatus(item.status)}
              key={index}
              className={`border-r ${
                index !== tabs.length - 1
                  ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                  : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
              } ${
                item.status === status && "border-b-2  border-b-bluePrimary"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
      {tableData?.length > 0 ? (
        <div className="w-full max-w-xs sm:max-w-none overflow-hidden">
          {status === 1 ? (
            <OrderManagentTable
              tableData={tableData}
              setTableData={setTableData}
            />
          ) : status === 2 ? (
            <LabTestTable setTableData={setTableData} />
          ) : (
            <ConsultationTable setTableData={setTableData} />
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto flex justify-center flex-col items-center">
          <img src={"/images/staff1.png"} />
          <div className="w-full" onClick={() => setIsOpen(true)}>
            <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
