import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewUses } from "@/api/uses";
import { toast } from "react-toastify";

export default function DefineChargesDialog({ open, setOpen }) {
  const [percent, setPercent] = useState("");

  function closeModal() {
    setOpen(false);
  }

  const saveHandler = async (e) => {
    e.preventDefault();
  };

  const handleNumberFieldKeyPress = (event) => {
    const invalidCharacters = ["-", "+", "e"];
    if (invalidCharacters.includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
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
              <Dialog.Panel
                className="w-full flex flex-col transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                style={{ width: 828 }}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Define Charges for Doctors</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <form
                  onSubmit={saveHandler}
                  className="mt-2 flex-1 gap-7 flex flex-col"
                >
                  <div className="w-full ">
                    <p
                      className="text-lg"
                      style={{ lineHeight: "20px", color: "#4f4f4f" }}
                    >
                      Please define the percentage amount which you will like to
                      take from the doctors invoicing as a commission.
                    </p>
                  </div>
                  <div
                    className="w-full flex flex-col gap-2"
                    style={{
                      "& .input[type=number]::-webkit-inner-spin-button, & .input[type=number]::-webkit-outer-spin-button":
                        {
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                          margin: 0,
                          opacity: 1,
                        },
                    }}
                  >
                    <label
                      for="percent"
                      className="text-sm"
                      style={{ lineHeight: "18px", color: "#727272" }}
                    >
                      Define Percentage
                    </label>
                    <input
                      type="number"
                      id="percentage"
                      name="percent"
                      value={percent}
                      min="0"
                      max="100"
                      step="1"
                      className="w-96 h-12 rounded-xl p-5"
                      style={{
                        border: "1px solid #D9D9D9",
                        "&::-webkit-inner-spin-button": {
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                          margin: 0,
                        },
                        "&::-webkit-outer-spin-button": {
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                          margin: 0,
                        },
                        // "&":
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        // },
                        "&:hover, &:focus": {
                          "&::-webkit-inner-spin-button": {
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                            margin: 0,
                          },
                          "&::-webkit-outer-spin-button": {
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                            margin: 0,
                          },
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                          margin: 0,
                        },
                        appearance: "textfield",
                      }}
                      onKeyDown={handleNumberFieldKeyPress}
                      onChange={(e) => {
                        let value = parseInt(e.target.value, 10);
                        if (value > 100) {
                          value = 100;
                        }
                        if (value < 0) {
                          value = 0;
                        }
                        setPercent(value);
                      }}
                    />
                  </div>
                  {/* <div className="w-full mt-2">
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
                  </div> */}
                  <button
                    // disabled={loading}
                    type="submit"
                    className={
                      "disabled:bg-[#ccc] rounded-md text-black w-40 h-12 py-2 hover:bg-indigo-800 self-end"
                    }
                    style={{ backgroundColor: "#F8CD5B" }}
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
