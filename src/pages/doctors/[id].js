import Experience from "@/components/Experience1";
import Feedback from "@/components/Feedback";
import Locations from "@/components/Locations1";
import Overview from "@/components/Overview1";
import Wallet from "@/components/Wallet1";
import OrderManagement from "@/components/OrderManagement";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Appointments from "@/components/Appointments";
import Blogs from "@/components/Blogs";
import { toast } from "react-toastify";
import { fetchDeatils, getAllData } from "@/api/stakeholder-management/common";
import { useRouter } from "next/router";
import LoaderSpinner from "@/components/LoaderSpinner";

const index = () => {
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  const getDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchDeatils(
        `profile/doctor-profile-management/${router.query.id}`
      );
      console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router && router.query.id) {
      console.log(router.query.id);
      getDetails();
    }
  }, [router]);

  return (
    <div>
      {/* BREAD CRUM */}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Manage stakeholders
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Doctor
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
        <div
          className={
            tab === 4
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(4)}
        >
          <div>Ratings and Reviews</div>
          {tab === 4 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
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
        >
          <div>Appointments</div>
          {tab === 6 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
        <div
          className={
            tab === 7
              ? "text-gray-800 md:text-2xl p-2 rounded-lg"
              : "text-gray-500 cursor-pointer hover:shadow-lg p-2 rounded-lg hover:bg-white"
          }
          onClick={() => setTab(7)}
        >
          <div>Blogs</div>
          {tab === 7 && <div className="h-[2px]  bg-gray-800 w-10"></div>}
        </div>
      </div>

      {/* CONTENT ACCORDING TO THE ACTIVE TAB */}
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="w-full">
          {tab === 1 ? (
            <Overview data={data} />
          ) : tab === 2 ? (
            <Experience data={data} />
          ) : tab === 3 ? (
            <Wallet data={data} />
          ) : tab === 4 ? (
            <Feedback data={data} />
          ) : tab === 4 ? (
            <OrderManagement data={data} />
          ) : tab === 5 ? (
            <Locations data={data} />
          ) : tab === 6 ? (
            <Appointments data={data} />
          ) : tab === 7 ? (
            <Blogs data={data} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default index;
