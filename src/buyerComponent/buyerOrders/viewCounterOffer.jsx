import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeOrderStatus,
  getOrderDetails,
} from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function BuyerViewCounterOffer() {
  const [orderDetails, setOrderDetails] = useState("");

  useEffect(() => {
    getOrder();
  }, []);

  let { id } = useParams();
  const navigate = useNavigate();

  const getOrder = async () => {
    const { data } = await getOrderDetails(id);
    if (!data.error) {
      setOrderDetails(data.results.order);
    }
  };

  const declineConfirmOrders = async (status) => {
    const { data } = await changeOrderStatus({ orderId: id, status: status });
    if (!data.error) {
      if (status === "CANCELED") {
        navigate("/buyer/orders");
      } else navigate("/buyer/send-order");
    }
  };
  if (!orderDetails) return null;

  return (
    <>
      {" "}
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/counter-offer">
                    <img src="/assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    View Counter Offer
                  </a>
                </div>
                <div class="col-auto">
                  <a class="back-btn invisible" href="javascript:;">
                    <img src="/assets/img/delete.png" alt="" />
                  </a>
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
                        <strong>Seller(stall#)</strong>
                      </div>
                      <div class="col-4 px-1">
                        <strong></strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="row mx-0 align-items-center similer_part_boxes">
                          <div class="col-4 similer_data text-start">
                            <span>
                              {moment(orderDetails.createdAt).format("LL")}
                            </span>
                          </div>
                          <div class="col-4 text-center similer_data">
                            <span>
                              {orderDetails?.seller?.business_trading_name}
                            </span>
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
                      <div class="col-9 px-1 text-start">
                        <strong>Variety, Product(Unit)[Grade]</strong>
                      </div>
                      <div class="col-3 text-end px-1">
                        <strong>Unit</strong>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 py-3">
                        {orderDetails?.product?.map((item, index) => (
                          <div class="row align-items-center mx-0 similer_tablebox">
                            <div class="col-9 similer_table_data text-start">
                              <span>
                                {item.product.variety.variety},{" "}
                                {item.product.type.type}
                                <br /> ({item.product.units.unit}) [{item.grade}
                                ]
                              </span>
                            </div>
                            <div class="col-3 similer_table_data text-end">
                              <span>{item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div class="col-11 m-auto">
                    <form class="row order_comman_part">
                      <div class="col-12">
                        <div class="row border-light border-top border-bottom py-4 my-3">
                          <div class="col-12 form-group order_commandesign mb-4">
                            <div class="row align-items-center">
                              <div class="col-6">
                                <label for="">Pick up date: </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-12 ps-2 pe-3">
                                    <span className="order-data-span">
                                      {moment(orderDetails.pick_up_date).format(
                                        "yyyy-MM-DD"
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 form-group order_commandesign mb-4">
                            <div class="row">
                              <div class="col-6">
                                <label for="">
                                  Estimated: <br />
                                  Time{" "}
                                </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-12 ps-2 pe-3">
                                    <span className="order-data-span">
                                      {orderDetails.pick_up_time}{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 form-group order_commandesign mb-4">
                            <div class="row align-items-center">
                              <div class="col-6">
                                <label for="">Notes: </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-12 ps-2 pe-3">
                                    <span className="order-data-span">
                                      {orderDetails.notes}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 form-group order_commandesign">
                            <div class="row align-items-center">
                              <div class="col-6">
                                <label for="">Payment Mode: </label>
                              </div>
                              <div class="col ps-0">
                                <div class="row">
                                  <div class="col-12 ps-2 pe-3">
                                    <span className="order-data-span">
                                      {orderDetails.payment}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="row py-3">
                          <div class="col-12 form-group order_commandesign">
                            <div class="row">
                              <div class="col-6 pe-1">
                                <Link
                                  to=""
                                  class="btn_comman btn_red"
                                  onClick={() =>
                                    declineConfirmOrders("CANCELED")
                                  }
                                >
                                  Cancel Offer
                                </Link>
                              </div>
                              <div class="col-6 ps-1">
                                <Link
                                  to=""
                                  class="btn_comman btn_green"
                                  onClick={() =>
                                    declineConfirmOrders("PENDING")
                                  }
                                >
                                  Accept Offer
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

export default BuyerViewCounterOffer;
