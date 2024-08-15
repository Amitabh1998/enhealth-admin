import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import { Listbox, Transition } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
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

const ProductInteractionForm = ({
  drugInteractions,
  setDrugInteractions,
  foodAndMedicineInteractions,
  setFoodAndMedicineInteractions,
}) => {
  const [advantage, setAdvantage] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  const addAdvantageHandler = () => {
    // const _xsymptoms = [...drugInteractions];

    // if (advantage.trim() !== "") {
    //   setDrugInteractions([..._symptoms, advantage]);
    //   setAdvantage("");
    // }

    const _symptoms = [...drugInteractions];
    if (advantage.trim() !== "") {
      if (editOpen) {
        _symptoms[editIndex] = advantage;
        setDrugInteractions(_symptoms);
      } else {
        setDrugInteractions([..._symptoms, advantage]);
      }
      setAdvantage("");
      setEditOpen(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">
        Product Interactions
      </div>
      <div className="my-3 h-px w-full bg-gray-300"></div>
      <div className="w-full ">
        <div className="flex justify-between">
          <label
            for="first_name"
            class="block mb-1  font-normal text-gray-500 "
          >
            Drug Interactions
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
          {drugInteractions?.map((item, index) => (
            <div className="mr-2 mt-1 px-2 p-1 text-xs bg-green-100 rounded-md cursor-pointer group">
              <div key={index} className="flex space-x-3">
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
                      const _data = [...drugInteractions];
                      setDrugInteractions([
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
      <DefaultTextarea
        label={"Food and medicines interactions"}
        value={foodAndMedicineInteractions}
        onChange={(e) => setFoodAndMedicineInteractions(e.target.value)}
      />
    </div>
  );
};

export default ProductInteractionForm;
