import React from "react";
import { Link } from "react-router-dom";
import { addNewBusiness } from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import Header from "../commonComponent/header";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddNewBussiness() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await addNewBusiness(data);
    if (!response.data.error) {
      navigate("/input-bussiness-sale");
    }
  };

  const checkABN = (abn) => {
    try {
      abn -= 10000000000;
      const weighting = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
      let sum = 0;
      for (var i = 0; i < String(abn).length; i++) {
        console.log(String(abn)[i]);
        sum += +String(abn)[i] * weighting[i];
      }
      if (sum % 89 === 0) return true;
      else return false;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <section class="add_business py-md-3 py-3">
        <div class="container py-md-5">
          <div class="row justify-content-center">
            <div class="col-xl-7 col-lg-7 col-md-10 col-12">
              <div class="add_business_box box_design">
                <div class="row">
                  <div class="col-12 Product_heading mb-md-3 mb-1">
                    <h2>Add New Business</h2>
                  </div>
                  <div class="col-12">
                    <form
                      class="row add_business_form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">
                              Business Trading Name
                            </label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="business_trading_name"
                              name="business_trading_name"
                              {...register("business_trading_name", {
                                required: true,
                              })}
                            />
                            {errors?.business_trading_name && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Phone Number</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="phone_number"
                              name="phone_number"
                              {...register("phone_number", {
                                required: true,
                              })}
                            />
                            {errors?.phone_number && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Email Address</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="email"
                              name="email"
                              {...register("email", {
                                required: true,
                              })}
                            />
                            {errors?.email && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">ABN</label>
                          </div>
                          <div class="col-md-3 col-8">
                            <input
                              className="form-control"
                              type="text"
                              id="abn"
                              name="abn"
                              {...register("abn", {
                                required: true,
                              })}
                            />
                            {errors?.abn && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                          <div class="col-md-3 col-4 ps-0">
                            <button class="custom_btns" type="submit">
                              Check
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Entity Name</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="entity_name"
                              name="entity_name"
                              {...register("entity_name", {
                                required: true,
                              })}
                            />
                            {errors?.entity_name && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Address</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="address"
                              name="address"
                              {...register("address", {
                                required: true,
                              })}
                            />
                            {errors?.address && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center py-2">
                          <div class="col-md-6 mb-md-0 mb-3">
                            <label class="mb-0 form_tag">
                              Is This Business Part of SMSC?
                            </label>
                          </div>
                          <div class="col Business_radio">
                            <input
                              class="d-none"
                              type="radio"
                              id="business1"
                              name="is_smcs"
                              value={true}
                              {...register("is_smcs", {
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
                              name="is_smcs"
                              value={false}
                              {...register("is_smcs", {
                                required: true,
                              })}
                            />
                            <label for="business2">No</label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">SMCS Code</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="smcs_code"
                              name="smcs_code"
                              {...register("smcs_code", {
                                required: true,
                              })}
                            />
                            {errors?.smcs_code && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center py-2">
                          <div class="col-md-6 mb-md-0 mb-3">
                            <label class="mb-0 form_tag">
                              In This Business Part of SMSC?
                            </label>
                          </div>
                          <div class="col Business_radio">
                            <input
                              class="d-none"
                              type="radio"
                              id="business3"
                              name="market_seller"
                              value={true}
                              {...register("market_seller", {
                                required: true,
                              })}
                            />
                            <label for="business3">Yes</label>
                          </div>
                          <div class="col Business_radio">
                            <input
                              class="d-none"
                              type="radio"
                              id="business4"
                              name="market_seller"
                              value={false}
                              {...register("market_seller", {
                                required: true,
                              })}
                            />
                            <label for="business4">No</label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mt-md-4 mt-3">
                        <div class="row justify-content-center">
                          <div class="col-md-4">
                            <button class="custom_btns" type="submit">
                              Add Business
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddNewBussiness;
