import axios from "axios";

export const getAllData = async (limit, skip, path, sort) => {
  try {
    console.log("manage stakeholder/common api called");
    const token = localStorage.getItem("vitmedsAdminToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}${path}&$sort[updatedAt]=${
        sort ? sort : "-1"
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        $limit: limit,
        $skip: skip,
      },
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return error?.response?.data?.message
      ? error?.response?.data?.message
      : "Something went wrong";
  }
};

export const fetchDeatils = async (path) => {
  try {
    console.log("manage stakeholder/fetch Details api called");
    const token = localStorage.getItem("vitmedsAdminToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}${path}?$sort[updatedAt]=-1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return error?.response?.data?.message
      ? error?.response?.data?.message
      : "Something went wrong";
  }
};

export const fetchDeatils2 = async (path) => {
  try {
    console.log("manage stakeholder/fetch Details api called");
    const token = localStorage.getItem("vitmedsAdminToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    return error?.response?.data?.message
      ? error?.response?.data?.message
      : "Something went wrong";
  }
};
