import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import LoaderSpinner from "@/components/LoaderSpinner";
import { authUser } from "@/api/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  let DefaultLayout = Layout;
  if (Component.layout === null) DefaultLayout = React.Fragment;
  else if (Component.layout) DefaultLayout = Component.layout;

  const authHandler = async () => {
    try {
      const response = await authUser();
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("vitmedsAdminToken", response.accessToken);
      // router.push("/dashboard");
    } catch (error) {
      console.log(error);
      // toast.error(
      //   error && error === "accessToken is required"
      //     ? "Access denied! Login to continue"
      //     : "Something went wrong"
      // );
      router.push("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("vitmedsAdminToken");
    console.log(token);
    if (!token) {
      if (router.pathname === "/") {
        return;
      } else {
        router.push("/");
      }
    } else {
      const response = authHandler();
    }
  }, [router.pathname]);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <LoaderSpinner />
      ) : (
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      )}
    </div>
  );
}
