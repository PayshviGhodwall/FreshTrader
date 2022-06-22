import React from "react";
import { Link } from "react-router-dom";
import Header from "../commonComponent/header";

function Orders() {
  return (
    <>
      <Header />
      <section class="orders_page">
        <div class="container-fluid px-0">
          <div class="container text-center">
            <div class="row py-5 align-items-center"></div>
            <div class="row justify-content-center py-4">
              <div class="col-lg-11">
                <div class="row justify-content-center">
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/new-orders" class="orders_box_main">
                      <span>New Orders</span>
                      <label class="order_circle"> 1 </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/send-counter-offer" class="orders_box_main">
                      <span>
                        Sent Counter <br />
                        Offers
                      </span>
                      <label class="order_circle"> 3 </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/confirm-orders" class="orders_box_main">
                      <span>
                        Confirmed <br />
                        Offers
                      </span>
                      <label class="order_circle"> 6 </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/notifications" class="orders_box_main">
                      <span>Notifications</span>
                      <label class="order_circle"> 2 </label>
                    </Link>
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

export default Orders;
