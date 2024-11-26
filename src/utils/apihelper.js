import axios from "axios";
import { logout } from "./auth";

let webApiHostName =
  import.meta.env.VITE_WEB_HOST_API || "http://localhost:3000/api";

  const instance = axios.create({
  baseURL: webApiHostName,
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      logout();
    }

    return Promise.reject(error);
  }
);

export const axiosPost = async (endpoint, data) => {
  try {
    const response = await instance.post(endpoint, data);
    return await response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const axiosPatch = async (endpoint, data) => {
  try {
    const response = await instance.patch(endpoint, data);
    return await response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const axiosGet = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return await response.data;
  } catch (error) {
    console.log(error);
    const newError = new Error(
      error.response?.data?.message || "An error occurred"
    );
    newError.statusCode = error.response?.data?.statusCode;
    throw newError;
  }
};

export const axiosPut = async (endpoint, data) => {
  try {
    const response = await instance.put(endpoint, data);
    return await response.data;
  } catch (error) {
    throw error?.response?.data?.errors?.response;
  }
};

export const axiosDelete = async (endpoint) => {
  try {
    const response = await instance.delete(endpoint);
    return await response.data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

export const axiosAuth = async (endpoint, data) => {
  const url = webApiHostName + endpoint;
  try {
    const response = await axios.post(url, data);
    return await response.data;
  } catch (error) {
    // const newError = new Error(
    //   error.response?.data?.message || "something went wrong.",
    // );
    // newError.statusCode = error.response?.data?.statusCode;
    // throw newError;
    throw error?.response?.data;
  }
};
