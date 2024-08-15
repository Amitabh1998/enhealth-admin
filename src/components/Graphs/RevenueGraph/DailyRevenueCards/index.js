import { addCommonData } from "@/api/common";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DailyRevenueCards = ({ date }) => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1);

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          revenueStats: {
            type: "daily",
            date: date,
          },
        },
        "analytics/admin-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.orderRevenueAnalytics.map(
        (orderItem) => ({
          date: orderItem.date,
          orderRevenue: orderItem.revenue,
          labTestRevenue: response.labTestRevenueAnalytics.find(
            (item) => item.date === orderItem.date
          ).revenue,
          appointmentRevenue: response.appointmentRevenueAnalytics.find(
            (item) => item.date === orderItem.date
          ).revenue,
        })
      );

      console.log(combinedRevenueData);
      // output :- [ { date: '22/02', orderRevenue: 0, labTestRevenue: 0, appointmentRevenue: 0 } ]

      setData(combinedRevenueData);
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    getDetails();
  }, [date]);

  return (
    <div className="w-full">
      {data === null ? (
        <div className="w-full bg-gray-200 rounded-xl pt-0 animate-pulse p-10"></div>
      ) : (
        <div className="w-full bg-bluePrimary rounded-xl pt-0">
          <div className="grid grid-cols-3">
            <div
              onClick={() => setTab(1)}
              className={`p-2 cursor-pointer text-sm text-center ${
                tab === 1
                  ? "border-b-2 border-white font-bold text-white"
                  : "text-white"
              }`}
            >
              Orders
            </div>
            <div
              onClick={() => setTab(2)}
              className={`p-2 cursor-pointer text-sm text-center ${
                tab === 2
                  ? "border-b-2 border-white font-bold text-white"
                  : "text-white"
              }`}
            >
              Lab test
            </div>
            <div
              onClick={() => setTab(3)}
              className={`p-2 cursor-pointer text-sm text-center ${
                tab === 3
                  ? "border-b-2 border-white font-bold text-white"
                  : "text-white"
              }`}
            >
              Appointments
            </div>
          </div>
          <div className="w-full grid grid-cols-2">
            <div className="p-4 w-max flex flex-col items-center">
              <img src={"/images/CoininHand.svg"} className="w-12 h-12" />
              <div className="text-white text-xl font-bold">Revenue</div>
            </div>
            <div className="flex justify-center items-center text-white text-2xl font-bold">
              {tab === 1
                ? `INR ${data[0]?.orderRevenue}`
                : tab === 2
                ? `INR ${data[0]?.labTestRevenue}`
                : `INR ${data[0]?.appointmentRevenue}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyRevenueCards;
