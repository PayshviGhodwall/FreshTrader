import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { updateSellerInfo3 } from "../../apiServices/sellerApiHandler/settingApiHandler";

function AccountSettingForm3() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [thermal, setThermal] = useState("");
  const [a4, setA4] = useState("");
  const [receipt, setReceipt] = useState(false);
  const [isA4, setIsA4] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("thermal_receipt_invoice_logo", thermal);
    formData.append("a4_invoice_logo", a4);
    formData.append("receipt", receipt);
    formData.append("a4", isA4);
    formData.append("include_food_saftey_logo", data.include_food_saftey_logo);
    console.log(data.thermal_receipt_invoice_logo);

    const response = await updateSellerInfo3(formData);
    if (!response.data.error) {
    }
  };

  const getValue = (e, index) => {
    console.log(e.target.files[0]);
    if (index === 1) {
      setThermal(e.target.files[0]);
      setReceipt(true);
    } else {
      setA4(e.target.files[0]);
      setIsA4(true);
    }
  };

  const [data, setData] = useState("");

  useEffect(() => {
    getsellerInfo();
  }, []);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();

    if (!data.error) {
      setData(data.results.seller);
      setThermal({
        name: data.results.seller.thermal_receipt_invoice_logo.split("/")[4],
      });
      setA4({ name: data.results.seller.a4_invoice_logo.split("/")[4] });
      console.log(
        data.results.seller.thermal_receipt_invoice_logo.split("/")[4]
      );

      let defaultValues = {};
      defaultValues.include_food_saftey_logo =
        data.results.seller.include_food_saftey_logo;

      reset({ ...defaultValues });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 Product_heading mb-md-3 mb-2">
          <h2>Receipt & Invoice Settings</h2>
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
                    Thermal Receipt Invoice Logo
                    <br />
                    (Black & White Logo)
                  </label>
                </div>
                <div className="col-auto d-md-block d-none">
                  <span className="text-white">:</span>
                </div>
                <div className="col-md-6">
                  <label
                    className="upload_file"
                    for="thermal_receipt_invoice_logo"
                  >
                    <div className="upload_main">
                      <img src="assets/img/upload.png" alt="" />
                      {thermal ? (
                        <span>{thermal.name}</span>
                      ) : (
                        <span>Upload</span>
                      )}
                    </div>
                  </label>
                  <input
                    className="form-control d-none"
                    type="file"
                    id="thermal_receipt_invoice_logo"
                    name="thermal_receipt_invoice_logo"
                    onChange={(e) => getValue(e, 1)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-12 mb-md-3 mb-3">
              <div className="row align-items-center">
                <div className="col-md-5 mb-md-0 mb-2 pe-0">
                  <label className="mb-0 form_tag">
                    A4 Invoice Logo
                    <br />
                    (Color Logo)
                  </label>
                </div>
                <div className="col-auto d-md-block d-none">
                  <span className="text-white">:</span>
                </div>
                <div className="col-md-6">
                  <label className="upload_file" for="a4_invoice_logo">
                    <div className="upload_main">
                      <img src="assets/img/upload.png" alt="" />
                      {a4 ? <span>{a4.name}</span> : <span>Upload</span>}
                    </div>
                  </label>
                  <input
                    className="form-control d-none"
                    type="file"
                    id="a4_invoice_logo"
                    name="a4_invoice_logo"
                    onChange={(e) => getValue(e, 2)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group col-12 mb-md-3 mb-3">
              <div className="row align-items-center">
                <div className="col-md-5 mb-md-0 mb-2 pe-0">
                  <label className="mb-0 form_tag">
                    Include Food Sefety Logo
                    <br />
                    (SCI Qual)
                  </label>
                </div>
                <div className="col-auto d-md-block d-none">
                  <span className="text-white">:</span>
                </div>
                <div className="col-md-6">
                  <div className="Toggle_chekbox Toggle_chekbox_design">
                    <input
                      className="d-none"
                      type="checkbox"
                      id="include_food_saftey_logo"
                      name="include_food_saftey_logo"
                      {...register("include_food_saftey_logo", {
                        required: true,
                      })}
                      checked={data.include_food_saftey_logo}
                    />
                    <label for="include_food_saftey_logo"></label>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="custom_btns mx-auto"
              type="submit"
              style={{ width: "30%" }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountSettingForm3;
