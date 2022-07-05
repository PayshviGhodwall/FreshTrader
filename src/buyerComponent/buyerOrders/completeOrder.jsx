import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteFromCart,
  getCartDetails,
  orderProduct,
} from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";
import { useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CompleteOrder() {
  const [order, setOrder] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    getOrders();
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();

  const getOrders = async () => {
    const { data } = await getCartDetails(id);
    if (!data.error) {
      setOrder(data.results.cart);
    }
  };

  const changeUnit = async (value, index) => {
    let unit = { ...order };
    unit.product[index].quantity = +value;
    setOrder(unit);
  };

  const getTime = async (value) => {
    value = value
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [value];

    if (value.length > 1) {
      value = value.slice(1);
      value[5] = +value[0] < 12 ? "AM" : "PM";
      value[0] = +value[0] % 12 || 12;
    }
    value = value.join(" ");
    setTime(value);
    console.log(value);
  };

  const placeOrder = async () => {
    let pd = [];
    for (const item of order.product) {
      pd.push({
        productId: item.productId,
        quantity: item.quantity,
        grade: item.grade,
      });
    }
    const formData = {
      seller: order.seller._id,
      product: pd,
      pick_up_date: moment(date).format("yyyy-MM-DD"),
      pick_up_time: time,
      notes: note,
      payment: payment,
    };
    const { data } = await orderProduct(formData);
    if (!data.error) {
      navigate("/buyer/send-order");
    }
  };
  const deleteOrder = async (id) => {
    let product = { ...order };
    product.product = product.product.filter(
      (item) => String(item.productId) !== String(id)
    );
    setOrder(product);
    console.log(product, id);
  };

  const deleteCart = async () => {
    const { data } = await deleteFromCart(id);
    if (!data.error) {
      navigate("/buyer/cart");
    }
  };

  if (!order) return null;

  return (
    <>
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/orders">
                    <img src="/assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    Complete Order
                  </a>
                </div>
                <div class="col-auto">
                  <Link class="back-btn" to="" onClick={() => deleteCart()}>
                    <img src="/assets/img/delete.png" alt="" />
                  </Link>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body table_overflow">
              <div class="freshtrader_main_data">
                <div class="row similer_part_design comman_section_outer">
                  <div class="col-12">
                    <div class="row mx-0 similer_partheader">
                      <div class="col-4 px-1 text-start">
                        <strong>Date</strong>
                      </div>
                      <div class="col-4 text-center px-1">
                        <strong>Seller</strong>
                      </div>
                      <div class="col-4 px-1">
                        <strong></strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="row mx-0 align-items-center similer_part_boxes">
                          <div class="col-4 similer_data text-start">
                            <span>{moment(order.createdAt).format("LL")}</span>
                          </div>
                          <div class="col-4 text-center similer_data">
                            <span>{order?.seller?.business_trading_name}</span>
                          </div>
                          <div class="col-4 similer_data text-center">
                            <a class="call_btn" href="javscript:;">
                              <img src="/assets/img/call_icon.png" alt="" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="row mx-0 similer_tableheader">
                      <div class="col-5 px-1 text-start">
                        <strong>Product(Unit)</strong>
                      </div>
                      <div class="col-4 text-center px-1">
                        <strong>Units</strong>
                      </div>
                      <div class="col-3 text-center px-1">
                        <strong>Delete</strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 py-3">
                        {console.log(order)}
                        {order?.product.map((item, index) => (
                          <div class="row align-items-center mx-0 similer_tablebox">
                            <div class="col-5 similer_table_data text-start">
                              <span>{item.product.type.type}</span>
                            </div>
                            <div class="col-4 text-center similer_table_data">
                              <div class="form-group">
                                <input
                                  class="form-control"
                                  type="number"
                                  id="unit"
                                  name="unit"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    changeUnit(e.target.value, index)
                                  }
                                />
                              </div>
                            </div>
                            <div class="col-3 similer_table_data text-center">
                              <Link
                                class="call_btn"
                                to=""
                                onClick={() => deleteOrder(item.productId)}
                              >
                                <img src="/assets/img/delet_btn.png" alt="" />
                              </Link>
                            </div>
                          </div>
                        ))}
                        <div class="row align-items-center mx-1 similer_tablebox mt-3">
                          <div class="col-auto">
                            <Link
                              class="table_btn"
                              to={`/buyer/order-details/${order.seller._id}`}
                            >
                              Add More Product
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <form class="row order_comman_part">
                      <div class="col-11 m-auto">
                        <div class="row border-light border-top border-bottom py-4 my-3">
                          <div class="col-12 form-group order_commandesign mb-4">
                            <div class="row">
                              <div class="col-4">
                                <label for="">Pick Up Date: </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-6 mb-2 ps-2 pe-1">
                                    <button
                                      class="date_btn today_btn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setDate(new Date(Date.now()));
                                      }}
                                    >
                                      Today
                                    </button>
                                  </div>
                                  <div class="col-6 mb-2 ps-1 pe-3">
                                    <button
                                      class="date_btn tomorrow_btn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setDate(
                                          new Date(Date.now()).setDate(
                                            new Date(Date.now()).getDate() + 1
                                          )
                                        );
                                      }}
                                    >
                                      Tomorrow
                                    </button>
                                  </div>
                                  <div class="col-11 ps-2 pe-1">
                                    <input
                                      class="form-control"
                                      type="date"
                                      value={moment(date).format("yyyy-MM-DD")}
                                      onChange={(e) => setDate(e.target.value)}
                                    />
                                    {console.log(date)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 form-group order_commandesign mb-4">
                            <div class="row">
                              <div class="col-4">
                                <label for="">
                                  Estimated: <br />
                                  Time{" "}
                                </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-6 ps-2 pe-1">
                                    <input
                                      class="form-control"
                                      type="time"
                                      placeholder="02:30"
                                      onChange={(e) => getTime(e.target.value)}
                                    />
                                  </div>
                                  <div class="col-6 ps-1 pe-3">
                                    <div class="sechudule_check">
                                      <input
                                        class="d-none"
                                        type="checkbox"
                                        id="toogle_btn"
                                        checked={time.includes("AM")}
                                      />
                                      <label for="toogle_btn" class="">
                                        <span>AM</span>
                                        <span>PM</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 form-group order_commandesign">
                            <div class="row align-items-center">
                              <div class="col-4">
                                <label for="">Notes: </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-12 ps-2 pe-3">
                                    <input
                                      class="form-control text-start"
                                      type="text"
                                      placeholder="May Be a bit late"
                                      onChange={(e) => setNote(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-11 m-auto">
                        <div class="row py-3">
                          <div class="col-12 form-group order_commandesign">
                            <div class="row">
                              <div class="col-12 mb-2">
                                <h3>Payment Method:</h3>
                                <p>
                                  Cash and Card payments are complete in person
                                  upon order pick up.
                                </p>
                              </div>
                              <div class="col-12 mb-5">
                                <div class="row">
                                  <div
                                    class={
                                      payment === "SMCS INVOICE"
                                        ? "col-3 pe-1 form-group payment_checkbox_1"
                                        : "col-3 pe-1 form-group payment_checkbox"
                                    }
                                    onClick={() => setPayment("SMCS INVOICE")}
                                  >
                                    <Link to="">
                                      SMCS <br />
                                      Invoice{" "}
                                    </Link>
                                  </div>
                                  <div
                                    class={
                                      payment === "INVOICE"
                                        ? "col-3 pe-1 form-group payment_checkbox_1"
                                        : "col-3 pe-1 form-group payment_checkbox"
                                    }
                                    onClick={() => setPayment("INVOICE")}
                                  >
                                    <Link to="">Invoice </Link>
                                  </div>
                                  <div
                                    class={
                                      payment === "CASH"
                                        ? "col-3 pe-1 form-group payment_checkbox_1"
                                        : "col-3 pe-1 form-group payment_checkbox"
                                    }
                                    onClick={() => setPayment("CASH")}
                                  >
                                    <Link to="">Cash </Link>
                                  </div>
                                  <div
                                    class={
                                      payment === "CARD"
                                        ? "col-3 pe-1 form-group payment_checkbox_1"
                                        : "col-3 pe-1 form-group payment_checkbox"
                                    }
                                    onClick={() => setPayment("CARD")}
                                  >
                                    <Link to="">Card </Link>
                                  </div>
                                </div>
                              </div>
                              <div class="col-12 pb-4">
                                <Link
                                  // to="view-sent-order.html"
                                  class="btn_comman btn_green"
                                  to=""
                                  onClick={() => placeOrder()}
                                >
                                  Send Order
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="freshtrader_menus_outer">
              <div class="freshtrader_menus shadow">
                <a class="menus-single active" href="index.html">
                  <img src="/assets/img/home_menus.png" alt="" />
                </a>
                <a class="menus-single" href="cart.html">
                  <img src="/assets/img/cart_menus.png" alt="" />
                </a>
                <a class="menus-single" href="order.html">
                  <img src="/assets/img/list_menus.png" alt="" />
                </a>
                <a class="menus-single" href="menu.html">
                  <img src="/assets/img/category_menus.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteOrder;
