import adminhttpService from "../adminhttpService";
import { toast } from "react-toastify";

export async function buyerLogin(formData) {
  try {
    const { data, headers } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/login`,
      formData
    );
    console.log(data);

    if (!data.error) {
      await localStorage.removeItem("token-buyer");
      await localStorage.setItem("token-buyer", headers["x-auth-token-buyer"]);

      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function buyerSignup(formData) {
  try {
    const { data, headers } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/signup`,
      formData
    );
    console.log(data);

    if (!data.error) {
      await localStorage.removeItem("token-buyer");
      await localStorage.setItem("token-buyer", headers["x-auth-token-buyer"]);

      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
