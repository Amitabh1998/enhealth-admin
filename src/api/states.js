import axios from "axios";

const API_URL = "http://3.110.179.66:3030/v1";

export const getAllStates = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/state?$sort[createdAt]=-1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        $limit: limit,
        $skip: skip,
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // throw error;
    console.log(error);
    return error?.response?.data?.message
      ? error?.response?.data?.message
      : "Something went wrong";
  }
};

export const addNewState = async (name) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let data = JSON.stringify({
      name: name,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/state`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw error?.response?.data?.message
      ? error?.response?.data?.message
      : "Something went wrong";
  }
};
