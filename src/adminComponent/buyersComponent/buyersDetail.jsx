import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { Link } from "react-router-dom";
import moment from "moment";
import { getBuyerData } from "../../apiServices/adminApiHandler/buyerApiHandler";
import { useParams } from "react-router-dom";
function BuyerDetail() {
  const [sideBar, setSideBar] = useState(true);
  const [buyer, setBuyer] = useState("");
  const [history, setHistory] = useState([]);
  let { id } = useParams();
  const sideBarValue = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const { data } = await getBuyerData(id);
    if (!data.error) {
      setBuyer(data.results.buyer);
      setHistory(data.results.history);
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
                              {buyer.business_trading_name}
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
                            <span className="text-white">{buyer.email}</span>
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
                              {buyer.phone_number}
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
                            <span className="text-white">{buyer.market}</span>
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
                              {buyer.is_smcs ? "Yes" : "No"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row buyers_table box_design">
                      <div className="col-12">
                        <h2 className="bx-head">Plan Info</h2>
                      </div>
                      <div className="col-12">
                        <div className="bg-white overflow-hidden rounded table_design">
                          <div className="table_responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>S. No.</th>
                                  <th>Plan Name</th>
                                  <th>Plan Purchased Date</th>
                                  <th>Plan Expiry Date</th>
                                  <th>Plan Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {history.map((item, index) => (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.plan.plan_name}</td>
                                    <td>
                                      {moment(item.createdAt).format("LLL")}
                                    </td>
                                    <td>
                                      {moment(item.valid_till).format("LLL")}
                                    </td>
                                    <td>
                                      <Link
                                        className={
                                          item.status === "Active"
                                            ? "tables_btn_design bg-green-color"
                                            : "tables_btn_design bg-danger-color"
                                        }
                                        to=""
                                      >
                                        {item.status}
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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

export default BuyerDetail;
