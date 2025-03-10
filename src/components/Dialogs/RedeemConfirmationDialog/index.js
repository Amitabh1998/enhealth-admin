import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function RedeemConfirmationDialog({
  on,
  setOn,
  callback,
  currentRow,
}) {
  function closeModal() {
    setOn(false);
  }

  console.log(currentRow);

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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <CheckCircleIcon className="h-20 w-20 mx-auto text-green-500" />
                  <p className="text-gray-500 text-lg text-center mt-2">
                    Are you sure you want to delete this data?
                  </p>
                </div>

                <div className="mt-4 flex justify-between space-x-2">
                  <div className="flex-1 " onClick={closeModal}>
                    <PrimaryButton text={"Cancel"} color={"bg-gray-500"} />
                  </div>
                  <div
                    className="flex-1 "
                    onClick={() => {
                      callback();
                      closeModal();
                    }}
                  >
                    <PrimaryButton text={"Mark as Paid"} color={"bg-red-500"} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
