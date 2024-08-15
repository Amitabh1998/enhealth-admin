import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { getAllVideos } from "@/api/videos";
import { ClipLoader } from "react-spinners";
import PlayVideoDialog from "@/components/Dialogs/PlayVideoDialog";

const data = [
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
  {
    name: "Shubham",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    gender: "Male",
    phone: "6370882409",
    email: "shubham@gmail.com",
    speciality: "Orthopedic",
    title: "Consectetur ipsum tempor sint pariatur aute eu.",
    description:
      "Sint commodo culpa minim reprehenderit Lorem commodo fugiat laboris sunt pariatur. ",
  },
];

function VideosTable({ tableData = data, setTableData }) {
  const [on, setOn] = useState(false);
  const [currentRow, setCurrentRow] = useState("");
  const router = useRouter();

  const handleDeleteClick = (id) => {
    setTableData(tableData.filter((row) => row.id !== id));
  };

  // ----------State For storing the blogs which we will get from api
  const [videos, setVideos] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllVideos(limit, skip);
      console.log(response);
      setVideos(response.data);
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
          <ClipLoader color={"#575AE5"} />
        </div>
      ) : (
        <table className="w-full border-collapse border border-t-0 bg-white rounded-t-xl">
          <thead className="rounded-t-md">
            <tr className="bg-[#F8CD5B] bg-opacity-50 text-left rounded-t-md">
              <th className=" p-1 text-xs md:text-base md:p-2 rounded-tl-xl">
                S No.
              </th>
              <th className=" p-1 text-xs md:text-base md:p-2">thumbnail</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Uploaded By</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Title</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Description</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Status</th>
              <th className=" p-1 text-xs md:text-base md:p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {videos?.length > 0 ? (
              videos?.map((row, index) => (
                <tr key={row.id} className={`hover:bg-gray-50`}>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {index + 1}
                  </td>
                  <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                    <img
                      src={row.attachment.thumbnail}
                      className="w-10 h-10 rounded-md"
                    />
                  </td>
                  <td className="font-semibold p-1 text-xs md:text-base md:p-2">
                    {row.uploadedBy.name}
                  </td>
                  <td className=" p-1 text-xs md:text-base md:p-2">
                    {row.title}
                  </td>
                  <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                    {row.description}
                  </td>
                  <td className=" p-1 text-xs max-w-xs md:text-base md:p-2">
                    {row.status === 1 ? (
                      <div>Approved</div>
                    ) : row.status === 2 ? (
                      <div>Pending</div>
                    ) : (
                      <div>Rejected</div>
                    )}
                  </td>
                  {row.status === 2 && (
                    <td className=" p-1 text-xs md:text-base md:p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          // router.push("doctors");
                        }}
                        className="px-3 p-1 bg-red-500 text-white rounded-md"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          // router.push("doctors");
                        }}
                        className="px-3 p-1 bg-bluePrimary text-white rounded-md"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          // router.push("doctors");
                        }}
                        className="px-3 p-1 bg-green-500 text-white rounded-md"
                      >
                        View
                      </button>
                    </td>
                  )}
                  {row.status === 3 && (
                    <td className=" p-1 text-xs md:text-base md:p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          // router.push("doctors");
                        }}
                        className="px-3 p-1 bg-bluePrimary text-white rounded-md"
                      >
                        Approve
                      </button>
                    </td>
                  )}
                  {row.status === 1 && (
                    <td className=" p-1 text-xs md:text-base md:p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          // router.push("doctors");
                          setCurrentRow(row);
                          setOn(true);
                        }}
                        className="px-3 p-1 bg-green-500 text-white rounded-md"
                      >
                        VIew
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="flex w-full justify-center py-20 text-gray-500">
                No Videos Found
              </tr>
            )}
          </tbody>
        </table>
      )}

      {on && <PlayVideoDialog on={on} setOn={setOn} current={currentRow} />}
    </>
  );
}

export default VideosTable;
