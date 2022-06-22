import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import moment from "moment";
import { getSubscriptionDetail } from "../../apiServices/adminApiHandler/subscriptionApiHandler";
import { useParams } from "react-router-dom";
function SubscriptionDetail() {
  const [sideBar, setSideBar] = useState(true);
  const [subscription, setSubscription] = useState({
    columns: [
      {
        label: "S No.",
        field: "sn",
        sort: "asc",
        width: 150,
      },
      {
        label: "Plan Name",
        field: "plan_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Buyer Name",
        field: "buyer_name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Purchased On",
        field: "purchased_on",
        sort: "asc",
        width: 100,
      },
      {
        label: "Valid Till",
        field: "valid_till",
        sort: "asc",
        width: 100,
      },
      {
        label: "Plan Price",
        field: "plan_price",
        sort: "asc",
        width: 150,
      },
      {
        label: "Plan Status",
        field: "plan_status",
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
  let { id } = useParams();
  const sideBarValue = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    const formData = {
      subscriptionId: id,
    };
    const { data } = await getSubscriptionDetail(formData);
    if (!data.error) {
      const newRows = [];
      console.log(data);
      data.results.history.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1;
        returnData.plan_name = list.plan.plan_name;
        returnData.buyer_name = list.buyer.business_trading_name;
        returnData.purchased_on = moment(list.createdAt).format("LLL");
        returnData.valid_till = moment(list.valid_till).format("LLL");
        returnData.plan_price = list.plan.plan_price;
        returnData.plan_status = (
          <Link
            className={
              list.status === "Active"
                ? "tables_btn_design bg-green-color"
                : "tables_btn_design bg-danger-color"
            }
            to=""
          >
            {list.status}
          </Link>
        );
        returnData.action = (
          <>
            <Link
              className="product_comman_btn-view ms-0"
              to={`/admin/buyer-detail/${list.buyer._id}`}
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

export default SubscriptionDetail;
