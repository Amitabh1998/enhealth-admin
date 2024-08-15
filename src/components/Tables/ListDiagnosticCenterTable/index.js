import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";

function ListDiagnosticCenterTable({
  data,
  setDAta,
  currentRow,
  setCurrentRow,
}) {
  const [on, setOn] = useState(false);

  const handleDeleteClick = (id) => {
    setStaff(staff.filter((row) => row.id !== id));
  };

  return (
    <>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className=" p-1 text-xs md:text-base md:p-2">Image</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Name</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Address</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Distance</th>
            <th className=" p-1 text-xs md:text-base md:p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className={`hover:bg-gray-50`}>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <img
                  src={row?.diagnosticCenter?.avatar?.link}
                  className="w-10 h-10 rounded-md"
                />
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row?.diagnosticCenter?.name}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row?.address?.addressLine1}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                {row?.distance}
              </td>
              <td className=" p-1 text-xs md:text-base md:p-2">
                <button
                  onClick={() => {
                    setOn(true);
                    setCurrentRow(row?._id);
                  }}
                  className="rounded-sm p-1 "
                >
                  <input type="radio" name="grp1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListDiagnosticCenterTable;
