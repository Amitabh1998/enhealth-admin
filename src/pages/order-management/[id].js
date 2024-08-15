import ListDiagnosticCenterTable from "@/components/Tables/ListDiagnosticCenterTable";
import { ChevronRightIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

const tabs = [
  {
    name: "Assign Lab Orders",
    status: 1,
  },
  {
    name: "Track test Order",
    status: 2,
  },
];

const index = () => {
  const [status, setStatus] = useState(1);

  const [data, setData] = useState([
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Shubham",
      phone: "6370882409",
      email: "shubham@gmail.com",
      address: "Mumbai,India",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Shubham",
      phone: "6370882409",
      email: "shubham@gmail.com",
      address: "Mumbai,India",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Shubham",
      phone: "6370882409",
      email: "shubham@gmail.com",
      address: "Mumbai,India",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Shubham",
      phone: "6370882409",
      email: "shubham@gmail.com",
      address: "Mumbai,India",
    },
  ]);

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
                Order Management
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
                Order details
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {/* PROFILE */}
      <div className=" mt-5 flex items-center space-x-6 rounded-lg relative">
        <img
          src={
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          className="h-40 rounded-lg"
        />
        <div className="w-full">
          <div className="flex space-x-5 items-center">
            <div className="text-2xl text-gray-700 font-semibold">
              Shubham Kanungo
            </div>
            <div className="text-sm text-gray-500 max-w-md">
              Mumbai, Maharastra
            </div>
          </div>
          <div className="grid grid-cols-5 w-full gap-5">
            <div className="mt-3">
              <div className="text-sm text-gray-600">Email Address</div>
              <div className="text-sm text-gray-800">shubham@gmail.com</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Gender</div>
              <div className="text-sm text-gray-800">Male</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Phone Number</div>
              <div className="text-sm text-gray-800">6370882409</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Current Status</div>
              <div className="text-sm text-gray-800">Approved</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Test</div>
              <div className="text-sm text-gray-800">Blood Test</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">City</div>
              <div className="text-sm text-gray-800">Mumbai</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Dated On</div>
              <div className="text-sm text-gray-800">12th July, 2023</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Price</div>
              <div className="text-sm text-gray-800">1000</div>
            </div>
            <div className="mt-3">
              <div className="text-sm text-gray-600">Mode</div>
              <div className="text-sm text-gray-800">Home</div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="md:w-1/2 w-full grid grid-cols-2 bg-white shadow rounded-md mt-10 text-gray-500 font-medium">
        {tabs.map((item, index) => (
          <div
            onClick={() => setStatus(item.status)}
            key={index}
            className={`border-r ${
              index !== tabs.length - 1
                ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
            } ${item.status === status && "border-b-2  border-b-bluePrimary"}`}
          >
            {item.name}
          </div>
        ))}
      </div>
      {status === 1 ? (
        <div className="w-full mt-5">
          <div>
            List of Dignostic centers which are available and conduct these
            tests
          </div>

          <ListDiagnosticCenterTable data={data} setData={setData} />
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col   max-w-lg transform overflow-hidden p-6 text-left align-middle">
            {/* ------------------BREADCRUMBS--------------------- */}
            <nav className="flex h-max mb-1" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-1">
                <li className="inline-flex items-center">
                  <a
                    href="/dashboard"
                    className="inline-flex items-center text-[10px] font-medium text-gray-500 hover:text-bluePrimary  "
                  >
                    Order Management
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
                    <a
                      href="#"
                      className="text-[10px] font-medium text-gray-500 hover:text-bluePrimary ml-1  "
                    >
                      Orders
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
                    <a
                      href="#"
                      className="text-[10px] font-medium text-gray-500 hover:text-bluePrimary ml-1  "
                    >
                      Id : 8716872092809
                    </a>
                  </div>
                </li>
              </ol>
            </nav>

            <div
              as="h3"
              className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 "
            >
              <div>Order Details</div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="text-[10px] text-gray-800">
                Order date : <span className="font-bold">23 june,2023</span>
              </div>
              <div className="text-[10px] text-green-500">
                Estimated delivery by 27 june,2023
              </div>
            </div>

            <div className="h-px w-full bg-gray-300 my-2"></div>

            <div className="pb-2 border-b">
              {[0, 1, 2].map((item, index) => (
                <div
                  className="my-2 flex justify-between items-center"
                  key={index}
                >
                  <div className="flex space-x-3 items-center">
                    <div className="p-2 rounded-md border">
                      <img className="h-16" src={"/images/image 257.png"} />
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm">
                        Multi Vitamins tablets (orange)
                      </div>
                      <div className="text-gray-600 text-xs mt-2">
                        Tablets | Vitamins | Suppliments
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-pink-600 text-sm">$1599.00</div>
                    <div className="text-gray-600 text-xs mt-2">Qty: 1</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 my-2">
              <div>
                <div className="text-xs text-gray-800 font-medium">
                  Delivery Address
                </div>
                <div className="text-xs text-gray-600">
                  Plot 97, kunjapatna sahi, old town
                </div>
                <div className="text-xs text-gray-600">Gosagoreswar square</div>
                <div className="text-xs text-gray-600">India, 751002</div>
                <div className="text-xs text-gray-800 font-medium my-1">
                  Payment
                </div>
                <div className="text-xs text-gray-600">Card: **** 2625</div>
              </div>
              <div>
                <div className="text-xs text-gray-800 font-medium my-1">
                  Prescription
                </div>
                <div className="bg-gray-200 rounded-md h-20 w-24"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 w-full">
              <div></div>
              <div className="w-full">
                <div className="text-xs text-gray-800 font-medium my-1">
                  Payment
                </div>
                <div className="w-full grid grid-cols-2">
                  <div className="text-xs text-gray-600">Total</div>
                  <div className="text-xs text-gray-600">$1599.00</div>
                  <div className="text-xs text-gray-600">Delivery</div>
                  <div className="text-xs text-gray-600">$0.00</div>
                  <div className="text-xs text-gray-600">Tax</div>
                  <div className="text-xs text-gray-600">$89.00</div>
                  <div className="text-xs text-gray-800 font-bold border-t mt-2 pt-1">
                    Sub Total
                  </div>
                  <div className="text-xs text-gray-600 border-t mt-2 pt-1">
                    $1688.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
