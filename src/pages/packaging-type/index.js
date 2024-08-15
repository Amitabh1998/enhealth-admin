import { addNewData, getAllData } from "@/api/common";
import { getAllTags } from "@/api/tags";
import { getAllUses } from "@/api/uses";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import NewDrugChemistryDialog from "@/components/Dialogs/NewDrugChemistryDialog";
import NewNameDialog from "@/components/Dialogs/NewNameDialog";
import NewTagDialog from "@/components/Dialogs/NewTagDialog";
import NewUsesDialog from "@/components/Dialogs/NewUsesDialog";
import LoaderSpinner from "@/components/LoaderSpinner";
import MasterEditDialog from "@/components/MasterData";
import CommonTable from "@/components/Tables/CommonTable";
import { ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [isEditOpen, setEditOpen] = useState(false);
  const [datum, setDatum] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllData(limit, skip, "packaging-type");
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
    // const response = await getAllStates(limit, pageNumber - 1);
    setLoading(true);
    const data1 = await getAllData(limit, _skip, "packaging-type");
    setData(data1);
    setTableData(data1.data);
    setTotal(data1.total);
    setSkip(data1.skip);
    setLimit(data1.limit);
    console.log(data);
    setLoading(false);
  };

  const handleDeleteClick = async (id) => {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/packaging-type/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setTableData([
          ...tableData.filter((row) => row._id !== response.data._id),
        ]);
        setData({
          ...data,
          data: tableData.filter((row) => row._id !== response.data._id),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveHandler = async (e, name) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Please enter pckaging type", "bottom-right");
    } else {
      const _tableData = [...tableData];
      try {
        const response = await addNewData(name, "packaging-type");
        setTableData([..._tableData, response]);
        const _data = [..._tableData, response];
        setData({ ...data, total: data.total + 1, data: _data });
        setIsOpen(false);
      } catch (error) {
        console.log(error);
        toast.error(error ? error : "Something went wrong", "bottom-right");
      }
    }
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
                Packaging Type
              </a>
            </div>
          </li>
        </ol>
      </nav>

      {/* -----------TABLE--------------- */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-10">
        <div className="w-full text-left text-2xl font-semibold text-gray-800">
          Packaging Type
        </div>
        {loading ? (
          <LoaderSpinner />
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
                  <CommonTable
                    tableData={tableData}
                    setTableData={setTableData}
                    data={data}
                    setData={setData}
                    limit={limit}
                    setLimit={setLimit}
                    skip={skip}
                    setSkip={setSkip}
                    handlePageChange={handlePageChange}
                    handleDeleteClick={handleDeleteClick}
                    handleEdit={(d) => {
                      setDatum(d);
                      setEditOpen(true);
                    }}
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
        // <NewDrugChemistryDialog
        //   isOpen={isOpen}
        //   setIsOpen={setIsOpen}
        //   tableData={tableData}
        //   setTableData={setTableData}
        //   data={data}
        //   setData={setData}
        //   title={"Packaging Type"}
        //   saveHandler={saveHandler}
        // />
        <NewNameDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          tableData={tableData}
          setTableData={setTableData}
          data={data}
          setData={setData}
          dialogTitle={"Add new packaging type"}
          path={"packaging-type"}
          inputTitle={"Packaging Type"}
        />
      )}

      {isEditOpen && (
        <MasterEditDialog
          open={isEditOpen}
          setOpen={setEditOpen}
          datum={datum}
          title={"Packaging Type"}
          path={"packaging-type"}
          tableData={data.data}
          setTableData={(c) => {
            setData({
              ...data,
              data: c,
            });
          }}
        />
      )}
    </div>
  );
};

export default index;
