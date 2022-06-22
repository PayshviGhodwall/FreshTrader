import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import { getStaffDetail } from "../../apiServices/sellerApiHandler/settingApiHandler";

function Header() {
  const [seller, setSeller] = useState([]);
  const [staff, setStaff] = useState("");

  useEffect(() => {
    getsellerInfo();
    if (localStorage.getItem("staff")) getstaffInfo();
  }, []);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();
    if (!data.error) {
      setSeller(data.results.seller);
    }
  };

  const getstaffInfo = async () => {
    console.log(localStorage.getItem("staff"));
    const { data } = await getStaffDetail(localStorage.getItem("staff"));
    if (!data.error) {
      setStaff(data.results.staff);
    }
  };
  if (!seller) return null;
  return (
    <>
      <div
        class="offcanvas offcanvas-top header_menus_moadl"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-body">
          <div class="container">
            <div class="row justify-content-center py-md-4 py-3">
              <div class="col-xl-8 col-lg-10">
                <div class="row">
                  {staff?.access?.includes(2) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link
                        class="header_menus_box d-block"
                        to="/product-single"
                      >
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite1.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor1.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>Input Sale</h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  {staff?.access?.includes(3) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link
                        class="header_menus_box d-block"
                        to="/input-bussiness-sale"
                      >
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite2.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor2.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>
                          Input <br />
                          Business Sale
                        </h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  {staff?.access?.includes(11) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link class="header_menus_box d-block" to="/purchase">
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite3.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor3.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>Purchases</h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link class="header_menus_box d-block" to="/orders">
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="../assets/img/iconwhite4.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="../assets/img/iconcolor4.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>Orders</h2>
                    </Link>
                  </div>
                  {staff?.access?.includes(5) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link class="header_menus_box d-block" to="/product">
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite5.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor5.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>Products</h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  {staff?.access?.includes(7) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link class="header_menus_box d-block" to="/inventory">
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite6.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor6.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>Inventory</h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  {staff?.access?.includes(8) || !staff ? (
                    <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                      <Link class="header_menus_box d-block" to="/accounting">
                        <div class="menus_icon">
                          <img
                            class="white_img"
                            src="../assets/img/iconwhite7.png"
                            alt="Icon"
                          />
                          <img
                            class="color_img"
                            src="../assets/img/iconcolor7.png"
                            alt="Icon"
                          />
                        </div>
                        <h2>Accounting</h2>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <div class="col-xl-3 col-lg-3 col-md-6 mb-md-4 mb-3 d-flex align-items-stretch">
                    <Link class="header_menus_box d-block" to="/setting">
                      <div class="menus_icon">
                        <img
                          class="white_img"
                          src="../assets/img/iconwhite8.png"
                          alt="Icon"
                        />
                        <img
                          class="color_img"
                          src="../assets/img/iconcolor8.png"
                          alt="Icon"
                        />
                      </div>
                      <h2>Settings</h2>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header class="header">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-lg-3 col-md-auto col">
              <Link class="header_logo" to="/">
                <img src="../assets/img/logo.png" alt="LOGO" />
              </Link>
            </div>
            <div class="col-auto ps-md-3 ps-0">
              <button
                class="menus_toggle"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <img src="../assets/img/Home_icon.png" alt="Home" />
              </button>
            </div>
            <div class="col-lg-3 col-md-auto col-auto text-end ps-md-3 ps-0">
              <div class="dropdown profile_dropdown">
                <button
                  class="btn ms-auto"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>
                    <img
                      src={`${process.env.REACT_APP_APIENDPOINTNEW}${seller.profile_image}`}
                    />
                  </span>
                  {seller.business_trading_name}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link class="dropdown-item" to="/account-setting">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/logout">
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
