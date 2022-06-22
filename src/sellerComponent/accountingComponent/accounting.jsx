import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStaffDetail } from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function Accounting() {
  const [staff, setStaff] = useState("");

  useEffect(() => {
    if (localStorage.getItem("staff")) getstaffInfo();
  }, []);

  const getstaffInfo = async () => {
    console.log(localStorage.getItem("staff"));
    const { data } = await getStaffDetail(localStorage.getItem("staff"));
    if (!data.error) {
      setStaff(data.results.staff);
    }
  };
  return (
    <>
      <Header />
      <section class="orders_page">
        <div class="container">
          <div class="row justify-content-center my-lg-3 py-md-4 py-3">
            <div class="col-xl-8 col-lg-10">
              <div class="row">
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/transactions">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/accounting/Transactions.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/accounting/Transactions_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Transactions</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/customer-file">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/accounting/Customer-Files.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/accounting/Customer-Files_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Customer files</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/supplier-index">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/accounting/Supplier_Index.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/accounting/Supplier_Index_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Supplier Index</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/smcs-report">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/accounting/SMCS_Report.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/accounting/SMCS_Report_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>SMCS Report</h2>
                  </Link>
                </div>
                {staff?.access?.includes(1) || !staff ? (
                  <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link class="header_menus_box d-block" to="/eod">
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="assets/img/accounting/End-of-Day.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="assets/img/accounting/End-of-Day-tab.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>End of day</h2>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {staff?.access?.includes(9) || !staff ? (
                  <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link class="header_menus_box d-block" to="/pallets">
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="assets/img/accounting/Pallets.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="assets/img/accounting/Pallets_tab.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>Pallets</h2>
                    </Link>
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Accounting;
