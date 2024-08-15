import { getAllData } from "@/api/stakeholder-management/common";
import SupportDetailsDialaog from "@/components/Dialogs/SupportDetailDialog";
import { ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const tabs = [
  {
    name: "Users",
    status: 1,
  },
  {
    name: "Doctors",
    status: 2,
  },
  {
    name: "Delivery Agents",
    status: 3,
  },
  {
    name: "Pharmasicts",
    status: 4,
  },
  {
    name: "Diagnostic centers",
    status: 5,
  },
];

const Support = ({ data }) => {
  const [status, setStatus] = useState(1);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data1, setData1] = useState([]);
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
        `help-center/support-ticket?&diagnosticCenterProfile=647b10b74787a8c1be7f0b92&$populate=createdBy&status[$in]=1`
      );
      console.log(response);
      setData1(response.data);
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
    <div>
      {/* ------------------BREADCRUMBS--------------------- */}

      <div className="flex-1 w-full flex flex-col justify-center items-center ">
        {/* Grid Cards */}
        <div className="grid md:grid-cols-4 gap-4 mt-5">
          {data1?.map((item, index) => (
            <div
              onClick={() => router.push("/chat")}
              className="flex flex-col cursor-pointer hover:shadow-xl p-3 rounded-md bg-white shadow "
            >
              <div className="flex justify-between items-center">
                <div className="text-green-500 text-sm">
                  #{item.supportTicketId}
                </div>
                <div className="text-gray-500 text-sm">
                  {moment(item?.createdAt).format("MMM Do, YYYY")}
                </div>
              </div>
              <div className="text-gray-500 text-xs my-1 flex-1">
                {item.description}
              </div>
              {/* <div className="bg-orange-400 px-4 py-1 rounded-full text-xs bg-opacity-40 font-semibold">
                Unresolved
              </div> */}

              <div className="flex justify-between items-end">
                <div className=" items-center space-x-2">
                  {item?.attachments?.length > 0 && (
                    <div className="flex space-x-2 items-center">
                      {item.attachments.map((item, index) => (
                        <img
                          key={index}
                          src={item.link}
                          className="w-14 h-14 rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                className={
                  "disabled:bg-[#ccc] rounded-md mt-5 bg-bluePrimary text-white w-full py-2 hover:bg-indigo-800"
                }
              >
                Resolve
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Dialog */}
      {open && <SupportDetailsDialaog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Support;
