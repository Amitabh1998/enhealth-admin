import { getAllData } from "@/api/stakeholder-management/common";
import NewNameDialog from "@/components/Dialogs/NewNameDialog";
import DefaultInput from "@/components/Inputs/DefaultInput";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
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

const PackagingForm = ({
  packaging,
  setPackaging,
  unit1,
  setUnit1,
  unit2,
  setUnit2,
  originalPrice,
  setOriginalPrice,
  sellingPrice,
  setSellingPrice,
  wholesalePrice,
  setWholesalePrice,
  taxCategory,
  setTaxCategory,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(
    manufacturer[0]
  );

  const router = useRouter();

  const [drug, setDrug] = useState("");
  const [drugs, setDrugs] = useState([]);

  const [advantage, setAdvantage] = useState("");
  const [advantages, setAdvantages] = useState([]);

  const addAdvantageHandler = () => {
    const _advantages = [...advantages];

    if (advantage.trim() !== "") {
      setAdvantages([..._advantages, advantage]);
      setAdvantage("");
    }
  };

  const addDrugChemistryHandler = () => {
    const _drugs = [...drugs];

    if (drug.trim() !== "") {
      setDrugs([..._drugs, drug]);
      setDrug("");
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const options = ["Yes", "No"];

  // dropdowns data
  const [packages, setPackages] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [packageOpen, setPackageOpen] = useState(false);
  const [taxOpen, setTaxOpen] = useState(false);

  const getDropdownData = async () => {
    try {
      const response = await getAllData(-1, 0, "master-data/packaging-type?");
      const response2 = await getAllData(-1, 0, "master-data/tax-category?");
      setPackages(response);
      setTaxCategories(response2);
      console.log(response2);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Packaging</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        <div className="grid md:grid-cols-1 gap-5">
          {router?.pathname === "/new-product" ? (
            <DefaultInput
              label={"Packaging"}
              value={packaging}
              onChange={(e) => setPackaging(e.target.value)}
            />
          ) : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Packaging
              </label>
              <Listbox value={packaging} onChange={(e) => setPackaging(e)}>
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {packaging ? packaging : "Select"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="z-50 absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {packages &&
                        packages?.map((role, roleIdx) => (
                          <Listbox.Option
                            key={roleIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={role.name}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {role.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      <div>
                        <div
                          onClick={() => setPackageOpen(true)}
                          className="flex items-center py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900 cursor-pointer"
                        >
                          <div>Add Custom Package </div>
                          <PlusCircleIcon className="h-4 w-4 text-gray-600 ml-3" />
                        </div>
                      </div>
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {router?.pathname === "/new-product" ? null : (
            <DefaultInput
              label={"Unit 1"}
              value={unit1}
              onChange={(e) => setUnit1(e.target.value)}
            />
          )}
          {router?.pathname === "/new-product" ? null : (
            <DefaultInput
              label={"Unit 2"}
              value={unit2}
              onChange={(e) => setUnit2(e.target.value)}
            />
          )}

          <DefaultInput
            type="Number"
            label={"Original Price"}
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
          <DefaultInput
            type="Number"
            label={"Selling Price"}
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <DefaultInput
            type="Number"
            label={"Wholesale Price"}
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(e.target.value)}
          />

          <div>
            <label
              for="first_name"
              class="block mb-1 text-sm font-normal text-gray-600 "
            >
              Tax Category
            </label>
            <Listbox value={taxCategory} onChange={(e) => setTaxCategory(e)}>
              <div className="relative mt-1">
                <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                  <span className="block truncate">
                    {taxCategory ? taxCategory : "Select"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-50 absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {taxCategories &&
                      taxCategories?.map((role, roleIdx) => (
                        <Listbox.Option
                          key={roleIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={role.value}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {role.value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    <div>
                      <div
                        onClick={() => setTaxOpen(true)}
                        className="flex items-center py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900 cursor-pointer"
                      >
                        <div>Add Custom Tax category </div>
                        <PlusCircleIcon className="h-4 w-4 text-gray-600 ml-3" />
                      </div>
                    </div>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      {packageOpen && (
        <NewNameDialog
          isOpen={packageOpen}
          setIsOpen={setPackageOpen}
          tableData={packages}
          setTableData={setPackages}
          data={packages}
          setData={setPackages}
          dialogTitle={"Add new packaging type"}
          path={"packaging-type"}
          inputTitle={"Packaging Type"}
        />
      )}
      {taxOpen && (
        <NewNameDialog
          isOpen={taxOpen}
          setIsOpen={setTaxOpen}
          tableData={taxCategories}
          setTableData={setTaxCategories}
          data={taxCategories}
          setData={setTaxCategories}
          dialogTitle={"Add new tax category"}
          path={"tax-category"}
          inputTitle={"Value"}
        />
      )}
    </div>
  );
};

export default PackagingForm;
