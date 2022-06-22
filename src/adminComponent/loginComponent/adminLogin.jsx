import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../apiServices/adminApiHandler/adminLoginApiHandler";

function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);

    const response = await adminLogin(data);
    if (!response.data.error) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <section className="login_page">
        <div className="container">
          <div className="row justify-content-xl-start justify-content-md-center justify-content-center">
            <div className="col-xl-5 col-lg-8 col-md-8 text-xl-start text-lg-center text-md-center text-center">
              <Link className="login_logo" to="">
                <img src="../assets/img/logo.png" alt="LOGO" />
              </Link>
              <div className="login_page_form row justify-content-xl-start justify-content-md-center justify-content-center">
                <div className="col-12 loging_head">
                  <h1>Login for Admin Panel</h1>
                  <span>Please enter your email and password</span>
                </div>
                <div className="col-lg-10 col-md-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="User@gmail.com"
                        name="email"
                        id="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                    {errors?.email && (
                      <p className="form-error">This field is required</p>
                    )}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        id="password"
                        {...register("password", { required: true })}
                      />
                    </div>
                    {errors?.password && (
                      <p className="form-error">This field is required</p>
                    )}
                    <div className="form-group">
                      <label>
                        <Link to="/admin/forgot-password">
                          Forgot Password?
                        </Link>
                      </label>
                      <button className="btn_comman" type="submit">
                        {" "}
                        Login <img src="../assets/img/arrow.png" alt="Arrow" />
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

export default AdminLogin;
