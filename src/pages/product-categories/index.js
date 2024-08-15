import { getAllData } from "@/api/stakeholder-management/common";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NewCategoryDialog from "@/components/Dialogs/NewCategoryDialog";
import NewProductDialog from "@/components/Dialogs/NewProductDialog";
import SpinnerLoader from "@/components/SpinnerLoader";
import CategoriesTable from "@/components/Tables/CategoriesTable";
import MasterTable from "@/components/Tables/MasterTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const cols = [
  {
    label: "Name",
    key: "name",
    dataType: "string",
  },
  {
    label: "Image",
    key: "attachment.link",
    dataType: "avatar",
  },
  {
    label: "Items Count",
    key: "productCount",
    dataType: "string",
  },
];

const index = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const [datum, setDatum] = useState(null);

  const getData = async (pageNumber) => {
    try {
      const _skip = (pageNumber - 1) * limit;
      setLoading(true);
      const response = await getAllData(
        limit,
        _skip,
        `master-data/product-category?`
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
      {/* ------------------BREADCRUMBS--------------------- */}
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
                Master data
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 -mt-px text-gray-500" />
              <a
                href="#"
                className="text-xs font-medium text-gray-500 hover:text-bluePrimary ml-1  "
              >
                Catergories
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* -----------TABLE--------------- */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Health Product Catergories
        </div>
        {loading ? (
          <SpinnerLoader />
        ) : (
          //   <div className="w-full">
          //     {tableData?.length > 0 ? (
          //       <div className="w-full">
          //         <div className="flex justify-end w-full mb-2 items-center space-x-3">
          //           <div className="w-40" onClick={() => setIsOpen(true)}>
          //             <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
          //           </div>
          //         </div>
          //         <div className="w-full max-w-xs sm:max-w-none overflow-hidden">
          //           <CategoriesTable
          //             tableData={tableData}
          //             setTableData={setTableData}
          //             data={data}
          //             setData={setData}
          //             limit={limit}
          //             setLimit={setLimit}
          //             skip={skip}
          //             setSkip={setSkip}
          //             handlePageChange={handlePageChange}
          //           />
          //         </div>
          //       </div>
          //     ) : (
          //       <div className="max-w-md mx-auto flex justify-center flex-col items-center">
          //         <img src={"/images/staff1.png"} />
          //         <div className="w-full" onClick={() => setIsOpen(true)}>
          //           <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
          //         </div>
          //       </div>
          //     )}
          //   </div>
          <div className="w-full">
            {/* ---------------Master Table -------------------- */}
            <div className="my-5 flex justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="py-2 px-5 bg-bluePrimary text-white rounded-md hover:bg-indigo-800"
              >
                Create new category
              </button>
            </div>
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
              deleteUrl={"master-data/product-category/"}
              editHandler={(d) => {
                setDatum(d);
                setIsOpen(true);
              }}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <NewProductDialog
          isOpen={isOpen}
          setIsOpen={(c) => {
            setIsOpen(c);
            setDatum(null);
          }}
          tableData={data}
          setTableData={setData}
          data={data}
          setData={setData}
          datum={datum}
        />
      )}
    </div>
  );
};

export default index;
