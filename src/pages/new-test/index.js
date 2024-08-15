import { addCommonData } from "@/api/common";
import { getAllData } from "@/api/stakeholder-management/common";
import AdvanceInfoForm from "@/components/Forms/AdvanceInfoForm";
import BasicInfo from "@/components/Forms/BasicInfoForm";
import BasicInfoFormTest from "@/components/Forms/BasicInfoFormTest";
import OtherInfoCopy from "@/components/Forms/OtherInfoCopy";
import PackagingForm from "@/components/Forms/PackagingForm";
import PricingForm from "@/components/Forms/PricingForm";
import ProductEffectsForm from "@/components/Forms/ProductEffectsForm";
import ProductInteractionForm from "@/components/Forms/ProductInteractionForm";
import SpecificationsForm from "@/components/Forms/SpecificationsForm";
import TagsInfo from "@/components/Forms/TagsForm";
import UploadImagesForm from "@/components/Forms/UploadImagesForm";
import WarrantyForm from "@/components/Forms/WarrantyForm";
import DefaultAutocomplete from "@/components/Inputs/DefaultAutocomplete";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const payload = {
  name: "MRI Scan",
  description:
    "You can now save tax by investing in your health with our Tax Saver Package. As per Section 80D of the Income Tax Act, investing up to Rs. 5000 in Preventive Health Checkups will help you save tax. This includes health checkup for all dependents in your family, including self.",
  reason:
    "You can now save tax by investing in your health with our Tax Saver Package. As per Section 80D of the Income Tax Act, investing up to Rs. 5000 in Preventive Health Checkups will help you save tax. This includes health checkup for all dependents in your family, including self.",
  preparation:
    "It is recommended that you get this checkup done annually to take a closer look at your health. This full body health checkup includes cancer markers along with over 100 other tests for comprehensive full body checkup.",
  type: 1,
  attachment: {
    link: "https://vitmeds-dev.s3.ap-south-1.amazonaws.com/testCategory/images/2023/0610/1686377022094_Complete%20Hemogram%201.png",
    thumbnail:
      "https://vitmeds-dev.s3.ap-south-1.amazonaws.com/testCategory/images/2023/0610/1686377022094_thumbnail_Complete%20Hemogram%201.jpg",
    metadata: {
      size: 88808880,
    },
  },
  topBooked: true,
  actualPrice: 1499,
  sellingPrice: 1299,
  organs: ["Heart"],
};

const index = () => {
  const [saveLoading, setSaveLoading] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [preparation, setPreparation] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [topBooked, setTopBooked] = useState("YES");
  const [actualPrice, setActualPrice] = useState("");
  const [sellingPrice, setsellingPrice] = useState("");
  const [organs, setOrgans] = useState([]);
  const [type, setType] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.type) {
      console.log(router?.query.type);
    }
  }, [router]);

  const saveHandler = async () => {
    try {
      if (parseInt(router?.query?.type) === 1) {
        const response = await addCommonData(
          {
            name: name,
            description: description,
            reason: reason,
            preparation: preparation,
            type: 1,
            attachment: attachment[0],
            topBooked: topBooked === "YES" ? true : false,
            actualPrice: parseInt(actualPrice),
            sellingPrice: parseInt(sellingPrice),
            organs: organs,
          },
          "lab-test/test-category"
        );
        console.log(response);
        toast.success("Lab test created successfully");
        router.push("/lab-tests");
      } else {
        const response = await addCommonData(
          {
            name: name,
            description: description,
            reason: reason,
            preparation: preparation,
            type: 2,
            attachment: attachment[0],
            topBooked: topBooked === "YES" ? true : false,
            actualPrice: parseInt(actualPrice),
            sellingPrice: parseInt(sellingPrice),
            samplesTobeCollected: organs,
          },
          "lab-test/test-category"
        );
        console.log(response);
        toast.success("Lab test created successfully");
        router.push("/lab-tests");
      }
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong");
    }
  };

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
                New Test
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* -----------------------------FORM------------------------- */}
      <div className="grid md:grid-cols-10 gap-3 md:gap-5 pt-5 ">
        {/* -------------Column 1-------------------  */}
        <div className="w-full md:col-span-6 space-y-5">
          <BasicInfoFormTest
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            reason={reason}
            setReason={setReason}
            preparation={preparation}
            setPreparation={setPreparation}
            setTopBooked={setTopBooked}
            topBooked={topBooked}
            organs={organs}
            setOrgans={setOrgans}
          />

          <div className="flex justify-between items-center space-x-7">
            <button
              onClick={() => saveHandler()}
              className=" flex-1 px-6 py-2 rounded-md bg-bluePrimary text-white"
            >
              Save
            </button>
          </div>
        </div>
        {/* -------------Column 2-------------------  */}
        <div className="w-full md:col-span-4 flex flex-col space-y-5">
          <PricingForm
            actualPrice={actualPrice}
            setActualPrice={setActualPrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setsellingPrice}
          />
          <UploadImagesForm
            attachments={attachment}
            setAttachments={setAttachment}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
