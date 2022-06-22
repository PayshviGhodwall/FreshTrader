import React from "react";
import Header from "../commonComponent/header";
import ReactItemSlider from "react-items-slider";
import { Link } from "react-router-dom";

function ProductSingle1() {
  return (
    <>
      <Header />

      <section class="product_page pb-md-5 pb-4">
        <div class="container">
          <div class="row">
            <div class="col-lg-2">
              <div class="product_tabs_btn">
                <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      <span>
                        <img src="assets/img/Fruits.png" alt="Fruits" />
                      </span>
                      Fruit
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <span>
                        <img src="assets/img/Vegetables.png" alt="Vegetables" />
                      </span>
                      Vegitables
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      <span>
                        <img src="assets/img/Medicinal.png" alt="Medicinal" />
                      </span>
                      Herbs
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="contact1-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact1"
                      type="button"
                      role="tab"
                      aria-controls="contact1"
                      aria-selected="false"
                    >
                      <span>
                        <img src="assets/img/Other.png" alt="Other" />
                      </span>
                      Others
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-10">
              <div class="row py-3">
                <div class="col">
                  <div class="product_search row align-items-center">
                    <div class="col-xxl-8 col">
                      <div class="row">
                        <div class="col">
                          <div class="product_show_top flex-md-nowrap flex-wrap d-flex align-items-center justify-content-md-start justify-content-center">
                            <a
                              class="product_comman_btn me-4"
                              href="javascript:;"
                            >
                              <img
                                src="assets/img/arrow-left-line.png"
                                alt="Back"
                              />
                              Back
                            </a>
                            <div class="dropdown comman_dropdown me-2">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Stations
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div class="dropdown comman_dropdown me-2">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Salesman
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <a class="product_comman_btn" href="javascript:;">
                              <img
                                src="assets/img/settings.png"
                                alt="Settings"
                              />
                              Settings
                            </a>
                          </div>
                        </div>
                        <div class="col-md-auto">
                          <Link class="customer_btn" to="/customer-files">
                            Customer File
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-auto mt-xl-0 mt-lg-3 mt-md-3 mt-3 text-end">
                      <span class="input_sale_value">
                        Input New Sale #00897
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div class="row product_main_outer">
                        <div class="col-xl-8 col-lg-7 px-0">
                          <div class="product_main_top">
                            <div class="row">
                              <div class="col-12 d-flex align-items-center justify-content-between mb-2">
                                <div class="choose_heading">
                                  <h3>
                                    Choose Variety <span>42+ Variety</span>
                                  </h3>
                                </div>
                              </div>

                              <div class="d-flex">
                                <div
                                  class="col-12 d-flex "
                                  style={{ overflowX: "hidden" }}
                                >
                                  <div class="choose_btn">
                                    <a href="javascript:;">Orange</a>
                                  </div>
                                  <div class="choose_btn">
                                    <a href="javascript:;" class="active">
                                      Apple
                                    </a>
                                  </div>
                                  <div class="choose_btn">
                                    <a href="javascript:;">Pemagrante</a>
                                  </div>
                                  <div class="choose_btn">
                                    <a href="javascript:;">Mango</a>
                                  </div>
                                  <div class="choose_btn">
                                    <a href="javascript:;">Watermelon</a>
                                  </div>
                                  <div class="choose_btn">
                                    <a href="javascript:;">Pemagrante</a>
                                  </div>
                                </div>
                                <div
                                  class="right-arrow"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal5"
                                >
                                  <i class="fa fa-angle-right"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="product_main_bottom">
                            <div class="product_show">
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal1"
                                href="javascript:;"
                                class="product_show_box"
                              >
                                <span>Granny Smith</span>
                                <img
                                  src="assets/img/greenapple-cleaning-granny.png"
                                  alt=""
                                />
                                <strong>315</strong>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-4 col-lg-5 px-0">
                          <div class="row order_bill mx-0">
                            <div class="col-12 order_bill_head">
                              <div class="row align-items-center">
                                <div class="col-md-auto text-md-start text-center">
                                  <strong>New Order Bill</strong>
                                </div>
                                <div class="col-sm text-md-end text-center mt-md-0 mt-2">
                                  <span>Thrusday, 14 April 2022 , 8:50 AM</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 p-md-4 p-3">
                              <div class="bill_details">
                                <div class="bill_details_mainn mb-2">
                                  <div class="accordion" id="accordionExample">
                                    <div class="accordion-item">
                                      <div
                                        class="accordion-header"
                                        id="headingOne"
                                      >
                                        <button
                                          class="accordion-button pt-0"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseOne"
                                          aria-expanded="true"
                                          aria-controls="collapseOne"
                                        >
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="top_details">
                                                Granny Smith
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="top_details">
                                                60.00
                                              </span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Unit/kg
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">1</span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Per Unit Price
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">
                                                $30.00
                                              </span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Supplier
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">
                                                Fred Fruits
                                              </span>
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                      <div
                                        id="collapseOne"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div class="accordion-body p-0 pb-2">
                                          <div class="row mx-auto">
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                data-bs-target="#exampleModal2"
                                                data-bs-toggle="modal"
                                                href="javscript:;"
                                              >
                                                Amend
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                href="javscript:;"
                                              >
                                                Return
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                href="javscript:;"
                                              >
                                                Void
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="delete_btnns"
                                                href="javscript:;"
                                              >
                                                <img
                                                  src="assets/img/Delete.png"
                                                  alt=""
                                                />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="accordion-item">
                                      <div
                                        class="accordion-header"
                                        id="headingtwo"
                                      >
                                        <button
                                          class="accordion-button"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapsetwo"
                                          aria-expanded="true"
                                          aria-controls="collapsetwo"
                                        >
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="top_details">
                                                Lady Pink
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="top_details">
                                                60.00
                                              </span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Unit/kg
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">1</span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Per Unit Price
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">
                                                $30.00
                                              </span>
                                            </div>
                                          </div>
                                          <div class="row py-1">
                                            <div class="col-6">
                                              <span class="mid_details">
                                                Supplier
                                              </span>
                                            </div>
                                            <div class="col-6 text-end">
                                              <span class="mid_details">
                                                Fred Fruits
                                              </span>
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                      <div
                                        id="collapsetwo"
                                        class="accordion-collapse collapse"
                                        aria-labelledby="headingtwo"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div class="accordion-body p-0 pb-2">
                                          <div class="row mx-auto">
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                data-bs-target="#exampleModal2"
                                                data-bs-toggle="modal"
                                                href="javscript:;"
                                              >
                                                Amend
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                href="javscript:;"
                                              >
                                                Return
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="amed"
                                                href="javscript:;"
                                              >
                                                Void
                                              </a>
                                            </div>
                                            <div class="col-auto px-1">
                                              <a
                                                class="delete_btnns"
                                                href="javscript:;"
                                              >
                                                <img
                                                  src="assets/img/Delete.png"
                                                  alt=""
                                                />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="row py-1">
                                  <div class="col-6">
                                    <span class="mid_details">Total Unit</span>
                                  </div>
                                  <div class="col-6 text-end">
                                    <span class="mid_details">25</span>
                                  </div>
                                </div>
                                <div class="row py-1">
                                  <div class="col-6">
                                    <span class="mid_details">
                                      Total Amount
                                    </span>
                                  </div>
                                  <div class="col-6 text-end">
                                    <span class="mid_details">923</span>
                                  </div>
                                </div>
                              </div>
                              <div class="row bill_details_bottom align-items-center mt-3 justify-content-center">
                                <div class="col-md-6 px-md-2 d-flex align-items-center justify-content-center mb-md-0 mb-2">
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal3"
                                    class="pallets_out"
                                  >
                                    Pallets <br />
                                    out
                                  </span>
                                  <span class="datashow mx-2">20</span>
                                </div>
                                <div class="col-md-6 px-md-2 d-flex align-items-center justify-content-center">
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal4"
                                    class="pallets_out delivery_note"
                                  >
                                    Delivery <br />
                                    Note
                                  </span>
                                  <span class="datashow mx-2">20</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="row pay_refund_print">
                                <div class="col-12 comman_bill_head">
                                  <strong>All Inventory</strong>
                                </div>
                                <div class="col-12">
                                  <div class="row all_inventry align-items-center justify-content-center">
                                    <div class="col-md-4">
                                      <a href="javascript:;">Return</a>
                                    </div>
                                    <div class="col-auto px-md-0 text-center my-md-0 my-2">
                                      <span>Or</span>
                                    </div>
                                    <div class="col-md-4">
                                      <a href="javascript:;">Void</a>
                                    </div>
                                    <div class="col-md-3"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="row pay_refund_method">
                                <div class="col-12 comman_bill_head">
                                  <strong>Payment and refund method</strong>
                                </div>
                                <div class="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch">
                                  <span class="pay_refund_box w-100 text-center">
                                    Draft <br />
                                    Invoice
                                  </span>
                                </div>
                                <div class="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch">
                                  <span class="pay_refund_box w-100 text-center">
                                    Invoice
                                  </span>
                                </div>
                                <div class="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch">
                                  <span class="pay_refund_box w-100 text-center">
                                    Cash
                                  </span>
                                </div>
                                <div class="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch">
                                  <span class="pay_refund_box w-100 text-center">
                                    Card
                                  </span>
                                </div>
                                <div class="col-12 mt-md-4 mt-3">
                                  <button class="custom_btns" type="submit">
                                    Process
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    ></div>
                    <div
                      class="tab-pane fade"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                    ></div>
                    <div
                      class="tab-pane fade"
                      id="contact1"
                      role="tabpanel"
                      aria-labelledby="contact1-tab"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal fade product_artboard"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-body p-md-4 p-3">
              <button
                type="button"
                class="btn-close btn_modal_design"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div class="row artboard_main align-items-end mb-md-4 mb-3">
                <div class="col-md-5 d-flex justify-content-md-start justify-content-center">
                  <div class="setting_box_img">
                    <div class="setting_img">
                      <img
                        src="assets/img/greenapple-cleaning-granny.png"
                        alt=""
                      />
                    </div>
                    <strong>Granny Smith</strong>
                  </div>
                </div>
                <div class="col-md-7 artboard_table">
                  <div class="table-responsive mb-md-4 pb-md-2">
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <thead>
                          <tr>
                            <th>Price</th>
                            <th>Unit</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span class="artboard_data">$0.70</span>
                            </td>
                            <td>
                              <span class="artboard_data">8</span>
                            </td>
                            <td>
                              <span class="artboard_data">$5.60</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row artboard_bottomm">
                <div class="col-md-6">
                  <div class="artboard_form">
                    <form action="">
                      <div class="form-group mb-3">
                        <label for=""> Supplier </label>
                        <select class="form-select form-select-icon">
                          <option>Default Consignment</option>
                          <option>Teds Fruit Farm (#C1)</option>
                          <option>Johns Herbs (#C1)</option>
                          <option>Fred Fruit (#C1)</option>
                          <option>Teds Fruit Farm (#C1)</option>
                          <option>Johns Herbs (#C1)</option>
                          <option>Fred Fruit (#C1)</option>
                        </select>
                      </div>
                      <div class="table-responsive">
                        <table class="table mb-0">
                          <thead>
                            <tr>
                              <th>
                                Default <br />
                                Unit
                              </th>
                              <th>
                                Per Kg <br />
                                Source
                              </th>
                              <th>
                                Select <br />
                                Unit
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business1"
                                    name="businessss"
                                  />
                                  <label class="p-0" for="business1"></label>
                                </div>
                              </td>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business2"
                                    name="businessss1"
                                  />
                                  <label class="p-0" for="business2"></label>
                                </div>
                              </td>
                              <td>
                                <div class="unit_bg d-flex align-items-center justify-content-between">
                                  <span>Per Kg</span>
                                  <span>$1.20</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    checked
                                    id="business3"
                                    name="businessss"
                                  />
                                  <label class="p-0" for="business3"></label>
                                </div>
                              </td>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business8"
                                    name="businessss1"
                                  />
                                  <label class="p-0" for="business8"></label>
                                </div>
                              </td>
                              <td>
                                <div class="unit_bg d-flex align-items-center justify-content-between">
                                  <span>Bunch</span>
                                  <span>$1.20</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business4"
                                    name="businessss"
                                  />
                                  <label class="p-0" for="business4"></label>
                                </div>
                              </td>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    checked
                                    type="radio"
                                    id="business7"
                                    name="businessss1"
                                  />
                                  <label class="p-0" for="business7"></label>
                                </div>
                              </td>
                              <td>
                                <div class="unit_bg d-flex align-items-center justify-content-between">
                                  <span>12kg CTN</span>
                                  <span>$1.20</span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business5"
                                    name="businessss"
                                  />
                                  <label class="p-0" for="business5"></label>
                                </div>
                              </td>
                              <td>
                                <div class="Business_radio">
                                  <input
                                    class="d-none"
                                    type="radio"
                                    id="business6"
                                    name="businessss1"
                                  />
                                  <label class="p-0" for="business6"></label>
                                </div>
                              </td>
                              <td>
                                <div class="unit_bg d-flex align-items-center justify-content-between">
                                  <span>22L Tray</span>
                                  <span>$1.20</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="calculator_keyboard mt-md-0 mt-4">
                    <div class="row mx-0">
                      <div class="col-md-8">
                        <div class="row">
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              7
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              8
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              9
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              4
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              5
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              6
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              1
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              2
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              3
                            </button>
                          </div>
                          <div class="col-md-8 col-8 px-md-1 px-2 mb-3">
                            <button class="keyboard_btn" type="button">
                              0
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              .
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 d-flex align-items-start flex-wrap justify-content-center">
                        <button class="delete_btn_calcu">Delete</button>
                        <button class="add_btn_calcu">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade amed_modal"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header px-4">
              <h5 class="modal-title text-white">Amed</h5>
              <button
                type="button"
                class="btn-close btn_modal_design"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-md-4 p-3">
              <div class="row artboard_main align-items-end">
                <div class="col-md-12 d-flex justify-content-md-start justify-content-center">
                  <div class="row">
                    <div class="col-auto">
                      <div class="amed_img">
                        <img
                          src="assets/img/greenapple-cleaning-granny.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="col amed_content">
                      <strong>Granny Smith</strong>
                      <span>Apple</span>
                      <span>samson farm (#CI)</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 artboard_table py-3">
                  <div class="table-responsive">
                    <div class="table-responsive">
                      <table class="table mb-0">
                        <thead>
                          <tr>
                            <th>Price</th>
                            <th>Unit</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span class="artboard_data">$0.70</span>
                            </td>
                            <td>
                              <span class="artboard_data">8</span>
                            </td>
                            <td>
                              <span class="artboard_data">$5.60</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row artboard_bottomm">
                <div class="col-md-12">
                  <div class="calculator_keyboard mt-md-0 mt-0">
                    <div class="row mx-0">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              7
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              8
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              9
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              4
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              5
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              6
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              1
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              2
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              3
                            </button>
                          </div>
                          <div class="col-md-8 col-8 px-md-1 px-2 mb-3">
                            <button class="keyboard_btn" type="button">
                              0
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              .
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-6 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                            <button class="delete_btn_calcu">Delete</button>
                            <button class="add_btn_calcu save_btn">Save</button>
                          </div>
                          <div class="col-md-6 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                            <button class="same_arrow">
                              <img src="assets/img/arrow-up-fill.png" alt="" />
                            </button>
                            <button class="same_arrow">
                              <img
                                src="assets/img/arrow-down-fill.png"
                                alt=""
                              />
                            </button>
                            <button class="Undo_button">Undo</button>
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
      </div>

      <div
        class="modal fade pattels_out"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header px-4">
              <h5 class="modal-title text-white">Pallet Out</h5>
              <button
                type="button"
                class="btn-close btn_modal_design"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-md-4 p-3">
              <div class="row artboard_bottomm">
                <div class="col-md-12 mb-4">
                  <form class="pattels_out_form row mx-0" action="">
                    <div class="col-md-8">
                      <div class="row">
                        <div class="form-group col-4 px-md-1 px-2">
                          <span class="plus button"> + </span>
                        </div>
                        <div class="form-group col-4 px-md-1 px-2">
                          <input
                            class="form-control"
                            type="text"
                            name="qty"
                            id="qty"
                            maxlength="12"
                          />
                        </div>
                        <div class="form-group col-4 px-md-1 px-2">
                          <span class="min button"> - </span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 pe-md-0 mt-md-0 mt-2">
                      <label for="">Enter the number of pallets taken.</label>
                    </div>
                  </form>
                </div>
                <div class="col-md-12">
                  <div class="calculator_keyboard mt-md-0 mt-0">
                    <div class="row mx-0">
                      <div class="col-md-8">
                        <div class="row">
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              7
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              8
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              9
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              4
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              5
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              6
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              1
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              2
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              3
                            </button>
                          </div>
                          <div class="col-md-8 col-8 px-md-1 px-2 mb-3">
                            <button class="keyboard_btn" type="button">
                              0
                            </button>
                          </div>
                          <div class="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                            <button class="keyboard_btn" type="button">
                              .
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                        <button class="delete_btn_calcu">Delete</button>
                        <button class="add_btn_calcu">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade pattels_out delevery_note"
        id="exampleModal4"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header px-4">
              <h5 class="modal-title text-white">Delivery Note</h5>
              <button
                type="button"
                class="btn-close btn_modal_design"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-md-4 p-3">
              <div class="row">
                <div class="col-12">
                  <form class="row delevery_note_form" action="">
                    <div class="form-group col-12">
                      <label for="">Enter Your Deliver note below.</label>
                      <textarea
                        name="note"
                        id="note"
                        class="form-control"
                        placeholder="Type..."
                      ></textarea>
                    </div>
                    <div class="form-group mt-md-3 mt-2">
                      <button class="custom_btns" type="submit">
                        Add Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade settings_section"
        id="exampleModal5"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="row setting_box d-flex justify-content-between px-2">
                <div class="choose_heading">
                  <h3>Choose Category</h3>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Orange</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;" class="active">
                      Apple
                    </a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Pemagrante</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Mango</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Watermelon</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Guava</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Papaya</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Banana</a>
                  </div>
                </div>

                <div class="col-md-4  my-3">
                  <div class="choose_btn-detail">
                    <a href="javascript:;">Grapes</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSingle1;
