import React, { useState, CSSProperties } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton";
import OtpDialog from "../../Dialogs/OtpDialog";
import { loginHandler, sendOtp } from "@/api/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(1);
  const router = useRouter();
  // const [phone, setPhone] = useState("");
  // Email and Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loadind state
  const [loading, setLoading] = useState(false);

  const emailLogin = async () => {
    try {
      setLoading(true);
      const response = await loginHandler(email, password);
      console.log(response);
      localStorage.setItem("vitmedsAdminToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(error ? error : "Something went wrong", "bottom-right");
      setLoading(false);
    }
  };

  // const onChangeHandler = (e) => {
  //   setPhone(e.target.value);
  // };

  // const validate = () => {
  //   if (phone.trim() === "") {
  //     toast.error("Please enter phone number");
  //     setLoading(false);
  //     return false;
  //   } else
  //   if (phone.length !== 10) {
  //     toast.error("Please enter a valid phone number");
  //     setLoading(false);
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const sendOtpHandler = async () => {
  //   setLoading(true);
  //   if (validate() === true) {
  //     try {
  //       setLoading(true);
  //       const response = await sendOtp(phone, "login");
  //       setOpen(true);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error(error ? error : "Something went wrong");
  //     }
  //   }
  // };

  return (
    <div className="text-center">
      <div className="font-bold text-gray-800">Welcome to Enhealth Admin</div>
      {/* {state === 1 ? (
        <div>
          <div className="text-gray-500">
            Please enter your phone number to login
          </div>
          <div className="my-5">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="number"
                id="number"
                value={phone}
                onChange={onChangeHandler}
                className="block w-full rounded-md border-0 py-1.5 pl-14 outline-none text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter mobile number"
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-2 bg-blue-50 border border-gray-300 rounded-l-md">
                +91
              </div>
            </div>
          </div>
        </div>
      ) : ( */}
      <div>
        <div className="text-gray-500">
          Please enter your email and password to login
        </div>
        <div className="my-5">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="w-full text-left">Email</div>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="w-full text-left">Password</div>
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          emailLogin();
        }}
      >
        <PrimaryButton
          loading={loading}
          text={"Login"}
          color={loading ? "bg-[#cccccc]" : "bg-[#575AE5]"}
        />
      </div>
      <div className="mt-3">
        By Using the app, you agree to{" "}
        <span className="text-orange-500">Terms and conditions</span>
      </div>
      {open && (
        <OtpDialog
          open={open}
          setOpen={setOpen}
          phone={phone}
          action={"login"}
        />
      )}
    </div>
  );
};

export default LoginForm;
