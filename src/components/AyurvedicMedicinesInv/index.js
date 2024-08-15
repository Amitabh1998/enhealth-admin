import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import { DocumentDownloadIcon, EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { getAllData } from "@/api/stakeholder-management/common";
import { toast } from "react-toastify";
import LoaderSpinner from "@/components/LoaderSpinner";
import MasterTable from "../Tables/MasterTable";

const cols = [
  {
    label: "Product ID",
    key: "medicine.code",
    dataType: "string",
  },
  {
    label: "Name",
    key: "medicine.name",
    dataType: "string",
  },

  {
    label: "Manufacturer",
    key: "medicine.manufacturer.name",
    dataType: "string",
  },
  {
    label: "Batch",
    key: "batchNumber",
    dataType: "string",
  },
  {
    label: "Expiry",
    key: "expiryDate",
    dataType: "date",
  },
  {
    label: "MRP",
    key: "mrp",
    dataType: "number",
  },
  {
    label: "Stock",
    key: "stock",
    dataType: "number",
  },
];

const tabs2 = [
  {
    name: "Existing",
    status: 1,
  },
  {
    name: "New Requests",
    status: 2,
  },
];

function AyurvedicMedicinesInv() {
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [status2, setStatus2] = useState(1);
  const router = useRouter();

  const getData = async (pageNumber) => {
    try {
      const _skip = (pageNumber - 1) * limit;

      setLoading(true);

      if (status2 === 1) {
        const response = await getAllData(
          limit,
          _skip,
          `inventory/vendor-medicine-inventory?medicineClass=3&status=2&$sort[expiryDate]=1&$populate[0][path]=vendorProfile&$populate[0][select][0]=user&$populate[0][select][1]=address&$populate[0][populate][path]=user&$populate[0][populate][select][0]=name&$populate[0][populate][select][1]=phone&$populate[0][populate][select][2]=email&$populate[0][populate][select][3]=avatar&$populate[1][path]=medicine&$populate[1][select][0]=name&$populate[1][select][1]=code&$populate[1][select][2]=attachments&$populate[1][populate][path]=manufacturer&$populate[1][populate][select][0]=name`
        );
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        setLoading(false);
      } else {
        console.log("request");
        const response = await getAllData(
          limit,
          skip,
          `inventory/vendor-medicine-inventory?medicineClass=3&status=1&$sort[expiryDate]=1&$populate[0][path]=vendorProfile&$populate[0][select][0]=user&$populate[0][select][1]=address&$populate[0][populate][path]=user&$populate[0][populate][select][0]=name&$populate[0][populate][select][1]=phone&$populate[0][populate][select][2]=email&$populate[0][populate][select][3]=avatar&$populate[1][path]=medicine&$populate[1][select][0]=name&$populate[1][select][1]=code&$populate[1][select][2]=attachments&$populate[1][populate][path]=manufacturer&$populate[1][populate][select][0]=name`
        );
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error ? error : "something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(1);
  }, [status2, limit]);

  const handleButtonClick = (url) => {
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="w-full grid grid-cols-2   text-gray-500 font-medium">
        {tabs2.map((item, index) => (
          <div
            onClick={() => setStatus2(item.status)}
            key={index}
            className={`border-r ${
              index !== tabs2.length - 1
                ? "border-gray-200  w-full p-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer text-gray-700"
                : "w-full hover:bg-gray-100 p-2 flex justify-center items-center cursor-pointer text-gray-700"
            } ${
              item.status === status2 &&
              "border-b-2  border-b-bluePrimary text-bluePrimary"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="mb-10"></div>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div>
          {/* ---------------Master Table -------------------- */}
          <MasterTable
            limit={limit}
            setLimit={setLimit}
            data={data}
            columns={cols}
            itemsPerPage={limit}
            total={total}
            fetchData={getData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            viewDetails={"medicines-inventory"}
          />
        </div>
      )}
    </>
  );
}

export default AyurvedicMedicinesInv;
