import { getAllCategories } from "@/api/categories";
import { getAllStates } from "@/api/states";
import { getAllSurgeons } from "@/api/surgeons";
import { getAllSymptoms } from "@/api/symptoms";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NewCategoryDialog from "@/components/Dialogs/NewCategoryDialog";
import NewStateDialog from "@/components/Dialogs/NewStateDialog";
import NewSurgeonDialog from "@/components/Dialogs/NewSurgeonDialog";
import NewSymptomDialog from "@/components/Dialogs/NewSymptomDialog";
import CategoriesTable from "@/components/Tables/CategoriesTable";
import StatesTable from "@/components/Tables/StatesTable";
import SurgeonsTable from "@/components/Tables/SurgeonsTable";
import SymptomsTable from "@/components/Tables/SymptomsTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const index = () => {
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllCategories(limit, skip);
    setData(data);
    setTableData(data.data);
    setTotal(data.total);
    setSkip(data.skip);
    setLimit(data.limit);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = async (pageNumber) => {
    console.log(pageNumber);
    console.log((pageNumber - 1) * 10);
    const _skip = (pageNumber - 1) * 10;
    // const response = await getAllSurgeons(limit, pageNumber - 1);
    setLoading(true);
    const data1 = await getAllCategories(limit, _skip);
    setData(data1);
    setTableData(data1.data);
    setTotal(data1.total);
    setSkip(data1.skip);
    setLimit(data1.limit);
    console.log(data);
    setLoading(false);
  };

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
          Catergories
        </div>
        {loading ? (
          <BeatLoader />
        ) : (
          <div className="w-full">
            {tableData?.length > 0 ? (
              <div className="w-full">
                <div className="flex justify-end w-full mb-2 items-center space-x-3">
                  <div className="w-40" onClick={() => setIsOpen(true)}>
                    <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
                  </div>
                </div>
                <div className="w-full max-w-xs sm:max-w-none overflow-hidden">
                  <CategoriesTable
                    tableData={tableData}
                    setTableData={setTableData}
                    data={data}
                    setData={setData}
                    limit={limit}
                    setLimit={setLimit}
                    skip={skip}
                    setSkip={setSkip}
                    handlePageChange={handlePageChange}
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto flex justify-center flex-col items-center">
                <img src={"/images/staff1.png"} />
                <div className="w-full" onClick={() => setIsOpen(true)}>
                  <PrimaryButton text={"Add New"} color={"bg-bluePrimary"} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <NewCategoryDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          tableData={tableData}
          setTableData={setTableData}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};

export default index;
