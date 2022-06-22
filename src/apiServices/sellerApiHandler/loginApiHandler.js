import httpService from "../httpService";
import { toast } from "react-toastify";

export async function login(formData) {
  try {
    const { data, headers } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/login`,
      formData
    );
    console.log(data);

    if (!data.error) {
      await localStorage.removeItem("token");
      await localStorage.setItem("token", headers["x-auth-token"]);

      if (data.results.staff) {
        await localStorage.removeItem("staff");
        await localStorage.setItem("staff", data.results.staff._id);
      } else {
        await localStorage.removeItem("staff");
      }

      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getSellerData() {
  try {
    const { data, headers } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getSellerData`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
