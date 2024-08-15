import { getAllData } from "@/api/stakeholder-management/common";
import NewNameDialog from "@/components/Dialogs/NewNameDialog";
import DefaultInput from "@/components/Inputs/DefaultInput";
import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import MultipleSearchAutocomplete from "@/components/MultipleSearchAutocomplete";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

const option = [
  {
    _id: 1,
    name: "True",
    value: true,
  },
  {
    _id: 2,
    name: "False",
    value: false,
  },
];

const OtherInfoCopy = ({
  drugChemistry,
  setDrugChemistry,
  therapeuticAdvantages,
  setTherapeuticAdvantages,
  storage,
  setStorage,
  narcotics,
  setNarcotics,
  scheduleH1,
  setScheduleH1,
  scheduleH,
  setScheduleH,
  prescriptionNeeded,
  setPrescriptionNeeded,
  minOrderQuantity,
  setMinOrderQuantity,
  maxOrderQuantity,
  setMaxOrderQuantity,
  habbitForming,
  setHabbitForming,
  activity,
  setActivity,
  medicineCategory,
  setMedicineCategory,
}) => {
  const router = useRouter();
  const [drug, setDrug] = useState("");
  const [drugs, setDrugs] = useState([]);

  const [advantage, setAdvantage] = useState("");
  const [advantages, setAdvantages] = useState([]);
  const [storageOpen, setStorageOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  const getDropdownData = async () => {
    try {
      const response = await getAllData(-1, 0, "master-data/storage?");
      setPackages(response);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  const addDrugChemistryHandler = () => {
    const _drugs = [...drugChemistry];

    if (drug.trim() !== "") {
      setDrugChemistry([..._drugs, drug]);
      setDrug("");
    }
  };

  const [drug1, setDrug1] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const addAdvantageHandler = () => {
    const _symptoms = [...therapeuticAdvantages];

    // if (advantage.trim() !== "") {
    //   setTherapeuticAdvantages([..._symptoms, advantage]);
    //   setAdvantage("");
    // }
    if (advantage.trim() !== "") {
      if (editOpen) {
        _symptoms[editIndex] = advantage;
        setTherapeuticAdvantages(_symptoms);
      } else {
        setTherapeuticAdvantages([..._symptoms, advantage]);
      }
      setAdvantage("");
      setEditOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Other Info</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        {router?.pathname === "/new-homeopathic-medicine" ||
        router?.pathname === "/new-product" ? null : (
          <div className="w-full ">
            <MultipleSearchAutocomplete
              title={"Drug Chemistry"}
              item={drugChemistry}
              setItem={setDrugChemistry}
              searchUrl={`${"master-data/drug-chemistry"}`}
            />

            {drugChemistry?.length > 0 && (
              <div className="mt-1 mb-4 flex  items-center flex-wrap">
                {drugChemistry?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      const _data = [...drugChemistry];
                      setDrugChemistry([
                        ..._data.filter((item2, index2) => index !== index2),
                      ]);
                    }}
                    className="px-2 p-1 mr-2 my-1 text-xs cursor-pointer group bg-green-100 rounded-md"
                  >
                    <div className="flex space-x-3">
                      <div className="">{item}</div>
                      <TrashIcon className="h-4 w-4 text-red-500 hidden group-hover:block" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {router?.pathname === "/new-product" ? null : (
          <div className="w-full ">
            <div className="flex justify-between">
              <label
                for="first_name"
                class="block mb-1  font-normal text-gray-500 "
              >
                Therapeutic Advantages
              </label>
              <div
                onClick={() => addAdvantageHandler()}
                className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
              >
                Click here to add
              </div>
            </div>
            <DefaultTextarea
              // label="Product specification"
              value={advantage}
              onChange={(e) => setAdvantage(e.target.value)}
            />
            <div className="mt-1 mb-3 flex items-center flex-wrap">
              {therapeuticAdvantages?.map((item, index) => (
                <div
                  key={index}
                  className="mr-2 mt-1 px-2 p-1 text-xs bg-green-100 rounded-md cursor-pointer group"
                >
                  <div className="flex space-x-3">
                    <div>{item}</div>
                    <div className="flex w-12 space-x-2">
                      <PencilIcon
                        onClick={() => {
                          if (advantage.trim() === "") {
                            setEditOpen(true);
                            setEditIndex(index);
                            setAdvantage(item);
                          } else {
                            toast.error(
                              "Please add the previously entered data to continue"
                            );
                          }
                        }}
                        className="h-4 w-4 text-blue hidden group-hover:block"
                      />
                      <TrashIcon
                        onClick={() => {
                          const _data = [...therapeuticAdvantages];
                          setTherapeuticAdvantages([
                            ..._data.filter(
                              (item2, index2) => index !== index2
                            ),
                          ]);
                        }}
                        className="h-4 w-4 text-red-500 hidden group-hover:block"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <label
            for="first_name"
            class="block mb-1 text-sm font-normal text-gray-600 "
          >
            Storage
          </label>
          <Listbox value={storage} onChange={(e) => setStorage(e)}>
            <div className="relative mt-1">
              <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                <span className="block truncate">
                  {storage ? storage : "Select"}
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
                      onClick={() => setStorageOpen(true)}
                      className="flex items-center py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900 cursor-pointer"
                    >
                      <div>Add Custom Storage </div>
                      <PlusCircleIcon className="h-4 w-4 text-gray-600 ml-3" />
                    </div>
                  </div>
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {router?.pathname === "/new-product" ? null : (
          <DefaultInput
            label="Medicine Class"
            value={medicineCategory}
            onChange={(e) => setMedicineCategory(e.target.value)}
          />
        )}

        <div className="grid md:grid-cols-2 gap-5 mt-3">
          {router?.pathname === "/new-homeopathic-medicine" ||
          router?.pathname === "/new-product" ? null : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Narcotics
              </label>
              <Listbox value={narcotics} onChange={(e) => setNarcotics(e)}>
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {narcotics ? "True" : "False"}
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
                    <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {option?.map((role, roleIdx) => (
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
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {router?.pathname === "/new-homeopathic-medicine" ||
          router?.pathname === "/new-product" ? null : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Schedule H1
              </label>
              <Listbox value={scheduleH1} onChange={(e) => setScheduleH1(e)}>
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {scheduleH1 ? "True" : "False"}
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
                    <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {option?.map((role, roleIdx) => (
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
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {router?.pathname === "/new-homeopathic-medicine" ||
          router?.pathname === "/new-product" ? null : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Schedule H
              </label>
              <Listbox value={scheduleH} onChange={(e) => setScheduleH(e)}>
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {scheduleH ? "True" : "False"}
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
                    <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {option?.map((role, roleIdx) => (
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
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {router?.pathname === "/new-homeopathic-medicine" ||
          router?.pathname === "/new-product" ? null : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Habbit Forming?
              </label>
              <Listbox
                value={habbitForming}
                onChange={(e) => setHabbitForming(e)}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {habbitForming ? "True" : "False"}
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
                    <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {option?.map((role, roleIdx) => (
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
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          {router?.pathname === "/new-product" ? null : (
            <div>
              <label
                for="first_name"
                class="block mb-1 text-sm font-normal text-gray-600 "
              >
                Prescription Needed
              </label>
              <Listbox
                value={prescriptionNeeded}
                onChange={(e) => setPrescriptionNeeded(e)}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                    <span className="block truncate">
                      {prescriptionNeeded ? "True" : "False"}
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
                    <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {option?.map((role, roleIdx) => (
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
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )}
          <DefaultInput
            label="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />

          {router.pathname.includes("ingredients") ? null : (
            <DefaultInput
              type="Number"
              label="Min Order Quantity"
              value={minOrderQuantity}
              onChange={(e) => setMinOrderQuantity(e.target.value)}
            />
          )}
          {router.pathname.includes("ingredients") ? null : (
            <DefaultInput
              type="Number"
              label="Max Order Quantity"
              value={maxOrderQuantity}
              onChange={(e) => setMaxOrderQuantity(e.target.value)}
            />
          )}
        </div>
      </div>
      {storageOpen && (
        <NewNameDialog
          isOpen={storageOpen}
          setIsOpen={setStorageOpen}
          tableData={packages}
          setTableData={setPackages}
          data={packages}
          setData={setPackages}
          dialogTitle={"Add new storage"}
          path={"storage"}
          inputTitle={"Storage"}
        />
      )}
    </div>
  );
};

export default OtherInfoCopy;
