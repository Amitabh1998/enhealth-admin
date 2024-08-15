import { getData } from "@/api/common";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const WalletRecentActivities = ({ profileId }) => {
  const [tab, setTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [redeemRequests, setRedeemRequests] = useState([]);

  const router = useRouter();

  const getAllData = async () => {
    try {
      setLoading(true);
      const data = await getData(
        limit,
        skip,
        `payment/transaction?entityType[$in]=wallet&entityType[$in]=redeemRequest&$sort[createdAt]=-1&doctorProfile=${profileId}`
      );
      setData(data.data);
      setTableData(data);
      setTotal(data.total);
      setSkip(data.skip);
      setLimit(data.limit);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [tab]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold txet-gray-800">Recent activities</div>
        {/* <div className="flex space-x-2 items-center p-1 cursor-pointer">
          <div className="text-gray-500">Filter</div>
          <AdjustmentsIcon className="w-5 h-5 text-gray-500" />
        </div> */}
      </div>
     
      <div>
        {data?.map((item, index) => (
          <div key={index} className="w-full my-3">
            <div className="rounded-lg shadow-lg bg-white p-3 flex space-x-3 justify-between">
              <div className="w-10 h-10 bg-yellow-400 text-gray-800 font-bold text-xl  flex justify-center items-center rounded-lg">
                {item?.code[0] ? item?.code[0] : "N/A"}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  {tab === 4
                    ? item?.account?.accountHolderName + "-" + item.code
                    : item?.message
                    ? item.message
                    : "N/A"}
                </div>
                <div className="text-gray-500 text-xs">
                  {moment(item.createdAt).format("MMMM Do YYYY")}
                </div>
              </div>
              <div className="text-green-400 font-bold">
                ₹{tab === 4 ? item.amount : item.totalAmount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletRecentActivities;
