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

export default function NewCityDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
  datum,
}) {
  const [name, setName] = useState("");
  const [state, setState] = useState(null);
  const [states, setStates] = useState([]);
  const [names, setNames] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  const getAllStates = async () => {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/state?$limit=-1&$select=name`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setStates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  useEffect(() => {
    getAllStates();
    if (datum) {
      setName(datum.name);
      setState(datum.state);
    }
  }, []);

  const addNameHandler = () => {
    if (name.trim() === "") {
      toast.error("Please enter a city.");
    } else if (state === null) {
      toast.error("Please select a state.");
    } else {
      const _names = [...names];
      if (_names.filter((item) => item.name === name).length > 0) {
        toast.error(`"${name}" already exists.`);
      } else {
        setNames([..._names, { name: name, state: state._id }]);
        setName("");
        setState(null);
      }
    }
  };

  const editHandler = async () => {
    if (name.length === 0) {
      toast.error("Name is required", "bottom-right");
    } else {
      const token = localStorage.getItem("vitmedsAdminToken");
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}master-data/city/${datum._id}?$populate[0][path]=state&$populate[0][select][0]=name`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          state: state._id,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          let tempData = tableData;
          let index = tempData?.findIndex((e) => e._id === datum._id);
          tempData[index] = response.data;
          setTableData([...tempData]);
          toast.success(`Data updated successfully.`);
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

  const deleteNameHandler = (item) => {
    const _names = [...names];
    setNames([..._names.filter((item1) => item1.name !== item.name)]);
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
                  <div>{`${datum ? "Edit" : "Add"} City`}</div>
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
                      State
                    </label>
                    <Listbox value={state} onChange={(e) => setState(e)}>
                      <div className="relative mt-1">
                        <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
                          <span className="block truncate">
                            {state?.name ? state?.name : "Select State"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {states.map((state, roleIdx) => (
                              <Listbox.Option
                                key={roleIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={state}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {state?.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  <div className="flex-1">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 "
                    >
                      City Name
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
                  {!datum && (
                    <div
                      onClick={() => addNameHandler()}
                      className="cursor-pointer self-end hover:bg-indigo-500 transition duration-100 w-8 h-8 rounded-full bg-bluePrimary text-white text-center font-bold text-xl items-center"
                    >
                      +
                    </div>
                  )}
                </div>

                {!datum && (
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
                )}

                <div
                  className="w-full mt-20"
                  onClick={() => (datum ? editHandler() : saveHandler())}
                >
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
