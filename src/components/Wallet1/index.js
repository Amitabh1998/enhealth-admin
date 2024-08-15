import React from "react";
import WalletRecentActivities from "../WalletRecentActicities1";

const Wallet = () => {
  return (
    <div>
      {" "}
      <div className="w-full px-5 flex flex-col md:flex-row  justify-between py-7 rounded-md shadow-md bg-white mt-5">
        <div className="flex-1">
          <div className="text-xl text-gray-500">Total balance</div>
          <div className="text-5xl my-4 font-semibold text-gray-800">
            ₹15,500.00
          </div>
          <div className="text-xl text-gray-500">Transfers daily</div>
        </div>
        <div>
          <div className="text-xl text-gray-500">Total outstanding balance</div>
          <div className="text-3xl my-4 font-semibold text-gray-800">
            ₹15,500.00
          </div>

          <button className="mt-3 bg-yellow-400 rounded-md shadow px-14 py-1">
            Notify Accounts
          </button>
        </div>
      </div>
      {/*RECENT ACTIVITY  */}
      <div className="mt-5">
        <WalletRecentActivities />
      </div>
    </div>
  );
};

export default Wallet;
