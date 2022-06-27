import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrderCount } from "../../apiServices/sellerApiHandler/orderApiHandler";
import Header from "../commonComponent/header";

function Orders() {
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
                      <label class="order_circle"> {noti.newOrderCount} </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/send-counter-offer" class="orders_box_main">
                      <span>
                        Sent Counter <br />
                        Offers
                      </span>
                      <label class="order_circle">
                        {" "}
                        {noti.counterOrderCount}{" "}
                      </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/confirm-orders" class="orders_box_main">
                      <span>
                        Confirmed <br />
                        Offers
                      </span>
                      <label class="order_circle">
                        {" "}
                        {noti.confirmedOrderCount}{" "}
                      </label>
                    </Link>
                  </div>
                  <div class="col-md-3 d-flex align-items-stretch px-md-4 mb-md-5 mb-4">
                    <Link to="/notifications" class="orders_box_main">
                      <span>Notifications</span>
                      <label class="order_circle"> 0 </label>
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
