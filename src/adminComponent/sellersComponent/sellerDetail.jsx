import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { Link } from "react-router-dom";
import moment from "moment";
import { getBuyerData } from "../../apiServices/adminApiHandler/buyerApiHandler";
import { useParams } from "react-router-dom";
import { getSellerData } from "../../apiServices/adminApiHandler/sellerApiHandler";
function SellerDetail() {
  const [sideBar, setSideBar] = useState(true);
  const [seller, setSeller] = useState("");

  let { id } = useParams();
  const sideBarValue = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await getSellerData(id);
    if (!data.error) {
      setSeller(data.results.seller);
    }
  };

  return (
    <>
      <AdminHeader sideBarValue={sideBarValue} sideBar={sideBar} />
      <div className="content-wrapper d-flex">
        <aside className="main-sidebar">
          <SideBar sideBar={sideBar} />
        </aside>

        <div
          className={
            sideBar ? "admin-content" : "admin-content admin-content-mini"
          }
        >
          <div className="admin_main">
            <div className="admin_main_inner">
              <div className="admin_panel_data p-5">
                <div className="row buyers_profile_part justify-content-center">
                  <div className="col-md-12 mb-5">
                    <div className="form_designpd box_design row justify-content-center">
                      <div className="col-12 mb-5">
                        <h2>Buyer Details</h2>
                      </div>
                      <div className="form-group col-12 mb-md-3 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Business Trading Name
                            </label>
                          </div>
                          <div className="col-md-2 d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col-md-5 d-md-block d-none">
                            <span className="text-white">
                              {seller.business_trading_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-3 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Email Address
                            </label>
                          </div>
                          <div className="col-md-2 d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col-md-5 d-md-block d-none">
                            <span className="text-white">{seller.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-3 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Phone Number
                            </label>
                          </div>
                          <div className="col-md-2 d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col-md-5 d-md-block d-none">
                            <span className="text-white">
                              {seller.phone_number}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-3 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2">
                            <label className="mb-0 form_tag">
                              Your Market Type
                            </label>
                          </div>
                          <div className="col-md-2 d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col-md-5 d-md-block d-none">
                            <span className="text-white">{seller.market}</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mb-md-3 mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 mb-md-0 mb-2 pe-0">
                            <label className="mb-0 form_tag">
                              Is your business part of SMCS? <br />
                              (Sydney Market Credit Service)
                            </label>
                          </div>
                          <div className="col-md-2 d-md-block d-none">
                            <span className="text-white">:</span>
                          </div>
                          <div className="col-md-5 d-md-block d-none">
                            <span className="text-white">
                              {seller.is_smcs ? "Yes" : "No"}
                            </span>
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

export default SellerDetail;
