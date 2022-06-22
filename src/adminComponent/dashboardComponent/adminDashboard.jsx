import React, { useEffect, useState } from "react";
import { getDashboardCount } from "../../apiServices/adminApiHandler/adminLoginApiHandler";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";

function AdminDashboard() {
  const [sideBar, setSideBar] = useState(true);
  const [dashboard, setDashboard] = useState("");

  const sideBarValue = () => {
    setSideBar(!sideBar);
  };
  useEffect(() => {
    getDashboardDetail();
  }, []);

  const getDashboardDetail = async () => {
    const { data } = await getDashboardCount();
    if (!data.error) {
      setDashboard(data.results);
    }
  };

  return (
    <>
      <AdminHeader sideBarValue={sideBarValue} sideBar={sideBar} />
      <div class="content-wrapper d-flex">
        <aside class="main-sidebar">
          <SideBar sideBar={sideBar} />
        </aside>

        <div
          class={sideBar ? "admin-content" : "admin-content admin-content-mini"}
        >
          <div class="content-header sty-one tooltippp ">
            <h1 className="d-flex justify-content-between py-2">DashBoard</h1>
            <div class="admin_main">
              <div class="admin_main_inner">
                <div class="admin_header">
                  <div class="row mx-0">
                    <div class="col">
                      <a class="sidebar_btn" href="javscript:;">
                        <i class="far fa-bars"></i>
                      </a>
                    </div>
                    <div class="col-auto"></div>
                  </div>
                </div>
                <div class="admin_panel_data height_adjust p-5">
                  <div class="row dashboard_part mt-5 justify-content-center">
                    <div class="col-8">
                      <div class="row justify-content-center">
                        <div class="col-md-6 mb-4">
                          <div class="row dashboard_box box_design mx-0">
                            <div class="col-auto">
                              <span class="dashboard_icon">
                                <i class="fas fa-user"></i>
                              </span>
                            </div>
                            <div class="col">
                              <div class="dashboard_boxcontent">
                                <h2>Total Users</h2>
                                <span>0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="row dashboard_box box_design mx-0">
                            <div class="col-auto">
                              <span class="dashboard_icon">
                                <i class="fas fa-books"></i>
                              </span>
                            </div>
                            <div class="col">
                              <div class="dashboard_boxcontent">
                                <h2>Total Buyers</h2>
                                <span>{dashboard.buyerCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="row dashboard_box box_design mx-0">
                            <div class="col-auto">
                              <span class="dashboard_icon">
                                <i class="fas fa-sack-dollar"></i>
                              </span>
                            </div>
                            <div class="col">
                              <div class="dashboard_boxcontent">
                                <h2>Total Revenue</h2>
                                <span>$ {dashboard.sellerCount}</span>
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
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
