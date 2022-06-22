import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  updatePassword,
} from "../../apiServices/adminApiHandler/adminLoginApiHandler";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function AdminResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Password & Confirm Password should be same");
      return;
    }
    console.log(data);
    const formData = {
      email: location.state.email,
      password: data.password,
    };

    const response = await updatePassword(formData);
    if (!response.data.error) {
      navigate("/admin/login");
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
                  <h1>Reset Password</h1>
                  <span>Enter New Password</span>
                </div>
                <div class="col-lg-10 col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="New Password"
                        name="password"
                        id="password"
                        {...register("password", { required: true })}
                      />
                    </div>
                    {errors?.password && (
                      <p className="form-error">This field is required</p>
                    )}
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm New Password"
                        name="confirmpassword"
                        id="confirmpassword"
                        {...register("confirmpassword", { required: true })}
                      />
                    </div>
                    {errors?.confirmpassword && (
                      <p className="form-error">This field is required</p>
                    )}
                    <div class="form-group">
                      <button class="btn_comman mt-3" type="submit">
                        {" "}
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

export default AdminResetPassword;
