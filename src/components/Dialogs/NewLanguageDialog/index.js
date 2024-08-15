import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";

export default function NewLanguageDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
}) {
  const [name, setName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  // const saveHandler = () => {
  //   const _staff = [...staff];
  //   setStaff([
  //     ..._staff,
  //     { id: staff?.length + 1, name: name, phone: phone, role: role.name },
  //   ]);
  //   console.log([
  //     ..._staff,
  //     { id: staff?.length + 1, name: name, phone: phone, role: role.name },
  //   ]);
  //   setIsOpen(false);
  // };

  const saveHandler = async () => {
    const _tableData = [...tableData];
    // setTableData(..._tableData, name);
    const token = localStorage.getItem("vitmedsAdminToken");
    let data = JSON.stringify({
      name: name,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/language`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setTableData([..._tableData, response.data]);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
              <Dialog.Panel className="w-full flex flex-col    max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Add New State</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <div className="mt-2 flex-1">
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
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full mt-5" onClick={() => saveHandler()}>
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
