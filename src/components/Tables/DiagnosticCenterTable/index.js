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

const cols = [
  {
    label: "Avatar",
    key: "avatar.link",
    dataType: "avatar",
  },
  {
    label: "Name",
    key: "name",
    dataType: "string",
  },

  {
    label: "Phone",
    key: "phone",
    dataType: "string",
  },
  {
    label: "Total Bookings",
    key: "diagnosticCenterProfile.bookingCount",
    dataType: "string",
  },

  {
    label: "Registration Certificate",
    key: "diagnosticCenterProfile.registrationCertificate.link",
    dataType: "doc",
  },
  {
    label: "Address",
    key: "diagnosticCenterProfile.address.addressLine1",
    dataType: "gender",
  },
];

const tabs2 = [
  {
    name: "Existing Centers",
    status: 1,
  },
  {
    name: "New Requests",
    status: 2,
  },
];

function DiagnosticCenterTable() {
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState("");
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [status2, setStatus2] = useState(1);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllData(
        limit,
        skip,
        `user-management?role=7&status=${status2}&$populate=diagnosticCenterProfile&diagnosticCenterProfile[$ne]=null`
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
          {/* <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
            <thead className="rounded-t-md">
              <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
                <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
                  S No.
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Image</th>
                <th className=" p-1 text-xs md:text-base md:p-2">
                  Center's Name
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">
                  Total Bookings
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Phone</th>
                <th className=" p-1 text-xs md:text-base md:p-2">
                  Registration Certificate
                </th>
                <th className=" p-1 text-xs md:text-base md:p-2">Address</th>
                <th className="flex justify-center p-1 text-xs md:text-base md:p-2 rounded-tr-xl">
                  View Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className={`hover:bg-gray-50`}>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {index + 1}
                  </td>
                  <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                    {row.avatar?.thumbnail ? (
                      <img
                        src={row?.avatar?.thumbnail}
                        alt={row.name.slice(0, 1)}
                        className="w-10 h-10 rounded-md"
                      />
                    ) : (
                      <div className="w-10 h-10 text-center flex items-center justify-center bg-green-100 rounded-md">
                        {row.name.slice(0, 1)}
                      </div>
                    )}
                  </td>
                  <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                    {row.name ? row.name : "N/A"}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {row?.diagnosticCenterProfile?.bookingCount
                      ? row?.diagnosticCenterProfile?.bookingCount
                      : "N/A"}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {row.phone}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {row?.diagnosticCenterProfile?.registrationCertificate
                      .link ? (
                      <DocumentDownloadIcon
                        onClick={() =>
                          handleButtonClick(
                            row?.diagnosticCenterProfile
                              ?.registrationCertificate.link
                          )
                        }
                        className="w-6 h-6 text-bluePrimary"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {row?.diagnosticCenterProfile?.address?.addressLine1
                      ? row?.diagnosticCenterProfile?.address?.addressLine1
                      : "N/A"}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2 flex justify-center">
                    <button
                      onClick={() => {
                        router.push("#");
                      }}
                      className="rounded-sm p-1 bg-blue-100"
                    >
                      <EyeIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* Master Table */}
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
            viewDetails={"manage-stakeholders/lab-center"}
          />
        </div>
      )}
    </>
  );
}

export default DiagnosticCenterTable;
