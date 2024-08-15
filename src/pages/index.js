import React from "react";
import LoginForm from "../components/Forms/LoginForm";

const Login = () => {
  return (
    <div className="h-screen w-full grid md:grid-cols-2">
      <div className="w-full bg-white flex flex-col justify-center items-center">
        <div className="  flex flex-col justify-center items-center">
          <div className="h-[10vh] flex justify-center items-center mb-20">
            <img src={"/images/logo.svg"} alt="logo" className="h-24" />
          </div>
          <div className="h-[50vh] flex justify-center items-center">
            <img
              src={"/images/Login1.svg"}
              alt="login svg"
              className="h-full"
            />
          </div>
        </div>
        {/* <div className="w-full h-full mt-2">
          <div className=" w-full bg-[#575AE5] py-5 flex flex-col h-full items-center justify-center">
            <div className="text-center text-white text-4xl font-semibold">
              Making healthcare
            </div>
            <div className="text-center text-white text-4xl font-semibold">
              Affordable, Accessible and Available{" "}
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-gray-50 flex justify-center items-center flex-col">
        <LoginForm />
      </div>
    </div>
  );
};

Login.layout = null;

export default Login;
