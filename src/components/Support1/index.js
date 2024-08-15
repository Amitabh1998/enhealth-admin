import React, { useState } from "react";
import SupportDetailsDialaog from "../Dialogs/SupportDetailDialog";

const Support = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Grid Cards */}
      <div className="w-full grid md:grid-cols-3 gap-5 mt-10">
        {[0, 1, 2, 3, 4].map((item, index) => (
          <div
            onClick={() => setOpen(true)}
            key={index}
            className="w-full bg-white shadow rounded-md p-4"
          >
            <div className="w-full flex justify-between pb-3 border-b">
              <div className="flex space-x-3">
                <img
                  className="rounded-full"
                  src={
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=50&h=50&q=80"
                  }
                />
                <div className="flex flex-col">
                  <div className="text-gray-800 font-semibold">
                    Soumya Ranjan
                  </div>
                  <div className="text-gray-600 text-sm ">Soumya@gmail.com</div>
                </div>
              </div>
              <div className="text-xs text-gray-600">21st may 2023</div>
            </div>
            <div className="mt-3 text-sm text-gray-600 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              harum rerum voluptatem quo recusandae magni placeat saepe
              molestiae, sed excepturi cumque corporis perferendis hic.
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
      {open && <SupportDetailsDialaog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Support;
