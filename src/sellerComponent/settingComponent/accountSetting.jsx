import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import {
  updateOrderSetting,
  updateSellerInfo,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";
import AccountSettingForm2 from "./accountSettingForm2";

function AccountSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [data, setData] = useState("");
  const [publicOrdering, setPublicOrdering] = useState("");
  const [publishPrice, setPublishPrice] = useState("");

  useEffect(() => {
    getsellerInfo();
  }, []);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();

    if (!data.error) {
      setData(data.results.seller);
      let defaultValues = {};
      defaultValues.business_trading_name =
        data.results.seller.business_trading_name;
      defaultValues.abn = data.results.seller.abn;
      defaultValues.entity_name = data.results.seller.entity_name;
      defaultValues.address_line1 = data.results.seller.address_line1;
      defaultValues.address_line2 = data.results.seller.address_line2;
      defaultValues.phone_number = data.results.seller.phone_number;
      defaultValues.market = data.results.seller.market;
      defaultValues.stall_location = data.results.seller.stall_location;
      defaultValues.smcs_code = data.results.seller.smcs_code;

      reset({ ...defaultValues });
      setPublicOrdering(data.results.seller.public_ordering);
      setPublishPrice(data.results.seller.publish_prices);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await updateSellerInfo(data);
    if (!response.data.error) {
      await getsellerInfo();
    }
  };
  const orders_setting = async (type) => {
    if (type === 1) setPublicOrdering(!publicOrdering);
    else setPublishPrice(!publishPrice);

    const formData = {
      public_ordering: type === 1 ? !publicOrdering : publicOrdering,
      publish_prices: type === 2 ? !publishPrice : publishPrice,
    };
    const response = await updateOrderSetting(formData);
    if (!response.data.error) {
      await getsellerInfo();
    }
  };

  return (
    <>
      <Header />{" "}
      <section className="Account_settng_page py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-lg-0 mb-md-4 mb-4">
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
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">Entity Name</label>
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
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">Address</label>
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
                          </div>{" "}
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2"></div>
                          <div className="col-auto d-md-block d-none"></div>
                          <div className="col" style={{ marginLeft: "3px" }}>
                            <input
                              className="form-control "
                              type="text"
                              id="address_line2"
                              name="address_line2"
                              {...register("address_line2", {
                                required: true,
                              })}
                            />
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
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">Your Market</label>
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
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">SMCS Code</label>
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
                              type="text"
                              id="email"
                              name="email"
                              value={data.email}
                              disabled={true}
                              style={{ background: "#8f969e" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-2 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">Password</label>
                          </div>
                          <div className="col-auto d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col">
                            <input
                              className="form-control"
                              type="text"
                              id="password"
                              name="password"
                            />
                          </div>
                          <div className="col-md-2 col-auto ps-0">
                            <button
                              className="custom_btns change_btn"
                              type="submit"
                            >
                              Change
                            </button>
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
              <div className="add_business_box box_design mt-4">
                <div className="row">
                  <div className="col-12 Product_heading  ">
                    <h2>Orders</h2>
                  </div>
                  <div className="col-12">
                    <div className="row add_business_form">
                      <div className="form-group col-12 mb-md-2  mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Public Ordering
                            </label>
                          </div>
                          <div className="col-auto d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col">
                            <div className="Toggle_chekbox Toggle_chekbox_design mt-2">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="public_ordering"
                                name="public_ordering"
                                onChange={() => orders_setting(1)}
                                checked={publicOrdering}
                              />
                              <label for="public_ordering"> </label>
                            </div>
                            <span className="orders_setting">
                              Anyone can order from you, not just your partnered
                              buyers
                            </span>
                          </div>
                        </div>
                        <div className="row align-items-center mt-2">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Publish Prices
                            </label>
                          </div>
                          <div className="col-auto d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col">
                            <div className="Toggle_chekbox Toggle_chekbox_design mt-2">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="publish_prices"
                                name="publish_prices"
                                onChange={() => orders_setting(2)}
                                checked={publishPrice}
                              />
                              <label for="publish_prices"></label>
                            </div>
                            <span className="orders_setting">
                              Your prices will be published next your products
                              to give price estimates
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AccountSettingForm2 />
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountSetting;
