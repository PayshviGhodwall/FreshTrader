import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  verifyOTP,
} from "../../apiServices/adminApiHandler/adminLoginApiHandler";
import { useLocation } from "react-router-dom";

function AdminOtp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    let otp = Object.values(data);

    otp = otp.join("");

    const formData = {
      email: location.state.email,
      otp: otp,
    };

    const response = await verifyOTP(formData);
    if (!response.data.error) {
      navigate("/admin/reset-password", {
        state: { email: location.state.email },
      });
    }
  };

  return (
    <>
      <section class="login_page">
        <div class="container">
          <div class="row justify-content-xl-start justify-content-md-center justify-content-center">
            <div class="col-xl-5 col-lg-8 col-md-8 text-xl-start text-lg-center text-md-center text-center">
              <a class="login_logo" href="javascript:;">
                <img src="../assets/img/logo.png" alt="LOGO" />
              </a>
              <div class="login_page_form row justify-content-xl-start justify-content-md-center justify-content-center mt-5">
                <div class="col-12 loging_head">
                  <h1>Verification</h1>
                  <span>
                    Please enter the OTP received on your Email Address{" "}
                  </span>
                </div>
                <div class="col-lg-10 col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group verification_input">
                      <input
                        type="number"
                        class="form-control px-1 text-center"
                        maxlength="1"
                        placeholder=""
                        name="otp1"
                        id="otp1"
                        {...register("otp1", { required: true })}
                      />
                      <input
                        type="number"
                        class="form-control px-1 text-center"
                        maxlength="1"
                        placeholder=""
                        name="otp2"
                        id="otp2"
                        {...register("otp2", { required: true })}
                      />
                      <input
                        type="number"
                        class="form-control px-1 text-center"
                        maxlength="1"
                        placeholder=""
                        name="otp3"
                        id="otp3"
                        {...register("otp3", { required: true })}
                      />
                      <input
                        type="number"
                        class="form-control px-1 text-center"
                        maxlength="1"
                        placeholder=""
                        name="otp4"
                        id="otp4"
                        {...register("otp4", { required: true })}
                      />
                    </div>

                    <div class="form-group">
                      <label>
                        Didn't received the OTP?{" "}
                        <a class="" href="javscript:;">
                          Request again
                        </a>
                      </label>
                      <button class="btn_comman" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminOtp;
