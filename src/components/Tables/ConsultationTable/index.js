import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ConfirmationDialog from "../../Dialogs/ConfirmationDialog";
import { EyeIcon } from "@heroicons/react/solid";
import OrderDetailsDialog from "@/components/Dialogs/OrderDeatilsDialog";
import LabtestDialog from "@/components/Dialogs/LabTestDialog";
import { useRouter } from "next/router";
import { getAllData } from "@/api/stakeholder-management/common";
import LoaderSpinner from "@/components/LoaderSpinner";
import MasterTable from "../MasterTable";

const data = [
  {
    name: "Shubham",
    paymentId: "PE132002872",
    test: "Blood Test",
    date: "23rd June, 2023",
    price: "1000",
    mode: "Home",
    status: "Approved",
  },
  {
    name: "Shubham",
    paymentId: "PE132002872",
    test: "Blood Test",
    date: "23rd June, 2023",
    price: "1000",
    mode: "Home",
    status: "Approved",
  },
];

const cols = [
  {
    label: "User Name",
    key: "user.name",
    dataType: "string",
  },

  {
    label: "Doctor",
    key: "doctorProfile.user.name",
    dataType: "string",
  },
  {
    label: "Date",
    key: "startTime",
    dataType: "date",
  },

  {
    label: "Price",
    key: "price.totalPrice",
    dataType: "string",
  },
  {
    label: "Commission",
    key: "price.commission",
    dataType: "string",
  },
  {
    label: "Doctor Fees",
    key: "price.priceByDoctor",
    dataType: "string",
  },
];

function ConsultationTable({ tableData = data, setTableData }) {
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
  const [currentRow, setCurrentRow] = useState();

  const getData = async (pageNumber) => {
    try {
      const _skip = (pageNumber - 1) * limit;
      setLoading(true);
      const response = await getAllData(
        limit,
        _skip,
        `consultation/consultation-booking?$populate[0][path]=user&$populate[0][select][0]=name&$populate[0][select][1]=avatar&$populate[0][select][2]=gender&$sort[createdAt]=-1&$populate[1][path]=doctorProfile&$populate[1][populate][0][path]=user&$populate[1][populate][0][select][0]=name&$populate[1][populate][0][select][1]=phone&$populate[1][populate][0][select][2]=avatar&$populate[1][populate][0][select][3]=gender&$populate[1][select][0]=user&$populate[1][select][1]=specialities&$populate[1][select][2]=symptomSpecializations`
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
    getData(1);
  }, [status2, limit]);

  return (
    <div>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="">
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
            actions={"off"}
          />
        </div>
      )}
    </div>
  );
}

export default ConsultationTable;
