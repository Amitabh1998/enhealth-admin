import AllopathicMedicines from "@/components/AllopathicMedicines";
import AyurvedicMedicines from "@/components/AyurvedicMedicines";
import RegisterUserDialog from "@/components/Dialogs/RegisterUserDialog";
import HomeopathicMedicines from "@/components/HomeopathicMedicines";
import DeliveryAgentTable from "@/components/Tables/DeliveryAgentTable";
import DiagnosticCenterTable from "@/components/Tables/DiagnosticCenterTable";
import DoctorsTable from "@/components/Tables/DoctorsTable";
import PharmaciesTable from "@/components/Tables/PharmaciesTable";
import UsersTable from "@/components/Tables/UsersTable";
import UnaniMedicines from "@/components/UnaniMedicines";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";

const tabs = [
  {
    name: "Allopathy",
    status: 1,
  },
  {
    name: "Homeopathy",
    status: 2,
  },
  {
    name: "Ayurvedic",
    status: 3,
  },
  {
    name: "Unani",
    status: 4,
  },
];

const index = () => {
  const [status, setStatus] = useState(1);
  const [status2, setStatus2] = useState(1);

  const router = useRouter();

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
          Medicines
        </div>

        <div className="w-full gap-5 grid md:grid-cols-10 mt-10">
          <div className="col-span-8">
            {/* TABS */}
            <div className="w-full grid grid-cols-4 bg-white shadow rounded-md  text-gray-500 font-medium">
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
                onClick={() => router.push("/new-allopathic-medicine")}
                className="p-2 w-full bg-bluePrimary rounded-md text-white"
              >
                New Allopathic medicine
              </button>
            ) : status === 2 ? (
              <button
                onClick={() => router.push("/new-homeopathic-medicine")}
                className="p-2 w-full bg-bluePrimary rounded-md text-white"
              >
                New Homeopathic medicine
              </button>
            ) : status === 3 ? (
              <button
                onClick={() => router.push("/new-ayurvedic-medicine")}
                className="p-2 w-full bg-bluePrimary rounded-md text-white"
              >
                New Ayurvedic medicine
              </button>
            ) : (
              <button
                onClick={() => router.push("/new-unani-medicine")}
                className="p-2 w-full bg-bluePrimary rounded-md text-white"
              >
                New Unani medicine
              </button>
            )}
          </div>
        </div>

        {/* TABLES */}
        <div className="w-full my-10">
          {status === 1 ? (
            <AllopathicMedicines />
          ) : status === 2 ? (
            <HomeopathicMedicines />
          ) : status === 3 ? (
            <AyurvedicMedicines />
          ) : status === 4 ? (
            <UnaniMedicines />
          ) : null}
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
