import axios from "axios";

export const getAllCoupons = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}promotions/coupon?$populate=labTestPackages&$sort[createdAt]=-1`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        $limit: limit,
        $skip: skip,
      },
    };

    const response = await axios.request(config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error.response.data.message;
  }
};
