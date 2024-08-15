// pages/index.js

import { getDataWithLimit } from "@/api/common";
import SpinnerLoader from "@/components/SpinnerLoader";
import MasterTable from "@/components/Tables/MasterTable";
import React, { useEffect, useState } from "react";

const cols = [
  {
    label: "Avatar",
    key: "avatar.link",
    dataType: "avatar",
  },
  {
    label: "Name",
    key: "name",
    dataType: "string",
  },
  {
    label: "Clinic Certificate",
    key: "doctorProfile.clinicalEstablishmentCertificate.link",
    dataType: "doc",
  },
];

const Home = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllData = async (pageNumber) => {
    setLoading(true);
    const _skip = (pageNumber - 1) * limit;
    const response = await getDataWithLimit(
      limit,
      _skip,
      "user-management?role=3&status=1&$populate=doctorProfile"
    );
    console.log(response);
    setTableData([...response.data]);
    setTotal(response.total);
    setLoading(false);
  };

  useEffect(() => {
    getAllData(1);
  }, []);

  const handlePageChange = async (pageNumber) => {
    const _skip = (pageNumber - 1) * limit;
    setSkip((pageNumber - 1) * limit);

    setLoading(true);
    const response = await getDataWithLimit(
      limit,
      _skip,
      "master-data/state?$sort[createdAt]=-1"
    );
    console.log(response);
    setTableData([...tableData, ...response.data]);
    setTotal(response.total);
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">User Table</h1>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <MasterTable
          limit={limit}
          setLimit={setLimit}
          data={tableData}
          columns={cols}
          itemsPerPage={limit}
          total={total}
          handlePageChange={handlePageChange}
          fetchData={getAllData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          viewDetails={"manage-stakeholders/doctor"}
        />
      )}
    </div>
  );
};

export default Home;
