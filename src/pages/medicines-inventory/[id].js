import { addCommonData } from "@/api/common";
import {
  fetchDeatils,
  fetchDeatils2,
  getAllData,
} from "@/api/stakeholder-management/common";
import DefaultInput from "@/components/Inputs/DefaultInput";
import SpinnerLoader from "@/components/SpinnerLoader";
import MasterTable from "@/components/Tables/MasterTable";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const cols = [
  {
    label: "Vendor",
    key: "vendorProfile.user.name",
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

const index = () => {
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [status2, setStatus2] = useState(1);
  const router = useRouter();
  const [vendors, setVendors] = useState([]);

  const [batchNumber, setBatchNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("");

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setExpiryDate(selectedDate);
  };

  const getPageData = async (id) => {
    try {
      setLoading(true);
      console.log("request");
      const response = await fetchDeatils2(
        `inventory/vendor-medicine-inventory/${id}?$populate[0][path]=vendorProfile&$populate[0][select][0]=user&$populate[0][select][1]=address&$populate[0][populate][path]=user&$populate[0][populate][select][0]=name&$populate[0][populate][select][1]=phone&$populate[0][populate][select][2]=email&$populate[0][populate][select][3]=avatar&$populate[1][path]=medicine&$populate[1][select][0]=name&$populate[1][select][1]=code&$populate[1][select][2]=attachments&$populate[1][populate][path]=manufacturer`
      );
      console.log("Details response --------", response);
      setData(response);
      setBatchNumber(response?.batchNumber);
      setStock(response?.stock);
      setMrp(response?.mrp);
      setExpiryDate(response?.expiryDate);

      const givenDate = moment.utc(response?.expiryDate);
      const previousDate = givenDate
        .clone()
        .subtract(1, "day")
        .format("MM/DD/YYYY");
      const afterDate = givenDate.clone().add(1, "day").format("MM/DD/YYYY");

      console.log("Previous Date:", previousDate);
      console.log("After Date:", afterDate);

      const response2 = await getAllData(
        limit,
        skip,
        `inventory/vendor-medicine-inventory?medicine=${response?.medicine?._id}&status=${response?.status}&$sort[expiryDate]=1&$populate[0][path]=vendorProfile&$populate[0][select][0]=user&$populate[0][select][1]=address&$populate[0][populate][path]=user&$populate[0][populate][select][0]=name&$populate[0][populate][select][1]=phone&$populate[0][populate][select][2]=email&$populate[0][populate][select][3]=avatar&$populate[1][path]=medicine&$populate[1][select][0]=name&$populate[1][select][1]=code&$populate[1][select][2]=attachments&$populate[1][populate][path]=manufacturer&$populate[1][populate][select][0]=name&batchNumber=${response?.batchNumber}&mrp=${response?.mrp}&expiryDate[$gt]=${previousDate}&expiryDate[$lt]=${afterDate}`
      );
      console.log("Vendors listing response --------", response2);
      setVendors(response2.data);

      setTotal(response2.total);
      setSkip(response2.skip);
      setLimit(response2.limit);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router && router?.query && router?.query?.id) {
      getPageData(router?.query?.id);
    }
  }, [router, router?.query?.id]);

  const acceptHandler = async () => {
    try {
      const body = {
        status: 2,
        inventoryRequests: vendors?.map((item, index) => item?._id),
        batchNumber: batchNumber,
        expiryDate: moment(expiryDate).format("MM/DD/YYYY"),
        mrp: mrp,
      };
      const response = await addCommonData(
        body,
        "inventory-management/approve-medicine-inventory-request"
      );
      console.log(response);
      toast.success("Saved succesfully");
      router.push("/medicines-inventory");
      console.log(body);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  const rejectHandler = async () => {};

  return (
    <div className="w-full">
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="w-full">
          <div className="w-fill p-2 rounded-md shadow bg-white flex ">
            <div className="w-full flex space-x-3 items-center">
              <img
                className="w-32 h-32 rounded-md"
                src={data?.medicine?.attachments[0]?.link}
              />
              <div className="">
                <div className="text-2xl text-gray-600 font-semibold">
                  {data?.medicine?.name}
                </div>
                <div className="text- text-gray-600">
                  {data?.medicine?.manufacturer?.name}
                </div>
                <div className="text- text-gray-600 bg-green-50 p-1 rounded-md">
                  {data?.medicineClass === 1
                    ? "Allopathic medicine"
                    : data?.medicineClass === 2
                    ? "Homeopathic medicine"
                    : data?.medicineClass === 3
                    ? "Ayurvedic medicine"
                    : "Unani Medicine"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="my-4 grid grid-cols-4 gap-3">
              <div>
                <div className="text-xl text-gray-500 font-semibold">
                  Recent Vendor's Name
                </div>
                <div>{data?.vendorProfile?.user?.name}</div>
              </div>
              <div>
                <div className="text-xl text-gray-500 font-semibold">
                  Batch Number
                </div>
                <div>{data?.batchNumber}</div>
              </div>
              <div>
                <div className="text-xl text-gray-500 font-semibold">Stock</div>
                <div>{data?.stock}</div>
              </div>
              <div>
                <div className="text-xl text-gray-500 font-semibold">MRP</div>
                <div>{data?.mrp}</div>
              </div>
            </div>

            <div>
              Other vendors list with same batch details (batchNumber, MRP,
              Expiry Date)
            </div>

            <div className="w-full my-4">
              <MasterTable
                limit={limit}
                setLimit={setLimit}
                data={vendors}
                columns={cols}
                itemsPerPage={limit}
                total={total}
                fetchData={getPageData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                actions={"off"}
              />
            </div>
            {data?.status === 1 && (
              <div className="w-full">
                <div className="w-full grid grid-cols-4 gap-4 mb-5">
                  <DefaultInput
                    label="Batch Number"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                  />

                  <DefaultInput
                    type={"Number"}
                    label="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <DefaultInput
                    type={"Number"}
                    label="MRP"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                  />
                  <div>
                    <label className="text-gray-500">{"Expiry Date"}</label>
                    <input
                      type="date"
                      id="expiryDate"
                      name="expiryDate"
                      className="w-full p-2 rounded-md border"
                      value={expiryDate}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center w-full">
                  <div className="flex space-x-5 items-center">
                    <button
                      onClick={() => rejectHandler()}
                      className="p-2 rounded-md bg-yellow-400 text-white px-10"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => acceptHandler()}
                      className="p-2 rounded-md bg-bluePrimary text-white px-10"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
