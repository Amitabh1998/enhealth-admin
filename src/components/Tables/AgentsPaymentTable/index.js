import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import {
  DocumentReportIcon,
  EyeIcon,
  PaperAirplaneIcon,
  StarIcon,
} from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import PayDialog from "@/components/Dialogs/PayDialog";

const data = [
  {
    name: "Shubham",
    userName: "Auro",
    PaymentId: "PO0244239007",
    date: "12th ,may 2023",
    time: "07:55 am",
    amount: "1000",
    status: "paid",
  },

  {
    name: "Shubham",
    userName: "Auro",
    PaymentId: "PO0244239007",
    date: "12th ,may 2023",
    time: "07:55 am",
    amount: "1000",
    status: "paid",
  },

  {
    name: "Shubham",
    userName: "Auro",
    PaymentId: "PO0244239007",
    date: "12th ,may 2023",
    time: "07:55 am",
    amount: "1000",
    status: "paid",
  },

  {
    name: "Shubham",
    userName: "Auro",
    PaymentId: "PO0244239007",
    date: "12th ,may 2023",
    time: "07:55 am",
    amount: "1000",
    status: "paid",
  },
];

function AgentsPaymentTable({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
        <thead className="rounded-t-md">
          <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
            <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
              S No.
            </th>
            <th className=" p-1 text-xs md:text-base md:p-2">Agent's Name</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Payment Id</th>
            <th className=" p-1 text-xs md:text-base md:p-2">User's NAme</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Date</th>
            <th className=" p-1 text-xs md:text-base md:p-2">
              Delivery Charges
            </th>
            <th className=" p-1 text-xs md:text-base md:p-2">Status</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Invoices</th>
            <th className="flex justify-center p-1 text-xs md:text-base md:p-2 rounded-tr-xl">
              Pay
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id} className={`hover:bg-gray-50`}>
              <td className=" p-1 text-xs md:text-base md:p-2">{index + 1}</td>
              <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                {row.name}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row.PaymentId}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row.userName}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <div>{row.date}</div>
                <div>{row.time}</div>
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">{row.amount}</td>
              <td className=" p-1 text-xs md:text-base md:p-2">{row.status}</td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <DocumentReportIcon className="w-10 text-red-500" />
              </td>

              <td className=" p-1 text-xs md:text-base md:p-2 flex justify-center ">
                <button
                  onClick={() => {
                    setOn(true);
                  }}
                >
                  <PaperAirplaneIcon className="w-5 h-5 text-green-500 rotate-90" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PayDialog on={on} setOn={setOn} />
    </>
  );
}

export default AgentsPaymentTable;
