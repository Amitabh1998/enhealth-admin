import DefaultInput from "@/components/Inputs/DefaultInput";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

const manufacturer = [
  { name: "company 1" },
  { name: "company 2" },
  { name: "company 3" },
  { name: "company 4" },
];

const category = [
  { name: "category 1" },
  { name: "category 2" },
  { name: "category 3" },
  { name: "category 4" },
];

const WarrantyForm = ({
  warrantyPeriod,
  setWarrantyPeriod,
  warrantyProvider,
  setWarrantyProvider,
  customerCareNo,
  setCustomerCareNo,
  coveredInWarranty,
  setCoveredInWarranty,
  warrantyExclusion,
  setWarrantyExclusion,
}) => {
  const router = useRouter();

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Warranty</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div className="space-y-4">
        <DefaultInput
          label={"Warranty Period"}
          value={warrantyPeriod}
          onChange={(e) => setWarrantyPeriod(e.target.value)}
        />
        <DefaultInput
          label={"Warranty Provider"}
          value={warrantyProvider}
          onChange={(e) => setWarrantyProvider(e.target.value)}
        />
        <DefaultInput
          label={"Customer Care Number"}
          value={customerCareNo}
          onChange={(e) => setCustomerCareNo(e.target.value)}
        />
        <DefaultInput
          label={"Covered In Warranty"}
          value={coveredInWarranty}
          onChange={(e) => setCoveredInWarranty(e.target.value)}
        />
        <DefaultInput
          label={"Warranty Exclusion"}
          value={warrantyExclusion}
          onChange={(e) => setWarrantyExclusion(e.target.value)}
        />
      </div>
    </div>
  );
};

export default WarrantyForm;
