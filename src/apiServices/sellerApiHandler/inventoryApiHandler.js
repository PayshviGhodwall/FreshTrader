import httpService from "../httpService";
import { toast } from "react-toastify";

export async function getInventory(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getInventory`,
      formData
    );
    console.log(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function resetInventory() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/resetInventory`
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

export async function resetCarryOver() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/resetCarryOver`
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

export async function resetSoldToday() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/resetSoldToday`
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
export async function resetPhysicalStock() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/resetPhysicalStock`
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

export async function printInventory(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/printInventory`,
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

export async function addNewBusiness(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/addNewBusiness`,
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
export async function updateOverselling(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateOverselling`,
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
export async function adjustInventory(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/adjustInventory`,
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
export async function adjustCarryOver(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/adjustCarryOver`,
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

export async function undoInventory(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/undoInventory`,
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
