import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStaffDetail } from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function Setting() {
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
        {" "}
        <div class="container">
          <div class="row justify-content-center my-lg-3 py-md-4 py-3">
            <div class="col-xl-8 col-lg-10">
              <div class="row">
                {staff?.access?.includes(4) || !staff ? (
                  <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link
                      class="header_menus_box d-block"
                      to="/account-setting"
                    >
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="assets/img/settings_menus/account-settings.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="assets/img/settings_menus/Account-Settings_tab.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>Account Settings</h2>
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {staff?.access?.includes(12) || !staff ? (
                  <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link class="header_menus_box d-block" to="/pos-layout">
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="assets/img/settings_menus/PoS_Layout.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="assets/img/settings_menus/PoS_Layout_tab.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>Pos Layout</h2>
                    </Link>
                  </div>
                ) : (
                  ""
                )}{" "}
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/station-device">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/settings_menus/Stations_Devices.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/settings_menus/Stations_Devices_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Stations & Device</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/partner-buyers">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/settings_menus/Partner_Buyers.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/settings_menus/Partner_Buyers_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Partners Buyers</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/staff">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/settings_menus/Salesmen.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/settings_menus/Salesman_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Staff</h2>
                  </Link>
                </div>
                <div class="px-lg-4 col-xl-4 col-lg-4 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                  <Link class="header_menus_box d-block" to="/support">
                    <div class="menus_icon">
                      <img
                        class="white_img"
                        src="assets/img/settings_menus/Support.png"
                        alt="Icon"
                      />
                      <img
                        class="color_img"
                        src="assets/img/settings_menus/Support_tab.png"
                        alt="Icon"
                      />
                    </div>
                    <h2>Support</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Setting;
