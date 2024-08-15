import MultipleImageUploaderInput from "@/components/Inputs/MultipleImageUploaderInput";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import ImageUploading from "react-images-uploading";

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

const UploadImagesForm = ({ attachments, setAttachments }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(
    manufacturer[0]
  );

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

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">
        Upload Images for the Product
      </div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div>
        <div className="w-full ">
          <MultipleImageUploaderInput
            label={""}
            multiple
            data={attachments}
            setData={setAttachments}
            direction="col"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImagesForm;
