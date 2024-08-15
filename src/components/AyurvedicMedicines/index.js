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

function AyurvedicMedicines() {
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
      label: `${status2 === 1 ? "Product ID" : "Vendor"}`,
      key: `${status2 === 1 ? "code" : "vendorProfile.user.name"}`,
      dataType: "string",
    },
    {
      label: "Name",
      key: "name",
      dataType: "string",
    },

    {
      label: "Manufacturer",
      key: "manufacturer.name",
      dataType: "string",
    },
    {
      label: "Category",
      key: "category.name",
      dataType: "string",
    },
  ];

  const getData = async (pageNumber) => {
    try {
      setLoading(true);
      const _skip = (pageNumber - 1) * limit;

      if (status2 === 1) {
        const response = await getAllData(
          limit,
          _skip,
          `medicines/medicine-details?medicineClass=3&$populate[0][path]=manufacturer&$populate[1][path]=category&$populate[2][path]=subCategories&$select[0]=code&$select[1]=name&$select[2]=manufacturer&$select[3]=category&$select[4]=subCategories&$select[5]=averageRating&$select[6]=updatedAt&$select[7]=medicineClass`
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
          _skip,
          `medicines/vendor-medicine-request?$sort[createdAt]=-1&status=1&medicineClass=3&$populate[0][path]=manufacturer&$populate[0][select][0]=name&$populate[1][path]=category&$populate[1][select][0]=name&$populate[2][path]=subCategories&$populate[2][select][0]=name&$populate[3][path]=vendorProfile&$populate[3][select][0]=user&$populate[3][populate]=user&$select[0]=name`
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
            viewDetails={`/medicines/`}
          />
        </div>
      )}
    </>
  );
}

export default AyurvedicMedicines;
