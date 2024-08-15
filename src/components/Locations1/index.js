import React from "react";

const Locations = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-3 flex justify-between">
      <div>
        <div className="text-xl text-gray-600">Address</div>
        <div className="text-base text-gray-600">Nakabadii chak, Mumbai,</div>
        <div className="text-base text-gray-600">144008, Maharastra,</div>
        <div className="text-base text-gray-600"> Near some mall</div>
      </div>
      <img src={"/images/Rectangle 4236.png"} className="w-[70%]" />
    </div>
  );
};

export default Locations;
