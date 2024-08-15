import { updateCommonData } from "@/api/common";
import { getAllData } from "@/api/stakeholder-management/common";
import RedeemConfirmationDialog from "@/components/Dialogs/RedeemConfirmationDialog";
import LoaderSpinner from "@/components/LoaderSpinner";
import AgentsPaymentTable from "@/components/Tables/AgentsPaymentTable";
import DiagnosticPayTable from "@/components/Tables/DiagnosticPayTable";
import DoctorsPayTable from "@/components/Tables/DoctorsPayTable";
import MasterTable from "@/components/Tables/MasterTable";
import RetailPayTable from "@/components/Tables/RetailPayTable";
import { EyeIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// const tabs = [
//   {
//     name: "Invoices",
//     status: 1,
//   },
//   {
//     name: "Payment Requests",
//     status: 2,
//   },
// ];

const tabs2 = [
  {
    name: "Delivery Agents",
    status: 1,
  },
  {
    name: "Doctors",
    status: 2,
  },
  {
    name: "Retail Pharmacies",
    status: 3,
  },
  {
    name: "Diagnostic Centers",
    status: 4,
  },
  {
    name: "Wholesale Pharmacies",
    status: 5,
  },
  {
    name: "Users",
    status: 6,
  },
];

const states = ["Allopathy", "Homeopathy"];

const index = () => {
  const [state, setState] = useState(states[0]);
  const [status, setStatus] = useState(1);
  const [status2, setStatus2] = useState(1);
  const [loading, setLoading] = useState(false);
  const [on, setOn] = useState(false);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState(-1);
  const [currentRow, setCurrentRow] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const CustomComponent = () => {
    return (
      <div>
        <button>
          <EyeIcon className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const cols = [
    {
      label: `${status2 === 1 ? "Product ID" : "Vendor"}`,
      key: `${status2 === 1 ? "code" : "vendorProfile.user.name"}`,
      dataType: "string",
    },
    {
      label: "Name",
      key: "name",
      dataType: "string",
    },

    {
      label: "Manufacturer",
      key: "manufacturer.name",
      dataType: "string",
    },
    {
      label: "Category",
      key: "category.name",
      dataType: "string",
    },
  ];

  const getData = async (pageNumber) => {
    try {
      const _skip = (pageNumber - 1) * limit;

      setLoading(true);

      if (status2 === 1) {
        const response = await getAllData(
          limit,
          _skip,
          `payment/redeem-request?$sort[createdAt]=1&status[$in]=1`,
          sort
        );
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        setLoading(false);
      } else {
        console.log("request");
        const response = await getAllData(
          limit,
          _skip,
          `payment/redeem-request?$sort[createdAt]=1&status[$in]=1`,
          sort
        );
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error ? error : "something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(1);
  }, [status2, limit, sort]);

  const approvePaymentHandler = async () => {
    try {
      const response = await updateCommonData(
        { status: 2 },
        `payment/redeem-request/${currentRow}`
      );
    } catch (error) {
      toast.error(error ? error : "something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <nav className="flex h-max" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-1">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-bluePrimary  "
            >
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Account Managemnents
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Account Managemnent
        </div>

        {/* MASTER TABLE FOR payments requests */}

        <div className="w-full mt-5">
          {data === null ? (
            <LoaderSpinner />
          ) : (
            <div>
              {/* ---------------Master Table -------------------- */}
              <MasterTable
                data={data}
                columns={cols}
                itemsPerPage={limit}
                limit={limit}
                setLimit={setLimit}
                total={total}
                fetchData={getData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                // viewDetails={`/medicines/`}
                customActions={true}
                custom={CustomComponent}
                sorting={true}
                sort={sort}
                setSort={setSort}
                setCurrentRow={setCurrentRow}
                open={open}
                setOpen={setOpen}
              />
            </div>
          )}
        </div>
      </div>
      {open && (
        <RedeemConfirmationDialog
          on={open}
          setOn={setOpen}
          currentRow={currentRow}
          callback={() => approvePaymentHandler()}
        />
      )}
    </div>
  );
};

export default index;
