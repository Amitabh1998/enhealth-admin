import React from "react";
import OrderManagementTable from "../Tables/OrderMangementTable";

const OrderManagement = () => {
  return (
    <div>
      <div>
        {/* <div className="mb-4">
          <input className="w-60 rounded-md border border-gray-400 p-1 " placeholder="search here" />
        </div> */}
      </div>
      <OrderManagementTable />
    </div>
  );
};

export default OrderManagement;
