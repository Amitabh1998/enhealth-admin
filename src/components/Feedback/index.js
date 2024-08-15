import { HandIcon, StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import React from "react";

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feedback = () => {
  return (
    <div>
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customer Reviews:
        </h2>
        <div className="flex space-x-2">
          <div className="w-max">
            <div className="mt-3 flex flex-col justify-center items-center">
              <div className="text-3xl my-1 text-gray-800 font-bold">4.2/5</div>
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "flex-shrink-0 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-500 mt-1 text-sm">(764 ratings)</div>
              <div className="text-gray-500 mt-1 text-sm">(13 reviews)</div>
            </div>
          </div>
          <div className="flex-1">
            <dl className="space-y-3">
              {reviews.counts.map((count) => (
                <div key={count.rating} className="flex items-center text-sm">
                  <dt className="flex-1 flex items-center">
                    <p className="w-3 font-medium text-gray-900">
                      {count.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div
                      aria-hidden="true"
                      className="ml-1 flex-1 flex items-center"
                    >
                      <StarIcon
                        className={classNames(
                          count.count > 0 ? "text-yellow-400" : "text-gray-300",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />

                      <div className="ml-3 relative flex-1">
                        <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                        {count.count > 0 ? (
                          <div
                            className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                            style={{
                              width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                    {Math.round((count.count / reviews.totalCount) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {/* <div className="pl-5">
            <button className="px-5 rounded-md py-2 bg-yellow-400 text-gray-800 hover:bg-yellow-500">
              Write a review
            </button>
          </div> */}
        </div>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 my-2">
        Top Reviews:
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-md shadow-lg bg-white p-3">
          <div className="flex space-x-2 items-center">
            <div className="p-2 rounded-full w-12 h-12 flex justify-center items-center text-lg text-gray-800 font-bold border-2 border-indigo-700">
              M
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-semibold">Ashwin</div>
              <div className="text-pink-500">04 November 2022</div>
            </div>
            <div className="flex space-x-1">
              <HeartIcon className="w-4" />
              <div>23</div>
            </div>
          </div>
          <div className="flex items-center my-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.average > rating
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Even after consuming 6 bottles till date l am not feeling the relief
            the Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
        <div className="rounded-md shadow-lg bg-white p-3">
          <div className="flex space-x-2 items-center">
            <div className="p-2 rounded-full w-12 h-12 flex justify-center items-center text-lg text-gray-800 font-bold border-2 border-indigo-700">
              M
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-semibold">Ashwin</div>
              <div className="text-pink-500">04 November 2022</div>
            </div>
            <div className="flex space-x-1">
              <HeartIcon className="w-4" />
              <div>23</div>
            </div>
          </div>
          <div className="flex items-center my-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.average > rating
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Even after consuming 6 bottles till date l am not feeling the relief
            the Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
        <div className="rounded-md shadow-lg bg-white p-3">
          <div className="flex space-x-2 items-center">
            <div className="p-2 rounded-full w-12 h-12 flex justify-center items-center text-lg text-gray-800 font-bold border-2 border-indigo-700">
              M
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-semibold">Ashwin</div>
              <div className="text-pink-500">04 November 2022</div>
            </div>
            <div className="flex space-x-1">
              <HeartIcon className="w-4" />
              <div>23</div>
            </div>
          </div>
          <div className="flex items-center my-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.average > rating
                    ? "text-yellow-400"
                    : "text-gray-300",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Even after consuming 6 bottles till date l am not feeling the relief
            the Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
