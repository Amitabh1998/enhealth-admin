import { addCommonData } from "@/api/common";
import { getAllData } from "@/api/stakeholder-management/common";
import AdvanceInfoForm from "@/components/Forms/AdvanceInfoForm";
import BasicInfo from "@/components/Forms/BasicInfoForm";
import MiscForm from "@/components/Forms/MiscForm";
import OtherInfoCopy from "@/components/Forms/OtherInfoCopy";
import PackagingForm from "@/components/Forms/PackagingForm";
import ProductEffectsForm from "@/components/Forms/ProductEffectsForm";
import ProductInteractionForm from "@/components/Forms/ProductInteractionForm";
import SpecificationsForm from "@/components/Forms/SpecificationsForm";
import TagsInfo from "@/components/Forms/TagsForm";
import UploadImagesForm from "@/components/Forms/UploadImagesForm";
import DefaultAutocomplete from "@/components/Inputs/DefaultAutocomplete";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const [saveLoading, setSaveLoading] = useState("");
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [storage, setStorage] = useState(null);
  const [adverseEffects, setAdverseEffects] = useState(null);
  const [drugChemistry, setDrugChemistry] = useState([]);
  const [creatingHabbits, setCreatingHabbits] = useState(false);
  const [references, setReferences] = useState([]);
  const [uses, setUses] = useState([]);
  const [therapeuticAdvantages, setTherapeuticAdvantages] = useState([]);
  const [taxCategory, setTaxCategory] = useState(null);
  const [specification, setSpecification] = useState([]);
  const [specificGuidance, setSpecificGuidance] = useState([]);
  const [faq, setFaq] = useState([]);
  const [skippedDosage, setSkippedDosage] = useState("");
  const [scheduleH1, setScheduleH1] = useState(false);
  const [scheduleH, setScheduleH] = useState(false);
  const [prescriptionNeeded, setPrescriptionNeeded] = useState(false);
  const [narcotics, setNarcotics] = useState(false);
  const [medicineWorkingProcedure, setMedicineWorkingProcedure] = useState("");
  const [medicineType, setMedicineType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [hsn, setHsn] = useState("");
  const [howDiseaseAffectDrug, setHowDiseaseAffectDrug] = useState("");
  const [foodAndMedicineInteractions, setFoodAndMedicineInteractions] =
    useState("");
  const [drugInteractions, setDrugInteractions] = useState("");
  const [medicineClass, setMedicineClass] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [minOrderQuantity, setMinOrderQuantity] = useState(null);
  const [maxOrderQuantity, setMaxOrderQuantity] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [packaging, setPackaging] = useState("");
  const [unit1, setUnit1] = useState("");
  const [unit2, setUnit2] = useState("");
  const [gender, setGender] = useState(3);
  const [symptoms, setSymptoms] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [wholesalePrice, setWholesalePrice] = useState(null);
  const [volumetricDiscount, setVolumetricDiscount] = useState([]);
  const [volumetricDiscountVolume, setVolumetricDiscountVolume] =
    useState(null);
  const [volumetricDiscountDiscount, setVolumetricDiscountDiscount] =
    useState(null);
  const [subscriptionDiscount, setSubscriptionDiscount] = useState(null);
  const [minimumMarginPercentage, setMinimumMarginPercentage] = useState(null);
  const [maximumDiscountPercentage, setMaximumDiscountPercentage] =
    useState(null);
  const [habbitForming, setHabbitForming] = useState(false);
  const [activity, setActivity] = useState("");
  const [safetyGuidance, setSafetyGuidance] = useState([]);
  const [medicineCategory, setMedicineCategory] = useState("");
  const [defaultDiscount, setDefaultDiscount] = useState("");
  const [symptomLinks, setSymptomLinks] = useState([]);
  const [referenceLinks, setReferenceLinks] = useState([]);
  const [usesLinks, setUsesLinks] = useState([]);
  const [type, setType] = useState(1);

  const replaceMedicineName = (data) => {
    if (name.trim() === "") {
      return data;
    }

    if (typeof data === "string") {
      // If data is a string, check if it contains "This medicine"
      if (data.includes("This medicine")) {
        return data.replace(/This medicine/g, name);
      } else {
        return data;
      }
    } else if (Array.isArray(data)) {
      // If data is an array, map through each element and replace if necessary
      return data.map((item) => {
        if (typeof item === "object") {
          // If item is an object, recursively traverse through its keys and values
          const newItem = {};
          for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
              newItem[key] = replaceMedicineName(item[key], name);
            }
          }
          return newItem;
        } else if (typeof item === "string") {
          // If item is a string, replace if necessary
          if (item.includes("This medicine")) {
            return item.replace(/This medicine/g, name);
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      return data;
    }
  };

  useEffect(() => {
    console.log(ingredient);
    console.log(router?.pathname);
    if (ingredient && ingredient?.name.trim() !== "") {
      setHsn(ingredient?.hsn ? { code: ingredient?.hsn } : "");
      setFaq(
        ingredient && ingredient?.faq
          ? replaceMedicineName(ingredient?.faq)
          : []
      );
      setStorage(ingredient && ingredient?.storage ? ingredient?.storage : "");
      setTaxCategory(
        ingredient && ingredient?.taxCategory ? ingredient?.taxCategory : ""
      );
      setReferences(
        ingredient && ingredient?.references ? ingredient?.references : ""
      );
      setAdverseEffects(
        ingredient && ingredient?.adverseEffects
          ? ingredient?.adverseEffects
          : []
      );
      setFoodAndMedicineInteractions(
        ingredient && ingredient?.foodAndMedicineInteractions
          ? replaceMedicineName(ingredient?.foodAndMedicineInteractions)
          : ""
      );
      setHowDiseaseAffectDrug(
        ingredient && ingredient?.howDiseaseAffectDrug
          ? replaceMedicineName(ingredient?.howDiseaseAffectDrug)
          : ""
      );
      setMedicineWorkingProcedure(
        ingredient && ingredient?.medicineWorkingProcedure
          ? replaceMedicineName(ingredient?.medicineWorkingProcedure)
          : ""
      );
      setMedicineCategory(
        ingredient && ingredient?.infoBox?.medicineCategory
          ? ingredient?.infoBox?.medicineCategory
          : ""
      );
      setInstructions(
        ingredient && ingredient?.instructions
          ? replaceMedicineName(ingredient?.instructions)
          : ""
      );
      setDrugInteractions(
        ingredient && ingredient?.drugInteractions
          ? replaceMedicineName(ingredient?.drugInteractions)
          : []
      );
      setTherapeuticAdvantages(
        ingredient && ingredient?.therapeuticAdvantages
          ? replaceMedicineName(ingredient?.therapeuticAdvantages)
          : []
      );
      setSymptoms(
        ingredient && ingredient?.symptoms ? ingredient?.symptoms : []
      );
      setSkippedDosage(
        ingredient && ingredient?.skippedDosage
          ? replaceMedicineName(ingredient?.skippedDosage)
          : ""
      );
      setSpecification(
        ingredient && ingredient?.specification
          ? replaceMedicineName(ingredient?.specification)
          : ""
      );
      setSpecificGuidance(
        ingredient && ingredient?.specificGuidance
          ? replaceMedicineName(ingredient?.specificGuidance)
          : []
      );
      setActivity(
        ingredient && ingredient?.infoBox?.activity
          ? ingredient?.infoBox?.activity
          : ""
      );
      setDrugChemistry(
        ingredient && ingredient?.infoBox?.drugChemistry
          ? ingredient?.infoBox?.drugChemistry
          : []
      );
      setNarcotics(
        ingredient && ingredient?.narcotics ? ingredient?.narcotics : false
      );
      setScheduleH(
        ingredient && ingredient?.scheduleH ? ingredient?.scheduleH : false
      );
      setScheduleH1(
        ingredient && ingredient?.scheduleH1 ? ingredient?.scheduleH1 : false
      );
      setPrescriptionNeeded(
        ingredient && ingredient?.prescriptionNeeded
          ? ingredient?.prescriptionNeeded
          : false
      );
      setReferenceLinks(
        ingredient?.referenceLinks
          ? ingredient?.referenceLinks
          : ingredient?.references
          ? ingredient?.references.map((item) => "")
          : []
      );
      setUsesLinks(
        ingredient?.usesLinks
          ? ingredient?.usesLinks
          : ingredient?.uses
          ? ingredient?.uses.map((item) => "")
          : []
      );
      setSymptomLinks(
        ingredient?.symptomLinks
          ? ingredient?.symptomLinks
          : ingredient?.symptoms
          ? ingredient?.symptoms.map((item) => "")
          : []
      );
      setSafetyGuidance(
        ingredient && ingredient?.safetyGuidance
          ? replaceMedicineName(ingredient?.safetyGuidance)
          : []
      );
      if (ingredient && ingredient?.uses && Array.isArray(ingredient.uses)) {
        setUses(ingredient && ingredient.uses ? ingredient.uses : []);
      } else {
        setUses(
          ingredient && ingredient.uses ? ingredient?.uses?.split("***") : []
        );
      }
    }
  }, [ingredient]);

  const router = useRouter();

  useEffect(() => {
    console.log(attachments);
  }, [attachments]);

  const saveHandler = async () => {
    try {
      console.log(
        referenceLinks,
        symptomLinks,
        usesLinks,
        type,
        category,
        subCategories
      );
      const response = await addCommonData(
        {
          name: name,
          medicineClass: 3,
          manufacturer: manufacturer?._id,
          category: category._id,
          subCategories: subCategories?._id ? [subCategories?._id] : [],
          minOrderQuantity: parseInt(minOrderQuantity),
          maxOrderQuantity: parseInt(maxOrderQuantity),
          attachments: attachments,
          packaging: packaging,
          unit1: unit1,
          unit2: unit2,
          gender: gender === 1 ? [1] : gender === 2 ? [2] : [1, 2],
          symptoms: symptoms,
          originalPrice: parseInt(originalPrice),
          sellingPrice: parseInt(sellingPrice),
          wholesalePrice: parseInt(wholesalePrice),
          volumetricDiscount: volumetricDiscount,
          subscriptionDiscount: parseInt(subscriptionDiscount),
          maximumDiscountPercentage: parseInt(maximumDiscountPercentage),
          minimumMarginPercentage: parseInt(minimumMarginPercentage),
          ingredients: [ingredient._id],
          prescriptionNeeded: prescriptionNeeded,
          medicineType: packaging,
          hsn: hsn?.code,
          taxCategory: taxCategory,
          storage: storage,
          specification: specification,
          uses: uses,
          therapeuticAdvantages: therapeuticAdvantages,
          instructions: instructions,
          specificGuidance: specificGuidance,
          references: references,
          faq: faq,
          referenceLinks,
          symptomLinks,
          usesLinks,
          medicineCategoryType: type,
        },
        "medicines/medicine-details"
      );

      console.log(response);
      toast.success("Medicine created successfully");
      router.back();
    } catch (error) {
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
                href="/medicines"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Medicine Management
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
                New Ayurvedic Medicine
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* -----------------------------FORM------------------------- */}
      <div className="grid md:grid-cols-10 gap-3 md:gap-5 pt-5 ">
        {/* -------------Column 1-------------------  */}
        <div className="w-full md:col-span-6 space-y-5">
          <BasicInfo
            name={name}
            setName={setName}
            ingredient={ingredient}
            setIngredient={setIngredient}
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            hsn={hsn}
            setHsn={setHsn}
            category={category}
            setCategory={setCategory}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            medicineClass={medicineClass}
            setMedicineClass={setMedicineClass}
            type={type}
            setType={setType}
          />
          <SpecificationsForm
            instructions={instructions}
            setInstructions={setInstructions}
            specification={specification}
            setSpecification={setSpecification}
            specificGuidance={specificGuidance}
            setSpecificGuidance={setSpecificGuidance}
            medicineWorkingProcedure={medicineWorkingProcedure}
            setMedicineWorkingProcedure={setMedicineWorkingProcedure}
          />
          <OtherInfoCopy
            drugChemistry={drugChemistry}
            setDrugChemistry={setDrugChemistry}
            therapeuticAdvantages={therapeuticAdvantages}
            setTherapeuticAdvantages={setTherapeuticAdvantages}
            storage={storage}
            setStorage={setStorage}
            narcotics={narcotics}
            setNarcotics={setNarcotics}
            scheduleH1={scheduleH1}
            setScheduleH1={setScheduleH1}
            scheduleH={scheduleH}
            setScheduleH={setScheduleH}
            prescriptionNeeded={prescriptionNeeded}
            setPrescriptionNeeded={setPrescriptionNeeded}
            minOrderQuantity={minOrderQuantity}
            setMinOrderQuantity={setMinOrderQuantity}
            maxOrderQuantity={maxOrderQuantity}
            setMaxOrderQuantity={setMaxOrderQuantity}
            medicineCategory={medicineCategory}
            setMedicineCategory={setMedicineCategory}
            activity={activity}
            setActivity={setActivity}
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
          <AdvanceInfoForm
            volumetricDiscount={volumetricDiscount}
            setVolumetricDiscount={setVolumetricDiscount}
            volumetricDiscountVolume={volumetricDiscountVolume}
            setVolumetricDiscountVolume={setVolumetricDiscountVolume}
            volumetricDiscountDiscount={volumetricDiscountDiscount}
            setVolumetricDiscountDiscount={setVolumetricDiscountDiscount}
            subscriptionDiscount={subscriptionDiscount}
            setSubscriptionDiscount={setSubscriptionDiscount}
            minimumMarginPercentage={minimumMarginPercentage}
            setMinimumMarginPercentage={setMinimumMarginPercentage}
            maximumDiscountPercentage={maximumDiscountPercentage}
            setMaximumDiscountPercentage={setMaximumDiscountPercentage}
            defaultDiscount={defaultDiscount}
            setDefaultDiscount={setDefaultDiscount}
          />
          <UploadImagesForm
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <TagsInfo
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            symptomLinks={symptomLinks}
            setSymptomLinks={setSymptomLinks}
            uses={uses}
            setUses={setUses}
            usesLinks={usesLinks}
            setUsesLinks={setUsesLinks}
          />
          <PackagingForm
            packaging={packaging}
            setPackaging={setPackaging}
            unit1={unit1}
            setUnit1={setUnit1}
            unit2={unit2}
            setUnit2={setUnit2}
            originalPrice={originalPrice}
            setOriginalPrice={setOriginalPrice}
            sellingPrice={sellingPrice}
            setSellingPrice={setSellingPrice}
            wholesalePrice={wholesalePrice}
            setWholesalePrice={setWholesalePrice}
            taxCategory={taxCategory}
            setTaxCategory={setTaxCategory}
          />
          <MiscForm
            gender={gender}
            setGender={setGender}
            references={references}
            setReferences={setReferences}
            referenceLinks={referenceLinks}
            setReferenceLinks={setReferenceLinks}
            faqs={faq}
            setFaqs={setFaq}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
