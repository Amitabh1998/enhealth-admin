import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import OtpInput from "../../OtpInput";
import PrimaryButton from "../../Buttons/PrimaryButton";
import Link from "next/link";

export default function OtpDialog({ open, setOpen }) {
  const [otp, setOtp] = useState("");
  const [verifyDialog, setVerifyDialog] = useState(false);

  const closeModal = () => {
    setOpen(false);
    setVerifyDialog(false);
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
          <div className="fixed inset-0 bg-black bg-opacity-80" />
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
              <Dialog.Panel className="w-full max-w-sm text-center transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                {verifyDialog ? (
                  <div className="">
                    <img
                      src={"/images/greenTick.svg"}
                      alt={"green tick"}
                      className="mx-auto"
                    />
                    <div className="txet-center text-xl my-2 text-gray-800 font-semibold">
                      Welcome to Vitmeds!
                    </div>
                    <div className="text-xs text-gray-500 mb-5">
                      Please fill out your work profile and verify your identity
                      before stating. Thanks!
                    </div>
                    <div className="w-full">
                      <Link
                        className="w-full"
                        href={"/dashboard"}
                        legacyBehavior
                      >
                        <a className="bg-[#575AE5] rounded-md text-white w-full px-4 md:px-14 py-2 hover:bg-indigo-800">
                          Fill Out My Work Profiles
                        </a>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center font-semibold leading-6 text-gray-900"
                    >
                      Verification
                    </Dialog.Title>
                    <p className="text-xs text-gray-500 mb-5">
                      Please check you message for a five-digit security code
                      and enter it below.
                    </p>
                    <OtpInput otp={otp} setOtp={setOtp} />
                    <div className="text-xs text-gray-500 mt-5">
                      Waiting for OTP... 29 Sec
                    </div>
                    <div className="my-5" onClick={() => setVerifyDialog(true)}>
                      <PrimaryButton text={"Verify"} color={"bg-[#575AE5]"} />
                    </div>
                    <div className="text-xs mx-auto text-gray-800  font-semibold cursor-pointer hover:bg-slate-100 px-2 py-2 rounded-md shadow w-max">
                      RESEND OTP
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
