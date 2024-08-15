import RegisterUserDialog from "@/components/Dialogs/RegisterUserDialog";
import DeliveryAgentTable from "@/components/Tables/DeliveryAgentTable";
import DiagnosticCenterTable from "@/components/Tables/DiagnosticCenterTable";
import DoctorsTable from "@/components/Tables/DoctorsTable";
import PharmaciesTable from "@/components/Tables/PharmaciesTable";
import UsersTable from "@/components/Tables/UsersTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const tabs = [
  {
    name: "Users",
    status: 1,
  },
  {
    name: "Doctors",
    status: 2,
  },
  {
    name: "Delivery Agents",
    status: 3,
  },
  {
    name: "Pharmacies",
    status: 4,
  },
  {
    name: "Diagnostic centers",
    status: 5,
  },
];

const index = () => {
  const [status, setStatus] = useState(1);
  const [status2, setStatus2] = useState(1);

  const [open, setOpen] = useState(false);

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
                Manage Stakeholders
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Manage Stakeholders
        </div>

        <div className="w-full gap-5 grid md:grid-cols-10 mt-10">
          <div className="col-span-8">
            {/* TABS */}
            <div className="w-full grid grid-cols-5 bg-white shadow rounded-md  text-gray-500 font-medium">
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
          <div className="col-span-2">
            {status === 1 ? (
              <button
                onClick={() => setOpen(true)}
                className="p-2 w-full bg-bluePrimary rounded-md text-white"
              >
                Register New User
              </button>
            ) : (
              <button className="p-2 w-full bg-bluePrimary rounded-md text-white">
                Define Charges
              </button>
            )}
          </div>
        </div>

        {/* TABLES */}
        <div className="w-full my-10">
          {status === 1 ? (
            <UsersTable />
          ) : status === 2 ? (
            <DoctorsTable />
          ) : status === 3 ? (
            <DeliveryAgentTable />
          ) : status === 4 ? (
            <div className="">
              <PharmaciesTable />
            </div>
          ) : (
            <DiagnosticCenterTable />
          )}
        </div>
      </div>
      {status === 1 && open === true ? (
        <RegisterUserDialog open={open} setOpen={setOpen} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default index;
