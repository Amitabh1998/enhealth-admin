import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpinnerLoader from "../SpinnerLoader";
import { toast } from "react-toastify";
import { updateCommonData } from "@/api/common";

const MasterEditDialog = ({
  datum,
  title,
  path,
  open,
  setOpen,
  tableData,
  setTableData,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setData(datum?.name ? datum?.name : datum?.code ? datum?.code : "");
  }, [datum]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data && data !== datum.name) {
        setLoading(true);

        let body = { name: data };

        if (path === "hsn-code") {
          body = { code: data };
        }

        const response = await updateCommonData(
          body,
          `master-data/${path}/${datum._id}`
        );
        setLoading(false);
        let tempData = tableData;
        let index = tempData?.findIndex((e) => e._id === datum._id);
        tempData[index] = response;
        setTableData([...tempData]);
        toast.success("Data updated successfully");
        setOpen(false);
      } else {
        toast.warning("Name is required");
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error ? error : "Something went wrong", "bottom-right");
    }
  };

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
              <Dialog.Panel className="w-full flex flex-col    max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>{`Edit ${title}`}</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <div className="mt-2 flex-1">
                  <div className="w-full mt-2">
                    <input
                      type="text"
                      id="data"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      value={data}
                      autoComplete="off"
                      onChange={(e) => setData(e.target.value)}
                    />
                  </div>
                  {/* <div className="w-full ">
                        <label
                          for="description"
                          class="block mb-1 text-sm font-normal text-gray-600 "
                        >
                          Answer
                        </label>
                        <input
                          type="text"
                          id="description"
                          className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                          value={description}
                          autoComplete="off"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div> */}
                  <button
                    disabled={loading}
                    className={
                      "mt-10 bg-bluePrimary disabled:bg-[#ccc] rounded-md text-white w-full py-2 hover:bg-indigo-800"
                    }
                    onClick={handleSubmit}
                  >
                    {loading ? <SpinnerLoader color="white" /> : "Save"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MasterEditDialog;
