import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { DocumentDownloadIcon, EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { getAllData } from "@/api/stakeholder-management/common";
import { toast } from "react-toastify";
import LoaderSpinner from "@/components/LoaderSpinner";
import MasterTable from "../MasterTable";

const tabs2 = [
  {
    name: "Existing Agents",
    status: 1,
  },
  {
    name: "New Requests",
    status: 2,
  },
];

function DeliveryAgentTable() {
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
      label: "Avatar",
      key: `${status2 === 1 ? "avatar.link" : "deliveryProfile.avatar.link"}`,
      dataType: "avatar",
    },
    {
      label: "Name",
      key: "name",
      dataType: "string",
    },

    {
      label: "phone",
      key: "phone",
      dataType: "string",
    },
    {
      label: "Email",
      key: "email",
      dataType: "gender",
    },

    {
      label: "DOB",
      key: "dob",
      dataType: "date",
    },
    {
      label: "Driving license",
      key: "deliveryProfile.drivingLicense.link",
      dataType: "doc",
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllData(
        limit,
        skip,
        `user-management?role=2&status=${status2}&$populate=deliveryProfile&deliveryProfile[$ne]=null`
      );
      console.log(response);
      setData(response.data);
      setTotal(response.total);
      setSkip(response.skip);
      setLimit(response.limit);
      setLoading(false);
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
            viewDetails={"manage-stakeholders/delivery-agent"}
          />
        </div>
      )}
    </>
  );
}

export default DeliveryAgentTable;
