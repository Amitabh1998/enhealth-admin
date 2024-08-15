// import { addCommonData, getData } from "@/apis/common";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import moment from "moment";

const Overview = ({ data }) => {
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

  console.log(data);

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
              <div className="text-xl text-gray-700">
                {getTimeOfDayMessage()}
              </div>
              <div className="text-3xl text-bluePrimary mb-2 font-bold tracking-wide">
                {data?.name ? data.name : "N/A"}
              </div>
              <div className=" mb-1 font-medium tracking-wide">
                {data?.phone ? data.phone : "N/A"}
              </div>
              <div className="  mb-2 font-medium tracking-wide">
                {data?.email ? data.email : "N/A"}
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
          <div className="w-full bg-white rounded-lg shadow-lg p-3 mt-6">
            <div className="grid md:grid-cols-4 px-2 mt-2">
              <div className="">
                <div className="text-lg text-gray-800 font-semibold">
                  Specialities:
                </div>
                <div className="text-gray-700 mt-3">
                  {data?.profile?.specialities?.map((item, index) => (
                    <li className="" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
              <div className="">
                <div className="text-lg text-gray-800 font-semibold">
                  Surgeon Specialisations:
                </div>
                <div className="text-gray-700 mt-3">
                  {data?.profile?.surgeonSpecializations?.map((item, index) => (
                    <li className="" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
              <div className="">
                <div classNa className="text-lg text-gray-800 font-semibold">
                  Symptoms:
                </div>
                <div className="text-gray-700 mt-3">
                  {data?.profile?.symptomSpecializations?.map((item, index) => (
                    <li className="" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
              <div className="">
                <div classNa className="text-lg text-gray-800 font-semibold">
                  Languages:
                </div>
                <div className="text-gray-700 mt-3">
                  {data?.profile?.languages?.map((item, index) => (
                    <li className="" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 mx-2">
              <div className="text-lg text-gray-800 font-semibold mb-2">
                License Details:
              </div>
              <li className="">
                License Authority :{" "}
                <span className="font-medium">{`${
                  data?.profile?.medicalLicense?.licenseAuthority ?? "N/A"
                }`}</span>
              </li>
              <li>
                License Number :{" "}
                <span className="font-medium">
                  {" "}
                  {`${data?.profile?.medicalLicense?.licenseNumber ?? "N/A"}`}
                </span>
              </li>
              <li>
                License Expiry Date :{" "}
                <span className="font-medium">{`${
                  data?.profile?.medicalLicense?.licenseExpiration
                    ? moment(
                        data?.profile?.medicalLicense?.licenseExpiration
                      ).format("YYYY-MM-DD")
                    : "N/A"
                }`}</span>
              </li>
            </div>

            <div className="mb-4 mt-6 text-lg text-gray-800 font-semibold mx-2">
              Attached Documents/ Certificates :
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mx-2 mb-4">
              {data?.profile?.medicalLicense &&
                data?.profile?.medicalLicense?.attachment && (
                  <div
                    onClick={() =>
                      handleButtonClick(
                        data?.profile?.medicalLicense?.attachment?.link
                      )
                    }
                    className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 cursor-pointer"
                  >
                    Medical License - <span>View Document</span>
                  </div>
                )}
              {data?.profile?.registrationCertificate &&
                data?.profile?.registrationCertificate?.link && (
                  <div
                    onClick={() =>
                      handleButtonClick(
                        data?.profile?.registrationCertificate?.link
                      )
                    }
                    className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 cursor-pointer"
                  >
                    Registration Certificate - <span>View Document</span>
                  </div>
                )}
              {data?.profile?.clinicalEstablishmentCertificate &&
                data?.profile?.clinicalEstablishmentCertificate?.link && (
                  <div
                    onClick={() =>
                      handleButtonClick(
                        data?.profile?.clinicalEstablishmentCertificate?.link
                      )
                    }
                    className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 cursor-pointer"
                  >
                    Clinic Establishment certificate -{" "}
                    <span>View Document</span>
                  </div>
                )}
              {data?.profile?.idProof &&
                data?.profile?.idProof.length > 0 &&
                data?.profile?.idProof[0].link && (
                  <div
                    onClick={() =>
                      handleButtonClick(data?.profile?.idProof[0].link)
                    }
                    className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 cursor-pointer"
                  >
                    ID proof - <span>View Document</span>
                  </div>
                )}
              {data?.profile?.workPlaceId &&
                data?.profile?.workPlaceId?.link && (
                  <div
                    onClick={() =>
                      handleButtonClick(data?.profile?.workPlaceId?.link)
                    }
                    className="py-3 px-6 rounded-md bg-white shadow text-medium text-bluePrimary hover:bg-gray-100 cursor-pointer"
                  >
                    Work Place Id - <span>View Document</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
