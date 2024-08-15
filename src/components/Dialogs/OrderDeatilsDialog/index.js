import { Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon, XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewUses } from "@/api/uses";
import { toast } from "react-toastify";
import { fetchDeatils } from "@/api/stakeholder-management/common";
import SpinnerLoader from "@/components/SpinnerLoader";
import moment from "moment";

export default function OrderDetailsDialog({
  on,
  setOn,
  setTableData,
  tableData,
  currentRow,
}) {
  const [name, setName] = useState("");
  const [data, setData] = useState();
  const [selectedInventory, setSelectedInventory] = useState();
  const [loading, setLoading] = useState(false);
  function closeModal() {
    setOn(false);
  }
  console.log(currentRow);
  const getDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchDeatils(
        `order-management/order/${currentRow?._id}`
      );
      console.log(response);
      setData(response);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

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
                {/* ------------------BREADCRUMBS--------------------- */}
                {loading ? (
                  <div className="w-full py-20 flex justify-center">
                    <SpinnerLoader />
                  </div>
                ) : (
                  <div>
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
                              Id : {data?.code}
                            </a>
                          </div>
                        </li>
                      </ol>
                    </nav>

                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 "
                    >
                      <div>Order Details</div>
                      <XCircleIcon
                        className="text-red-500 w-7 h-7 cursor-pointer"
                        onClick={closeModal}
                      />
                    </Dialog.Title>

                    <div className="flex items-center space-x-2">
                      <div className="text-[10px] text-gray-800">
                        Order date :{" "}
                        <span className="font-bold">
                          {data?.orderConfirmedOn
                            ? moment(data?.orderConfirmedOn).format(
                                "DD MMMM YYYY"
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gray-300 my-2"></div>

                    <div className="pb-2 border-b">
                      {data?.items?.map((item, index) => (
                        <div
                          className="my-2 flex justify-between items-center"
                          key={index}
                        >
                          <div className="flex space-x-3 items-center">
                            <div className="p-2 rounded-md border">
                              <img
                                className="h-16"
                                src={item?.entityId?.attachments[0]?.link}
                              />
                            </div>
                            <div>
                              <div className="text-gray-600 text-sm">
                                {item?.entityId?.name
                                  ? item?.entityId?.name
                                  : "N/A"}
                              </div>
                              <div className="text-gray-600 text-xs mt-2">
                                {item?.entityId?.packaging} of{" "}
                                {item?.entityId?.unit1} {item?.entityId?.unit2}
                              </div>
                            </div>
                          </div>
                          {/* <div>
                            <div className="text-pink-600 text-sm">
                              $1599.00
                            </div>
                            <div className="text-gray-600 text-xs mt-2">
                              Qty: 1
                            </div>
                          </div> */}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-2">
                      <div>
                        <div className="text-xs text-gray-800 font-medium">
                          Delivery Address
                        </div>
                        <div className="text-xs text-gray-600">
                          {data?.address?.addressLine1}, {data?.address?.city}
                        </div>
                        <div className="text-xs text-gray-600">
                          {data?.address?.landmark},{data?.address?.pincode}
                        </div>
                        <div className="text-xs text-gray-600"></div>

                        <div className="mt-1 text-xs text-gray-600 font-medium">
                          {data?.address?.name ? data?.address?.name : "N/A"},
                          {data?.address?.phone ? data?.address?.phone : "N/A"}
                        </div>
                      </div>
                      {/* <div>
                        <div className="text-xs text-gray-800 font-medium my-1">
                          Prescription
                        </div>
                        <div className="bg-gray-200 rounded-md h-20 w-24"></div>
                      </div> */}
                    </div>

                    <div className="grid md:grid-cols-2 w-full">
                      <div></div>
                      <div className="w-full">
                        <div className="text-xs text-gray-800 font-medium my-1">
                          Payment
                        </div>
                        <div className="w-full grid grid-cols-2">
                          <div className="text-xs text-gray-600">Total (Original)</div>
                          <div className="text-xs text-gray-600">
                            ₹{data?.price?.totalPrice}
                          </div>
                          <div className="text-xs text-gray-600">Final payable</div>
                          <div className="text-xs text-gray-600">
                            ₹{data?.price?.finalPrice}
                          </div>

                          <div className="text-xs text-gray-800 font-bold border-t mt-2 pt-1">
                            Sub Total
                          </div>
                          <div className="text-xs text-gray-600 border-t mt-2 pt-1">
                            ₹{data?.price?.finalPrice}
                          </div>
                        </div>
                      </div>
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
