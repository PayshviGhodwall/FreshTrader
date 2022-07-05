import axios from "axios";

const errorCallBack = (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    //toast.error("an unexpected error occured");
  }
  return Promise.reject(error);
};
axios.defaults.headers.common["x-auth-token-buyer"] =
  localStorage.getItem("token-buyer");
axios.interceptors.request.use(async (req) => {
  req.headers["x-auth-token-buyer"] = await localStorage.getItem("token-buyer");
  return req;
});
//intercept errors while communicating with backend server
axios.interceptors.response.use(null, errorCallBack);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
