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

const BasicInfoFormTestParameter = ({
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
  specifications,
  setSpecifications,
  units,
  setUnits,
  technology,
  setTechnology,
  method,
  setMethod,
}) => {
  const [status, setStatus] = useState(2);
  const [specification, setSpecification] = useState("");
  const [links, setLinks] = useState([]);

  const router = useRouter();

  const addSpecs = () => {
    const _specifications = [...specifications];

    if (specification.trim() !== "") {
      setSpecifications([..._specifications, specification]);
      setSpecification("");
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
          label="clinical Significance"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <DefaultTextarea
          label="Info Source"
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
        />
        <DefaultInput
          label="Units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        />
        <DefaultInput
          label="Technology"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        />
        <DefaultInput
          label="Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <div>
          <MultipleSearchAutocomplete
            title={"Symptoms"}
            item={organs}
            setItem={setOrgans}
            searchUrl={"master-data/symptom"}
            limit={10}
            links={links}
            setLinks={setLinks}
          />
          <div className="mt-1 mb-4 flex  items-center flex-wrap">
            {organs?.map((item, index) => (
              <div className="px-2 p-1 mr-2 my-1 text-xs bg-green-100 rounded-md">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mt-2 ">
            <div className="flex items-center justify-between">
              <label for="first_name" class="block mb-1 text-sm text-gray-600 ">
                Specifications
              </label>
              <div
                onClick={() => addSpecs()}
                className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
              >
                Click here to Add
              </div>
            </div>
            <div>
              <DefaultInput
                // label="Reference"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
            </div>
            <div className="flex ">
              {specifications?.map((item, index) => (
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
      </div>
    </div>
  );
};

export default BasicInfoFormTestParameter;
