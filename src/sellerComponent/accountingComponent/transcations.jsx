import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeAllTransactionStatus,
  changeTransactionStatus,
  deleteTransaction,
  emailAllTransactionsToBuyers,
  emailTransactionToBuyer,
  getTransactions,
  updateTransactions,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";

function Transcations() {
  const [transaction, setTransaction] = useState([]);
  const [date, setDate] = useState("");
  const [filterBy, setFilterBy] = useState(0);
  const [sortBy, setSortBy] = useState(0);
  const [model, setModel] = useState(-1);
  const [transId, setTransId] = useState([]);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    getTransactionList();
  }, [date, filterBy, sortBy]);

  const getTransactionList = async () => {
    const formData = {
      date: date,
      filterBy: filterBy,
      sortBy: sortBy,
    };
    const { data } = await getTransactions(formData);
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

  const changeUnit = async (unit, index, index2) => {
    let transactionData = [...transaction];
    transactionData[index].products[index2].quantity = +unit;
    transactionData[index].products[index2].total =
      +unit * transactionData[index].products[index2].price;
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
      <section class="transactions_section">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-xl-5 col-lg-6 mb-lg-0 mb-md-3 mb-2">
              <div class="row">
                <div class="col">
                  <form class="date_select row" action="">
                    <div class="form-group col">
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
              </div>
            </div>
            <div class="col">
              <div class="row justify-content-xl-start justify-content-lg-end justify-content-md-start justify-content-center  mb-md-0 mb-2 mx-auto">
                <div class="col-md-auto col-4 px-1">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn dropdown-toggle show dropdown-toggle"
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
                          Salesmen
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSortBy(4)}
                        >
                          Transaction Type
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSortBy(5)}
                        >
                          Buyer (A-Z)
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSortBy(6)}
                        >
                          Buyer (Z-A)
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSortBy(7)}
                        >
                          Total (Highest)
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSortBy(8)}
                        >
                          Total (Lowest)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-md-auto col-4 px-1">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn dropdown-toggle show dropdown-toggle"
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
                <div class="col-md-auto col-4 px-1">
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
            <div class="col-xl-auto col-lg-12 col-md-auto mt-xl-0 mt-lg-3 mt-md-0 mt-0">
              <div class="row align-items-center justify-content-end">
                <div class="col-auto px-md-1 px-0">
                  <label class="export" for="">
                    Export ESV :
                  </label>
                </div>
                <div class="col-auto px-md-1 px-1">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn dropdown-toggle show dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      All
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a class="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-auto px-md-1 ps-2">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn dropdown-toggle show dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Selected
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a class="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
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
                    <th>Type</th>
                    <th>Buyer</th>
                    <th>Total</th>
                    <th>Quick Edit</th>
                    <th>Emailed</th>
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
                          <td>{item.salesman.full_name}</td>
                          <td>{item.ref}</td>
                          <td>{item.type}</td>
                          <td>{item.buyer.business_trading_name}</td>
                          <td>
                            {item.type === "CREDIT NOTE"
                              ? `-$${item.total}`
                              : `$${item.total}`}
                          </td>
                          <td>
                            <Link to="">
                              <img
                                src={
                                  model === index
                                    ? "assets/img/inverted-triangle.png"
                                    : "assets/img/play-fill.png"
                                }
                                alt=""
                                onClick={() =>
                                  setModel(model !== index ? index : -1)
                                }
                              />
                            </Link>
                          </td>
                          <td>
                            <a
                              class={
                                item.is_emailed
                                  ? "tables_btns "
                                  : "tables_btns bg"
                              }
                              href="javascript:;"
                            >
                              {item.is_emailed ? "Yes" : "No"}
                            </a>
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
                                <img src="assets/img/dots.png" alt="" />
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
                                  <Link
                                    class="dropdown-item"
                                    to=""
                                    onClick={() =>
                                      setModel(model !== index ? index : -1)
                                    }
                                  >
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
                        {model === index ? (
                          <tr>
                            <td colSpan={13}>
                              <div class="transation_outer">
                                <div class="container">
                                  <div class="row transactions_details align-items-end">
                                    <div class="col-xl-7 col-lg-8">
                                      <div class="table-responsive">
                                        <table class="table">
                                          <thead>
                                            <tr>
                                              <th>Product</th>
                                              <th>Supplier (Con.ID)</th>
                                              <th>Unit</th>
                                              <th>Price</th>
                                              <th>Total</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {item.products.map(
                                              (product, index2) => (
                                                <>
                                                  <tr>
                                                    <td
                                                      style={{
                                                        textAlign: "left",
                                                      }}
                                                    >
                                                      {
                                                        product.productId
                                                          ?.variety?.variety
                                                      }
                                                      , <br />
                                                      {
                                                        product.productId?.type
                                                          ?.type
                                                      }
                                                      , <br />(
                                                      {
                                                        product.productId?.units
                                                          ?.unit
                                                      }
                                                      )
                                                    </td>
                                                    <td
                                                      style={{
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      {
                                                        product.consignment
                                                          .supplier
                                                          .business_trading_name
                                                      }{" "}
                                                      (
                                                      {
                                                        product.consignment
                                                          .consign
                                                      }
                                                      )
                                                    </td>
                                                    <td
                                                      style={{
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      <input
                                                        class="consiment_data_box"
                                                        type="number"
                                                        id=""
                                                        name=""
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                          changeUnit(
                                                            e.target.value,
                                                            index,
                                                            index2
                                                          )
                                                        }
                                                      />
                                                    </td>
                                                    <td>
                                                      <input
                                                        class="consiment_data_box"
                                                        type="number"
                                                        id=""
                                                        name=""
                                                        value={product.price}
                                                        onChange={(e) =>
                                                          changePrice(
                                                            e.target.value,
                                                            index,
                                                            index2
                                                          )
                                                        }
                                                      />
                                                    </td>
                                                    <td
                                                      style={{
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      ${product.total}
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Total:</td>
                                                    <td
                                                      style={{
                                                        textAlign: "center",
                                                      }}
                                                    >
                                                      ${item.total}
                                                    </td>
                                                  </tr>
                                                </>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div class="col-lg-auto">
                                      <Link
                                        class="product_comman_btn"
                                        to=""
                                        onClick={() => EditTransaction(index)}
                                      >
                                        Save
                                      </Link>
                                    </div>
                                    <div class="col-lg-auto">
                                      <a
                                        class="product_comman_btn"
                                        href="javascript:;"
                                      >
                                        Undo
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
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

export default Transcations;
