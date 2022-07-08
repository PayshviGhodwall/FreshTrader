import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteFromCart,
  getMyCart,
} from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getMyCarts();
  }, []);

  const getMyCarts = async () => {
    const { data } = await getMyCart();
    if (!data.error) {
      setCart(data.results.cart);
    }
  };
  const deleteCart = async (id) => {
    const { data } = await deleteFromCart(id);
    if (!data.error) {
      await getMyCarts();
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
                  <Link class="back-btn" to="/buyer/orders">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    Cart
                  </a>
                </div>
                <div class="col-auto" style={{ visibility: "hidden" }}>
                  <a
                    class="back-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    href="javascript:;"
                  >
                    <img src="../assets/img/filter_white.png" alt="" />
                  </a>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body table_overflow">
              <div class="freshtrader_main_data">
                <div class="row comman_section_outer">
                  <div class="col-12 comman_header_main py-3">
                    <p>Incomplete Orders are deleted after 48 hours.</p>
                  </div>
                  <div class="col-12 Cart_part_outter">
                    <div class="row mx-0 Cart_part_header">
                      <div class="col-4 px-1 text-start">
                        <strong>Date</strong>
                      </div>
                      <div class="col-4 px-1">
                        <strong>Seller</strong>
                      </div>
                      <div class="col-4 px-1">
                        <strong>Delete</strong>
                      </div>
                    </div>
                    <div class="row Cart_part_inner">
                      {cart.map((item, index) => (
                        <div class="col-10 m-auto mt-4">
                          <div class="row Cart_box">
                            <div class="col-4 px-1 text-start">
                              <span>{moment(item.createdAt).format("LL")}</span>
                            </div>
                            <div class="col-4 px-1">
                              <span>{item.seller.business_trading_name}</span>
                            </div>
                            <div class="col-4 px-1">
                              <Link
                                class="btn_size"
                                to=""
                                onClick={() => deleteCart(item._id)}
                              >
                                <img src="../assets/img/delet_btn.png" alt="" />
                              </Link>
                            </div>
                            <div class="col-12 px-0">
                              <Link
                                class="complete-order"
                                to={`/buyer/complete-order/${item._id}`}
                              >
                                Complete Order
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="freshtrader_menus_outer">
              <div class="freshtrader_menus shadow">
                <a class="menus-single" href="index.html">
                  <img src="../assets/img/home_menus.png" alt="" />
                </a>
                <a class="menus-single active" href="cart.html">
                  <img src="../assets/img/cart_menus.png" alt="" />
                </a>
                <a class="menus-single" href="order.html">
                  <img src="../assets/img/list_menus.png" alt="" />
                </a>
                <a class="menus-single" href="menu.html">
                  <img src="../assets/img/category_menus.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Cart;
