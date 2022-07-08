import { toast } from "react-toastify";
import buyerhtttpService from "../buyerhtttpService";

export async function buyerGetSeller() {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getSellers`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getSellersProducts(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getSellersProducts`,
      formData
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function addToCart(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/addToCart`,
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

export async function getMyCart() {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getMyCart`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getCartDetails(id) {
  try {
    const { data } = await buyerhtttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getCartDetails/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function orderProduct(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/orderProduct`,
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

export async function getOrders(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getOrders`,
      formData
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
    const { data } = await buyerhtttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getOrderDetails/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changeOrderStatus(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/changeOrderStatus`,
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
export async function reorderProduct(formData) {
  try {
    const { data } = await buyerhtttpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/reorderProduct`,
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

export async function deleteFromCart(id) {
  try {
    const { data } = await buyerhtttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/deleteFromCart/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getMyPlan() {
  try {
    const { data } = await buyerhtttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getMyPlan`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function getOrderCount() {
  try {
    const { data } = await buyerhtttpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/buyer/getOrderCount`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
