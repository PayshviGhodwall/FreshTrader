import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeAllTransactionStatus,
  changeTransactionStatus,
  deleteTransaction,
  emailAllTransactionsToBuyers,
  emailTransactionToBuyer,
  getCustomerInfo,
  getTransactions,
  updateTransactions,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";

import { getCustomerTransactions } from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import { getBusinessDetail } from "../../apiServices/sellerApiHandler/inputBusinessSaleApiHandler";

function CustomerFiles() {
  const [transaction, setTransaction] = useState([]);
  const [date, setDate] = useState("");
  const [filterBy, setFilterBy] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [transId, setTransId] = useState([]);
  const [business, setBusiness] = useState("");
  const [customerDetail, setCustomerDetail] = useState("");
  const [transactionId, setTransactionId] = useState("");

  let { id } = useParams();

  useEffect(() => {
    getTransactionList();
    getBusiness();
    getCustomerDetail();
  }, [date, filterBy, sortBy]);

  const getTransactionList = async () => {
    const formData = {
      buyerId: id,
      date: date,
      filterBy: filterBy,
      sortBy: sortBy,
    };
    const { data } = await getCustomerTransactions(formData);
    if (!data.error) {
      setTransaction(data.results.transactions);
    }
  };
  const markTransaction = async (id, status) => {
    const formData = {
      transactionId: id,
      status: status,
    };
    const { data } = await changeTransactionStatus(formData);
    if (!data.error) {
      await getTransactionList();
    }
  };
  const changePrice = async (price, index, index2) => {
    let transactionData = [...transaction];
    transactionData[index].products[index2].price = +price;
    transactionData[index].products[index2].total =
      +price * transactionData[index].products[index2].quantity;
    transactionData[index].total = transactionData[index].products.reduce(
      function (a, b) {
        console.log(b.total);
        return a + b.total;
      },
      0
    );

    setTransaction(transactionData);
  };

  const EditTransaction = async (index, status) => {
    let products = [];
    for (const product of transaction[index].products) {
      products.push({
        productId: product.productId._id,
        quantity: product.quantity,
        price: product.price,
        total: product.total,
        consignment: product.consignment._id,
      });
    }
    const formData = {
      transactionId: transaction[index]._id,
      products: products,
      total: transaction[index].total,
    };
    const { data } = await updateTransactions(formData);
    if (!data.error) {
      await getTransactionList();
    }
  };

  const statusAction = async (status) => {
    const formData = {
      transactionIds: transId,
      status: status,
    };
    const { data } = await changeAllTransactionStatus(formData);
    console.log(data);
    if (!data.error) {
      await getTransactionList();
    }
  };

  const selectTransaction = async (index) => {
    let newTransId = [...transId];
    if (document.getElementById(`selectBox${index}`).checked) {
      newTransId.push(transaction[index]._id);
    } else {
      newTransId = newTransId.filter(
        (v) => String(v) !== String(transaction[index]._id)
      );
    }
    setTransId(newTransId);
  };
  const invoiceAction = async () => {
    const formData = {
      transactionIds: transId,
    };

    const { data } = await emailAllTransactionsToBuyers(formData);
    if (!data.error) {
      await getTransactionList();
    }
  };
  const emailInvoice = async (id) => {
    const { data } = await emailTransactionToBuyer(id);
    if (!data.error) {
      await getTransactionList();
    }
  };
  const getBusiness = async () => {
    const { data } = await getBusinessDetail(id);
    if (!data.error) {
      setBusiness(data.results.buyer);
    }
  };
  const getCustomerDetail = async () => {
    const { data } = await getCustomerInfo(id);
    if (!data.error) {
      setCustomerDetail(data.results.customer);
    }
  };

  const openModel = async (id) => {
    console.log(id);
    setTransactionId(id);
  };

  const deleteTrans = async (status) => {
    const formData = {
      transactionId: transactionId,
      type: status,
    };
    const { data } = await deleteTransaction(formData);
    console.log(data);
    if (!data.error) {
      const add = document.getElementById("exampleModal");
      add.click();

      await getTransactionList();
    }
  };

  return (
    <>
      <Header />
      <section class="transactions_section customer_files pb-md-5 pb-4">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-xl-7 mb-xl-0 mb-lg-2 mb-md-2">
              <div class="row">
                <div class="col-12 mb-2">
                  <div class="row align-items-center">
                    <div class="col-md-auto mb-md-0 mb-2">
                      <Link class="product_comman_btn m-0" to="/customer-file">
                        <img
                          src="../assets/img/arrow-left-line.png"
                          alt="Back"
                        />
                        Back
                      </Link>
                    </div>
                    <div class="col-sm px-md-1">
                      <form
                        class="form_customer_files row align-items-center"
                        action=""
                      >
                        <div class="col-md-auto border-end border-dark">
                          <label for="">{business.business_trading_name}</label>
                        </div>
                        <div class="col-sm border-end border-dark">
                          <input
                            class="form-control"
                            type="text"
                            value={`Email: ${business.email}`}
                          />
                        </div>
                        <div class="col-sm">
                          <input
                            class="form-control"
                            type="text"
                            value={`SMCS Code: ${business.smcs_code}`}
                          />
                        </div>
                        <div class="col-auto">
                          <button class="edit" type="button">
                            <img src="assets/img/edit.png" alt="" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-sm pe-md-4 mb-md-0 mb-2">
                      <form class="date_select row" action="">
                        <div class="form-group col pe-md-1">
                          <input class="form-control" type="date" id="date" />
                        </div>
                        <div class="form-group col-auto ps-0">
                          <Link
                            class="product_comman_btn border-0"
                            onClick={() =>
                              setDate(document.getElementById("date").value)
                            }
                            to=""
                          >
                            Select date
                          </Link>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-auto">
                      <div class="row justify-content-xl-start justify-content-lg-end justify-content-md-start justify-content-center  mb-md-0 mb-3">
                        <div class="col-auto px-1">
                          <div class="dropdown comman_dropdown mx-0">
                            <button
                              class="product_comman_btn dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Sort By
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(1)}
                                >
                                  Time (Earliest)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(2)}
                                >
                                  Time (Oldest)
                                </Link>
                              </li>

                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(3)}
                                >
                                  Transaction Type
                                </Link>
                              </li>

                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(4)}
                                >
                                  Total (Highest)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(5)}
                                >
                                  Total (Lowest)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(6)}
                                >
                                  Smsc Notified
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setSortBy(7)}
                                >
                                  Status
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-auto px-1">
                          <div class="dropdown comman_dropdown mx-0">
                            <button
                              class="product_comman_btn dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Filter
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(1)}
                                >
                                  Cash Transactions
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(2)}
                                >
                                  SMCS Invoices
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(3)}
                                >
                                  Non-SMCS Invoices
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(4)}
                                >
                                  Credit Notes
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(5)}
                                >
                                  Paid
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(6)}
                                >
                                  Unpaid
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => setFilterBy(7)}
                                >
                                  Overdue Invoices
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-auto px-1">
                          <div class="dropdown comman_dropdown mx-0">
                            <button
                              class="product_comman_btn dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => statusAction("PAID")}
                                >
                                  Mark as Paid
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => statusAction("UNPAID")}
                                >
                                  Mark as Unpaid
                                </Link>
                              </li>
                              <li>
                                <Link class="dropdown-item" to="">
                                  Print A4 Invoice
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => invoiceAction()}
                                >
                                  Email Buyer Invoice
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-5">
              <div class="row mx-0 customer_top_box justify-content-end">
                <div class="col-xl-6 col-lg-4 col-md-6 col-6 mb-3">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-md-0 mb-2">
                      <strong>Opening :</strong>
                    </div>
                    <div class="col-md-6">
                      <span>${customerDetail.opening}</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6 col-6 mb-3">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-md-0 mb-2">
                      <strong>Closing :</strong>
                    </div>
                    <div class="col-md-6">
                      <span>${customerDetail.closing}</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6 col-6 mb-3">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-md-0 mb-2">
                      <strong>(+) Bought :</strong>
                    </div>
                    <div class="col-md-6">
                      <span>${customerDetail.bought}</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6 col-6 mb-3">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-md-0 mb-2">
                      <strong>(-) Paid :</strong>
                    </div>
                    <div class="col-md-6">
                      <span>${customerDetail.paid}</span>
                    </div>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-4 col-md-6 mb-0">
                  <div class="row align-items-center">
                    <div class="col-md-6 mb-md-0 mb-2">
                      <strong>(-) Credit :</strong>
                    </div>
                    <div class="col-md-6">
                      <span>${customerDetail.credit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="transactions_main">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Select</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Salesmen</th>
                    <th>Ref#</th>
                    <th>
                      Trans <br /> Type
                    </th>
                    <th>Total</th>
                    <th>
                      Partial <br /> Payment
                    </th>
                    <th>
                      Total <br /> Owed
                    </th>
                    <th>
                      Smcs <br /> Notified
                    </th>
                    <th>Status</th>
                    <th>Details</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <div class="form-group product_checkbox">
                              <input
                                class="d-none"
                                type="checkbox"
                                id={`selectBox${index}`}
                                onChange={() => selectTransaction(index)}
                              />
                              <label for={`selectBox${index}`}></label>
                            </div>
                          </td>
                          <td>{moment(item.createdAt).format("LL")}</td>
                          <td>{moment(item.createdAt).format("LL")}</td>
                          <td>{item?.salesman?.full_name}</td>
                          <td>{item.ref}</td>
                          <td>{item.type}</td>

                          <td>
                            {item.type === "CREDIT NOTE"
                              ? `-$${item.total}`
                              : `$${item.total}`}
                          </td>
                          <td>
                            {" "}
                            {item.type !== "CREDIT NOTE"
                              ? item.payment_received
                              : ""}
                          </td>
                          <td>
                            {" "}
                            {item.type !== "CREDIT NOTE" ? item.total_owed : ""}
                          </td>

                          <td>
                            {item.is_smcs ? (
                              <a
                                class={
                                  item.smcs_notified
                                    ? "tables_btns "
                                    : "tables_btns bg"
                                }
                                href="javascript:;"
                              >
                                {item.smcs_notified ? "Yes" : "No"}
                              </a>
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {item.type !== "CREDIT NOTE" ? (
                              <a
                                class={
                                  item.status === "PAID"
                                    ? "tables_btns "
                                    : "tables_btns bg"
                                }
                                href="javascript:;"
                              >
                                {item.status}
                              </a>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <Link
                              class="tables_btns tables_green_btn"
                              to={
                                item.status === "PAID"
                                  ? `/view-transaction-paid/${item._id}`
                                  : `/view-transaction/${item._id}`
                              }
                            >
                              View
                            </Link>
                          </td>
                          <td>
                            <div class="dropdown table_dropdown">
                              <button
                                class="btn"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <img src="../assets/img/dots.png" alt="" />
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <Link
                                    class="dropdown-item"
                                    to=""
                                    onClick={() => emailInvoice(item._id)}
                                  >
                                    Email Buyer Invoice
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Reprint Docket
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Reprint Invoice
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Reprint Both
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Print A4 Invoice
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Amend
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    class="dropdown-item"
                                    to=""
                                    onClick={() =>
                                      markTransaction(item._id, "PAID")
                                    }
                                  >
                                    Mark as Paid
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    class="dropdown-item"
                                    to=""
                                    onClick={() =>
                                      markTransaction(item._id, "UNPAID")
                                    }
                                  >
                                    Mark as Unpaid
                                  </Link>
                                </li>
                                <li>
                                  <Link class="dropdown-item" to="">
                                    Recieve payment
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    class="dropdown-item"
                                    to=""
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => openModel(item._id)}
                                  >
                                    Delete
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}{" "}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade settings_section"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row setting_box">
                <button
                  type="button"
                  className="btn-close btn_modal_design mt-2"
                  data-bs-dismiss="modal"
                  id="exampleModal"
                  aria-label="Close"
                ></button>
                <div className="col-md-12">
                  <div className="delete_box">
                    <strong>Delete Transaction</strong>
                    <p>
                      What do you want to do with the inventory from this
                      transaction? Should it be added back to your system, void
                      or remain sold?
                    </p>
                  </div>
                  <div className="row my-5">
                    <div className="d-flex text-center justify-content-between">
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to=""
                          onClick={() => deleteTrans(1)}
                        >
                          Return Inventory
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to=""
                          onClick={() => deleteTrans(2)}
                        >
                          Void Inventory
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to=""
                          onClick={() => deleteTrans(3)}
                        >
                          Remain Inventory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerFiles;
