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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [limit, setLimit] = useState(4);
  const [query, setQuery] = useState("");

  const getMedicines = async () => {
    try {
      setLoading(true);
      const data = await getDataWithourLimit(
        `products/product-details/${router?.query?.id}`
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

  console.log(router.query.id);
  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full py-20 flex justify-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="max-w-7xl px-8 sm:px-6 md:px-4  w-full mx-auto mt-10">
          <div className="w-full grid md:grid-cols-10 gap-4 bg-white">
            <div className="w-full md:col-span-6 flex justify-center items-center flex-col">
              <img src={data?.attachments[0].link} />
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
                    data?.prescriptionRequired
                      ? "bg-green-300 text-green-700"
                      : "bg-sky-300 text-sky-700"
                  }`}
                >
                  {data?.prescriptionRequired
                    ? "Prescription Required"
                    : "Prescription Not Required"}
                </div>
              </div>
              {/* <div className="text-sm">
                Expiry Date on or after{" "}
                <span className="font-semibold">July 2024</span>
              </div> */}

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
                      {data?.specification ? data?.specification : "N/A"}
                    </div>
                  </div>
                </div>

                {/* SKU CATEGORIES SECTION */}
                {/* <div className="mt-2">
              <div className="">
                <span className="font-semibold">SKU :</span> LNF45AS1
              </div>
              <div className="">
                <span className="font-semibold">Categories :</span> Allopathy,
                Equipments
              </div>
              <div className="">
                <span className="font-semibold">Availability :</span> In Stock
              </div>
            </div> */}
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

              <div className=" w-full">
                <div className="font-semibold text-lg">Drug Chemistry</div>
                <div className="text-textGray">
                  {data?.infoBox?.drugChemistry?.map((item, index) => (
                    <li>{item}</li>
                  ))}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

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
                  {data?.uses ? data?.uses : "N/A"}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Instructions to use</div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectio
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Adverese Effects</div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">How medicine works</div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Drug interactions</div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  Food and medicines interactions
                </div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  How disease affects drugs?
                </div>
                <div className="text-textGray">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.Paulum, cum
                  regem Persem captum adduceret, eodem flumine invectio.Paulum,
                  cum regem Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Related Doctors</div>
                <div className="mt-1 grid md:grid-cols-3 gap-4">
                  <div className="w-full">
                    <div className="flex space-x-3">
                      <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
                      <div>
                        <div>Dr. Ruby Ladha</div>
                        <div className="text-xs text-textGray">
                          Orthopedician
                        </div>
                        <div className="text-xs text-textGray">
                          10-12 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>

                    <div>
                      <div className="text-xs font-semibold">
                        Malviya Nagar -{" "}
                        <span className="text-gray">Your Dentist</span>
                      </div>
                      <div className="text-xs font-semibold">
                        $500 -{" "}
                        <span className="text-gray">Consultation fees</span>
                      </div>
                    </div>

                    <div>
                      <button className="px-14 py-2 text-white mt-1 bg-bluePrimary rounded-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex space-x-3">
                      <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
                      <div>
                        <div>Dr. Ruby Ladha</div>
                        <div className="text-xs text-textGray">
                          Orthopedician
                        </div>
                        <div className="text-xs text-textGray">
                          10-12 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>

                    <div>
                      <div className="text-xs font-semibold">
                        Malviya Nagar -{" "}
                        <span className="text-gray">Your Dentist</span>
                      </div>
                      <div className="text-xs font-semibold">
                        $500 -{" "}
                        <span className="text-gray">Consultation fees</span>
                      </div>
                    </div>

                    <div>
                      <button className="px-14 py-2 text-white mt-1 bg-bluePrimary rounded-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex space-x-3">
                      <div className="bg-gray-300 h-16 w-16 rounded-md"></div>
                      <div>
                        <div>Dr. Ruby Ladha</div>
                        <div className="text-xs text-textGray">
                          Orthopedician
                        </div>
                        <div className="text-xs text-textGray">
                          10-12 years of experience
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-gray-200 my-2"></div>

                    <div>
                      <div className="text-xs font-semibold">
                        Malviya Nagar -{" "}
                        <span className="text-gray">Your Dentist</span>
                      </div>
                      <div className="text-xs font-semibold">
                        $500 -{" "}
                        <span className="text-gray">Consultation fees</span>
                      </div>
                    </div>

                    <div>
                      <button className="px-14 py-2 text-white mt-1 bg-bluePrimary rounded-md">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className="h-px w-full bg-gray-200 my-2"></div>
            </div>
            <div className="md:col-span-3 mt-2 p-3 bg-white  rounded-md shadow">
              <div className=" w-full">
                <div className="font-semibold text-lg">Safety Advice</div>
                <div className="mt-1 flex space-x-5 items-center">
                  <div className="text-center">
                    <div className="rounded-md bg-gray-300 h-20 w-20"></div>
                    <div className="text-sm mt-1">Alcohol</div>
                  </div>
                  <div>
                    <div className="text-xs tracking-wide w-max py-1 px-2 text-bluePrimary bg-blue-100 rounded-md">
                      UNSAFE
                    </div>
                    <div className="text-xs text-textGray">
                      orem ipsum dolor sit amet, consectetur adipiscing elit. Si
                      id dicis orem ipsum dolor sit amet, consectetur adipiscing
                      elit. Si id dicis
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200 my-2"></div>
                <div className="mt-3 flex space-x-5 items-center">
                  <div className="text-center">
                    <div className="rounded-md bg-gray-300 h-20 w-20"></div>
                    <div className="text-sm mt-1">Alcohol</div>
                  </div>
                  <div>
                    <div className="text-xs tracking-wide w-max py-1 px-2 text-bluePrimary bg-blue-100 rounded-md">
                      UNSAFE
                    </div>
                    <div className="text-xs text-textGray">
                      orem ipsum dolor sit amet, consectetur adipiscing elit. Si
                      id dicis orem ipsum dolor sit amet, consectetur adipiscing
                      elit. Si id dicis
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200 my-2"></div>
                <div className="mt-3 flex space-x-5 items-center">
                  <div className="text-center">
                    <div className="rounded-md bg-gray-300 h-20 w-20"></div>
                    <div className="text-sm mt-1">Alcohol</div>
                  </div>
                  <div>
                    <div className="text-xs tracking-wide w-max py-1 px-2 text-bluePrimary bg-blue-100 rounded-md">
                      UNSAFE
                    </div>
                    <div className="text-xs text-textGray">
                      orem ipsum dolor sit amet, consectetur adipiscing elit. Si
                      id dicis orem ipsum dolor sit amet, consectetur adipiscing
                      elit. Si id dicis
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Skipped Dosage</div>
                <div className="text-textGray text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">
                  Alternative Medicines
                </div>
                <div className="">
                  <div className="flex mt-2 justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold">
                        Paracetamol 500
                      </div>
                      <div className="text-xs text-textGrays">
                        By Remedies ltd
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">$2/tablet</div>
                    </div>
                  </div>
                  <div className="flex mt-2 justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold">
                        Paracetamol 500
                      </div>
                      <div className="text-xs text-textGrays">
                        By Remedies ltd
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">$2/tablet</div>
                    </div>
                  </div>
                  <div className="flex mt-2 justify-between items-center">
                    <div>
                      <div className="text-sm font-semibold">
                        Paracetamol 500
                      </div>
                      <div className="text-xs text-textGrays">
                        By Remedies ltd
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">$2/tablet</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Specific Guidance</div>
                <div className="text-textGray text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Specific Guidance</div>
                <div className="text-textGray text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si id
                  dicis, vicimus. Paulum, cum regem Persem captum adduceret,
                  eodem flumine invectioLorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Si id dicis, vicimus. Paulum, cum regem
                  Persem captum adduceret, eodem flumine invectio.
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>

              <div className=" w-full">
                <div className="font-semibold text-lg">Fact Box</div>
                <div className="grid grid-cols-2 gap-2 text-textGray text-xs">
                  <div>Habit Forming</div>
                  <div>No</div>
                  <div>Medical Class</div>
                  <div>Vitamins</div>
                  <div>Activity</div>
                  <div>Aplha glucose</div>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 my-2"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
