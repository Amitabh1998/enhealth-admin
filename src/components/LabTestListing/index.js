import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { getAllData } from "@/api/stakeholder-management/common";
import { toast } from "react-toastify";
import LoaderSpinner from "@/components/LoaderSpinner";
import MasterTable from "../Tables/MasterTable";

const tabs2 = [
  {
    name: "Radiology",
    status: 1,
  },
  {
    name: "Non Radiology",
    status: 2,
  },
];

function LabTestListing() {
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

  const cols = [
    {
      label: "Image",
      key: "attachment.link",
      dataType: "avatar",
    },
    {
      label: "Name",
      key: "name",
      dataType: "string",
    },

    {
      label: "Organs",
      key: "organs",
      dataType: "arrayOfString",
    },
    {
      label: "Actual Price",
      key: "actualPrice",
      dataType: "string",
    },
    {
      label: "Selling Price",
      key: "sellingPrice",
      dataType: "string",
    },
    {
      label: "CreatedOn",
      key: "createdAt",
      dataType: "date",
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);

      if (status2 === 1) {
        const response = await getAllData(
          limit,
          skip,
          `lab-test/test-category?type[$in]=1`
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
          `lab-test/test-category?type[$in]=2`
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
    getData();
  }, [status2]);

  const handleButtonClick = (url) => {
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="flex justify-center space-x-2">
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
        {status2 === 1 ? (
          <button
            onClick={() => router.push(`/new-test?type=${status2}`)}
            className="p-2 w-60 bg-bluePrimary rounded-md text-white"
          >
            New Radiology Test
          </button>
        ) : (
          <button
            onClick={() => router.push(`/new-test?type=${status2}`)}
            className="p-2 w-60 bg-bluePrimary rounded-md text-white"
          >
            New Non-Radiology Test
          </button>
        )}
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
            viewDetails={"/lab-tests/"}
            deleteUrl={"lab-test/test-category/"}
          />
        </div>
      )}
    </>
  );
}

export default LabTestListing;
