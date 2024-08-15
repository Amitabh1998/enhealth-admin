import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import React, { useEffect, useState } from "react";

const SafetyGuidanceItem = ({
  item,
  safetyGuidance,
  setSafetyGuidance,
  dataToPost,
  setDataToPost,
  updateData,
  name,
}) => {
  const [guidance, setGuidance] = useState("");
  const [effect, setEffect] = useState("");

  const [toggleValue, setToggleValue] = useState(1); // 1 for safe, 2 for unsafe

  const handleToggle = () => {
    const newValue = toggleValue === 1 ? 2 : 1;
    setToggleValue(newValue);
  };

  const [formData, setFormData] = useState(item);

  useEffect(() => {
    console.log(item);
    setFormData(item);
  }, [item]);

  const handleInputChange = (e, field) => {
    const newData = { ...formData, [field]: e.target.value };
    setFormData(newData);
    updateData(newData); // Call the updateData function when any input changes
  };

  const handleSwitchChange = (num) => {
    const newData = {
      ...formData,
      safetyParameter: num,
    };
    setFormData(newData);
    updateData(newData); // Call the updateData function when the switch changes
  };

  console.log(formData.safetyParameter);

  return (
    <div className="p-2 border rounded-lg mt-2">
      <div className="flex justify-start items-center space-x-3">
        <div className="">
          {item?.attachment?.link ? (
            <img src={item?.attachment?.link} className="w-20 h-20" />
          ) : (
            <div className="bg-gray-100 w-20 h-20"></div>
          )}
          <div className="text-gray-500 text-center font-semibold">
            {item?.name}
          </div>
        </div>
        <div className="flex-1">
          <div>
            <label className="text-gray-500">{"Safety Parameter"}</label>
            <div className="flex justify-between w-full space-x-4">
              <div
                onClick={() => handleSwitchChange(1)}
                className={`flex-1 my-2 p-2 rounded-md text-center border ${
                  formData?.safetyParameter && formData?.safetyParameter === 1
                    ? "border-pink-700"
                    : "border"
                }`}
              >
                Safe
              </div>
              <div
                onClick={() => handleSwitchChange(2)}
                className={`flex-1 my-2 p-2 rounded-md text-center border ${
                  formData?.safetyParameter && formData?.safetyParameter === 2
                    ? "border-pink-700"
                    : "border"
                }`}
              >
                Unsafe
              </div>
              <div
                onClick={() => handleSwitchChange(3)}
                className={`flex-1 my-2 p-2 rounded-md text-center border ${
                  formData?.safetyParameter && formData?.safetyParameter === 3
                    ? "border-pink-700"
                    : "border"
                }`}
              >
                Caution
              </div>
              <div
                onClick={() => handleSwitchChange(4)}
                className={`flex-1 my-2 p-2 rounded-md text-center border ${
                  formData?.safetyParameter && formData?.safetyParameter === 4
                    ? "border-pink-700"
                    : "border"
                }`}
              >
                Consult to Doctor
              </div>
            </div>
          </div>

          <DefaultTextarea
            value={formData.effect}
            onChange={(e) => handleInputChange(e, "effect")}
            label={"Effect"}
          />

          <DefaultTextarea
            value={formData.guidance}
            onChange={(e) => handleInputChange(e, "guidance")}
            label={"Recomendation"}
          />
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidanceItem;
