import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import LoaderSpinner from "@/components/LoaderSpinner";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { addNewMultipleData } from "@/api/common";

const MultipleNameImageLinkForm = ({
  title,
  path,
  isOpen,
  setIsOpen,
  setTableData,
  tableData,
  data,
  setData,
  datum,
}) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [attachmentsUploading, setAttachmentsUploading] = useState(false);
  const [attachmentsUrl, setAttachmentsUrl] = useState([]);
  const [attachmentsThumbnailsUrl, setAttachmentsThumbnailsUrl] = useState("");
  const [attachmentsMetadata, setAttachmentsMetadata] = useState();
  const [image, setImage] = useState(false);

  // Array data fopro the upload with objects containing name ,attachments
  const [dataToUpload, setDataToUpload] = useState([]);

  const attachmentsUpload = async (blob) => {
    const token = localStorage.getItem("vitmedsAdminToken");

    var formdata = new FormData();
    // formdata.append("file", blob);
    blob.map((item) => formdata.append("file", item));
    formdata.append("type", "1");
    formdata.append("purpose", "surgeon");

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
        console.log(result.map((item) => item));
        setImage(true);
        setAttachmentsUrl(result.map((item) => item.link));
        setAttachmentsThumbnailsUrl(result.map((item) => item.thumbnail));
        setAttachmentsMetadata(result.map((item) => item.metadata));
        setAttachmentsUploading(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Something went wrong",
          "bottom-right"
        );
        setAttachmentsUploading(false);
      });
  };

  const onAttachmentsChange = async (imageList) => {
    console.log(imageList);
    setAttachments(imageList);

    const _data = imageList.map((item) => item.file);
    console.log(_data);

    await attachmentsUpload(_data);
  };

  const onAttachmentRemove = (index) => {
    let newImages = [...attachments];
    newImages.splice(index, 1);
    setAttachments(newImages);
  };

  const addNameHandler = () => {
    if (name.trim() === "") {
      toast.error("Please enter Surgeon");
    } else {
      if (dataToUpload.filter((item) => item.name === name).length > 0) {
        toast.error(`"${name}" already exists`);
      } else {
        const _dataToUpload = [...dataToUpload];
        setDataToUpload([
          {
            name: name,
            link: link,
            hidden: attachmentsUrl.length === 0 ? true : false,
            attachments: attachmentsUrl[0]
              ? [
                  {
                    link: attachmentsUrl[0],
                    thumbnail: attachmentsThumbnailsUrl[0],
                    metadata: attachmentsMetadata[0],
                  },
                ]
              : [],
          },
          ..._dataToUpload,
        ]);

        setAttachments([]);
        setAttachmentsMetadata([]);
        setAttachmentsThumbnailsUrl([]);
        setAttachmentsUrl([]);
        setName("");
        setLink("");
      }
    }
  };

  const deleteDataRow = (item) => {
    const _dataToUpload = [...dataToUpload];
    setDataToUpload([
      ..._dataToUpload.filter((item1) => item1.name !== item.name),
    ]);
  };

  const onInputChange = (index, e) => {
    const updatedData = [...dataToUpload];
    updatedData[index].name = e.target.value;
    setDataToUpload(updatedData);
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    console.log(tableData);
    const _tableData = [...tableData];
    try {
      if (dataToUpload.length > 0) {
        let payload = JSON.stringify(dataToUpload);

        const response = await addNewMultipleData(path, payload);
        setTableData([...response, ..._tableData]);
        const _data = [...response, ..._tableData];
        setData({
          ...data,
          total: data.total + dataToUpload.length,
          data: _data,
        });
        setIsOpen(false);
      } else {
        toast.error("Please enter the name", "bottom-right");
      }
    } catch (error) {
      console.log(error);
      toast.error(error ? error : "Something went wrong", "bottom-right");
    }
  };

  useEffect(() => {
    if (datum) {
      setName(datum?.name);
      setLink(datum?.link);
      setAttachmentsUrl(datum?.attachments?.map((item) => item.link));
      setAttachmentsThumbnailsUrl(
        datum?.attachments?.map((item) => item.thumbnail)
      );
      setAttachmentsMetadata(datum?.attachments?.map((item) => item.metadata));
    }
  }, [datum]);

  const editHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error("Name is required", "bottom-right");
    } else if (attachmentsUrl.length === 0) {
      toast.error("Image is required", "bottom-right");
    } else if (link.length === 0) {
      toast.error("Link is required", "bottom-right");
    } else {
      const token = localStorage.getItem("vitmedsAdminToken");
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}master-data/${path}/${datum._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          link: link,
          attachments: [
            {
              link: attachmentsUrl[0],
              thumbnail: attachmentsThumbnailsUrl[0],
              metadata: attachmentsMetadata[0],
            },
          ],
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

  return (
    <form onSubmit={(e) => (datum ? editHandler(e) : saveHandler(e))}>
      <div className="mt-2 flex-1 ">
        <div className="flex items- space-x-4">
          <div className="flex-1 ">
            <label
              for="first_name"
              class="block mb-1 text-sm font-normal text-gray-600 "
            >
              {title}
            </label>
            <input
              type="text"
              id="first_name"
              className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md  "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1 ">
            <label
              for="first_name"
              class="block mb-1 text-sm font-normal text-gray-600 "
            >
              {"Link URL"}
            </label>
            <input
              type={`text`}
              id="link"
              className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md focus:outline-0"
              // required
              value={link}
              autoComplete="off"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className=" text-sm ">Photo</div>
            <ImageUploading
              value={attachments}
              onChange={onAttachmentsChange}
              dataURLKey="data_url"
              onImageRemove={onAttachmentRemove} // pass the onImageRemove function here
            >
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                <div className="">
                  <div className="flex space-x-3">
                    {attachmentsUrl.length === 0 ? (
                      <button
                        onClick={() => {
                          if (name.trim() === "") {
                            toast.error("Enter name first ");
                          } else {
                            onImageUpload();
                          }
                        }}
                        type={"button"}
                        className="h-10  w-20 hover:bg-opacity-70 rounded-md border border-white bg-gray-300 bg-opacity-20 text-gray-600 text-sm font-bold flex justify-center items-center"
                      >
                        upload
                      </button>
                    ) : (
                      <img
                        onClick={onImageUpload}
                        className="w-20 h-20"
                        src={attachmentsUrl[0]}
                      />
                    )}
                    {attachmentsUploading && (
                      <div>
                        <LoaderSpinner />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          {!datum && (
            <div
              onClick={() => addNameHandler()}
              className="cursor-pointer self-center hover:bg-indigo-500 transition duration-100 w-8 h-8 rounded-full bg-bluePrimary text-white text-center font-bold text-xl items-center"
            >
              +
            </div>
          )}
        </div>
      </div>

      {dataToUpload.length > 0 && (
        <div className="w-full mt-5 border-t space-y-2 pt-5">
          {dataToUpload.map((item, index) => (
            <div
              key={index}
              className="w-full flex justify- items-center space-x-4"
            >
              <input
                className="flex-1 p-1 border rounded-md"
                value={item.name}
                onChange={(e) => onInputChange(index, e)}
              />
              {/* <div>{item.name}</div> */}
              {item.attachments.length > 0 ? (
                <div className="relative">
                  {/* <ImageUploading
                    value={attachments}
                    onChange={onAttachmentsChange}
                    dataURLKey="data_url"
                    onImageRemove={onAttachmentRemove} // pass the onImageRemove function here
                  >
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                      <div className="">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              if (name.trim() === "") {
                                toast.error("Enter name first ");
                              } else {
                                onImageUpload();
                              }
                            }}
                            type={"button"}
                            className="absolute right-0 bottom-0 p-1 rounded-md border border-white bg-gray-300 shadow  text-gray-600 text-sm font-bold flex justify-center items-center"
                          >
                            <PencilIcon className="text-gray-800 w-5" />
                          </button>
                          {attachmentsUploading && (
                            <div>
                              <LoaderSpinner />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </ImageUploading> */}
                  <img src={item?.attachments[0]?.link} className="w-20 " />
                </div>
              ) : (
                <div className="w-20 text-center">N/A</div>
              )}
              <div
                onClick={() => deleteDataRow(item)}
                className="cursor-pointer self-center hover:bg-red-400 transition duration-100 w-8 h-8 rounded-full bg-red-500 justify-center flex text-white text-center font-bold text-xl items-center"
              >
                <TrashIcon className="text-white w-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div className="grid mt-3">
        {attachments.map((image, index) => (
          <div key={index} className="image-item">
            <img
              className="h-20 w-20 rounded-md"
              src={image["data_url"]}
              alt=""
            />
            <div className="image-item__btn-wrapper">
              <button onClick={() => onAttachmentRemove(index)}>
                <TrashIcon className="w-6 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div> */}
      <div className="w-full mt-5" type="submit">
        <PrimaryButton text={"Save"} color={"bg-bluePrimary"} />
      </div>
    </form>
  );
};

export default MultipleNameImageLinkForm;
