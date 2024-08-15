import { addNewMultipleData } from "@/api/common";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MultipleNameForm = ({
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
  const [names, setNames] = useState([]);
  const router = useRouter();

  const saveHandler = async (e) => {
    e.preventDefault();
    const _tableData = [...tableData];
    try {
      if (names.length > 0) {
        let payload = JSON.stringify(names);
        const response = await addNewMultipleData(path, payload);
        setTableData([...response, ..._tableData]);
        const _data = [...response, ..._tableData];
        if (
          router.pathname === "/ingredients" ||
          Array.isArray(data) === true
        ) {
          setData(_data);
        } else {
          setData({ ...data, total: data.total + names.length, data: _data });
        }
        toast.success("Data added successfully");
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
        toast.error(`"${name}" already exists.`);
      } else {
        if (router.pathname === "/tax-category" || path === "tax-category") {
          setNames([..._names, { name: "GST", value: name }]);
        } else if (router.pathname === "/hsn-code") {
          setNames([..._names, { code: name }]);
        } else {
          setNames([..._names, { name: name }]);
        }
        setName("");
      }
    } else {
      toast.error("Please enter a use.");
    }
  };

  const deleteNameHandler = (item) => {
    const _names = [...names];
    setNames([..._names.filter((item1) => item1.name !== item.name)]);
  };

  useEffect(() => {
    console.log(datum);
    if (datum) {
      if (path === "tax-category") {
        setName(datum?.value);
      } else {
        setName(datum?.name);
      }
    }
  }, [datum]);

  const editHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0) {
      toast.error("Name is required", "bottom-right");
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
    <form onSubmit={datum ? editHandler : saveHandler} className="mt-2 flex-1">
      <div className="flex justify-between items-end space-x-3">
        <div className="flex-1 ">
          <label
            for="first_name"
            class="block mb-1 text-sm font-normal text-gray-600 "
          >
            {title}
          </label>
          <input
            type={`${router.pathname === "/tax-category" ? "Number" : "text"}`}
            id="name"
            className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md focus:outline-0"
            // required
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end items-center mt-3">
          {!datum && (
            <div
              onClick={() => addNameHandler()}
              className="cursor-pointer hover:bg-indigo-500 transition duration-100 w-8 h-8 rounded-full bg-bluePrimary text-white text-center font-bold text-xl items-center"
            >
              +
            </div>
          )}
        </div>
      </div>

      {!datum && (
        <div className="flex flex-wrap items-center ">
          {names?.map((item, index) => (
            <div
              key={index}
              onClick={() => deleteNameHandler(item)}
              className="px-3 py-2 rounded-md bg-green-200 mr-2 my-2"
            >
              {router.pathname === "/tax-category"
                ? item.value
                : router.pathname === "/hsn-code"
                ? item.code
                : item.name}
            </div>
          ))}
        </div>
      )}

      <button
        // disabled={loading}
        type="submit"
        className={
          "mt-10 bg-bluePrimary disabled:bg-[#ccc] rounded-md text-white w-full py-2 hover:bg-indigo-800"
        }
      >
        Save
      </button>
    </form>
  );
};

export default MultipleNameForm;
