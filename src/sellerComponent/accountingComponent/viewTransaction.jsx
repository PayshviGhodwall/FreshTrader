import React, { useEffect } from "react";
import { useState } from "react";
import {
  emailTransactionToBuyer,
  getTransactionDetail,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

function ViewTransaction() {
  const [transactionDetail, setTransactionDetail] = useState("");

  let { id } = useParams();

  useEffect(() => {
    getTransDetail();
  }, []);

  const getTransDetail = async () => {
    const { data } = await getTransactionDetail(id);
    if (!data.error) {
      setTransactionDetail(data.results.transaction);
    }
  };
  const emailInvoice = async () => {
    const { data } = await emailTransactionToBuyer(id);
    if (!data.error) {
    }
  };

  return (
    <>
      <Header />
      <section class="View_transactions py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 bg-white rounded">
              <div class="row p-4">
                <div class="col-12 View_transactions_headeer mb-5">
                  <div class="row align-items-center">
                    <div class="col-lg-12 d-flex justify-content-between">
                      <div class="transaction_id">
                        <h2>
                          {transactionDetail.type} #{transactionDetail.ref}
                        </h2>
                      </div>
                      <div class="user_logo_img">
                        {transactionDetail?.seller?.include_food_saftey_logo ? (
                          <img
                            src="../assets/img/image (6).png"
                            alt=""
                            className="include_food_saftey_logo"
                          />
                        ) : (
                          ""
                        )}

                        <img
                          src={`${process.env.REACT_APP_APIENDPOINTNEW}${transactionDetail?.seller?.thermal_receipt_invoice_logo}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 View_transactions_top mb-5">
                  <div class="row justify-content-center align-items-center">
                    <div class="col-lg-6 text-start">
                      <div class="transactions_top_left">
                        <strong>To: </strong>
                        <h2>
                          {transactionDetail?.buyer?.business_trading_name}
                        </h2>
                        <p>{transactionDetail?.buyer?.address}</p>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="row transactions_top_right">
                        <div class="col-md-6 mb-1">
                          <strong class="invoice_head">Invoice Date :</strong>
                          <span class="invoice_info">
                            {moment(transactionDetail.createdAt).format("LL")}
                          </span>
                        </div>
                        {transactionDetail.due_date ? (
                          <div class="col-md-6 mb-1">
                            <strong class="invoice_head">Due Date :</strong>
                            <span class="invoice_info">
                              {moment(transactionDetail.due_date).format("LL")}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <div class="col-md-6 mb-1">
                          <strong class="invoice_head">ABN :</strong>
                          <span class="invoice_info">
                            {transactionDetail?.seller?.abn}
                          </span>
                        </div>
                        <div class="col-md-6 mb-1">
                          <strong class="invoice_head">Phone Number :</strong>
                          <span class="invoice_info">
                            {" "}
                            {transactionDetail?.seller?.phone_number}
                          </span>
                        </div>
                        <div class="col-md-6 mb-1">
                          <strong class="invoice_head">Email :</strong>
                          <span class="invoice_info">
                            {transactionDetail?.seller?.email}
                          </span>
                        </div>
                        <div class="col-md-6 mb-1">
                          <strong class="invoice_head">Address :</strong>
                          <span class="invoice_info">
                            {transactionDetail?.seller?.address_line1} <br />
                            {transactionDetail?.seller?.address_line2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 View_transactions_table ">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Quantity</th>
                          <th>Product Variety</th>
                          <th>Type</th>
                          <th>Size</th>
                          <th>@</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionDetail?.products?.map((item, index) => (
                          <tr>
                            <td>{item.quantity}</td>
                            <td>{item.productId.variety.variety}</td>
                            <td>{item.productId.type.type}</td>
                            <td>{item.productId.units.unit}</td>
                            <td>${item.price}</td>
                            <td>${item.total}</td>
                          </tr>
                        ))}

                        <tr>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td">Sub Total :</td>
                          <td class="bottom_td">{transactionDetail.total}</td>
                        </tr>
                        <tr>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td">GST (10%) :</td>
                          <td class="bottom_td">$0.00</td>
                        </tr>
                        <tr>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td">Discount :</td>
                          <td class="bottom_td">$0.00</td>
                        </tr>
                        <tr>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td"></td>
                          <td class="bottom_td">Balance :</td>
                          <td class="bottom_td">${transactionDetail.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-12 View_transactions_bottom mb-5">
                  <div class="row justify-content-start align-items-left">
                    <div class="col-lg-6">
                      <div class="row transactions_top_right">
                        <div class="mb-1 d-flex">
                          <strong class="invoice_head">BSB : </strong>
                          <span class="invoice_info mt-0">
                            {" "}
                            {transactionDetail?.seller?.bsb}
                          </span>
                        </div>
                        <div class="mb-1 d-flex ">
                          <strong class="invoice_head">Acc # : </strong>
                          <span class="invoice_info mt-0">
                            {" "}
                            {transactionDetail?.seller?.account}
                          </span>
                        </div>
                        <div class="mb-1 d-flex ">
                          <strong class="invoice_head">Acc Name : </strong>
                          <span class="invoice_info mt-0">
                            {" "}
                            {transactionDetail?.seller?.account_name}
                          </span>
                        </div>
                        <div class=" mb-1 d-flex">
                          <span class="invoice_info">
                            No claims or credits will be recognised after
                            delivery of goods.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center py-4">
              <div class="col-auto text-center">
                <button
                  className="product_comman_btn dropdown-toggle mx-md-3 mb-md-0 mb-2"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none" }}
                >
                  Stations
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>

                <Link
                  class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                  to=""
                >
                  Reprint Docket
                </Link>
                <Link
                  class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                  to=""
                >
                  Reprint Invoice
                </Link>

                <Link
                  class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                  to=""
                >
                  Print A4
                </Link>
                <Link
                  class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                  to=""
                  onClick={() => emailInvoice()}
                >
                  Email Buyer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewTransaction;
