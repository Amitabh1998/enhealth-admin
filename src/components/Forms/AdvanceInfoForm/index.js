import DefaultInput from "@/components/Inputs/DefaultInput";
import { Listbox, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon, PencilIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const manufacturer = [{ name: "Applicable" }, { name: "Not Applicable" }];

const category = [
  { name: "category 1" },
  { name: "category 2" },
  { name: "category 3" },
  { name: "category 4" },
];

const AdvanceInfoForm = ({
  volumetricDiscount,
  setVolumetricDiscount,
  volumetricDiscountVolume,
  setVolumetricDiscountVolume,
  volumetricDiscountDiscount,
  setVolumetricDiscountDiscount,
  subscriptionDiscount,
  setSubscriptionDiscount,
  minimumMarginPercentage,
  setMinimumMarginPercentage,
  maximumDiscountPercentage,
  setMaximumDiscountPercentage,
  defaultDiscount,
  setDefaultDiscount,
}) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(
    manufacturer[0]
  );

  const addDiscountHandler = async () => {
    const _volumetric = [...volumetricDiscount];

    setVolumetricDiscount([
      ..._volumetric,
      {
        volume: volumetricDiscountVolume,
        discount: volumetricDiscountDiscount,
      },
    ]);

    setVolumetricDiscountVolume("");
    setVolumetricDiscountDiscount("");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Discount Info</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between">
            <label
              for="first_name"
              class="block mb-1 text-sm font-normal text-gray-600 "
            >
              Discount
            </label>
            <div
              onClick={() => addDiscountHandler()}
              className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
            >
              Click here to Add
            </div>
          </div>
          <div className="flex justify-between space-x-3">
            <DefaultInput
              type="Number"
              label="Volume"
              value={volumetricDiscountVolume}
              onChange={(e) => setVolumetricDiscountVolume(e.target.value)}
            />
            <DefaultInput
              type="Number"
              label="Discount Value"
              value={volumetricDiscountDiscount}
              onChange={(e) => setVolumetricDiscountDiscount(e.target.value)}
            />
          </div>
          <div className="mt-3 flex space-x-2 items-center flex-wrap">
            {volumetricDiscount?.map((item, index) => (
              <div className="flex px-2 p-1 text-xs bg-green-100 rounded-md cursor-pointer group">
                <div>
                  Volume: {item.volume} - Discount: {item.discount} %
                </div>
                <div className="flex w-12 ml-2 space-x-2">
                  <PencilIcon
                    onClick={() => {
                      if (
                        volumetricDiscountVolume?.trim() === "" &&
                        volumetricDiscountDiscount?.trim() === ""
                      ) {
                        setVolumetricDiscountVolume(item.volume);
                        setVolumetricDiscountDiscount(item?.discount);
                        const _data = [...volumetricDiscount];
                        setVolumetricDiscount([
                          ..._data.filter((item2, index2) => index !== index2),
                        ]);
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
                      const _data = [...volumetricDiscount];
                      setVolumetricDiscount([
                        ..._data.filter((item2, index2) => index !== index2),
                      ]);
                    }}
                    className="h-4 w-4 text-red-500 hidden group-hover:block"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <DefaultInput
          type="Number"
          label="Default Discount"
          value={defaultDiscount}
          onChange={(e) => setDefaultDiscount(e.target.value)}
        />
        <DefaultInput
          type="Number"
          label="Subscription Discount"
          value={subscriptionDiscount}
          onChange={(e) => setSubscriptionDiscount(e.target.value)}
        />
        <DefaultInput
          type="Number"
          label="Minimum Margin Percentage"
          value={minimumMarginPercentage}
          onChange={(e) => setMinimumMarginPercentage(e.target.value)}
        />
        <DefaultInput
          type="Number"
          label="Maximum Discount Percentage"
          value={maximumDiscountPercentage}
          onChange={(e) => setMaximumDiscountPercentage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdvanceInfoForm;
