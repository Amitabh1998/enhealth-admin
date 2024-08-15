import DefaultInput from "@/components/Inputs/DefaultInput";
import MultipleSearchAutocomplete from "@/components/MultipleSearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

const TagsInfo = ({
  symptoms,
  setSymptoms,
  uses,
  setUses,
  adv,
  setAdv,
  symptomLinks,
  setSymptomLinks,
  usesLinks,
  setUsesLinks,
}) => {
  const [advantage, setAdvantage] = useState("");
  const [use, setUse] = useState("");

  const addAdvantageHandler = () => {
    const _symptoms = [...symptoms];

    if (advantage.trim() !== "") {
      setSymptoms([..._symptoms, advantage]);
      setAdvantage("");
    }
  };

  const addUses = () => {
    const _uses = [...uses];

    if (use.trim() !== "") {
      setUses([..._uses, use]);
      setUse("");
    }
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const options = ["Yes", "No"];
  const router = useRouter();
  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">
        Tags and Uses of the product
      </div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        <div className="w-full ">
          <MultipleSearchAutocomplete
            title={"Symptoms"}
            item={symptoms}
            setItem={setSymptoms}
            links={symptomLinks}
            setLinks={setSymptomLinks}
            searchUrl={`${"master-data/symptom"}`}
          />

          <div className="mt-1 mb-4 flex  items-center flex-wrap">
            {symptoms?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  const _data = [...symptoms];
                  setSymptoms([
                    ..._data.filter((item2, index2) => index !== index2),
                  ]);
                  setSymptomLinks([
                    ...symptomLinks.filter((item3, index3) => index !== index3),
                  ]);
                }}
                className="px-2 p-1 mr-2 my-1 text-xs bg-green-100 rounded-md cursor-pointer group"
              >
                <div className="flex space-x-3">
                  <div className="">{item}</div>
                  <TrashIcon className="h-4 w-4 text-red-500 hidden group-hover:block" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full ">
          <MultipleSearchAutocomplete
            title={"Uses"}
            item={uses}
            setItem={setUses}
            links={usesLinks}
            setLinks={setUsesLinks}
            searchUrl={`${"master-data/uses"}`}
          />

          {uses?.length > 0 && (
            <div className="mt-1 mb-4 flex  items-center flex-wrap">
              {uses?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const _data = [...uses];
                    setUses([
                      ..._data.filter((item2, index2) => index !== index2),
                    ]);
                    setUsesLinks([
                      ...usesLinks.filter((item3, index3) => index !== index3),
                    ]);
                  }}
                  className="px-2 p-1 mr-2 my-1 text-xs bg-green-100 rounded-md group cursor-pointer"
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

        {/* <div className="w-full ">
          <div className="flex justify-between">
            <label
              for="first_name"
              class="block mb-1 text-sm font-normal text-gray-600 "
            >
              Uses
            </label>
            <div
              onClick={() => addUses()}
              className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
            >
              Click here to add
            </div>
          </div>
          <input
            type="text"
            id="first_name"
            className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
            required
            value={use}
            autoComplete="off"
            onChange={(e) => setUse(e.target.value)}
          />
          {uses?.length > 0 && (
            <div className="mt-1 mb-3 flex space-x-2 items-center">
              {uses?.map((item, index) => (
                <div className="px-2 p-1 text-xs bg-green-100 rounded-md">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div> */}
        {/* <DefaultInput
          label="Uses"
          value={uses}
          onChange={(e) => setUses(e.target.value)}
        /> */}
        {router?.pathname === "/new-product" && (
          <DefaultInput
            label="Advantages"
            value={adv}
            onChange={(e) => setAdv(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default TagsInfo;
