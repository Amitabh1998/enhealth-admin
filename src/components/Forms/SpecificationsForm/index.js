import EditTextDialog from "@/components/Dialogs/EditTextDialog";
import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
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

const SpecificationsForm = ({
  instructions,
  setInstructions,
  specification,
  setSpecification,
  specificGuidance,
  setSpecificGuidance,
  medicineWorkingProcedure,
  setMedicineWorkingProcedure,
}) => {
  const router = useRouter();

  const [advantage, setAdvantage] = useState("");
  const [guide, setGuide] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const addAdvantageHandler = () => {
    const _symptoms = [...specification];
    if (advantage.trim() !== "") {
      if (editOpen) {
        _symptoms[editIndex] = advantage;
        setSpecification(_symptoms);
      } else {
        setSpecification([..._symptoms, advantage]);
      }
      setAdvantage("");
      setEditOpen(false);
    }
  };

  const addGuidance = () => {
    const _guidance = [...specificGuidance];
    if (guide.trim() !== "") {
      if (editOpen) {
        _guidance[editIndex] = guide;
        setSpecificGuidance([..._guidance]);
      } else {
        setSpecificGuidance([..._guidance, guide]);
      }
      setGuide("");
      setEditOpen(false);
    }
  };

  console.log("Instructions Changes", instructions);

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">
        Product Specifications
      </div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      {/* <SearchAutocomplete
        title={"Product instructions to Use"}
        item={instructions}
        setItem={setInstructions}
        searchUrl={"master-data/instruction"}
        limit={10}
      /> */}

      <DefaultTextarea
        label={"Product instructions to Use"}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <div className="w-full mt-3">
        <div className="flex justify-between">
          <label
            for="first_name"
            class="block mb-1  font-normal text-gray-500 "
          >
            Product specification
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
          {specification &&
            specification?.map((item, index) => (
              <div
                key={index}
                className="mr-2 mt-1 px-2 p-1 text-xs bg-green-100 rounded-md cursor-pointer group "
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
                          const _data = [...specification];
                          // setSpecification([
                          //   ..._data.filter(
                          //     (item2, index2) => index !== index2
                          //   ),
                          // ]);
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
                        const _data = [...specification];
                        setSpecification([
                          ..._data.filter((item2, index2) => index !== index2),
                        ]);
                      }}
                      className="h-4 w-4 text-red-500 hidden group-hover:block"
                    />
                  </div>{" "}
                </div>
              </div>
            ))}
        </div>
      </div>
      {router.pathname === "/new-product" ? (
        <DefaultTextarea
          label={"Safety Information"}
          value={specificGuidance}
          onChange={(e) => setSpecificGuidance(e.target.value)}
        />
      ) : (
        <div className="w-full ">
          <div className="flex justify-between">
            <label
              for="first_name"
              class="block mb-1  font-normal text-gray-500 "
            >
              Specific Guidance
            </label>
            <div
              onClick={() => addGuidance()}
              className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
            >
              Click here to add
            </div>
          </div>
          <DefaultTextarea
            // label="Product specification"
            value={guide}
            onChange={(e) => setGuide(e.target.value)}
          />
          <div className="mt-1 mb-3 flex items-center flex-wrap">
            {specificGuidance?.map((item, index) => (
              <div
                key={index}
                className="mr-2 mt-1 px-2 p-1 text-xs bg-green-100 rounded-md cursor-pointer group"
              >
                <div className="flex space-x-3">
                  <div>{item}</div>
                  <div className="flex w-12 space-x-2">
                    <PencilIcon
                      onClick={() => {
                        if (guide.trim() === "") {
                          setEditOpen(true);
                          setEditIndex(index);
                          setGuide(item);
                          const _data = [...specificGuidance];
                          // setSpecificGuidance([
                          //   ..._data.filter(
                          //     (item2, index2) => index !== index2
                          //   ),
                          // ]);
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
                        const _data = [...specificGuidance];
                        setSpecificGuidance([
                          ..._data.filter((item2, index2) => index !== index2),
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
      {router.pathname === "/new-product" ? null : (
        <DefaultTextarea
          label={"How medicine works"}
          value={medicineWorkingProcedure}
          onChange={(e) => setMedicineWorkingProcedure(e.target.value)}
        />
      )}
    </div>
  );
};

export default SpecificationsForm;
