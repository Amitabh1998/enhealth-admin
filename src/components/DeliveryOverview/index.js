// import { addCommonData, getData } from "@/apis/common";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import moment from "moment";

const DeliveryOverview = ({ data }) => {
  const [consults, setConsults] = useState();
  const [loading, setLoading] = useState(false);

  // const getAllData = async () => {
  //   // const response = await getData(-1, 0, "dashboard/doctor-dashboard");
  //   try {
  //     setLoading(true);
  //     const response = await addCommonData({}, "dashboard/doctor-dashboard");
  //     setConsults(response.consultForToday.pending);
  //     // console.log(response);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error ? error : "Something went wrong");
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getAllData();
  // }, []);

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
              {/* <div className="text-sm text-gray-500 max-w-md">
                Great doctor if you need your family member to get effective
                immediate ssistance, emergency treatment or a simple
                consultation.
              </div> */}
              {/* <div className="text-xl text-gray-800 max-w-md mt-2">
                You have {consults} patients remaining today!
              </div> */}
            </div>
            <img src={"/images/bg1.png"} className="absolute right-0 top-0" />
          </div>
          <div className="w-full bg-white rounded-lg shadow-lg p-3">
            <div className="flex space-x-3 flex-wrap">
              <div>
                <div>Email</div>
                <div className="text-gray-500">
                  {data?.email ? data?.email : "N/A"}
                </div>
              </div>
              <div>
                <div>Phone</div>
                <div className="text-gray-500">
                  {data?.phone ? data?.phone : "N/A"}
                </div>
              </div>
              <div>
                <div>DOB</div>
                <div className="text-gray-500">
                  {data?.dob
                    ? moment(data?.dob).format("Do MMMM, YYYY")
                    : "N/A"}
                </div>
              </div>
            </div>
            <div>
              <div className="my-4 text-lg text-gray-800 font-semibold">
                Description
              </div>
              <div className="text-gray-500">
                {data?.profile?.description
                  ? data?.profile?.description
                  : "N/A"}
              </div>
            </div>
            <div className="my-4 text-lg text-gray-800 font-semibold">
              Certificates
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.drivingLicense?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100"
              >
                Driving License - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.aadharCard?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100"
              >
                ID proof - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.insuranceOfVehicle?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100"
              >
                Insaurance of the vehicle - <span>View Document</span>
              </div>
              <div
                onClick={() =>
                  handleButtonClick(data?.profile?.rcOfVehicle?.link)
                }
                className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100"
              >
                RC of vehicle - <span>View Document</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOverview;
