import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { getAllData } from "@/api/stakeholder-management/common";
import LoaderSpinner from "@/components/LoaderSpinner";
import { toast } from "react-toastify";

const data = [
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
  },
];

function UsersTable({ tableData = data, setTableData }) {
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data, setData] = useState([]);
  const [currentRow, setCurrentRow] = useState("");
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const router = useRouter();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllData(limit, skip, `user-management?role=3`);
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
  }, []);

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
          <thead className="rounded-t-md">
            <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
              <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
                S No.
              </th>
              <th className=" p-1 text-xs md:text-base md:p-2">Image</th>
              <th className=" p-1 text-xs md:text-base md:p-2">User Name</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Gender</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Phone</th>
              <th className=" p-1 text-xs md:text-base md:p-2">
                Referral Code
              </th>
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
                  {row.gender
                    ? row.gender === 1
                      ? "Male"
                      : gender === 2
                      ? "Female"
                      : "Others"
                    : "N/A"}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row.phone}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row.referralCode ? row.referralCode : "N/A"}
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
        </table>
      )}
    </>
  );
}

export default UsersTable;
