import DefaultAutocomplete from "@/components/Inputs/DefaultAutocomplete";
import DefaultInput from "@/components/Inputs/DefaultInput";
import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import MultipleSearchAutocomplete from "@/components/MultipleSearchAutocomplete";
import React, { Fragment, useEffect, useState } from "react";

const manufacturer = [
  { name: "company 1" },
  { name: "company 2" },
  { name: "company 3" },
  { name: "company 4" },
];

// const category = [
//   { name: "category 1" },
//   { name: "category 2" },
//   { name: "category 3" },
//   { name: "category 4" },
// ];
const option = [
  {
    _id: 1,
    name: "YES",
    value: "YES",
  },
  {
    _id: 2,
    name: "NO",
    value: "NO",
  },
];

const BasicInfoFormTest = ({
  name,
  setName,
  description,
  setDescription,
  reason,
  setReason,
  preparation,
  setPreparation,
  setTopBooked,
  topBooked,
  organs,
  setOrgans,
}) => {
  const [status, setStatus] = useState(2);
  const [organ, setOrgan] = useState("");

  const router = useRouter();

  const addOrgans = () => {
    const _organs = [...organs];

    if (organ.trim() !== "") {
      setOrgans([..._organs, organ]);
      setOrgan("");
    }
  };

  useEffect(() => {
    console.log(router?.query?.type);
  }, [router]);

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Basic Info</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        <DefaultInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DefaultTextarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DefaultTextarea
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <DefaultTextarea
          label="Preparation"
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
        />

        <div>
          <label
            for="first_name"
            class="block mb-1 text-sm font-normal text-gray-600 "
          >
            Top Booked
          </label>
          <Listbox value={topBooked} onChange={(e) => setTopBooked(e)}>
            <div className="relative mt-1">
              <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                <span className="block truncate">{topBooked}</span>
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

        {parseInt(router?.query?.type) === 1 ? (
          <div>
            <MultipleSearchAutocomplete
              title={"Organs"}
              item={organs}
              setItem={setOrgans}
              searchUrl={"master-data/organ"}
              limit={10}
            />
            <div className="mt-1 mb-4 flex  items-center flex-wrap">
              {organs?.map((item, index) => (
                <div className="px-2 p-1 mr-2 my-1 text-xs bg-green-100 rounded-md">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-2 ">
              <div className="flex items-center justify-between">
                <label
                  for="first_name"
                  class="block mb-1 text-sm font-semibold text-gray-600 "
                >
                  Samples to be collected
                </label>
                <div
                  onClick={() => addOrgans()}
                  className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
                >
                  Click here to Add
                </div>
              </div>
              <div>
                <DefaultInput
                  // label="Reference"
                  value={organ}
                  onChange={(e) => setOrgan(e.target.value)}
                />
              </div>
              <div className="flex ">
                {organs?.map((item, index) => (
                  <div
                    className="text-xs p-2 rounded-md bg-green-100 mr-2 mt-2"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoFormTest;
