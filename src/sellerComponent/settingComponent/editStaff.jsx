import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addNewBusiness } from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import Header from "../commonComponent/header";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  addStaff,
  getStaffDetail,
  updateStaff,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import { toast } from "react-toastify";

function EditStaff() {
  const [access, setAccess] = useState([]);
  const [staff, setStaff] = useState("");

  let { id } = useParams();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!access.length) {
      toast.error("Please Select Access");
      return;
    }

    if (data.password !== data.confirm_password) {
      toast.error("Password & Confirm Password should be same");
      return;
    }

    data.access = access;
    data.staffId = id;

    const response = await updateStaff(data);
    if (!response.data.error) {
      navigate("/staff");
    }
  };

  const onChange = async (value, type) => {
    let updatedAccess = [...access];
    console.log(value, type);

    if (value === true) {
      updatedAccess.push(type);
    } else updatedAccess = updatedAccess.filter((item) => type !== item);
    console.log(updatedAccess);
    setAccess(updatedAccess);
  };

  useEffect(() => {
    getstaffInfo();
  }, []);

  const getstaffInfo = async () => {
    const { data } = await getStaffDetail(id);

    if (!data.error) {
      setStaff(data.results.staff);
      let defaultValues = {};
      defaultValues.username = data.results.staff.username;
      defaultValues.first_name = data.results.staff.first_name;
      defaultValues.last_name = data.results.staff.last_name;
      defaultValues.phone_number = data.results.staff.phone_number;
      defaultValues.address_line2 = data.results.staff.address_line2;
      defaultValues.phone_number = data.results.staff.phone_number;

      reset({ ...defaultValues });
      setAccess(data.results.staff.access);
    }
  };
  if (!staff) return null;
  return (
    <>
      <Header />
      <section class="staff_account py-md-3 py-4">
        <div class="container py-md-3">
          <div class="row">
            <div class="col-lg-6 mb-lg-0 mb-md-4 mb-4">
              <div class="add_business_box box_design">
                <div class="row">
                  <div class="col-12 Product_heading mb-md-3 mb-2">
                    <h2>Edit Staff Account</h2>
                  </div>
                  <div class="col-12">
                    <form
                      class="row add_business_form"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Username</label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="text"
                              id="username"
                              name="username"
                              {...register("username", {
                                required: true,
                              })}
                            />
                            {errors?.username && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Password</label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="password"
                              id="password"
                              name="password"
                              {...register("password", {
                                required: false,
                              })}
                            />
                            {errors?.password && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">
                              Confirm Password
                            </label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="password"
                              id="confirm_password"
                              name="confirm_password"
                              {...register("confirm_password", {
                                required: false,
                              })}
                            />
                            {errors?.confirm_password && (
                              <p className="form-error mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 Product_heading mb-md-3 mb-2 mt-5">
                        <h2>User Informations(Optional)</h2>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">First Name</label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="text"
                              id="first_name"
                              name="first_name"
                              {...register("first_name", {
                                required: false,
                              })}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Last Name</label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="text"
                              id="last_name"
                              name="last_name"
                              {...register("last_name", {
                                required: false,
                              })}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mb-md-2 mb-3">
                        <div class="row align-items-center">
                          <div class="col-md-5 mb-md-0 mb-2">
                            <label class="mb-0 form_tag">Phone Number</label>
                          </div>
                          <div class="col-auto d-md-block d-none">
                            <span class="text-white">:</span>
                          </div>
                          <div class="col">
                            <input
                              class="form-control"
                              type="number"
                              id="phone_number"
                              name="phone_number"
                              {...register("phone_number", {
                                required: false,
                              })}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-12 mt-md-4 mt-3">
                        <div class="row justify-content-center">
                          <div class="col-auto">
                            <button class="custom_btns" type="submit">
                              Update Staff Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="add_business_box box_design">
                <div class="row">
                  <div class="col-12 Product_heading mb-md-3 mb-2">
                    <h2>Access</h2>
                  </div>
                  <div class="col-12">
                    <form class="row add_business_form">
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check1"
                          name="check1"
                          checked={access.includes(1)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check1").checked,
                              1
                            )
                          }
                        />
                        <label for="check1">Today's Sale & Purchase</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check2"
                          name="check2"
                          checked={access.includes(2)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check2").checked,
                              2
                            )
                          }
                        />
                        <label for="check2">Input New Sale</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check3"
                          name="check3"
                          checked={access.includes(3)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check3").checked,
                              3
                            )
                          }
                        />
                        <label for="check3">Input Business Sale</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check4"
                          name="check4"
                          checked={access.includes(4)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check4").checked,
                              4
                            )
                          }
                        />
                        <label for="check4">Profile</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check5"
                          name="check5"
                          checked={access.includes(5)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check5").checked,
                              5
                            )
                          }
                        />
                        <label for="check5">Add/Disable/Edit Product</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check6"
                          name="check6"
                          checked={access.includes(6)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check6").checked,
                              6
                            )
                          }
                        />
                        <label for="check6">Add Adjust Price</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check7"
                          name="check7"
                          checked={access.includes(7)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check7").checked,
                              7
                            )
                          }
                        />
                        <label for="check7">Inventory</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check8"
                          name="check8"
                          checked={access.includes(8)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check8").checked,
                              8
                            )
                          }
                        />
                        <label for="check8">Accounting</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check9"
                          name="check9"
                          checked={access.includes(9)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check9").checked,
                              9
                            )
                          }
                        />
                        <label for="check9">Pallets</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check10"
                          name="check10"
                          checked={access.includes(10)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check10").checked,
                              10
                            )
                          }
                        />
                        <label for="check10">Receipt & Invoice Settings</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check11"
                          name="check11"
                          checked={access.includes(11)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check11").checked,
                              11
                            )
                          }
                        />
                        <label for="check11">Purchases</label>
                      </div>
                      <div class="form-group col-md-4 mb-4 account_checkbox">
                        <input
                          class="d-none"
                          type="checkbox"
                          id="check12"
                          name="check12"
                          checked={access.includes(12)}
                          onChange={() =>
                            onChange(
                              document.getElementById("check12").checked,
                              12
                            )
                          }
                        />
                        <label for="check12">Build Pos Layout</label>
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

export default EditStaff;
