import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { buyerLogin } from "../apiServices/buyerApiHandler/buyerLoginApiHandler";

function BuyerLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await buyerLogin(data);
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
                  <Link class="back-btn" to="/buyer/welcome-screen">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    Buyer Login
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
                      autoComplete="off"
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
                      autoComplete="off"
                      {...register("password", { required: true })}
                    />
                    {errors?.password && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
                  </div>

                  <div class="form-group col-12">
                    <div class="row justify-content-center">
                      <div class="col-12 mb-3">
                        <button type="submit" class="btn_comman btn_green">
                          Login
                        </button>
                      </div>
                      <div class="col-12 text-center">
                        <p class="mb-0">
                          Don't have any account?{" "}
                          <Link to="/buyer/signup">Signup</Link>
                        </p>
                      </div>
                    </div>
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

export default BuyerLogin;
