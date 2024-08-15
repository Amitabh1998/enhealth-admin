import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SpinnerLoader from "@/components/SpinnerLoader";
import { deleteData, getData, getDataWithourLimit } from "@/api/common";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";

const options = [
  {
    name: "Home",
    value: 1,
  },
  {
    name: "Clinic",
    value: 2,
  },
];

const index = () => {
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [parameters, setParameters] = useState();
  const router = useRouter();

  const [mode, setMode] = useState(1);

  const getMedicines = async () => {
    try {
      setLoading(true);
      const data = await getDataWithourLimit(
        `lab-test/test-category/${router?.query?.id}`
      );
      const data2 = await getData(
        -1,
        -0,
        `lab-test/test?testCategory=${router?.query?.id}`
      );
      console.log(data2);
      setParameters(data2);
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router && router?.query?.id) {
      getMedicines();
    }
  }, [router]);

  const deleteParameter = async (item, index) => {
    try {
      const response = await deleteData(`lab-test/test/${item?._id}`);

      const _staff = [...parameters];
      console.log(response, id, [
        ..._staff.filter((row) => row._id !== response._id),
      ]);
      setParameters([..._staff.filter((row) => row._id !== response._id)]);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10">
      {loading ? (
        <div className="w-full py-10 flex justify-center items-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="max-w-7xl px-8 sm:px-6 md:px-4  w-full mx-auto grid md:grid-cols-10 gap-6">
          <div className="md:col-span-10">
            <Link
              href={`/lab-tests/parameters/${router?.query?.id}`}
              className="p-2 px-5 bg-bluePrimary text-white rounded-md mt-5"
            >
              Add Parameters
            </Link>
          </div>
          <div className="w-full md:col-span-7">
            <div className="w-full bg-white flex space-x-5 p-2 rounded-md shadow ">
              <div className="w-5/12 ">
                <img
                  src={data?.attachment?.link}
                  className="w-full rounded-lg"
                />
              </div>
              <div classname="w-7/12 ">
                <div className="p-2 w-max bg-green-600 text-white font-mediujm text-sm rounded-md">
                  ₹{parseInt(data?.actualPrice) - parseInt(data?.sellingPrice)}{" "}
                  Off
                </div>
                <div className="text-xl font-semibold my-3">
                  {data?.name ? data?.name : "N/A"}
                </div>
                <div className="text-sm font-normal my-3 text-textGray">
                  {data?.description ? data?.description : "N/A"}
                </div>
                <div className="text-lg font-semibold my-3">
                  Why should you book this checkup?
                </div>
                <div className="text-sm font-normal my-3 text-textGray">
                  {data?.reason ? data?.reason : "N/A"}
                </div>
                <div className="text-lg font-semibold my-3">Preparation</div>
                <div className="text-sm font-normal my-3 text-textGray">
                  {data?.preparation ? data?.preparation : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:col-span-3">
            <div className="bg-white rounded-md shadow">
              <div className="p-3">
                <div className="text-lg font-bold">Selected Package</div>
                <div className="text-sm text-textGray my-3">
                  Tax Saver Package (Advanced) - Full body checkup with Cardiac
                  risk markers & Vit B12
                </div>
                {/* <div className="p-1 rounded-md w-max border flex justify-center items-center text-xs text-textGray">
                  Includes 110 tests
                </div> */}
                <div className="flex space-x-3 items-center">
                  <div className="my-3 text-pinkPrimary text-xl font-semibold">
                    ₹{data?.sellingPrice}
                  </div>
                  <div className="my-3 text-gray-500 line-through text-xl font-semibold">
                    ₹{data?.actualPrice}
                  </div>
                </div>
              </div>
              <div className="py-3 px-5 bg-gray-300 flex items-center justify-between">
                <div className="text-xl font-semibold">Total</div>
                <div className="text-xl font-semibold">
                  {" "}
                  ₹{data?.sellingPrice}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-10">
            <div className="mt-3 p-3 bg-white rounded-md shadow">
              <div className="text-lg font-bold">Parameters</div>
              <div>
                {parameters?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full relative  pb-2 mt-2 border-b"
                  >
                    <TrashIcon
                      className="absolute top-0 right-0 w-5 text-red-500 h-5 cursor-pointer"
                      onClick={() => deleteParameter(item, index)}
                    />
                    <div className="text-lg font-semibold w-11/12">
                      <span className="text-bluePrimary">{item?.name}</span> - ({" "}
                      {item?.units} ) - ( Method:{" "}
                      <span className="text-base">{item?.method}</span> )
                    </div>
                    <div className="text-sm text-gray-500">
                      {item?.description}
                    </div>
                    <div>
                      <div className="font-semibold">specifications</div>
                      {item?.specifications?.map((item, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          {item}
                        </li>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="font-semibold">
                        Clinical Signiificance
                      </div>
                      {item?.clinicalSignificance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
