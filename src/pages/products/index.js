import AllopathicMedicines from "@/components/AllopathicMedicines";
import AyurvedicMedicines from "@/components/AyurvedicMedicines";
import RegisterUserDialog from "@/components/Dialogs/RegisterUserDialog";
import HomeopathicMedicines from "@/components/HomeopathicMedicines";
import ProductsListing from "@/components/ProductsListing";
import DeliveryAgentTable from "@/components/Tables/DeliveryAgentTable";
import DiagnosticCenterTable from "@/components/Tables/DiagnosticCenterTable";
import DoctorsTable from "@/components/Tables/DoctorsTable";
import PharmaciesTable from "@/components/Tables/PharmaciesTable";
import UsersTable from "@/components/Tables/UsersTable";
import UnaniMedicines from "@/components/UnaniMedicines";
import { ChevronRightIcon } from "@heroicons/react/solid";
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

  const [open, setOpen] = useState(false);

  return (
    <div>
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
                Products
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Products
        </div>

        <div className="w-full">
          <ProductsListing />
        </div>
      </div>
    </div>
  );
};

export default index;
