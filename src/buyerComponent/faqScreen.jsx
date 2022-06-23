import React from "react";

function FaqScreen() {
  return (
    <>
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col pe-0">
                  <a class="logo_main" href="javscript:;">
                    <img src="../assets/img/welcome_logo.png" alt="" />
                  </a>
                </div>
                <div class="col-auto">
                  <a class="back-btn" href="welcome.html">
                    <img src="../assets/img/logout.png" alt="" />
                  </a>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body">
              <div class="freshtrader_main_data">
                <div class="row mt-3">
                  <div class="col-12 mb-5">
                    <div
                      class="welcome_box"
                      onclick="location.href='growers-produce.html';"
                    >
                      <strong>Welcome</strong>
                      <h2>Teds Fruit</h2>
                    </div>
                  </div>
                  <div class="col-12 mb-4">
                    <div class="row faq_section">
                      <div class="col-12 mb-3">
                        <strong class="head_strong">FAQ</strong>
                      </div>
                      <div class="col-12">
                        <div class="accordion" id="accordionExample">
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Why are some or all my sellers not available to
                                order from?
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the first item's accordion body.
                                </strong>{" "}
                                It is shown by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingtwo">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapsetwo"
                                aria-expanded="true"
                                aria-controls="collapsetwo"
                              >
                                Ordering Step & Informations
                              </button>
                            </h2>
                            <div
                              id="collapsetwo"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingtwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the first item's accordion body.
                                </strong>{" "}
                                It is shown by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingthree">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapsethree"
                                aria-expanded="true"
                                aria-controls="collapsethree"
                              >
                                How to download my transition history
                              </button>
                            </h2>
                            <div
                              id="collapsethree"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingthree"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the first item's accordion body.
                                </strong>{" "}
                                It is shown by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingfour">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapsefour"
                                aria-expanded="true"
                                aria-controls="collapsefour"
                              >
                                Learn about grades
                              </button>
                            </h2>
                            <div
                              id="collapsefour"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingfour"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the first item's accordion body.
                                </strong>{" "}
                                It is shown by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="freshtrader_menus_outer">
              <div class="freshtrader_menus shadow">
                <a class="menus-single active" href="index.html">
                  <img src="../assets/img/home_menus.png" alt="" />
                </a>
                <a class="menus-single" href="cart.html">
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
      </div>
    </>
  );
}

export default FaqScreen;
