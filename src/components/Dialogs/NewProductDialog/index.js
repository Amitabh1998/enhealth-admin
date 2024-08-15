import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import NewStaffForm from "../../Forms/newStaffForm";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";

export default function NewProductDialog({
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
  datum,
}) {
  const [name, setName] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [attachmentsUploading, setAttachmentsUploading] = useState(false);
  const [attachmentsUrl, setAttachmentsUrl] = useState([]);
  const [attachmentsThumbnailsUrl, setAttachmentsThumbnailsUrl] = useState("");
  const [attachmentsMetadata, setAttachmentsMetadata] = useState();
  const [image, setImage] = useState(false);
  const [status, setStatus] = useState(1);

  function closeModal() {
    setIsOpen(false);
  }
  const saveHandler = async () => {
    if (attachmentsUrl.length === 0) {
      toast.error("Please upload an image", "bottom-right");
    } else if (name.trim() === "") {
      toast.error("Please enter Category Name", "bottom-right");
    } else {
      const _tableData = [...tableData];
      const token = localStorage.getItem("vitmedsAdminToken");
      let data1 = JSON.stringify({
        name: name,
        attachment: {
          link: attachmentsUrl[0],
          thumbnail: attachmentsThumbnailsUrl[0],
          metadata: attachmentsMetadata[0],
        },
        categoryType: status,
      });

      let config = {
        method: datum ? "patch" : "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}master-data/product-category${
          datum ? `/${datum?._id}` : ""
        }`,
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
          if (datum) {
            let tempData = tableData;
            let index = tempData.findIndex((e) => e._id === datum?._id);
            tempData[index] = response.data;
            setTableData([...tempData]);
          } else {
            setTableData([response.data, ..._tableData]);
          }
          // setData({
          //   ...data,
          //   total: data.total + 1,
          //   data: [..._tableData, response.data],
          // });
          setIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const attachmentsUpload = async (blob) => {
    const token = localStorage.getItem("vitmedsAdminToken");

    var formdata = new FormData();
    formdata.append("file", blob[0]);
    // blob.map((item) => formdata.append("file", item));
    formdata.append("type", "1");
    formdata.append("purpose", "productCategory");

    console.log(formdata);
    setAttachmentsUploading(true);

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
      redirect: "follow",
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}upload-media`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.map((item) => item.link));
        setImage(true);
        setAttachmentsUrl(result.map((item) => item.link));
        setAttachmentsThumbnailsUrl(result.map((item) => item.thumbnail));
        setAttachmentsMetadata(result.map((item) => item.metadata));
        setAttachmentsUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setAttachmentsUploading(false);
      });
  };

  // const onAttachmentsChange = async (imageList) => {
  //   console.log(imageList);
  //   setAttachments(imageList);

  //   const _data = imageList.map((item) => item.file);
  //   console.log(_data);

  //   await attachmentsUpload(_data);
  // };

  const onAttachmentsChange = async (imageList) => {
    let tempList = [];
    if (imageList.length > 0) {
      tempList = [imageList[imageList.length - 1]];
      setAttachments(tempList);
    }
    const _data = tempList.map((item) => item.file);
    await attachmentsUpload(_data);
  };

  const onAttachmentRemove = (index) => {
    let newImages = [...attachments];
    newImages.splice(index, 1);
    setAttachments(newImages);
  };

  useEffect(() => {
    console.log(datum);
    if (datum) {
      setName(datum?.name);
      setAttachments([datum?.attachment?.link]);
      setAttachmentsUrl([datum?.attachment?.link]);
      setAttachmentsThumbnailsUrl([datum?.attachment?.thumbnail]);
      setAttachmentsMetadata([datum?.attachment?.metadata]);
    }
  }, [datum]);

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
                  <div>{`${datum ? "Edit" : "Add New"} Category`}</div>
                  <XCircleIcon
                    className="text-red-500 w-7 h-7 cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>

                <div className="mt-2 flex-1">
                  {/* -----------------PHOTO UPLOAD-------------------- */}
                  <div className="mt-2">
                    <div className=" text-sm mt-4 mb-1">Photos</div>
                    <ImageUploading
                      multiple
                      value={attachments}
                      onChange={onAttachmentsChange}
                      maxNumber={10}
                      dataURLKey="data_url"
                      onImageRemove={onAttachmentRemove} // pass the onImageRemove function here
                    >
                      {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        <div className="">
                          <div className="flex space-x-3">
                            <button
                              onClick={onImageUpload}
                              className="h-32 w-32 rounded-lg border border-white bg-gray-300 bg-opacity-20 text-gray-600 text-3xl font-bold flex justify-center items-center"
                            >
                              +
                            </button>
                            {attachmentsUploading && (
                              <div>
                                <BeatLoader />
                              </div>
                            )}
                          </div>

                          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                            {attachments.map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  className="h-32"
                                  src={
                                    image["data_url"]
                                      ? image["data_url"]
                                      : image
                                  }
                                  alt=""
                                />
                                <div className="image-item__btn-wrapper">
                                  <button
                                    onClick={() => onAttachmentRemove(index)}
                                  >
                                    <TrashIcon className="w-6 text-red-500" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>

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
                      autoComplete="off"
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
