import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import {
  getStaffDetail,
  updateSellerInfo2,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";
import AccountSettingForm3 from "./accountSettingForm3";

function AccountSettingForm2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [data, setData] = useState("");
  const [staff, setStaff] = useState("");

  useEffect(() => {
    getsellerInfo();
    if (localStorage.getItem("staff")) getstaffInfo();
  }, []);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();

    if (!data.error) {
      setData(data.results.seller);
      let defaultValues = {};
      defaultValues.account_name = data.results.seller.account_name;
      defaultValues.bsb = data.results.seller.bsb;
      defaultValues.account = data.results.seller.account;
      defaultValues.sales_invoice_due_date =
        data.results.seller.sales_invoice_due_date;
      defaultValues.csv = data.results.seller.csv
        ? data.results.seller.csv
        : "";

      reset({ ...defaultValues });
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const response = await updateSellerInfo2(data);
    if (!response.data.error) {
      await getsellerInfo();
    }
  };
  const getstaffInfo = async () => {
    console.log(localStorage.getItem("staff"));
    const { data } = await getStaffDetail(localStorage.getItem("staff"));
    if (!data.error) {
      setStaff(data.results.staff);
    }
  };

  return (
    <>
      <div className="col-lg-6">
        <div className="add_business_box box_design">
          <div className="row mb-5">
            <div className="col-12 Product_heading mb-md-3 mb-2">
              <h2>Acount Informations</h2>
            </div>
            <div className="col-12">
              <form
                className="row add_business_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group col-12 mb-md-2 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-5 mb-md-0 mb-2">
                      <label className="mb-0 form_tag">Acount Name</label>
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">:</span>
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        id="account_name"
                        name="account_name"
                        {...register("account_name", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-md-2 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-5 mb-md-0 mb-2">
                      <label className="mb-0 form_tag">BSB</label>
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">:</span>
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="number"
                        id="bsb"
                        name="bsb"
                        {...register("bsb", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-md-2 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-5 mb-md-0 mb-2">
                      <label className="mb-0 form_tag">Account</label>
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">:</span>
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="number"
                        id="account"
                        name="account"
                        {...register("account", {
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
                        Sales Invoice Due Date
                      </label>
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">:</span>
                    </div>
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        type="number"
                        id="sales_invoice_due_date"
                        name="sales_invoice_due_date"
                        {...register("sales_invoice_due_date", {
                          required: true,
                        })}
                      />
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">Days Letter</span>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-md-2 mb-3">
                  <div className="row align-items-center">
                    <div className="col-md-5 mb-md-0 mb-2">
                      <label className="mb-0 form_tag">CSV Format</label>
                    </div>
                    <div className="col-auto d-md-block d-none">
                      <span className="text-white">:</span>
                    </div>
                    <div className="col">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        id="csv"
                        name="csv"
                        {...register("csv", {
                          required: true,
                        })}
                      >
                        <option value="">Select</option>
                        <option value="Xero">Xero</option>
                        <option value="MYOB">MYOB</option>
                        <option value="Saasu">Saasu</option>
                        <option value="Quickbooks">Quickbooks</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mt-md-4 mt-3">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <button className="custom_btns" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {staff?.access?.includes(10) || !staff ? <AccountSettingForm3 /> : ""}
        </div>
      </div>
    </>
  );
}

export default AccountSettingForm2;
