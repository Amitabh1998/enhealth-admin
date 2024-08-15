import axios from "axios";

export const getAllVideos = async (limit, skip) => {
  try {
    const token = localStorage.getItem("vitmedsAdminToken");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}knowledge-center/get-all-videos?$sort[createdAt]=-1`,
      headers: {},
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
