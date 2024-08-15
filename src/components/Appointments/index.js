import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import {
  DocumentDownloadIcon,
  EyeIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";

const data = [
  {
    name: "Shubham",
    gender: "Male",
    id: "#2736",
    date: "23 May 2023",
    time: "07:00pm - 07:30pm",
    type: "Video Call",
    status: 1,
  },

  {
    name: "Shubham",
    gender: "Male",
    id: "#2736",
    date: "23 May 2023",
    time: "07:00pm - 07:30pm",
    type: "Video Call",
    status: 1,
  },

  {
    name: "Shubham",
    gender: "Male",
    id: "#2736",
    date: "23 May 2023",
    time: "07:00pm - 07:30pm",
    type: "Video Call",
    status: 1,
  },

  {
    name: "Shubham",
    gender: "Male",
    id: "#2736",
    date: "23 May 2023",
    time: "07:00pm - 07:30pm",
    type: "Video Call",
    status: 1,
  },
];

function Appointments({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl mt-10">
        <thead className="rounded-t-md">
          <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
            <th className=" p-1 text-xs md:text-base text-center md:p-2 rounded-tl-xl">
              S No.
            </th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">#</th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">
              Patient Name
            </th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">
              Gender
            </th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">
              Time
            </th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">
              View EMR
            </th>
            <th className=" p-1 text-xs md:text-base text-center md:p-2">
              Appointment type
            </th>
            <th className="flex justify-center p-1 text-xs md:text-base md:p-2 rounded-tr-xl">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id} className={`hover:bg-gray-50`}>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                {index + 1}
              </td>
              <td className="font-semibold p-1 text-xs md:text-base text-center md:p-2">
                {row.id}
              </td>
              <td className="font-semibold p-1 text-xs md:text-base text-center md:p-2">
                {row.name}
              </td>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                {row.gender}
              </td>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                <div className="w-full">
                  <div>{row.date}</div>
                  <div>{row.time}</div>
                </div>
              </td>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                <DocumentDownloadIcon className="w-10 text-red-500 mx-auto" />
              </td>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                <div className="flex justify-center space-x-2 items-center">
                  <div className="bg-bluePrimary rounded-md p-1">
                    <VideoCameraIcon className="text-white w-6" />
                  </div>
                  <div className="text-gray-500">{row.type}</div>
                </div>
              </td>
              <td className=" p-1 text-xs md:text-base text-center md:p-2">
                <div className="px-3 py-1 text-sm rounded-md border-green-400 border text-green-400">
                  {row.status === 1 ? "Accepted" : "Rejected"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Appointments;
