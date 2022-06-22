import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addNewBusiness } from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import Header from "../commonComponent/header";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { createSupport } from "../../apiServices/sellerApiHandler/settingApiHandler";

function Support() {
  const [seller, setSeller] = useState("");

  useEffect(() => {
    getsellerInfo();
  }, []);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();
    if (!data.error) {
      setSeller(data.results.seller);
    }
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.email = seller.email;
    data.type = "Seller";
    const response = await createSupport(data);
    if (!response.data.error) {
      navigate("/support");
    }
  };

  return (
    <>
      <Header />
      <section class="add_business py-md-3 py-3">
        <div class="container py-md-5">
          <div class="row justify-content-center">
            <div class="col-xl-9 col-lg-9 col-md-10 col-12">
              <div class="add_business_box box_design">
                <div class="row">
                  <div class="col-12 Product_heading mb-md-3 mb-1">
                    <h2>Add New Support</h2>
                  </div>
                  <div class="col-12">
                    <form
                      class="row add_business_form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Email Address</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="email"
                              id="email"
                              name="email"
                              value={seller.email}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-6 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Subject</label>
                          </div>
                          <div class="col-md-6">
                            <input
                              className="form-control"
                              type="text"
                              id="subject"
                              name="subject"
                              {...register("subject", {
                                required: true,
                              })}
                            />
                            {errors?.subject && (
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
                            <label class="mb-0 form_tag">
                              Write Your Concern
                            </label>
                          </div>
                          <div class="col-md-6">
                            <textarea
                              class="form-control"
                              name="concern"
                              id="concern"
                              cols="50"
                              rows="10"
                              {...register("concern", {
                                required: true,
                              })}
                            />

                            {errors?.concern && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mt-md-5">
                        <div class="row justify-content-center">
                          <div class="col-md-4">
                            <button class="custom_btns" type="submit">
                              Submit
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

export default Support;
