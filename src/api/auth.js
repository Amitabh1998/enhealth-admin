import axios from "axios";

export const loginHandler = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}authenticate`,
      {
        strategy: "local",
        email,
        password,
        role: 1,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const authUser = async () => {
  try {
    let data = JSON.stringify({
      strategy: "jwt",
      accessToken: localStorage.getItem("vitmedsAdminToken"),
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const sendOtp = async (phone, action) => {
  try {
    let data = JSON.stringify({
      phone: phone,
      strategy: "phoneOtp",
      action: action,
      role: 6,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const verifyOtp = async (phone, otp, action, deviceId, uuid) => {
  try {
    let data = JSON.stringify({
      phone: phone,
      otp: otp,
      strategy: "phoneOtp",
      action: action,
      role: 6,
      deviceId: deviceId,
      deviceType: 3,
      deviceName: uuid,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
