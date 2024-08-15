import React from "react";

const AgentOrders = () => {
  return (
    <div className="w-full">
      <div className="grid bg-white shadow rounded-lg md:grid-cols-3 md:gap-9 gap-4 w-full">
        <div className="flex justify-between p-2">
          <div className="flex-1">
            <div className="text-sm text-gray-500"> Total Orders</div>
            <div className="text-bluePrimary  text-xl">7,800</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500"> Total Orders</div>
            <div className="text-bluePrimary  text-xl">7,800</div>
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500"> Total Orders</div>
            <div className="text-bluePrimary  text-xl">7,800</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentOrders;
