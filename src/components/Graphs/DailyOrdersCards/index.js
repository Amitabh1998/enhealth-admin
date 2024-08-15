import { addCommonData } from "@/api/common";
import { ShoppingBagIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DailyOrderCards = ({ date }) => {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState(1);

  const getDetails = async () => {
    try {
      const response = await addCommonData(
        {
          orderCount: {
            type: "daily",
            date: date,
          },
        },
        "analytics/admin-analytics"
      );
      console.log(response);

      const combinedRevenueData = response.medicineOrderAnalytics.map(
        (orderItem) => ({
          date: orderItem.date,
          medicineCompleted: orderItem.completedOrders,
          medicinePending: orderItem.pendingOrders,
          medicineCancelled: orderItem.cancelledOrders,
          medicineTotal: orderItem.totalOrders,
          productCompleted: response.productOrderAnalytics.find(
            (item) => item.date === orderItem.date
          ).completedOrders,
          productPending: response.productOrderAnalytics.find(
            (item) => item.date === orderItem.date
          ).pendingOrders,
          productCancelled: response.productOrderAnalytics.find(
            (item) => item.date === orderItem.date
          ).cancelledOrders,
          productTotal: response.productOrderAnalytics.find(
            (item) => item.date === orderItem.date
          ).totalOrders,
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
        <div className="w-full bg-gray-200 rounded-xl pt-0 animate-pulse"></div>
      ) : (
        <div className="w-full bg-bluePrimary rounded-xl pt-0">
          <div className="grid grid-cols-2">
            <div
              onClick={() => setTab(1)}
              className={`p-2 cursor-pointer text-sm text-center ${
                tab === 1
                  ? "border-b-2 border-white font-bold text-white"
                  : "text-white"
              }`}
            >
              Medicines
            </div>
            <div
              onClick={() => setTab(2)}
              className={`p-2 cursor-pointer text-sm text-center ${
                tab === 2
                  ? "border-b-2 border-white font-bold text-white"
                  : "text-white"
              }`}
            >
              Products
            </div>
          </div>
          <div className="w-full grid grid-cols-2">
            <div className="p-4 w-max flex flex-col items-center">
              {/* <img src={"/images/CoininHand.svg"} className="w-12 h-12" /> */}
              <ShoppingBagIcon className="w-12 h-12 text-white" />
              <div className="text-white text-xl font-bold">Orders</div>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <div className=" text-white text-2xl font-bold">
                  {tab === 1
                    ? `${data[0]?.medicineTotal}`
                    : `${data[0]?.productTotal}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyOrderCards;
