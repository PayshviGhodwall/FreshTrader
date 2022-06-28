import httpService from "../httpService";
import { toast } from "react-toastify";

export async function getBusinesses(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getBusinesses`,
      formData
    );
    console.log(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getBusinessDetail(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getBusinessDetail/${id}`
    );
    console.log(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function checkBusinessOverdue(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/checkBusinessOverdue/${id}`
    );
    console.log(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getProductConsignments(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getProductConsignments`,
      formData
    );
    console.log(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function processTransaction(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/processTransaction`,
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

export async function undoTransaction(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/undoTransaction`,
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
