import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import MultipleNameForm from "@/components/Forms/MultipleNameForm";
import MultipleNameImageForm from "@/components/Forms/MultipleNameImageForm";

export default function EditTextDialog({
  isOpen,
  setIsOpen,
  dialogTitle,
  data,
  setData,
  item,
  setItem,
  index,
}) {
  const [text, setText] = useState(item);
  function closeModal() {
    setIsOpen(false);
  }

  const saveHandler = (e) => {
    e.preventDefault();
    const _data = [...data];
    _data[index] = text;
    console.log(_data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel className="w-full flex flex-col    max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Edit {dialogTitle}</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <form onSubmit={saveHandler}>
                  <div className="flex justify-end space-x-4">
                    <div className="mb-4">
                      <label>{dialogTitle ? dialogTitle : "N/A"}</label>
                      <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className={
                        "mt-20 bg-yellow-400 disabled:bg-[#ccc] rounded-md text-gray-800 w-full py-2 hover:bg-yellow-600"
                      }
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={
                        "mt-20 bg-bluePrimary disabled:bg-[#ccc] rounded-md text-white w-full py-2 hover:bg-indigo-800"
                      }
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
