import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  LogoutIcon,
  PlusIcon,
  UserCircleIcon,
  UsersIcon,
  BeakerIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  UserAddIcon,
  UserGroupIcon,
  ViewGridIcon,
  ViewListIcon,
  ViewGridAddIcon,
  SaveIcon,
  SaveAsIcon,
  PuzzleIcon,
  BadgeCheckIcon,
  SupportIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { ChevronUpIcon, DatabaseIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const navigation = [
  
  {
    name: "Manage Stakeholders",
    href: "/manage-stakeholders",
    icon: UserGroupIcon,
    current: false,
  },
  // {
  //   name: "Order Management",
  //   href: "/order-management",
  //   icon: ViewListIcon,
  //   current: false,
  // },
  // {
  //   name: "Medicines",
  //   href: "/medicines",
  //   icon: ViewGridAddIcon,
  //   current: false,
  //   permissions: "Data Entry Management",
  // },
  // {
  //   name: "Products",
  //   href: "/products",
  //   icon: ViewGridAddIcon,
  //   current: false,
  //   permissions: "Data Entry Management",
  // },
  // {
  //   name: "Lab Tests",
  //   href: "/lab-tests",
  //   icon: BeakerIcon,
  //   current: false,
  //   permissions: "Data Entry Management",
  // },
  // {
  //   name: "Medicines Inventory",
  //   href: "/medicines-inventory",
  //   icon: SaveIcon,
  //   current: false,
  // },
  // {
  //   name: "Products Inventory",
  //   href: "/products-inventory",
  //   icon: SaveAsIcon,
  //   current: false,
  // },
  // {
  //   name: "Lab tests",
  //   href: "/lab-tests",
  //   icon: UsersIcon,
  //   current: false,
  // },
  // {
  //   name: "Analytics",
  //   href: "/analytics",
  //   icon: ChartBarIcon,
  //   current: false,
  // },
  // {
  //   name: "CMS",
  //   href: "/cms",
  //   icon: PuzzleIcon,
  //   current: false,
  //   permissions: "Content Management",
  // },
  // {
  //   name: "New Medicine Requests",
  //   href: "/requested-medicines",
  //   icon: BadgeCheckIcon,
  //   current: false,
  // },
  // {
  //   name: "Support",
  //   href: "/support",
  //   icon: SupportIcon,
  //   current: false,
  // },
  // {
  //   name: "Upcoming Appointments",
  //   href: "/upcoming-appointments",
  //   icon: CalendarIcon,
  //   current: false,
  // },
  // { name: "Analytics", href: "/analytics", icon: InboxIcon, current: false },
  // {
  //   name: "Profile",
  //   href: "/profile",
  //   icon: UserCircleIcon,
  //   current: false,
  // },
  // { name: "logout", href: "/", icon: LogoutIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SideBar = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const getUserData = () => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser(_user);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 pt-16 bg-white overflow-y-auto">
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {user && user?.role === 1 && (
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 pb-0">
                <Disclosure>
                  {({ open }) => (
                    <>
                      {/* <Disclosure.Button className="flex w-full  rounded-lg py-2 text-left text-sm font-medium text-gray-600 ">
                        <DatabaseIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
                        <span className="flex-1">Master Data</span>
                        <ChevronUpIcon
                          className={`${
                            !open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-gray-600`}
                        />
                      </Disclosure.Button> */}
                      {/* <Disclosure.Panel className="pl-6 pt-2 pb-2 text-sm text-gray-500">
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/states"}>
                            <p className="w-full">States</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/cities"}>
                            <p className="w-full">Cities</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/pincodes"}>
                            <p className="w-full">Pin Codes</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/tags"}>
                            <p className="w-full">Tags</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/uses"}>
                            <p className="w-full">Uses</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/ingredients"}>
                            <p className="w-full">Ingredients</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/drug-chemistry"}>
                            <p className="w-full">Drug Chemistry</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/measurement-type"}>
                            <p className="w-full">Measurement Type</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/packaging-type"}>
                            <p className="w-full">Packaging Type</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/hsn-code"}>
                            <p className="w-full">HSN Code</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/manufacturer"}>
                            <p className="w-full">Manufacturer</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/surgeons"}>
                            <p className="w-full">Surgeons</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/specialities"}>
                            <p className="w-full">Specialities</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/symptoms"}>
                            <p className="w-full">Symptoms</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/medicine-categories"}>
                            <p className="w-full">Medicine Categories</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/medicine-subcategories"}>
                            <p className="w-full">Medicine Sub Categories</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/product-categories"}>
                            <p className="w-full">Product Categories</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/product-subcategories"}>
                            <p className="w-full">Product Sub Categories</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/dosage"}>
                            <p className="w-full">Dosage</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/adverse-effects"}>
                            <p className="w-full">Adverse Effects</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/medicine-type"}>
                            <p className="w-full">Medicine Type</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/storage"}>
                            <p className="w-full">Storage</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/organs"}>
                            <p className="w-full">Organs</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/allergy-type"}>
                            <p className="w-full">Allergy Type</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/surgery-type"}>
                            <p className="w-full">Surgery Type</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/disease"}>
                            <p className="w-full">Disease</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/languages"}>
                            <p className="w-full">Language</p>
                          </Link>
                        </div>
                        <div className="w-full hover:bg-gray-200 p-2 rounded-md">
                          <Link href={"/tax-category"}>
                            <p className="w-full">Tax Category</p>
                          </Link>
                        </div>
                      </Disclosure.Panel> */}
                    </>
                  )}
                </Disclosure>
              </div>
            )}
            <div>
              {user && user.role === 6 ? (
                <div>
                  {navigation?.map(
                    (item) =>
                      item.permissions ===
                        user?.permissions[0]?.masterRole?.name && (
                        <Link href={item.href} legacyBehavior>
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-bluePrimary text-white"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      )
                  )}
                </div>
              ) : user && user?.role === 1 ? (
                <div>
                  {navigation.map((item) => (
                    <Link href={item.href} legacyBehavior>
                      <a
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-bluePrimary text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("vitmedsAdminToken");
                localStorage.removeItem("user");
                router.push("/");
              }}
              className={classNames(
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 w-full py-2 text-sm font-medium rounded-md"
              )}
            >
              <LogoutIcon
                className={classNames(
                  "text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
