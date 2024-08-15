import { HandIcon, StarIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Rating from "react-rating";
import SpinnerLoader from "../SpinnerLoader";
import { getData } from "@/api/common";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DeliveryRatings = ({ data }) => {
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState();
  const [open, setOpen] = useState(false);

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        limit,
        skip,
        `help-center/feedback?$sort[createdAt]=-1&deliveryProfile=${data?.deliveryProfile}`
      );

      console.log(response);
      setReviews(response.data);
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
    getAllData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center py-10">
          <SpinnerLoader />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-2">
            Top Reviews:
          </h2>

          <div>
            {reviews?.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {reviews.map((item, index) => (
                  <div className="rounded-md shadow-lg bg-white p-3">
                    <div className="flex space-x-2 items-center">
                      <div className="p-2 rounded-full w-12 h-12 flex justify-center items-center text-lg text-gray-800 font-bold border-2 border-indigo-700">
                        {item?.user?.name ? item.user?.name[0] : "N/A"}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-800 font-semibold">
                          {item?.user?.name ? item.user?.name : "N/A"}
                        </div>
                        <div className="text-pink-500">
                          {moment(item?.createdAt).format("MMMM Do YYYY")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center my-1">
                      <Rating
                        initialRating={item.rating}
                        readonly={true}
                        emptySymbol={
                          <img src="/images/starEmpty.svg" className="icon" />
                        }
                        fullSymbol={
                          <img src="/images/starFilled.svg" className="icon" />
                        }
                      />
                    </div>
                    <div className="text-sm text-gray-600">{item?.review}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="my-2 text-center text-gray-500">
                No Reviews yet
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryRatings;
