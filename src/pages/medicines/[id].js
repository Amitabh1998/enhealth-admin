import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { toast } from "react-toastify";
import SpinnerLoader from "@/components/SpinnerLoader";
import { getDataWithourLimit } from "@/api/common";

const prices = [
  {
    name: "₹ 657.66",
  },
  {
    name: "₹ 457.66",
  },
];

const Product = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(prices[0]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [limit, setLimit] = useState(4);
  const [query, setQuery] = useState("");

  const getMedicines = async () => {
    try {
      setLoading(true);
      const data = await getDataWithourLimit(
        `medicines/medicine-details/${router?.query?.id}?$populate=safetyGuidance.type`
      );
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

  const copyHandler = async () => {
    if (data) {
      localStorage.setItem("copyItem", JSON.stringify(data));
      console.log(data?.medicineClass);

      if (data?.medicineClass === 1) {
        router.push(
          `/medicines/edit-medicine/allopathy/${router?.query?.id}?copy=yes`
        );
      } else if (data?.medicineClass === 2) {
      } else if (data?.medicineClass === 3) {
      } else if (data?.medicineClass === 4) {
      }
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full py-20 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="max-w-7xl px-8 sm:px-6 md:px-4  w-full mx-auto mt-10">
          <div className="w-full flex justify-end mb-4">
            <button
              onClick={() => copyHandler()}
              className="p-2 bg-bluePrimary hover:bg-indigo-700 tranform duration-100 rounded-md text-white w-16 text-xs mr-4"
            >
              Copy
            </button>
            <button
              onClick={() =>
                router.replace(`edit-medicine/allopathy/${router.query.id}`)
              }
              className="p-2 bg-yellow-400 hover:bg-yellow-500 tranform duration-100 rounded-md w-16 text-xs"
            >
              Edit
            </button>
          </div>
          <div className="w-full grid md:grid-cols-10 gap-4 bg-white">
            <div className="w-full md:col-span-6 flex justify-center items-center flex-col">
              <img src={data?.attachments[0]?.link} />
              <div className="my-5 w-full flex justify-between">
                {data?.attachments?.map((item, index) => (
                  <img src={item?.link} className="w-20 h-20" />
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col col-span-4 py-3">
              <div className="w-full flex justify-between">
                <div className="w-11/12 text-xl font-semibold text-gray-900">
                  {data?.name ? data?.name : "N/A"}
                </div>
              </div>
              {/* <div className="w-full flex space-x-3 items-center">
                {["Fitness", "Vitamins and Suppliments"].map((item, index) => (
                  <div
                    className="px-2 py-1 mt-2 rounded-md bg-gray-200 text-gray-800 flex justify-center items-center"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div> */}
              <div className="flex justify-between items-center my-2">
                {/* <div className="px-4 py-1 text-xs font-medium rounded-full bg-green-300 text-green-700 w-max">
                  In Stock
                </div> */}
                <div
                  className={`px-4 py-1 text-xs font-medium rounded-full  w-max ${
                    data?.prescriptionNeeded
                      ? "bg-green-300 text-green-700"
                      : "bg-sky-300 text-sky-700"
                  }`}
                >
                  {data?.prescriptionNeeded
                    ? "Prescription Required"
                    : "Prescription Not Required"}
                </div>
              </div>

              <div className="h-px w-full bg-gray-300 mt-5"></div>
              {/* PRICE AND COUPONS  */}
              <div>
                {/* ----------------------RADIO BUTTONS------------------------- */}
                <div className="mx-auto  mt-5 flex w-full justify-between  flex-wrap">
                  <div className="mr-2 mt-2">
                    <div className="">Original Price</div>
                    <div className="text-xl font-semibold text-gray-600">
                      ₹ {data?.originalPrice ? data?.originalPrice : "N/A"}
                    </div>
                  </div>
                  <div className="mr-2 mt-2">
                    <div className="">Selling Price</div>
                    <div className="text-xl font-semibold text-gray-600">
                      ₹ {data?.sellingPrice ? data?.sellingPrice : "N/A"}
                    </div>
                  </div>
                  <div className="mr-2 mt-2">
                    <div className="">Wholesale Price</div>
                    <div className="text-xl font-semibold text-gray-600">
                      ₹ {data?.wholesalePrice ? data?.wholesalePrice : "N/A"}
                    </div>
                  </div>
                  <div className=" w-full">
                    <div className="font-semibold text-lg">
                      Product Specifications
                    </div>
                    <div className="text-textGray">
                      {data?.specification
                        ? data?.specification.map((item, index) => (
                            <div key={index} className="mt-1">
                              {item}
                            </div>
                          ))
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid md:grid-cols-10 gap-5">
            <div className="md:col-span-7 mt-2 p-3 bg-white  rounded-md shadow">
              <div className=" w-full">
                <div className="font-semibold text-lg">Storage</div>
                <div>{data?.storage ? data?.storage : "N/A"}</div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              {/* <div className=" w-full">
                <div className="font-semibold text-lg">Drug Chemistry</div>
                <div className="text-textGray">
                  {data?.infoBox?.drugChemistry?.map((item, index) => (
                    <li>{item}</li>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div> */}

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  Therapeutic Advantages
                </div>
                <div className="text-textGray">
                  <div>
                    {data?.therapeuticAdvantages
                      ? data?.therapeuticAdvantages
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Uses</div>
                <div className="text-textGray">
                  {Array.isArray(data?.uses)
                    ? data?.uses?.map((item, index) => (
                        <div key={index} className="mt-1">
                          {item}
                        </div>
                      ))
                    : data?.uses.split("***").map((item, index) => (
                        <div key={index} className="mt-1">
                          {item}
                        </div>
                      ))}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Instructions to use</div>
                <div className="text-textGray">
                  {data?.instructions ? data?.instructions : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Adverese Effects</div>
                <div className="text-textGray">
                  {data?.adverseEffects
                    ? data?.adverseEffects.map((item, index) => (
                        <div key={index} className="mt-1">
                          {item}
                        </div>
                      ))
                    : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">How medicine works</div>
                <div className="text-textGray">
                  {data?.medicineWorkingProcedure
                    ? data?.medicineWorkingProcedure
                    : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Drug interactions</div>
                <div className="text-textGray">
                  {data?.drugInteractions ? data?.drugInteractions : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  Food and medicines interactions
                </div>
                <div className="text-textGray">
                  {data?.foodAndMedicineInteractions
                    ? data?.foodAndMedicineInteractions
                    : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  How disease affects drugs?
                </div>
                <div className="text-textGray">
                  {data?.howDiseaseAffectDrug
                    ? data?.howDiseaseAffectDrug
                    : "N/A"}
                </div>
              </div>
            </div>
            <div className="md:col-span-3 mt-2 p-3 bg-white  rounded-md shadow">
              <div className=" w-full">
                <div className="font-semibold text-lg">Safety Advice</div>
                <div className="h-px w-full bg-gray-200 my-2"></div>
                {data?.safetyGuidance?.map((item, index) => (
                  <div>
                    <div className="mt-3 flex space-x-5 items-center">
                      <div className="text-center">
                        <div className="rounded-md bg-gray-300 h-20 w-20"></div>
                        <div className="text-sm mt-1">{item?.type?.name}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-wide w-max py-1 px-2 text-bluePrimary bg-blue-100 rounded-md">
                          {item?.safetyParameter === 1
                            ? "Safe"
                            : item?.safetyParameter === 2
                            ? "Unsafe"
                            : item?.safetyParameter === 3
                            ? "Caution"
                            : "Consult a Doctor"}
                        </div>
                        <div className="text-xs text-textGray font-bold mb-1">
                          {"Effect"}
                        </div>
                        <div className="text-xs text-textGray">
                          {item?.effect}
                        </div>
                        <div className="text-xs text-textGray font-bold mb-1 mt-1">
                          {"Recommendation"}
                        </div>
                        <div className="text-xs text-textGray">
                          {item?.guidance}
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Skipped Dosage</div>
                <div className="text-textGray text-xs">
                  {data?.skippedDosage ? data?.skippedDosage : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              <div className=" w-full">
                <div className="font-semibold text-lg">Specific Guidance</div>
                <div className="text-textGray text-xs">
                  {data?.specificGuidance
                    ? data?.specificGuidance.map((item, index) => (
                        <div key={index} className="mt-1">
                          {item}
                        </div>
                      ))
                    : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Fact Box</div>
                <div className="grid grid-cols-2 gap-2 text-textGray text-xs">
                  <div>Habit Forming</div>
                  <div>
                    {data?.infoBox?.creatingHabits === true ? "YES" : "NO"}
                  </div>
                  <div>Medical Class</div>
                  <div>{data?.infoBox?.medicineCategory}</div>
                  <div>Activity</div>
                  <div>{data?.infoBox?.activity}</div>
                  <div>Drug Chemistry</div>
                  <div>
                    {data?.infoBox?.drugChemistry?.map((item, index) => (
                      <div>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              {data?.references.length > 0 && (
                <div className=" w-full">
                  <div className="font-semibold text-lg">References</div>
                  <ul>
                    {data?.references?.map((item, index) => (
                      <li className="text-xs text-gray-500">{item}</li>
                    ))}
                  </ul>
                  <div className="h-px w-full bg-gray-200 my-2"></div>
                </div>
              )}
              {data?.faq.length > 0 && (
                <div className=" w-full">
                  <div className="font-semibold text-lg">Faqs</div>
                  <ul>
                    {data?.faq?.map((item, index) => (
                      <li className="text-xs text-gray-500">
                        <div>Que: {item?.question}</div>
                        <div>Ans: {item?.answer}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="h-px w-full bg-gray-200 my-2"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
