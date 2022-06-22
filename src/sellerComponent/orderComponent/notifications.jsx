import React from "react";
import Header from "../commonComponent/header";

function Notifications() {
  return (
    <>
      <Header />
      <section class="notifications_page">
        <div class="container">
          <div class="row py-3 align-items-center">
            <div class="col-auto">
              <a class="product_comman_btn m-0" href="javascript:;">
                <img src="assets/img/arrow-left-line.png" alt="Back" />
                Back
              </a>
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
                          <input class="d-none" type="checkbox" id="check1" />
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
                          <input class="d-none" type="checkbox" id="check2" />
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
                          <input class="d-none" type="checkbox" id="check3" />
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
                          <input class="d-none" type="checkbox" id="check4" />
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
