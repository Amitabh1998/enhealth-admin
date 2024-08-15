import { getAllData } from "@/api/stakeholder-management/common";
import DefaultInput from "@/components/Inputs/DefaultInput";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const PricingForm = ({
  actualPrice,
  setActualPrice,
  sellingPrice,
  setSellingPrice,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Pricing</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        <div className="grid md:grid-cols-1 gap-5">
          <DefaultInput
            type="Number"
            label={"Original Price"}
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.value)}
          />
          <DefaultInput
            type="Number"
            label={"Selling Price"}
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
