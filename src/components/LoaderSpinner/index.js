import React from "react";
import { ClipLoader } from "react-spinners";

const LoaderSpinner = () => {
  return (
    <div className="w-full py-20 flex justify-center">
      <ClipLoader color={"#575AE5"} />
    </div>
  );
};

export default LoaderSpinner;
