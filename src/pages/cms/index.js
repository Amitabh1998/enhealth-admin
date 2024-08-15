import Blogs from "@/components/Blogs";
import CreateVideoDialog from "@/components/Dialogs/CreateVideoDialog";
import NewCouponDialog from "@/components/Dialogs/NewCouponDialog";
import NewForumDialog from "@/components/Dialogs/NewForumDialog";
import NewStaffDialog from "@/components/Dialogs/NewStaffDialog";
import NewVideoDialog from "@/components/Dialogs/NewVideoDialog";
import RegisterUserDialog from "@/components/Dialogs/RegisterUserDialog";
import Feedback from "@/components/Feedback";
import Forums from "@/components/Forums";
import CouponsTable from "@/components/Tables/CouponsTable";
import DeliveryAgentTable from "@/components/Tables/DeliveryAgentTable";
import DiagnosticCenterTable from "@/components/Tables/DiagnosticCenterTable";
import DoctorsTable from "@/components/Tables/DoctorsTable";
import PharmaciesTable from "@/components/Tables/PharmaciesTable";
import UsersTable from "@/components/Tables/UsersTable";
import VideosTable from "@/components/Tables/VideosTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";

const tabs = [
  {
    name: "Blogs/Videos/Forum",
    status: 1,
  },
  {
    name: "Initiate Offers",
    status: 2,
  },
  // {
  //   name: "Check SEO",
  //   status: 3,
  // },
  // {
  //   name: "Mail And Notifications",
  //   status: 4,
  // },
  {
    name: "Reviews",
    status: 5,
  },
];

const tabs2 = [
  {
    name: "Blogs",
    status: 1,
  },
  {
    name: "Videos",
    status: 2,
  },
  {
    name: "Forums",
    status: 3,
  },
];

const tabs3 = [
  {
    name: "Promtotional Banners",
    status: 1,
  },
  {
    name: "Coupon Codes",
    status: 2,
  },
];

const index = () => {
  const [status, setStatus] = useState(1);
  const [status2, setStatus2] = useState(1);
  const [status3, setStatus3] = useState(1);
  const [couponOpen, setCouponOpen] = useState(false);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <div>
      {" "}
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
                Content Management System
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Content Management System
        </div>

        <div className="w-full gap-5 grid md:grid-cols-10 mt-10">
          <div className="md:col-span-8">
            {/* TABS */}
            <div className="w-full grid grid-cols-3 bg-white shadow rounded-md  text-gray-500 font-medium">
              {tabs.map((item, index) => (
                <div
                  onClick={() => setStatus(item.status)}
                  key={index}
                  className={`border-r ${
                    index !== tabs.length - 1
                      ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                      : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
                  } ${
                    item.status === status && "border-b-2  border-b-bluePrimary"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            {status === 1 && status2 !== 1 && (
              <button
                onClick={() => setOpen(true)}
                className="bg-bluePrimary rounded-md hover:shadow-xl text-white shadow w-full p-2"
              >
                Add New
              </button>
            )}
            {status === 1 && status2 === 1 && (
              <button
                onClick={() => router.push("/blog/create-blog")}
                className="bg-bluePrimary rounded-md hover:shadow-xl text-white shadow w-full p-2"
              >
                Add New
              </button>
            )}
            {status === 2 && status3 === 2 && (
              <button
                onClick={() => setCouponOpen(true)}
                className="bg-bluePrimary rounded-md hover:shadow-xl text-white shadow w-full p-2"
              >
                Add New Coupon
              </button>
            )}
          </div>
        </div>

        {/* TABLES */}
        <div className="w-full my-10">
          {status === 1 ? (
            <div>
              {/* TABS */}
              <div className="w-full grid grid-cols-3 text-gray-500 font-medium">
                {tabs2.map((item, index) => (
                  <div
                    onClick={() => setStatus2(item.status)}
                    key={index}
                    className={`border-r ${
                      index !== tabs2.length - 1
                        ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                        : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
                    } ${
                      item.status === status2 &&
                      "border-b-2  border-b-bluePrimary text-bluePrimary"
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mb-10"></div>
              {status2 === 1 ? (
                <Blogs />
              ) : status2 === 2 ? (
                <VideosTable />
              ) : (
                <Forums />
              )}
            </div>
          ) : status === 2 ? (
            <div>
              {/* TABS */}
              <div className="w-full grid grid-cols-2 text-gray-500 font-medium">
                {tabs3.map((item, index) => (
                  <div
                    onClick={() => setStatus3(item.status)}
                    key={index}
                    className={`border-r ${
                      index !== tabs2.length - 1
                        ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                        : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
                    } ${
                      item.status === status3 &&
                      "border-b-2  border-b-bluePrimary text-bluePrimary"
                    }`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                {status3 === 1 ? <div>1</div> : <CouponsTable />}
              </div>
            </div>
          ) : status === 3 ? (
            <DeliveryAgentTable />
          ) : status === 4 ? (
            <div className="">
              <PharmaciesTable />
            </div>
          ) : (
            <Feedback />
          )}
        </div>
      </div>
      {status2 === 2 && open === true ? (
        <CreateVideoDialog
          on={open}
          setOn={setOpen}
          // data={videos}
          // setData={setVideos}
        />
      ) : status2 === 3 && open === true ? (
        <NewForumDialog open={open} setOpen={setOpen} />
      ) : couponOpen ? (
        <NewCouponDialog isOpen={couponOpen} setIsOpen={setCouponOpen} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default index;
