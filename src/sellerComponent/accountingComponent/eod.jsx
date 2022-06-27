import React, { useEffect, useState } from "react";
import { getEndOfDayReport } from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";

function Eod() {
  const [data, setData] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    eodReport();
  }, []);

  const eodReport = async () => {
    const { data } = await getEndOfDayReport({ date });
    if (!data.error) {
      setData(data.results.report);
    }
  };

  const onChange = () => {
    setDate(document.getElementById("date").value);
    console.log(date);
  };

  return (
    <>
      <Header />
      <section class="end_day_page py-md-5 py-4">
        <div class="container py-md-4">
          <div class="row justify-content-center">
            <div class="col-xl-4 col-lg-6 col-md-8">
              <div class="row date_select mb-4">
                <div class="col form-group select_date pe-0">
                  <input
                    class="form-control"
                    type="date"
                    name="date"
                    id="date"
                    onChange={() => onChange()}
                  />
                </div>
                <div class="form-group col-auto ps-0">
                  <button
                    class="product_comman_btn border-0"
                    onClick={() => eodReport()}
                  >
                    Select date
                  </button>
                </div>
              </div>
              <div class="end_day_box box_design">
                <div class="row">
                  <div class="col-12 mb-4">
                    <strong class="head_day">Statistics</strong>
                  </div>
                  <div class="col-12 my-2">
                    <div class="row">
                      <div class="col-md-6">
                        <span>#Unit Sold</span>
                      </div>
                      <div class="col-auto">
                        <span>:</span>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <span>{data.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 my-2">
                    <div class="row">
                      <div class="col-md-6">
                        <span>Total Sales($)</span>
                      </div>
                      <div class="col-auto">
                        <span>:</span>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <span>{data.sales}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 my-2">
                    <div class="row">
                      <div class="col-md-6">
                        <span>#Unit Refunded</span>
                      </div>
                      <div class="col-auto">
                        <span>:</span>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <span>{data.credit_quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 my-2">
                    <div class="row">
                      <div class="col-md-6">
                        <span>Total Credits($)</span>
                      </div>
                      <div class="col-auto">
                        <span>:</span>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <span>{data.credit}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 my-2">
                    <div class="row">
                      <div class="col-md-6">
                        <span>Gross Sales</span>
                      </div>
                      <div class="col-auto">
                        <span>:</span>
                      </div>
                      <div class="col d-flex justify-content-center">
                        <span>{data.gross}</span>
                      </div>
                    </div>
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

export default Eod;
