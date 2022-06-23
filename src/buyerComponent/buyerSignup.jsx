import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  buyerLogin,
  buyerSignup,
} from "../apiServices/buyerApiHandler/buyerLoginApiHandler";

function BuyerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await buyerSignup(data);
    if (!response.data.error) {
      navigate("/buyer/faq-screen");
    }
  };

  return (
    <>
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/welcome">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    Buyer Signup
                  </a>
                </div>
                <div class="col-auto">
                  <a class="invisible back-btn" href="javscript:;">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </a>
                </div>
              </div>
            </header>
            <div class="freshtrader_body">
              <div class="freshtrader_body_inner">
                <p>
                  Make Sure your account email is the same as the email your
                  seller have for you in their customer file. Otherwise, you
                  will not be able to order from them or view your transaction
                  from them.
                </p>
                <form
                  class="sign-up-form row pt-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div class="form-group col-12 mb-4">
                    <label class="content-label" for="email">
                      Email Address/Log In
                    </label>
                    <input
                      class="buyer-form-control"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                    {errors?.email && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
                  </div>
                  <div class="form-group col-12 mb-4">
                    <label class="content-label" for="password">
                      Password
                    </label>
                    <input
                      class="buyer-form-control"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors?.password && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
                  </div>
                  <div class="form-group col-12 mb-4">
                    <label class="content-label" for="password">
                      Confirm Password
                    </label>
                    <input
                      class="buyer-form-control"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="form-group col-12 mb-4">
                    <label class="content-label" for="number">
                      Phone Number
                    </label>
                    <input
                      class="buyer-form-control"
                      type="number"
                      name="phone_number"
                      id="phone_number"
                      placeholder="7357835675"
                      {...register("phone_number", { required: true })}
                    />
                    {errors?.phone_number && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
                  </div>
                  <div class="form-group col-12 mb-4">
                    <label class="content-label" for="business">
                      Business Tranding Name
                    </label>
                    <input
                      class="buyer-form-control"
                      type="text"
                      name="business_trading_name"
                      id="business_trading_name"
                      placeholder="Business Tranding Name"
                      {...register("business_trading_name", { required: true })}
                    />
                    {errors?.business_trading_name && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
                  </div>
                  <div class="form-group col-12 mb-4 custom_check_outer">
                    <label class="content-label">
                      Is Your Business part of SMCS?
                    </label>
                    <span>(Sydney Market Credit Service)</span>
                    <div class="row mt-3">
                      <div class="form-group col-auto custom_checkbox">
                        <input
                          type="radio"
                          id="check1"
                          name="is_smcs"
                          value="Yes"
                          {...register("is_smcs", { required: true })}
                        />
                        <label for="check1">Yes</label>

                        {errors?.is_smcs && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div class="form-group col-auto custom_checkbox">
                        <input
                          type="radio"
                          id="check2"
                          name="is_smcs"
                          value="No"
                        />
                        <label for="check2">No</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-12 mb-4 mt-3">
                    <label class="content-label">Your Plan :</label>
                    <p>
                      Make Sure your account email is the same as the email your
                      seller have for you in their customer file. Otherwise, you
                      will not be able to order from them or view your
                      transaction from them.
                    </p>
                  </div>
                  <div class="form-group col-12 mb-4">
                    <div class="row">
                      <div class="form-group col-4 pe-1 box_checkbox">
                        <input
                          type="radio"
                          class="d-none"
                          id="checks1"
                          name="market"
                          value="Free"
                          {...register("market", { required: true })}
                        />
                        <label for="checks1">
                          <span>
                            <img src="../assets/img/check1.png" alt="" />
                          </span>
                          Free
                        </label>
                        {errors?.market && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div class="form-group col-4 px-1 box_checkbox">
                        <input
                          type="radio"
                          class="d-none"
                          id="checks2"
                          name="market"
                          value="Small Business
                          "
                          {...register("market", { required: true })}
                        />
                        <label for="checks2">
                          <span>
                            <img src="../assets/img/check2.png" alt="" />
                          </span>
                          Small Business
                        </label>
                      </div>
                      <div class="form-group col-4 ps-1 box_checkbox">
                        <input
                          type="radio"
                          checked
                          class="d-none"
                          id="checks3"
                          name="market"
                          value="Enterprise"
                          {...register("market", { required: true })}
                        />
                        <label for="checks3">
                          <span>
                            <img src="../assets/img/check3.png" alt="" />
                          </span>
                          Enterprise
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-12">
                    <button class="btn_comman btn_green" type="submit">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerSignup;
