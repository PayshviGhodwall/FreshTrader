import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminData } from "../../apiServices/adminApiHandler/adminLoginApiHandler";

function AdminHeader({ sideBarValue, sideBar }) {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    getAdminInfo();
  }, []);

  const getAdminInfo = async () => {
    const { data } = await getAdminData();
    if (!data.error) {
      setAdminData(data.results.admin);
    }
  };
  return (
    <>
      <header
        class="header py-2"
        style={{ background: "#5f6874", border: "none" }}
      >
        <div class="container">
          <div class="d-flex justify-content-between">
            <span
              class={sideBar ? "bar-icon" : "bar-icon bar-icon-mini"}
              onClick={() => sideBarValue()}
            >
              <i
                class="fa fa-bars"
                style={{ marginTop: "22px" }}
                aria-hidden="true"
              ></i>
            </span>

            <div class="dropdown profile_dropdown">
              <button
                class="btn ms-auto"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "#fff" }}
              >
                <span className="head_img">
                  <img
                    src={`${process.env.REACT_APP_APIENDPOINTNEW}${adminData.profile_image}`}
                    alt=""
                  />
                </span>
                {adminData.full_name}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link class="dropdown-item" to="">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link class="dropdown-item" to="">
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
