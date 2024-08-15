import axios from "axios";
export const getAllPincodes = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}master-data/pin-code?$populate[0][path]=state&$populate[0][select][0]=name&$populate[1][path]=city&$populate[1][select][0]=name&$sort[createdAt]=-1`,
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
