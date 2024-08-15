import axios from "axios";

export const getAllBlogs = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}knowledge-center/get-all-blogs`,
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
    throw error.response.data.message;
  }
};

export const getAllUnapprovedBlogs = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}knowledge-center/get-all-blogs?status=2`,
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
    throw error.response.data.message;
  }
};
