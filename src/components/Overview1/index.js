import React from "react";

const Overview = () => {

  return (
    <>
      {/* --------HEADER------------ */}
      <div className="p-4 mb-5 bg-white shadow-lg mt-5 flex items-center space-x-6 rounded-lg relative">
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
      <div className="w-full bg-white rounded-lg shadow-lg p-3 mt-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <div>
            <div className="text-gray-500">Email Address</div>
            <div className="text-gray-700">shubhamkanungo@gmail.com</div>
          </div>
          <div>
            <div className="text-gray-500">Gender</div>
            <div className="text-gray-700">Male</div>
          </div>
          <div>
            <div className="text-gray-500">Phone Number</div>
            <div className="text-gray-700">6370882409</div>
          </div>
          <div>
            <div className="text-gray-500">Current Status</div>
            <div className="text-gray-700">Active</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
