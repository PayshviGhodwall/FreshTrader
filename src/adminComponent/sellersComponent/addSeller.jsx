import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sellerSignup } from "../../apiServices/adminApiHandler/sellerApiHandler";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import ImageUploader from "react-images-upload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddSeller() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [sideBar, setSideBar] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const sideBarValue = () => {
    setSideBar(!sideBar);
  };
  const onSubmit = async (data) => {
    console.log(data);
    if (data.password !== data.confirm_password) {
      toast.error("Password & Confirm Password should be same");
      return;
    }

    const formData = new FormData();
    for (const item in data) {
      formData.append(item, data[item]);
    }

    if (selectedFile) {
      formData.append("profile_image", selectedFile, selectedFile.name);
    }
    const response = await sellerSignup(formData);
    if (!response.data.error) {
      navigate("/admin/seller-management");
    }
  };
  const onFileSelection = (event) => {
    let file = event[0];

    if (file && file.size < 2880) {
      toast.error("Minimum File size should be 1MB.");
      return;
    } else if (file && file.size > 5242880) {
      toast.error("File size exceeded. Max size should be 5MB.");
      return;
    } else {
      // Update the state
      setSelectedFile(event[0]);
    }
  };

  return (
    <>
      <AdminHeader sideBarValue={sideBarValue} sideBar={sideBar} />
      <div class="content-wrapper d-flex">
        <aside class="main-sidebar">
          <SideBar sideBar={sideBar} />
        </aside>

        <div
          class={sideBar ? "admin-content" : "admin-content admin-content-mini"}
        >
          <div class="content-header sty-one tooltippp ">
            <h1 className="d-flex justify-content-between py-2">
              Sellers Management
            </h1>
          </div>

          <div class="">
            <section className="Account_settng_page py-4">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 mb-lg-0 mb-md-4 mb-4 m-auto">
                    <div className="add_business_box box_design">
                      <div className="row">
                        <div className="col-12 Product_heading mb-md-3 mb-2">
                          <h2>Profile</h2>
                        </div>
                        <div className="col-12">
                          <form
                            className="row add_business_form"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div className="form-group col-12 mb-md-3 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2 pe-0">
                                  <label className="mb-0 form_tag">
                                    Upload Image
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <ImageUploader
                                    withIcon={true}
                                    withPreview={true}
                                    buttonText={
                                      <i className="fa fa-camera"></i>
                                    }
                                    onChange={(e) => onFileSelection(e)}
                                    imgExtension={[
                                      ".jpg",
                                      ".jpeg",
                                      ".gif",
                                      ".png",
                                    ]}
                                    maxFileSize={5242880}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Business Trading Name
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
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
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">ABN</label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="abn"
                                    name="abn"
                                    {...register("abn", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.business_trading_name && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Entity Name
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
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
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Address
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="address_line1"
                                    name="address_line1"
                                    {...register("address_line1", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.address_line1 && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>{" "}
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2"></div>
                                <div className="col-auto d-md-block d-none"></div>
                                <div
                                  className="col"
                                  style={{ marginLeft: "3px" }}
                                >
                                  <input
                                    className="form-control "
                                    type="text"
                                    id="address_line2"
                                    name="address_line2"
                                    {...register("address_line2", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.address_line2 && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>{" "}
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Phone Number
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="phone_number"
                                    name="phone_number"
                                    {...register("phone_number", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.phone_number && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Your Market
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    id="market"
                                    name="market"
                                    {...register("market", {
                                      required: true,
                                    })}
                                  >
                                    <option value="">Select</option>
                                    <option value="Sydney Produce and Growers Market">
                                      Sydney Produce and Growers Market
                                    </option>
                                    <option value="Sydney Flower Market">
                                      Sydney Flower Market
                                    </option>
                                  </select>
                                  {errors?.market && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Stall Location/Number
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="stall_location"
                                    name="stall_location"
                                    {...register("stall_location", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.stall_location && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Is your business part of SMCS? (Sydney
                                    Market Credit Service)
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
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
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    SMCS Code
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="smcs_code"
                                    name="smcs_code"
                                    {...register("smcs_code", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.smcs_code && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Email Address
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    {...register("email", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.email && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Password
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                    {...register("password", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.password && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-md-2 mb-3">
                              <div className="row align-items-center">
                                <div className="col-md-5 mb-md-0 mb-2">
                                  <label className="mb-0 form_tag">
                                    Confirm Password
                                  </label>
                                </div>
                                <div className="col-auto d-md-block d-none">
                                  <span className="text-white">:</span>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-control"
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    {...register("confirm_password", {
                                      required: true,
                                    })}
                                  />
                                  {errors?.confirm_password && (
                                    <p className="form-error mt-2">
                                      This field is required
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mt-md-4 mt-3">
                              <div className="row justify-content-center">
                                <div className="col-xl-4 col-lg-6 col-md-4">
                                  <button className="custom_btns" type="submit">
                                    Save Changes
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSeller;
