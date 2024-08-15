import Link from "next/link";
import React from "react";

const gridData = [
  // {
  //   image: "/images/grid1.svg",
  //   text: "Invoicing",
  //   href: "#",
  // },
  // {
  //   image: "/images/grid3.svg",
  //   text: "Order Management",
  //   href: "#",
  // },
  {
    image: "/images/grid2.svg",
    text: "Stakeholders",
    href: "/manage-stakeholders",
  },
  // {
  //   image: "/images/grid4.svg",
  //   text: "Analytics",
  //   href: "#",
  // },
];

const Dashboard = () => {
  return (
    <div className="w-full">
      {/* GRID CARDS */}
      <div className="grid md:grid-cols-4 gap-5 mt-5">
        {gridData.map((data, index) => (
          <Link
            href={data.href}
            key={index}
            className="w-full hover:shadow-xl flex flex-col justify-center items-center space-y-2 bg-white shadow-md rounded-md px-5 py-5"
          >
            <img src={data.image} className="w-24" />
            <div>{data.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
