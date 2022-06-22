import React from "react";
import { Link } from "react-router-dom";
import Header from "../commonComponent/header";

function ResendOffer() {
  return (
    <>
      <Header />{" "}
      <section class="similler_order">
        <div class="container">
          <div class="row py-3 align-items-start">
            <div class="col-md-auto mb-md-0 mb-2">
              <a class="product_comman_btn m-0" href="javascript:;">
                <img src="assets/img/arrow-left-line.png" alt="Back" />
                Back
              </a>
            </div>
            <div class="col">
              <div class="order_top_mains">
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Order Date</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>26/04/2022</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Buyer</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>26/04/2022</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Phone</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>26/04/2022</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Notes</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>May Be a Bit Late</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Pickup Date</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>Monday (26/04/2022)</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Pickup Time</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>26/04/2022</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Trans Type</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>26/04/2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="similler_order_table comman_table_design">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th>Veriety</th>
                    <th>Type</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                    <th>Delete Product</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apple</td>
                    <td>Granny Smith</td>
                    <td>12Kg CTN</td>
                    <td>
                      <input
                        class="consiment_data_box"
                        type="text"
                        value="12"
                        id=""
                        name=""
                      />
                    </td>
                    <td>
                      <a class="icon_design" href="javscript:;">
                        <img src="assets/img/delete_white.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Apple</td>
                    <td>Granny Smith</td>
                    <td>12Kg CTN</td>
                    <td>
                      <input
                        class="consiment_data_box"
                        type="text"
                        value="12"
                        id=""
                        name=""
                      />
                    </td>
                    <td>
                      <a class="icon_design" href="javscript:;">
                        <img src="assets/img/delete_white.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Apple</td>
                    <td>Granny Smith</td>
                    <td>12Kg CTN</td>
                    <td>
                      <input
                        class="consiment_data_box"
                        type="text"
                        value="12"
                        id=""
                        name=""
                      />
                    </td>
                    <td>
                      <a class="icon_design" href="javscript:;">
                        <img src="assets/img/delete_white.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Apple</td>
                    <td>Granny Smith</td>
                    <td>12Kg CTN</td>
                    <td>
                      <input
                        class="consiment_data_box"
                        type="text"
                        value="12"
                        id=""
                        name=""
                      />
                    </td>
                    <td>
                      <a class="icon_design" href="javscript:;">
                        <img src="assets/img/delete_white.png" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Apple</td>
                    <td>Granny Smith</td>
                    <td>12Kg CTN</td>
                    <td>
                      <input
                        class="consiment_data_box"
                        type="text"
                        value="12"
                        id=""
                        name=""
                      />
                    </td>
                    <td>
                      <a class="icon_design" href="javscript:;">
                        <img src="assets/img/delete_white.png" alt="" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="row justify-content-center py-4">
            <div class="col-auto text-center">
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to="/counter-offer"
              >
                Resend Offer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResendOffer;
