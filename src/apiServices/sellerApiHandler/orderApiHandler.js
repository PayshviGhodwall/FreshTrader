import httpService from "../httpService";
import { toast } from "react-toastify";

export async function getOrders(status, sortBy) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getOrders`,
      {
        status: status,
        sortBy: sortBy,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getOrderDetails(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getOrderDetails/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changeOrderStatus(formData, formData1) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/changeOrderStatus`,
      {
        orderId: formData,
        status: formData1,
      }
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
export async function sendCounterOffer(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/sendCounterOffer`,
      {
        orderId: formData._id,
        product: formData.product,
        pick_up_date: formData.pick_up_date,
        pick_up_time: formData.pick_up_time,
        payment: formData.payment,
      }
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
