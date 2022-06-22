import httpService from "../httpService";
import { toast } from "react-toastify";

export async function addSalesman(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/addSalesman`,
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

export async function getSalesman() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getSalesman`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function deleteSalesman(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/deleteSalesman/${id}`
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

export async function updateSellerInfo(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateProfile`,
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

export async function updateSellerInfo2(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateAccountInformation`,
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

export async function updateSellerInfo3(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateSellerDocuments`,
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

export async function getPartnerBuyers() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getPartnerBuyers`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changePartnerBuyer(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/changePartnerBuyer/${id}`
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

export async function addStation(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/addStation`,
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

export async function getVariety(product) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/getVariety`,
      {
        product: product,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getMyPOSProducts(
  formData,
  formData1,
  formData2,
  formData3
) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getMyPOSProducts`,
      {
        filterBy: formData1,
        search: formData,
        category: formData2,
        variety: formData3,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
export async function addSellerProduct(formData, category) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/addSellerProduct`,
      {
        category: category,
        variety: formData.variety._id,
        type: formData._id,
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

export async function getLayout(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getLayout`,
      {
        category: formData,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function changeVarietyStatus(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/changeVarietyStatus`,
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

export async function editCategoryName(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/editCategoryName`,
      {
        fruits: formData[0].alias,
        vegetables: formData[1].alias,
        herbs: formData[2].alias,
        others: formData[3].alias,
      }
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function updateOrderSetting(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateOrderSetting`,
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

export async function getStaff() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getStaff`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function getSupport() {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getSupport`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}

export async function createSupport(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/createSupport`,
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

export async function addStaff(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/addStaff`,
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

export async function updateStaff(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/seller/updateStaff`,
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

export async function getStaffDetail(id) {
  try {
    const { data } = await httpService.get(
      `${process.env.REACT_APP_APIENDPOINT}/seller/getStaffDetail/${id}`
    );
    console.log(data);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data.message);
    return { error };
  }
}
