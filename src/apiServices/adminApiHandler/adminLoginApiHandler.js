import adminhttpService from "../adminhttpService";
import { toast } from "react-toastify";

export async function adminLogin(formData) {
  try {
    const { data, headers } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/login`,
      formData
    );
    console.log(data);

    if (!data.error) {
      await localStorage.removeItem("token-admin");
      await localStorage.setItem("token-admin", headers["x-auth-token-admin"]);

      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function forgotPassword(formData) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/forgotPassword`,
      formData
    );
    console.log(data);

    if (!data.error) {
      toast.success(data.results.otp);
      await localStorage.removeItem("token-admin");
    } else toast.error(data.message);

    if (!data.error) return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function verifyOTP(formData) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/verifyOTP`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message);

    if (!data.error) return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function updatePassword(formData) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/updatePassword`,
      formData
    );
    console.log(data);
    if (!data.error) {
      toast.success(data.message);
    } else toast.error(data.message);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getDashboardCount() {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getDashboardCount`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getAdminData() {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getAdminData`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
