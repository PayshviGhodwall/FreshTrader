import { toast } from "react-toastify";
import adminhttpService from "../adminhttpService";

export async function getBuyerList(filterBy) {
  try {
    const { data } = await adminhttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getBuyerList`,
      {
        filterBy: filterBy,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changeBuyerStatus(id) {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/changeBuyerStatus/${id}`
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

export async function getBuyerData(id) {
  try {
    const { data } = await adminhttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getBuyerData/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
