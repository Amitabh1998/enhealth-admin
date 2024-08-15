import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewCouponDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
}) {
  const [name, setName] = useState("");
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [names, setNames] = useState([]);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [term, setTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [attachments, setAttachments] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  const saveHandler = async () => {
    if (names.length === 0) {
      toast.error("Please add a city first", "bottom-right");
    } else {
      const _tableData = [...tableData];
      const token = localStorage.getItem("vitmedsAdminToken");
      let data1 = JSON.stringify(names);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}master-data/city?$populate[0][path]=state&$populate[0][select][0]=name`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data1,
      };
      await axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setTableData([...response.data, ..._tableData]);
          setData({
            ...data,
            total: data.total + 1,
            data: [...response.data, ..._tableData],
          });

          setIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : "Something went wrong",
            "bottom-right"
          );
        });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full flex flex-col  max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Add New Coupon</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <div className="mt-2 flex-1 flex space-x-2">
                  <div className="flex-1">
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
                      required
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full mt-20" onClick={() => saveHandler()}>
                  <PrimaryButton text={"Save"} color={"bg-bluePrimary"} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
