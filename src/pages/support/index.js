import { getAllData } from "@/api/stakeholder-management/common";
import SupportDetailsDialaog from "@/components/Dialogs/SupportDetailDialog";
import SpinnerLoader from "@/components/SpinnerLoader";
import { ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const tabs = [
  {
    name: "Users",
    status: 1,
  },
  {
    name: "Delivery Agents",
    status: 2,
  },
];

const index = () => {
  const [status, setStatus] = useState(1);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [data, setData] = useState(null);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllData(
        limit,
        skip,
        "help-center/support-ticket?$sort[createdAt]=-1&doctorProfile=null&vendorProfile=null&diagnosticCenterProfile=null&$populate=createdBy&status[$in]=1&select[0]=createdBy&role=2"
      );
      console.log(response);
      setData(response.data);
      setTotal(response.total);
      setSkip(response.skip);
      setLimit(response.limit);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* ------------------BREADCRUMBS--------------------- */}
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
                Support
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {/* HEADING */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Support
        </div>

        {/* TAbS */}
        <div className="w-full grid grid-cols-2 bg-white shadow rounded-md mt-10 text-gray-500 font-medium">
          {tabs.map((item, index) => (
            <div
              key={index}
              className={`border-r ${
                index !== tabs.length - 1
                  ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                  : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>

        {data === null ? (
          <div className="py-20">
            <SpinnerLoader />
          </div>
        ) : (
          <div className="w-full grid md:grid-cols-3 gap-5 mt-10">
            {data?.map((item, index) => (
              <div
                onClick={() => setOpen(true)}
                key={index}
                className="w-full bg-white shadow rounded-md p-4"
              >
                <div className="w-full flex justify-between pb-3 border-b">
                  <div className="flex space-x-3">
                    {/* <img
                      className="rounded-full"
                      src={
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=50&h=50&q=80"
                      }
                    /> */}
                    <div className="flex flex-col">
                      <div className="text-gray-800 font-semibold">
                        {item?.createdBy?.name ? item?.createdBy?.name : "N/A"}
                      </div>
                      <div className="text-gray-600 text-sm ">
                        {item?.createdBy?.phone
                          ? item?.createdBy?.phone
                          : item?.createdBy?.email
                          ? item?.createdBy?.email
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {moment(item?.createdAt).format("Do, MMMM, YYYY")}
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 text-justify">
                  {item?.title}
                </div>
                <div className="mt-3 text-sm text-gray-600 text-justify">
                  {item?.description}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {item?.attachments?.map((item, index) => (
                    <img src={item?.link} className="h-20 w-full" />
                  ))}
                </div>

                <button
                  className={
                    "disabled:bg-[#ccc] rounded-md mt-5 bg-bluePrimary text-white w-full py-2 hover:bg-indigo-800"
                  }
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Dialog */}
      {open && <SupportDetailsDialaog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default index;
