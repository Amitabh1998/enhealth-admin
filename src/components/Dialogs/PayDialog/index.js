import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewUses } from "@/api/uses";
import { toast } from "react-toastify";

export default function PayDialog({ on, setOn }) {
  function closeModal() {
    setOn(false);
  }

  return (
    <Transition appear show={on} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex  min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col    max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Pay </div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="w-full grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <div className="text-xs font-semibold">Name</div>
                    <div className="text-xs text-gray-600">Margot Foster</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold">
                      Amount to be paid
                    </div>
                    <div className="text-xs text-gray-600">$ 1,829</div>
                  </div>
                </div>

                <div className="my-10 text-center txet-gray-500 font-semibold w-80 mx-auto">
                  Are you sure you want to be proceed the payment?
                </div>

                <div className="flex justify-between items-center mt-5">
                  <button className="bg-red-500 text-white w-40 p-2  rounded-md ">
                    Cancel
                  </button>
                  <button className="border w-40 p-2 rounded-md bg-bluePrimary text-white">
                    Pay
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
