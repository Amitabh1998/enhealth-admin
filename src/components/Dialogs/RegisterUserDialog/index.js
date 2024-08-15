import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewUses } from "@/api/uses";
import { toast } from "react-toastify";

export default function RegisterUserDialog({ open, setOpen }) {
  const [name, setName] = useState("");

  function closeModal() {
    setOpen(false);
  }

  const saveHandler = async (e) => {
    e.preventDefault();
  };

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
                  <div>Add New Use</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <form onSubmit={saveHandler} className="mt-2 flex-1">
                  <div className="w-full ">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 "
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      value={name}
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-full mt-2">
                    <label
                      for="email"
                      class="block mb-1 text-sm font-normal text-gray-600 "
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      autoComplete="off"
                    />
                  </div>
                  <div className="w-full mt-2">
                    <label class="block mb-1 text-sm font-normal text-gray-600 ">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      autoComplete="off"
                    />
                  </div>
                  <div className="w-full mt-2">
                    <label class="block mb-1 text-sm font-normal text-gray-600 ">
                      Gender
                    </label>
                    <input
                      type="text"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      autoComplete="off"
                    />
                  </div>
                  <button
                    // disabled={loading}
                    type="submit"
                    className={
                      "mt-20 bg-bluePrimary disabled:bg-[#ccc] rounded-md text-white w-full py-2 hover:bg-indigo-800"
                    }
                  >
                    Save
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
