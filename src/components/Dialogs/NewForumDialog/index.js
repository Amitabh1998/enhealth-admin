import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { addNewTag } from "@/api/tags";
import { toast } from "react-toastify";
import ImageUploading from "react-images-uploading";
import { useRouter } from "next/router";
import SpinnerLoader from "@/components/SpinnerLoader";
import { addCommonData } from "@/api/common";
// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center py-20">
      <SpinnerLoader />
    </div>
  ),
});
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default function NewForumDialog({
  open,
  setOpen,
  setTableData,
  tableData,
  data,
  setData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [content, setContent] = useState("");

  function closeModal() {
    setOpen(false);
  }

  const saveHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addCommonData(
        {
          title: name,
          description: content,
        },
        "knowledge-center/forum"
      );

      console.log(response);
      // setData([response, ..._data]);
      toast.success("Forum created successfully");
      router.reload();
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error(error ? error : "N/A");
      setLoading(false);
      setOpen(false);
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
              <Dialog.Panel className="w-full flex flex-col    max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium flex justify-between items-center pb-2 text-gray-900 border border-b border-x-0 border-t-0"
                >
                  <div>Add New Question</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <form onSubmit={saveHandler} className="mt-2 flex-1">
                  <div className="w-full ">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 "
                    >
                      Question
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
                      value={name}
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
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
                  <div className="w-full mt-2 ">
                    <label
                      for="first_name"
                      class="block mb-1 text-sm font-normal text-gray-600 "
                    >
                      Answer
                    </label>
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      formats={formats}
                      value={content}
                      onChange={setContent}
                      style={{
                        height: "50vh",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </div>
                  <button
                    // disabled={loading}
                    type="submit"
                    className={
                      "mt-20 bg-bluePrimary disabled:bg-[#ccc] rounded-md text-white w-full py-2 hover:bg-indigo-800"
                    }
                  >
                    {loading ? <SpinnerLoader color="white" /> : "Save"}
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
