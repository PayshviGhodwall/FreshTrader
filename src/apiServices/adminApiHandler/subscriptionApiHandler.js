import { toast } from "react-toastify";
import adminhttpService from "../adminhttpService";

export async function getSubscriptionList(filterBy) {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getSubscriptionList`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changeSubscriptionStatus(id) {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/changeSubscriptionStatus/${id}`
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

export async function getSubscriptionDetail(formData) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getSubscriptionDetail`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
