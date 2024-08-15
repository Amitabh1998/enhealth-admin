import { addCommonData, getAllData, getData } from "@/api/common";
import ConsultationFees from "@/components/ConsulationFees";
import Educations from "@/components/Education";
import Experience from "@/components/Experience";
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
      if (!id) return;
      setLoading(true);
      const data = await getData(
        limit,
        skip,
        `profile/doctor-profile-management/${id}`
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
        "profile/verify-doctor-profile"
      );
      toast.success("Doctor is verified successfully");
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  const rejectHandler = async () => {
    try {
      const response = await addCommonData(
        { id: router?.query?.id },
        "profile/verify-doctor-profile"
      );
      toast.success("Doctor is verified successfully");
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
          <div>Experience</div>
          {tab === 2 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>

        {data?.status === 2 ? null : (
          <div
            className={
              tab === 3
                ? "text-gray-800 md:text-2xl p-2 rounded-lg"
                : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
            }
            onClick={() => setTab(3)}
          >
            <div>Wallet</div>
            {tab === 3 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
          </div>
        )}

        {data?.status === 2 ? null : (
          <div
            className={
              tab === 4
                ? "text-gray-800 md:text-2xl p-2 rounded-lg"
                : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
            }
            onClick={() => setTab(4)}
          >
            <div>consultation Fees</div>
            {tab === 4 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
          </div>
        )}
        <div
          className={
            tab === 7
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(7)}
        >
          <div>Education</div>
          {tab === 7 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 5
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(5)}
        >
          <div>Locations</div>
          {tab === 5 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 6
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(6)}
        ></div>
      </div>

      {/* CONTENT ACCORDING TO THE ACTIVE TAB */}
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="w-full">
          <div className="w-full">
            {tab === 1 ? (
              <Overview data={data} />
            ) : tab === 2 ? (
              <Experience data={data} />
            ) : tab === 3 ? (
              <Wallet data={data} profileId={data?.doctorProfile} />
            ) : tab === 4 ? (
              <ConsultationFees data={data} />
            ) : tab === 5 ? (
              <Locations data={data} />
            ) : tab === 7 ? (
              <Educations data={data} />
            ) : (
              <Support data={data} />
            )}
          </div>
          {data?.status === 2 && (
            <div className="w-full flex justify-end my-5">
              <div className="flex space-x-2">
                {/* <button
                  onClick={() => rejectHandler()}
                  className="p-2 px-5 text-white bg-red-500 rounded-md hover-bg-indigo-700"
                >
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
