import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderCount } from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";

function BuyerOrders() {
  const [noti, setNoti] = useState({});
  useEffect(() => {
    getNotify();
  }, []);

  const getNotify = async () => {
    const { data } = await getOrderCount();
    if (!data.error) {
      setNoti(data.results);
    }
  };

  return (
    <>
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/faq-screen">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <Link class="header_menus" to="">
                    Order
                  </Link>
                </div>
                <div class="col-auto">
                  <Link class="invisible back-btn" to="">
                    <img src="assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body">
              <div class="freshtrader_main_data">
                <div class="row order_menus mt-4">
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link
                      class="order_menus_circle"
                      to="/buyer/create-new-order"
                    >
                      <div>
                        <span>0</span>
                        <label>
                          Create <br /> New Order{" "}
                        </label>
                      </div>
                    </Link>
                  </div>
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link class="order_menus_circle" to="/buyer/cart">
                      <div>
                        <span>{noti.cartCount}</span>
                        <label>Cart </label>
                      </div>
                    </Link>
                  </div>
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link class="order_menus_circle" to="/buyer/send-order">
                      <div>
                        <span>{noti.sentOrderCount}</span>
                        <label>Sent Orders </label>
                      </div>
                    </Link>
                  </div>
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link class="order_menus_circle" to="/buyer/counter-offer">
                      <div>
                        <span>{noti.counterOrderCount}</span>
                        <label>Counter Offers </label>
                      </div>
                    </Link>
                  </div>
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link class="order_menus_circle" to="/buyer/confirm-order">
                      <div>
                        <span>{noti.confirmedOrderCount}</span>
                        <label>
                          Confirmed <br /> Orders{" "}
                        </label>
                      </div>
                    </Link>
                  </div>
                  <div class="col-6 d-flex align-items-stretch mb-3">
                    <Link class="order_menus_circle" to="/buyer/re-order">
                      <div>
                        <span>{noti.pastOrderCount}</span>
                        <label>
                          Reorder/Past <br /> Orders{" "}
                        </label>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="freshtrader_menus_outer">
              <div class="freshtrader_menus shadow">
                <Link class="menus-single" to="">
                  <img src="../assets/img/home_menus.png" alt="" />
                </Link>
                <Link class="menus-single" to="">
                  <img src="../assets/img/cart_menus.png" alt="" />
                </Link>
                <Link class="menus-single active" to="">
                  <img src="../assets/img/list_menus.png" alt="" />
                </Link>
                <Link class="menus-single" to="">
                  <img src="../assets/img/category_menus.png" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerOrders;
