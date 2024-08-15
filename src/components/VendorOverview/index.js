// import { addCommonData, getData } from "@/apis/common";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import moment from "moment";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const VendorOverview = ({ data }) => {
  const [consults, setConsults] = useState();
  const [loading, setLoading] = useState(false);
  const [expanded, setIsExpanded] = useState(false);

  function getTimeOfDayMessage() {
    const currentHour = moment().hour();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  const handleButtonClick = (url) => {
    const pdfUrl = "/path/to/your/pdf.pdf"; // Replace with the actual URL of your PDF
    window.open(url, "_blank");
  };

  return (
    <div>
      {loading ? (
        <div className="w-full py-10 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div>
          <div className="p-4 bg-white shadow-lg mt-5 flex items-center space-x-6 rounded-lg relative">
            {data?.avatar?.link ? (
              <img
                className="w-32 h-32 bg-gray-300 rounded-md"
                src={data?.avatar?.link}
              />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-md" />
            )}
            <div>
              <div className="text-2xl text-gray-700">
                {getTimeOfDayMessage()}
              </div>
              <div className="text-4xl text-bluePrimary mb-2 font-bold tracking-wide">
                {data?.name ? data.name : "N/A"}
              </div>
            </div>
            <img src={"/images/bg1.png"} className="absolute right-0 top-0" />
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-3">
            <div className="my-4 text-lg text-gray-800 font-semibold">
              Certificates
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.drugLicense?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow cursor-pointer text-medium text-bluePrimary hover:bg-gray-100"
              >
                Drug License - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.ownerIdProof?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow cursor-pointer text-medium text-bluePrimary hover:bg-gray-100"
              >
                Owners ID proof - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.businessIdProof?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow cursor-pointer text-medium text-bluePrimary hover:bg-gray-100"
              >
                Business ID proof - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  // handleButtonClick(data?.profile?.workPlaceId?.link)
                  // setIsExpanded(!expanded)
                  {}
                }
                className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 "
              >
                <div
                  className="flex space-x-3 items-center cursor-pointer  text-medium text-bluePrimary"
                  onClick={() => setIsExpanded(!expanded)}
                >
                  Address Proof - <span>View Details</span>
                  <div className="mt-1">
                    {expanded ? (
                      <ChevronDownIcon height={20} width={20} color="#575ae5" />
                    ) : (
                      <ChevronRightIcon
                        height={20}
                        width={20}
                        color="#575ae5"
                      />
                    )}
                  </div>
                </div>

                {expanded && (
                  <div className="mt-4 overflow-hidden transform transition delay-150 duration-500 ease-in-out space-y-4  text-medium text-bluePrimary">
                    <p
                      className="cursor-pointer mt-4"
                      onClick={() => {
                        handleButtonClick(data?.profile?.addressProof[0]?.link);
                      }}
                    >
                      Address Proof 1
                    </p>
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        handleButtonClick(data?.profile?.addressProof[1]?.link);
                      }}
                    >
                      Address Proof 2
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOverview;
