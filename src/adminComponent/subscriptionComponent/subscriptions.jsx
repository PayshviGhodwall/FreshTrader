import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  changeSubscriptionStatus,
  getSubscriptionList,
} from "../../apiServices/adminApiHandler/subscriptionApiHandler";

function Subscriptions() {
  const [sideBar, setSideBar] = useState(true);
  const [subscription, setSubscription] = useState({
    columns: [
      {
        label: "S No.",
        field: "sn",
        sort: "asc",
        width: 150,
      },
      //   {
      //     label: "Date",
      //     field: "date",
      //     sort: "asc",
      //     width: 100,
      //   },
      {
        label: "Plan Name",
        field: "plan_name",
        sort: "asc",
        width: 150,
      },

      {
        label: "Plan Duration",
        field: "plan_duration",
        sort: "asc",
        width: 100,
      },
      {
        label: "Plan Price",
        field: "plan_price",
        sort: "asc",
        width: 100,
      },
      {
        label: "Plan Features",
        field: "plan_features",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  const sideBarValue = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    getSubscriptionListing();
  }, []);

  const getSubscriptionListing = async () => {
    const { data } = await getSubscriptionList();
    if (!data.error) {
      const newRows = [];
      console.log(data);
      data.results.subscriptions.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1;
        // returnData.date = moment(list.createdAt).format("LL");
        returnData.plan_name = list.plan_name;
        returnData.plan_duration = list.plan_duration;
        returnData.plan_price = list.plan_price;
        returnData.plan_features = list.plan_features;
        returnData.status = (
          <div className="mytoggle mt-2">
            <label className="switch">
              <input
                type="checkbox"
                checked={list.status}
                onChange={() => changeStatus(list._id)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        );

        returnData.action = (
          <>
            <Link
              className="product_comman_btn-view ms-0"
              to={`/admin/subscription-detail/${list._id}`}
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </>
        );
        newRows.push(returnData);
      });

      setSubscription({ ...subscription, rows: newRows });
    }
  };

  const changeStatus = async (id) => {
    const { data } = await changeSubscriptionStatus(id);
    if (!data.error) {
      await getSubscriptionListing();
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
          <div className="content-header sty-one tooltippp ">
            <h1 className="d-flex justify-content-between py-2">
              Subscription Management
            </h1>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="">
                <MDBDataTable
                  bordered
                  hover
                  data={subscription}
                  noBottomColumns
                  sortable
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscriptions;
