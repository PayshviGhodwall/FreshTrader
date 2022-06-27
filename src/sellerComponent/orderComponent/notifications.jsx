import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeOrderNotification,
  getOrderNotification,
} from "../../apiServices/sellerApiHandler/orderApiHandler";
import Header from "../commonComponent/header";

function Notifications() {
  const [noti, setNoti] = useState("");
  useEffect(() => {
    getNotify();
  }, []);

  const getNotify = async () => {
    const { data } = await getOrderNotification();
    if (!data.error) {
      setNoti(data.results.notification);
    }
  };

  const onChangeValue = async (value, no) => {
    console.log(value, no);
    let notification = { ...noti };
    if (no === 1) notification.notify_new_order = value;
    else if (no === 2) notification.notify_declined_offer = value;
    else if (no === 3) notification.notify_confirmed_offer = value;
    else if (no === 4) notification.notify_cancel_order = value;

    const { data } = await changeOrderNotification(notification);
    if (!data.error) {
    }
    await getNotify();
  };

  return (
    <>
      <Header />
      <section class="notifications_page">
        <div class="container">
          <div class="row py-3 align-items-center">
            <div class="col-auto">
              <Link class="product_comman_btn m-0" to="/orders">
                <img src="assets/img/arrow-left-line.png" alt="Back" />
                Back
              </Link>
            </div>
          </div>
          <div class="row py-md-5 py-4 justify-content-center">
            <div class="col-xl-4 col-lg-6 col-md-8">
              <div class="notification_box box_design">
                <form class="row" action="">
                  <div class="col-12 form-group my-3 py-md-1">
                    <div class="row mx-0">
                      <div class="col-8">
                        <label for="">Delivery Note</label>
                      </div>
                      <div class="col-4 text-center">
                        <div class="table_toggle_radio">
                          <input
                            class="d-none"
                            type="checkbox"
                            id="check1"
                            checked={noti.notify_new_order}
                            onChange={(e) => onChangeValue(e.target.checked, 1)}
                          />
                          <label for="check1"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 form-group my-3 py-md-1">
                    <div class="row mx-0">
                      <div class="col-8">
                        <label for="">Decliend Counter Offers</label>
                      </div>
                      <div class="col-4 text-center">
                        <div class="table_toggle_radio">
                          <input
                            class="d-none"
                            type="checkbox"
                            id="check2"
                            checked={noti.notify_declined_offer}
                            onChange={(e) => onChangeValue(e.target.checked, 2)}
                          />
                          <label for="check2"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 form-group my-3 py-md-1">
                    <div class="row mx-0">
                      <div class="col-8">
                        <label for="">Confirmed Offers</label>
                      </div>
                      <div class="col-4 text-center">
                        <div class="table_toggle_radio">
                          <input
                            class="d-none"
                            type="checkbox"
                            id="check3"
                            checked={noti.notify_confirmed_offer}
                            onChange={(e) => onChangeValue(e.target.checked, 3)}
                          />
                          <label for="check3"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 form-group my-3 py-md-1">
                    <div class="row mx-0">
                      <div class="col-8">
                        <label for="">Cancel Orders</label>
                      </div>
                      <div class="col-4 text-center">
                        <div class="table_toggle_radio">
                          <input
                            class="d-none"
                            type="checkbox"
                            id="check4"
                            checked={noti.notify_cancel_order}
                            onChange={(e) => onChangeValue(e.target.checked, 4)}
                          />
                          <label for="check4"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Notifications;
