import HSNSearchAutocomplete from "@/components/HSNSearchAutocomplete";
import DefaultAutocomplete from "@/components/Inputs/DefaultAutocomplete";
import DefaultInput from "@/components/Inputs/DefaultInput";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

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

const BasicInfo = ({
  name,
  setName,
  ingredient,
  setIngredient,
  category,
  setCategory,
  subCategories,
  setSubCategories,
  medicineClass,
  setMedicineClass,
  manufacturer,
  setManufacturer,
  hsn,
  setHsn,
  type,
  setType,
}) => {
  const [status, setStatus] = useState(1);

  const router = useRouter();

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Basic Info</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div className="space-y-3">
        {router.pathname.includes("ingredients") ? null : (
          <DefaultInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {router?.pathname === "/new-product" ||
        router?.pathname === "/new-product-variants" ||
        router.pathname.includes("ingredients") ? null : (
          <SearchAutocomplete
            title={"Ingredient"}
            item={ingredient}
            setItem={setIngredient}
            searchUrl={"master-data/ingredients"}
          />
        )}
        <HSNSearchAutocomplete
          title={"HSN Code"}
          item={hsn}
          setItem={setHsn}
          searchUrl={"master-data/hsn-code"}
        />
        {/* <DefaultInput
          label="HSN"
          value={hsn}
          onChange={(e) => setHsn(e.target.value)}
        /> */}
        {router?.pathname === "/new-product" ||
        router?.pathname === "/new-product-variants" ||
        router.pathname.includes("ingredients") ? null : (
          <div>
            <div className="mb-1 text-gray-600 text-sm">{"Medicine Type"}</div>
            <div className="flex justify-center space-x-4">
              <div
                className={`flex-1 p-2 rounded-lg border ${
                  status === 1 ? "border-bluePrimary" : ""
                }`}
                onClick={() => {
                  setStatus(1);
                  setType(1);
                }}
              >
                Branded
              </div>
              <div
                className={`flex-1 p-2 rounded-lg border ${
                  status === 2 ? "border-bluePrimary" : ""
                }`}
                onClick={() => {
                  setStatus(2);
                  setType(2);
                }}
              >
                Generic
              </div>
            </div>
          </div>
        )}
        {router.pathname.includes("ingredients") ? null : (
          <SearchAutocomplete
            title={"Category"}
            item={category}
            setItem={setCategory}
            searchUrl={`${
              router?.pathname === "/new-product"
                ? "master-data/product-category"
                : "master-data/medicine-category"
            }`}
            query={`${
              router?.pathname === "/new-product" ? "categoryType[$in]=2&" : ""
            }`}
          />
        )}
        {category && (
          <SearchAutocomplete
            title={"Sub category"}
            item={subCategories}
            setItem={setSubCategories}
            searchUrl={`${
              router?.pathname === "/new-product"
                ? "master-data/product-sub-category"
                : "master-data/medicine-sub-category"
            }`}
            limit={-1}
            query={`${
              router?.pathname === "/new-product"
                ? "productCategory="
                : "medicineCategory="
            }${category._id}&`}
          />
        )}
        {router.pathname.includes("ingredients") ? null : (
          <SearchAutocomplete
            title={"Manufacturer"}
            item={manufacturer}
            setItem={setManufacturer}
            searchUrl={"master-data/manufacturer"}
            limit={10}
          />
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
