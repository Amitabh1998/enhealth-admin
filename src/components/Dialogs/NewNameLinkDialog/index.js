import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import MultipleNameForm from "@/components/Forms/MultipleNameForm";
import MultipleNameImageForm from "@/components/Forms/MultipleNameImageForm";
import MultipleNameLinkForm from "@/components/Forms/MultipleNameLinkForm";
import MultipleNameImageLinkForm from "@/components/Forms/MultipleNameImageLinkForm";

export default function NewNameLinkDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
  dialogTitle,
  path,
  inputTitle,
  image = false,
  datum,
}) {
  function closeModal() {
    setIsOpen(false);
  }

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
              <Dialog.Panel className="w-full flex flex-col    max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>{dialogTitle}</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                {image === true ? (
                  <MultipleNameImageLinkForm
                    title={inputTitle}
                    path={path}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setTableData={setTableData}
                    tableData={tableData}
                    data={data}
                    setData={setData}
                    datum={datum}
                  />
                ) : (
                  <MultipleNameLinkForm
                    title={inputTitle}
                    path={path}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    setTableData={setTableData}
                    tableData={tableData}
                    data={data}
                    setData={(e) => {
                      setData(e);
                    }}
                    datum={datum}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
