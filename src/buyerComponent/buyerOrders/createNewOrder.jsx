import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buyerGetSeller } from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";

function CreateNewOrder() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const { data } = await buyerGetSeller();
    if (!data.error) {
      setOrder(data.results.sellers);
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
                    Create New Order
                  </a>
                </div>
                <div class="col-auto">
                  <a class="invisible back-btn" href="javscript:;">
                    <img src="../assets/img/back-btn.png" alt="" />
                  </a>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body table_overflow">
              <div class="freshtrader_main_data">
                <div class="row comman_section_outer">
                  <div class="col-12 comman_header_main py-3">
                    <p>You can only order from one seller in each other.</p>
                  </div>
                  <div class="col-12 comman_table">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Seller</th>
                            <th>Location</th>
                            <th>Call</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.map((item, index) => {
                            return (
                              <tr>
                                <td>
                                  {item.seller.business_trading_name}
                                  <Link
                                    class="table_btn mt-4"
                                    to={`/buyer/order-details/${item.seller._id}`}
                                  >
                                    Order
                                  </Link>
                                </td>
                                <td>{item.seller.address_line1}</td>
                                <td>
                                  <a class="call_btn" href="javscript:;">
                                    <img
                                      src="../assets/img/call_icon.png"
                                      alt=""
                                    />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
                <a class="menus-single" href="cart.html">
                  <img src="../assets/img/cart_menus.png" alt="" />
                </a>
                <a class="menus-single active" href="order.html">
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

export default CreateNewOrder;
