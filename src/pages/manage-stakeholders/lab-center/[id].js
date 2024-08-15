import { addCommonData, getAllData, getData } from "@/api/common";
import ConsultationFees from "@/components/ConsulationFees";
import Experience from "@/components/Experience";
import LabOverview from "@/components/LabOverview";
import Locations from "@/components/Locations";
import Overview from "@/components/Overview";
import SpinnerLoader from "@/components/SpinnerLoader";
import Support from "@/components/Support";
import Wallet from "@/components/Wallet";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [tab, setTab] = useState(1);

  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const router = useRouter();

  const getAllData = async () => {
    try {
      console.log("Loading");
      const id = router.query.id;
      setLoading(true);
      const data = await getData(
        limit,
        skip,
        `profile/diagnostic-center-profile-management/${id}`
      );
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    if (router && router?.query?.id?.trim() !== "") {
      getAllData();
    } else {
      return;
    }
  }, [router]);

  const acceptHandler = async () => {
    try {
      const response = await addCommonData(
        { id: router?.query?.id },
        "profile/verify-diagnostic-center-profile"
      );
      toast.success("Diagnostic center is verified successfully");
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  return (
    <div>
      {/* BREAD CRUM */}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary dark:text-gray-400 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1 dark:text-gray-400 dark:hover:text-white"
              >
                Profile
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {/* --------HEADER------------ */}
      {/* {tab === 1 && (
        <div className="p-4 bg-white shadow-lg mt-5 flex items-center space-x-6 rounded-lg relative">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-40 rounded-lg"
          />
          <div>
            <div className="text-2xl text-gray-700">Good Morning,</div>
            <div className="text-4xl text-bluePrimary mb-2 font-bold tracking-wide">
              Dr. Daniel Bruk
            </div>
            <div className="text-sm text-gray-500 max-w-md">
              Great doctor if you need your family member to get effective
              immediate ssistance, emergency treatment or a simple consultation.
            </div>
            <div className="text-xl text-gray-800 max-w-md mt-2">
              You have 18 patients remaining today!
            </div>
          </div>
          <img src={"/images/bg1.png"} className="absolute right-0 top-0" />
        </div>
      )} */}

      {/* --------TABS------------ */}
      <div className="flex space-x-5 items-center my-5">
        <div
          className={
            tab === 1
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(1)}
        >
          <div>Overview</div>
          {tab === 1 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 2
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(2)}
        >
          <div>Locations</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        {/* <div
          className={
            tab === 2
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(2)}
        >
          <div>Support</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div> */}
      </div>

      {/* CONTENT ACCORDING TO THE ACTIVE TAB */}
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="w-full">
          <div className="w-full">
            {tab === 1 ? (
              <LabOverview data={data} />
            ) : (
              <Locations data={data} />
            )}
          </div>
          {data?.status === 2 && (
            <div className="w-full flex justify-end my-5">
              <div className="flex space-x-2">
                {/* <button className="p-2 text-white bg-red-500 rounded-md hover-bg-indigo-700">
                  Reject
                </button> */}
                <button
                  onClick={() => acceptHandler()}
                  className="py-2 px-5 text-white bg-bluePrimary rounded-md hover-bg-indigo-700"
                >
                  Accept
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
