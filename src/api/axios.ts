import axios, { AxiosInstance } from "axios";
import errorHandler from "src/api/error-handler";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

console.log("baseURL:::", process.env.REACT_APP_API_URL);
instance.interceptors.response.use(
  (response) => response,
  (err) => {
    errorHandler(err);

    return Promise.reject(err);
  }
);

export default instance;
