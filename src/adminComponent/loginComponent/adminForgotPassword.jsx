import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../apiServices/adminApiHandler/adminLoginApiHandler";

function AdminForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);

    const response = await forgotPassword(data);
    if (!response.data.error) {
      navigate("/admin/otp-screen", { state: { email: data.email } });
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
                  <h1>Forgot Password</h1>
                  <span>
                    Please enter your registered Email Address to receive the
                    OTP
                  </span>
                </div>
                <div class="col-lg-10 col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email Address"
                        name="email"
                        id="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                    {errors?.email && (
                      <p className="form-error">This field is required</p>
                    )}
                    <div class="form-group">
                      <button class="btn_comman mt-3" type="submit">
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

export default AdminForgotPassword;
