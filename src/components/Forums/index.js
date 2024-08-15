import { getAllData } from "@/api/stakeholder-management/common";
import { ChevronRightIcon, HeartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SpinnerLoader from "../SpinnerLoader";

const Forums = () => {
  const router = useRouter();

  // ----------State For storing the blogs which we will get from api
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllData(
        limit,
        skip,
        "knowledge-center/get-all-forums?"
      );
      console.log(response);
      setBlogs(response.data);
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
    <div className="w-full">
      <div>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <div className="w-full grid md:grid-cols-1 gap-4">
            {blogs?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xl h-max p-5 relative"
              >
                <div className="text-2xl font-bold mb-2">{item?.title}</div>
                <div
                  className="ml-6"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forums;
