import { AdjustmentsIcon } from "@heroicons/react/outline";
import React from "react";

const data = [
  {
    id: 1,
    createdAt: "16 April, 2023",
    transactions: [
      {
        id: 1,
        name: "Cerona Metayer",
        status: "Payment Recieved",
        amount: 4000,
      },
      {
        id: 2,
        name: "Surya Shakti",
        status: "Payment Recieved",
        amount: 500,
      },
      {
        id: 3,
        name: "Soumya Ranjan",
        status: "Payment Recieved",
        amount: 2000,
      },
    ],
  },
  {
    id: 2,
    createdAt: "15 April, 2023",
    transactions: [
      {
        id: 1,
        name: "Cerona Metayer",
        status: "Payment Recieved",
        amount: 4000,
      },
      {
        id: 2,
        name: "Surya Shakti",
        status: "Payment Recieved",
        amount: 500,
      },
      {
        id: 3,
        name: "Soumya Ranjan",
        status: "Payment Recieved",
        amount: 2000,
      },
    ],
  },
];

const WalletRecentActivities = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold txet-gray-800">Recent activities</div>
        <div className="flex space-x-2 items-center p-1 cursor-pointer">
          <div className="text-gray-500">Filter</div>
          <AdjustmentsIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div>
        {data?.map((item, index) => (
          <div key={index} className="w-full my-3">
            <div className="bg-purple-300 py-2 px-2 text-sm text-gray-700 rounded-lg mb-3">
              {item.createdAt}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {item?.transactions?.map((transaction, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-lg bg-white p-3 flex space-x-3 justify-between"
                >
                  <div className="w-10 h-10 bg-yellow-400 text-gray-800 font-bold text-xl  flex justify-center items-center rounded-lg">
                    {transaction.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">
                      {transaction.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      <span>{item.createdAt}</span> -{" "}
                      <span>{transaction.status}</span>
                    </div>
                  </div>
                  <div className="text-green-400 font-bold">₹{transaction.amount}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletRecentActivities;
