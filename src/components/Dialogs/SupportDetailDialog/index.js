import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewUses } from "@/api/uses";
import { toast } from "react-toastify";

export default function SupportDetailsDialaog({ open, setOpen }) {
  function closeModal() {
    setOpen(false);
  }

  return (
    <Transition appear show={open} as={Fragment}>
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
                  <div>Support </div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="w-full grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <div className="text-xs font-semibold">Customer Name</div>
                    <div className="text-xs text-gray-600">Margot Foster</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold">Date</div>
                    <div className="text-xs text-gray-600">31st May 2023</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold mt-2">
                    Ticket for product or service
                  </div>
                  <div className="text-xs text-gray-600">Consultation</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mt-2">Email</div>
                  <div className="text-xs text-gray-600">example@gmail.com</div>
                </div>
                <div>
                  <div className="text-xs font-semibold mt-2">Description</div>
                  <div className="text-xs text-gray-600">
                    Eiusmod dolore eiusmod consectetur deserunt. Sit ea
                    excepteur voluptate esse esse amet sint commodo excepteur
                    deserunt magna eiusmod sit. Incididunt laborum nisi
                    cupidatat ipsum elit duis aute nostrud. Aliquip dolor irure
                    est mollit pariatur nulla nisi exercitation esse sint mollit
                    occaecat laborum labore. Lorem eiusmod elit Lorem sit amet
                    consequat reprehenderit labore. Pariatur commodo ut commodo
                    quis ea dolor nisi nisi eu pariatur ex do nulla.
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold mt-2">Images</div>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[1, 2, 3, 4].map((item) => (
                      <img src={"/images/image 257.png"} />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <button className="border w-40 p-2 rounded-md ">Call</button>
                  <button className="border w-40 p-2 rounded-md bg-bluePrimary text-white">Chat</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
