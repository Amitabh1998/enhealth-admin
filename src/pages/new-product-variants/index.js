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
import SpecificationsFormForProduct from "@/components/Forms/SpecificationsFormForProduct";
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
  const [uses, setUses] = useState("");
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
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [warrantyProvider, setWarrantyProvider] = useState("");
  const [customerCareNo, setCustomerCareNo] = useState("");
  const [coveredInWarranty, setCoveredInWarranty] = useState("");
  const [warrantyExclusion, setWarrantyExclusion] = useState("");
  const [safetyInformation, setSafetyInformation] = useState("");
  const [advantages, setAdvantages] = useState("");

  useEffect(() => {
    console.log(ingredient);
    console.log(router?.pathname);
    setUses(ingredient?.uses ? ingredient.uses : "");
  }, [ingredient]);

  const router = useRouter();

  useEffect(() => {
    console.log(attachments);
  }, [attachments]);

  const saveHandler = async () => {
    try {
      console.log(manufacturer?._id);
      const response = await addCommonData(
        {
          name: name,
          manufacturer: manufacturer?._id,
          category: category._id,
          subCategories: subCategories?._id ? [subCategories?._id] : [],
          minOrderQuantity: parseInt(minOrderQuantity),
          maxOrderQuantity: parseInt(maxOrderQuantity),
          attachments: attachments,
          packaging: packaging,
          symptoms: symptoms,
          originalPrice: parseInt(originalPrice),
          sellingPrice: parseInt(sellingPrice),
          wholesalePrice: parseInt(wholesalePrice),
          volumetricDiscount: volumetricDiscount,
          subscriptionDiscount: parseInt(subscriptionDiscount),
          maximumDiscountPercentage: parseInt(maximumDiscountPercentage),
          minimumMarginPercentage: parseInt(minimumMarginPercentage),
          // narcotics: narcotics,
          // scheduleH: scheduleH,
          // scheduleH1: scheduleH1,
          hsn: hsn,
          taxCategory: taxCategory,
          storage: storage,
          specification: specification,
          uses: uses,
          advantages: advantages,
          instructions: instructions,
          // adverseEffects: adverseEffects,
          // medicineWorkingProcedure: medicineWorkingProcedure,
          // drugInteractions: drugInteractions,
          // foodAndMedicineInteractions: foodAndMedicineInteractions,
          // howDiseaseAffectDrug: howDiseaseAffectDrug,

          // skippedDosage: skippedDosage,
          warranty: {
            warrantyPeriod,
            warrantyProvider,
            customerCareNo,
            coveredInWarranty,
            warrantyExclusion,
          },
          safetyInformation: specificGuidance,
          // infoBox: {
          //   drugChemistry: drugChemistry,
          //   creatingHabits: false,
          //   medicineCategory: "64c51315c6d9376137a4d5f1",
          //   activity: "Alpha-glucosidase inhibitors",
          // },
          faq: faq,
        },
        "products/product-details"
      );

      console.log(response);
      toast.success("Product created successfully");
      router.push("/products");
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
                New Product
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
          />
          <SpecificationsFormForProduct
            instructions={instructions}
            setInstructions={setInstructions}
            specification={specification}
            setSpecification={setSpecification}
            specificGuidance={specificGuidance}
            setSpecificGuidance={setSpecificGuidance}
            medicineWorkingProcedure={medicineWorkingProcedure}
            setMedicineWorkingProcedure={setMedicineWorkingProcedure}
            safetyInformation={safetyInformation}
            setSafetyInformation={setSafetyInformation}
          />
          <WarrantyForm
            warrantyPeriod={warrantyPeriod}
            setWarrantyPeriod={setWarrantyPeriod}
            warrantyProvider={warrantyProvider}
            setWarrantyProvider={setWarrantyProvider}
            customerCareNo={customerCareNo}
            setCustomerCareNo={setCustomerCareNo}
            coveredInWarranty={coveredInWarranty}
            setCoveredInWarranty={setCoveredInWarranty}
            warrantyExclusion={warrantyExclusion}
            setWarrantyExclusion={setWarrantyExclusion}
          />

          {/* <ProductInteractionForm
            drugInteractions={drugInteractions}
            setDrugInteractions={setDrugInteractions}
            foodAndMedicineInteractions={foodAndMedicineInteractions}
            setFoodAndMedicineInteractions={setFoodAndMedicineInteractions}
          /> */}
          {/* <ProductEffectsForm
            adverseEffects={adverseEffects}
            setAdverseEffects={setAdverseEffects}
            howDiseaseAffectDrug={howDiseaseAffectDrug}
            setHowDiseaseAffectDrug={setHowDiseaseAffectDrug}
            skippedDosage={skippedDosage}
            setSkippedDosage={setSkippedDosage}
          /> */}
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
          <UploadImagesForm
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <TagsInfo
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            uses={uses}
            setUses={setUses}
            adv={advantages}
            setAdv={setAdvantages}
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
            faqs={faq}
            setFaqs={setFaq}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
