import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewState } from "@/api/states";
import { toast } from "react-toastify";
import { addNewMultipleData } from "@/api/common";

export default function NewStateDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
}) {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  const saveHandler = async (e) => {
    e.preventDefault();
    const _tableData = [...tableData];
    try {
      if (names.length > 0) {
        let payload = JSON.stringify(names);

        const response = await addNewMultipleData("state", payload);
        setTableData([...response, ..._tableData]);
        const _data = [...response, ..._tableData];
        setData({ ...data, total: data.total + names.length, data: _data });
        setIsOpen(false);
      } else {
        toast.error("Please enter the name", "bottom-right");
      }
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong", "bottom-right");
    }
  };

  const addNameHandler = () => {
    if (name.trim() !== "") {
      const _names = [...names];
      if (_names.filter((item) => item.name === name).length > 0) {
        toast.error(`State with name ${name} already exists.`);
      } else {
        setNames([..._names, { name: name }]);
        setName("");
      }
    } else {
      toast.error("Please enter a state.");
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
              <Dialog.Panel className="w-full flex flex-col  h- max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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

                <form onSubmit={saveHandler} className="mt-2 flex-1">
                  <div className="flex justify-between items-end space-x-3">
                    <div className="flex-1 ">
                      <label
                        for="first_name"
                        class="block mb-1 text-sm font-normal text-gray-600 "
                      >
                        State Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md focus:outline-0"
                        // required
                        value={name}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end items-center mt-3">
                      <div
                        onClick={() => addNameHandler()}
                        className="cursor-pointer hover:bg-indigo-500 transition duration-100 w-8 h-8 rounded-full bg-bluePrimary text-white text-center font-bold text-xl items-center"
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center ">
                    {names?.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => deleteNameHandler(item)}
                        className="px-3 py-2 rounded-md bg-green-200 mr-2 my-2"
                      >
                        {item.name}
                      </div>
                    ))}
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
