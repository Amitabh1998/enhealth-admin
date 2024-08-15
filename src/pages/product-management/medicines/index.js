import ExistingProductTable from "@/components/Tables/ExistingProductTable";
import ProductRequestTable from "@/components/Tables/ProductRequestTable";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

const tabs = [
  {
    name: "Existing system",
    status: 1,
  },
  {
    name: "New Requests",
    status: 2,
  },
];

const states = ["Allopathy", "Homeopathy"];

const index = () => {
  const [state, setState] = useState(states[0]);
  const [status, setStatus] = useState(1);

  const Router = useRouter();

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
                Product Management
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Medicines
              </a>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        {/* ----------------------Heading----------------- */}
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Medicines
        </div>

        {/* -----------Categiry dropdown-------------- */}
        <div className="w-full mt-5">
          <label
            for="first_name"
            class="block mb-1 text-sm font-normal text-gray-600 "
          >
            Select Category
          </label>
          <Listbox value={state} onChange={(e) => setState(e)}>
            <div className="relative mt-1 w-80">
              <Listbox.Button className="border px-3 py-2 w-full  bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                <span className="block truncate">
                  {state?.name ? state?.name : "Select"}
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
                  {states.map((state, roleIdx) => (
                    <Listbox.Option
                      key={roleIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={state}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {state}
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

        {/* ---------------Tabs----------------- */}
        <div className="w-full gap-5 grid md:grid-cols-10 mt-10">
          <div className="md:col-span-7">
            {/* TABS */}
            <div className="w-full grid grid-cols-2 bg-white shadow rounded-md  text-gray-500 font-medium">
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
          <div className="md:col-span-3">
            <button
              onClick={() => Router.push("/new-product")}
              className="bg-bluePrimary rounded-md hover:shadow-xl text-white shadow w-full p-2"
            >
              Add New {state} Medicine
            </button>
          </div>
        </div>

        {/* ------------------Tables---------------------- */}
        <div className="w-full my-10">
          {status === 1 ? <ExistingProductTable /> : <ProductRequestTable />}
        </div>
      </div>
    </div>
  );
};

export default index;
