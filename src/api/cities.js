import axios from "axios";

const API_URL = "http://3.110.179.66:3030/v1";

export const getAllCities = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/city?$populate[0][path]=state&$populate[0][select][0]=name&$sort[createdAt]=-1`,
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
    console.log(error);
    return error.response.data.message;
  }
};
