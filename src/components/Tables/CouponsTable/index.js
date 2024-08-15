import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { Switch } from "@headlessui/react";
import { getAllCoupons } from "@/api/coupons";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import SpinnerLoader from "@/components/SpinnerLoader";

const data = [
  {
    name: "Coupon 1",
    title: "Diwali Coupon",
    amount: "20%",
    category: "Consultations",
    date: "12 sept 2022",
    terms: [
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
    ],
  },
  {
    name: "Coupon 1",
    title: "Diwali Coupon",
    amount: "20%",
    category: "Consultations",
    date: "12 sept 2022",
    terms: [
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
    ],
  },
  {
    name: "Coupon 1",
    title: "Diwali Coupon",
    amount: "20%",
    category: "Consultations",
    date: "12 sept 2022",
    terms: [
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
      "Lorem ipsum demo text",
    ],
  },
];

const cols = [
  
]

function CouponsTable({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };
  const [enabled, setEnabled] = useState(Array(tableData.length).fill(false)); // Initialize enabled state array

  const handleSwitchChange = (index) => {
    const updatedEnabled = [...enabled]; // Create a copy of the enabled state array
    updatedEnabled[index] = !updatedEnabled[index]; // Toggle the value of the corresponding index
    setEnabled(updatedEnabled); // Update the enabled state
  };

  // ----------State For storing the blogs which we will get from api
  const [coupons, setCoupons] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllCoupons(limit, skip);
      console.log(response);
      setCoupons(response.data);
      setTotal(response.total);
      setSkip(response.skip);
      setLimit(response.limit);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full py-20 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
          <thead className="rounded-t-md">
            <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
              <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
                S No.
              </th>
              <th className=" p-1 text-xs md:text-base md:p-2">Image</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Name</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Title</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Discount</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Max Discount</th>
              <th className=" p-1 text-xs md:text-base md:p-2">
                Min Order value
              </th>
              <th className=" p-1 text-xs md:text-base md:p-2">
                Terms and Conditions
              </th>
              <th className=" p-1 text-xs md:text-base md:p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((row, index) => (
              <tr key={row._id} className={`hover:bg-gray-50`}>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {index + 1}
                </td>
                <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                  <Image src={row.attachment.link} width={40} height={40} />
                </td>
                <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                  {row.code}
                </td>
                <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                  {row.title}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row.discount ? row.discount : "N/A"}
                </td>
                <td className=" p-1 text-xs md:text-base md:p-2">
                  {row.maxDiscountAllowed ? row.maxDiscountAllowed : "N/A"}
                </td>
                <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                  {row.minOrderValue ? row.minOrderValue : "N/A"}
                </td>
                <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                  <div>
                    {row.termsAndConditions.map((item, index) => (
                      <div>{item}</div>
                    ))}
                  </div>
                </td>

                <td className=" p-1 text-xs md:text-base md:p-2 flex space-x-2 justify-center">
                  <Switch
                    checked={enabled[index]} // Use the enabled state for the current index
                    onChange={() => handleSwitchChange(index)} // Pass the index to the handler
                    className={`${
                      enabled[index] ? "bg-green-500" : "bg-gray-600"
                    }
                      relative inline-flex h-8 w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        enabled[index] ? "translate-x-7" : "translate-x-0"
                      }
                      pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CouponsTable;
