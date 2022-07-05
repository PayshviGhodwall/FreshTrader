import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { updateSupplier } from "../../apiServices/sellerApiHandler/accountingApiHandler";

const EditSupplier = ({ editData, list }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [market, setMarket] = useState("");

  const onSubmit = async (data) => {
    console.log(data);

    data.supplierId = editData._id;
    const response = await updateSupplier(data);
    if (!response.data.error) {
      await list();
    }
  };

  useEffect(() => {
    if (editData) getEditSupplierData();
  }, []);

  console.log(editData);
  const getEditSupplierData = async () => {
    let defaultValues = {};
    defaultValues.business_trading_name = editData.business_trading_name;
    defaultValues.abn = editData.abn;
    defaultValues.entity_name = editData.entity_name;
    defaultValues.address = editData.address;
    defaultValues.phone_number = editData.phone_number;
    defaultValues.email = editData.email;
    defaultValues.smcs_code = editData.smcs_code;
    defaultValues.market_seller = editData.market_seller;

    reset({ ...defaultValues });
    console.log(defaultValues);
  };
  console.log(market);

  return (
    <>
      <div class="col-12 Product_heading">
        <h2>Edit Supplier</h2>
      </div>
      <div class="col-12">
        <form class="row add_business_form" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">Business Trading Name</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="business_trading_name"
                  name="business_trading_name"
                  {...register("business_trading_name", {
                    required: true,
                  })}
                />
                {errors?.business_trading_name && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">Phone Number</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  {...register("phone_number", {
                    required: true,
                  })}
                />
                {errors?.phone_number && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">Email Address</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors?.email && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">ABN</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="abn"
                  name="abn"
                  {...register("abn", {
                    required: true,
                  })}
                />
                {errors?.abn && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">Entity Name</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="entity_name"
                  name="entity_name"
                  {...register("entity_name", {
                    required: true,
                  })}
                />
                {errors?.entity_name && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">Address</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="address"
                  name="address"
                  {...register("address", {
                    required: true,
                  })}
                />
                {errors?.address && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>
          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">
                  In This Business A Market Seller
                </label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col Business_radio">
                <input
                  class="d-none"
                  type="radio"
                  id="business1"
                  name="market_seller"
                  value={true}
                  {...register("market_seller", {
                    required: true,
                  })}
                />
                <label for="business1">Yes</label>
              </div>
              <div class="col Business_radio">
                <input
                  class="d-none"
                  type="radio"
                  id="business2"
                  name="market_seller"
                  value={false}
                  {...register("market_seller", {
                    required: true,
                  })}
                />

                <label for="business2">No</label>
              </div>
            </div>
          </div>
          <div class="form-group col-12 my-md-4 my-3">
            <div class="row align-items-center">
              <div class="col-12">
                <label class="mb-0 form_tag1">
                  In This Business A Market Seller, add their SMSC Code below. A
                  buyer Business Account Will be made for the market seller in
                  case you also sell to them. Ignore this account if you only
                  buy from this seller.
                </label>
              </div>
            </div>
          </div>

          <div class="form-group col-12 mb-md-2 mb-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-md-0 mb-2">
                <label class="mb-0 form_tag">SMCS</label>
              </div>
              <div class="col-auto d-md-block d-none">
                <span class="text-white">:</span>
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="text"
                  id="smcs_code"
                  name="smcs_code"
                  {...register("smcs_code", {
                    required: true,
                  })}
                />
                {errors?.smcs_code && (
                  <p className="form-error mt-1">This field is required</p>
                )}
              </div>
            </div>
          </div>

          <div class="form-group col-12 mt-md-4 mt-3">
            <div class="row justify-content-center">
              <div class="col-md-4">
                <button
                  class="custom_btns"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal7"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSupplier;
