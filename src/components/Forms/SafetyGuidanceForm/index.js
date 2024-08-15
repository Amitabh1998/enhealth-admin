import { getAllData } from "@/api/stakeholder-management/common";
import DefaultInput from "@/components/Inputs/DefaultInput";
import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import SpinnerLoader from "@/components/SpinnerLoader";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SafetyGuidanceItem from "../SafetyGuidanceItem";

const option = [
  {
    _id: 1,
    name: "Male",
    value: 1,
  },
  {
    _id: 2,
    name: "Female",
    value: 2,
  },
  {
    _id: 3,
    name: "Both (Male & Female)",
    value: 3,
  },
];

const SafetyGuidanceForm = ({ safetyGuidance, setSafetyGuidance, name }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [dataToPost, setDataToPost] = useState([]);
  const [safeData, setSafeData] = useState([]);

  const getDropdownData = async () => {
    try {
      const response = await getAllData(
        -1,
        0,
        "master-data/safety-guidance-parameter?"
      );
      setData(response);
      setDataToPost(
        response.map((item, index) => {
          return {
            type: item?._id,
            safetyParameter: 1,
            guidance: "",
            effect: "",
          };
        })
      );
      console.log(response);

      // if (safetyGuidance.length > 0) {
      //   const mergedArray = response?.map((dataItem) => {
      //     const matchedGuidance = safetyGuidance.find(
      //       (guidanceItem) => guidanceItem.type === dataItem?._id
      //     );
      //     if (matchedGuidance) {
      //       return {
      //         _id: matchedGuidance?.type,
      //         name: dataItem?.name,
      //         guidance: matchedGuidance?.guidance
      //           ? matchedGuidance?.guidance
      //           : "",
      //         safetyParameter: matchedGuidance?.safetyParameter
      //           ? matchedGuidance?.safetyParameter
      //           : 1,
      //         effect: matchedGuidance?.effect ? matchedGuidance?.effect : "",
      //         attachment: dataItem?.attachment,
      //       };
      //     } else {
      //       return dataItem;
      //     }
      //   });
      //   console.log(mergedArray);
      //   setData([...mergedArray]);
      // } else {
      //   console.log("safety guidance 0");
      //   setData(response);
      // }
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    if (safetyGuidance.length > 0) {
      const mergedArray = data?.map((dataItem) => {
        const matchedGuidance = safetyGuidance.find(
          (guidanceItem) => guidanceItem.type === dataItem?._id
        );
        if (matchedGuidance) {
          const result = {
            _id: matchedGuidance?.type,
            name: dataItem?.name,
            guidance: matchedGuidance?.guidance
              ? matchedGuidance?.guidance
              : "",
            effect: matchedGuidance?.effect ? matchedGuidance?.effect : "",
            attachment: dataItem?.attachment,
          };

          if (
            matchedGuidance?.safetyParameter &&
            matchedGuidance?.safetyParameter !== null
          ) {
            result.safetyParameter = matchedGuidance?.safetyParameter;
          }

          return result;
        } else {
          return dataItem;
        }
      });
      console.log(mergedArray);
      setData([...mergedArray]);
    } else {
      console.log("safety guidance 0");
      setData(data);
    }
  }, [safetyGuidance]);

  useEffect(() => {
    getDropdownData();
  }, []);

  const updateData = (updatedItem) => {
    const updatedData = data?.map((item, index) => {
      if (item._id === updatedItem._id) {
        console.log("match ITEm : ", updatedItem, item);
        const result = {
          _id: item._id,
          type: item._id,
          name: item.name,
          guidance: updatedItem.guidance ? updatedItem.guidance : "",
          effect: updatedItem.effect ? updatedItem.effect : "",
        };
        if (
          updatedItem?.safetyParameter &&
          updatedItem?.safetyParameter !== null
        ) {
          result.safetyParameter = updatedItem?.safetyParameter;
        }
        // return {
        //   _id: item._id,
        //   type: item._id,
        //   name: item.name,
        //   safetyParameter: updatedItem.safetyParameter
        //     ? updatedItem.safetyParameter
        //     : null,
        //   guidance: updatedItem.guidance ? updatedItem.guidance : "",
        //   effect: updatedItem.effect ? updatedItem.effect : "",
        // };
        return result;
      } else {
        const result = {
          _id: item._id,
          type: item._id,
          name: item.name,
          guidance: item?.guidance && item.guidance ? item?.guidance : "",
          effect: item.effect ? item?.effect : "",
        };
        if (item?.safetyParameter && item?.safetyParameter !== null) {
          console.log("");
          result.safetyParameter = item?.safetyParameter;
        }
        return result;
      }
    });
    console.log(updatedData);
    setData(updatedData);
    setSafetyGuidance(updatedData);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Safety Guidance</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>
      {data === null ? (
        <div className="w-full flex justify-center py-20">
          <SpinnerLoader />
        </div>
      ) : (
        <div>
          {data?.map((item, index) => (
            <div key={index}>
              <SafetyGuidanceItem
                item={item}
                index={index}
                safetyGuidance={safetyGuidance}
                setSafetyGuidance={setSafetyGuidance}
                dataToPost={dataToPost}
                setDataToPost={setDataToPost}
                updateData={updateData}
                name={name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SafetyGuidanceForm;
