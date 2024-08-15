import { getAllData } from "@/api/stakeholder-management/common";
import { getAllTags } from "@/api/tags";
import { getAllUses } from "@/api/uses";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NewNameDialog from "@/components/Dialogs/NewNameDialog";
import NewNameLinkDialog from "@/components/Dialogs/NewNameLinkDialog";
import NewTagDialog from "@/components/Dialogs/NewTagDialog";
import NewUsesDialog from "@/components/Dialogs/NewUsesDialog";
import LoaderSpinner from "@/components/LoaderSpinner";
import SpinnerLoader from "@/components/SpinnerLoader";
import CommonTable from "@/components/Tables/CommonTable";
import MasterTable from "@/components/Tables/MasterTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const cols = [
  {
    label: "Name",
    key: "name",
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
  const [limit, setLimit] = useState(20);
  const [status2, setStatus2] = useState(1);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const debounceTimeoutRef = useRef(null);
  const [datum, setDatum] = useState(null);

  const getData = async (pageNumber) => {
    if (searchText?.trim() === "") {
      try {
        const _skip = (pageNumber - 1) * limit;
        setLoading(true);
        const response = await getAllData(limit, _skip, `master-data/uses?`);
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        // setTableData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "something went wrong", "bottom-right");
        setLoading(false);
      }
    } else {
      searchHandler(searchText, pageNumber);
    }
  };

  const searchHandler = async (text, pageNumber) => {
    setSearchText(text);
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        // setLoading(true);
        const _skip = ((pageNumber ? pageNumber : 1) - 1) * limit;
        const response = await getAllData(
          limit,
          _skip,
          `master-data/uses?name[$regex]=${encodeURIComponent(
            text
          )}.*&name[$options]=i`
        );
        console.log(response);
        setData(response.data);
        setTotal(response.total);
        setSkip(response.skip);
        setLimit(response.limit);
        setLoading(false);
      } catch (error) {
        toast.error(error ? error : "Something went wrong");
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    clearTimeout(debounceTimeoutRef.current);

    getData(1);
  }, []);

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
                Uses
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* -----------TABLE--------------- */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Uses
        </div>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <div className="w-full">
            <div className="my-5 flex ">
              <div className="flex-1">
                <div className="max-w-sm ">
                  <input
                    type="search"
                    className="w-full p-2 rounded-md outline-none border bg-white border-gray-400"
                    placeholder="Search product"
                    value={searchText}
                    onChange={(e) => searchHandler(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="py-2 px-5 bg-bluePrimary text-white rounded-md hover:bg-indigo-800"
              >
                Add New
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
              deleteUrl={"master-data/uses/"}
              editHandler={(d) => {
                setDatum(d);
                setIsOpen(true);
              }}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <NewNameLinkDialog
          isOpen={isOpen}
          setIsOpen={(c) => {
            setIsOpen(c);
            if (!c) {
              setDatum(null);
            }
          }}
          tableData={data}
          setTableData={setData}
          data={data}
          setData={(c) => {
            setTotal(total + 1);
            setData(c);
          }}
          dialogTitle={"Add new usage"}
          path={"uses"}
          inputTitle={"Usage"}
          datum={datum}
        />
      )}
    </div>
  );
};

export default index;
