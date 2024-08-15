import React, { useEffect, useState } from "react";
import WalletRecentActivities from "../WalletRecentActicities";
// import { addCommonData, getData } from "@/apis/common";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader";
import CommonDialog from "../Dialogs/CommonDialog";
import DefaultInput from "../Inputs/DefaultInput";
import { addCommonData, getData } from "@/api/common";
import { useRouter } from "next/router";

const Wallet = ({ profileId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [total, setTotal] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [redeemLoading, setRedeemLoading] = useState(false);

  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountLoading, setAccountLoading] = useState(false);

  const router = useRouter();

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await getData(
        -1,
        0,
        `payment/get-wallet-details?userId=${router?.query?.id}`
      );
      const response2 = await getData(
        -1,
        0,
        `payment/bank-account?userId=${router?.query?.id}`
      );
      setData(response);
      setAccounts(response2);
      console.log(response);
      setLoading(false);
    } catch (error) {
      toast.error(error ? error : "Something went wrong");
    }
  };

  useEffect(() => {
    if (router && router?.query?.id?.trim() !== "") {
      getAllData();
    } else {
      return;
    }
  }, [router]);

  return (
    <div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div>
          <div className="w-full px-5 flex flex-col md:flex-row  justify-between py-7 rounded-md shadow-md bg-white mt-5">
            <div className="flex-1 ">
              <div className="text-xl text-gray-500">Total balance</div>
              <div className="text-5xl my-4 font-semibold text-gray-800">
                ₹{data?.amount}
              </div>
            </div>
          </div>
          {/* <div className="mt-5">
            <div className="flex w-full justify-between mb-5">
              <div className="font-semibold txet-gray-800 ">Bank accounts</div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {accounts.map((item, index) => (
                <div
                  className="p-2 rounded-md shadow bg-white flex items-center space-x-4"
                  key={index}
                >
                  <img
                    className="h-12 w-12 rounded-md "
                    src={"/images/addbank.svg"}
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      **********
                      {item.accountNumber.substr(item.accountNumber.length - 4)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.bankName}, {item.branchName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.accountHolderName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          {/*RECENT ACTIVITY  */}

          <div className="mt-5">
            <WalletRecentActivities profileId={profileId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
