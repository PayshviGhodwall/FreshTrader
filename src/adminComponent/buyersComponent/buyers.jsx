import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  changeBuyerStatus,
  getBuyerList,
} from "../../apiServices/adminApiHandler/buyerApiHandler";

function Buyers() {
  const [sideBar, setSideBar] = useState(true);
  const [buyer, setBuyer] = useState({
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
        label: "Business Trading Name",
        field: "name",
        sort: "asc",
        width: 150,
      },

      {
        label: "Mobile Number",
        field: "mobile_number",
        sort: "asc",
        width: 100,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "Market Type",
        field: "type",
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
    getBuyerListing();
  }, []);

  const getBuyerListing = async () => {
    const { data } = await getBuyerList(0);
    if (!data.error) {
      const newRows = [];
      console.log(data);
      data.results.buyers.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1;
        // returnData.date = moment(list.createdAt).format("LL");
        returnData.name = list.business_trading_name;
        returnData.mobile_number = "+61" + list.phone_number;
        returnData.email = list.email;
        returnData.type = list.market;
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
              to={`/admin/buyer-detail/${list._id}`}
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </>
        );
        newRows.push(returnData);
      });

      setBuyer({ ...buyer, rows: newRows });
    }
  };

  const changeStatus = async (id) => {
    const { data } = await changeBuyerStatus(id);
    if (!data.error) {
      await getBuyerListing();
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
              Buyers Management
            </h1>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="">
                <MDBDataTable
                  bordered
                  hover
                  data={buyer}
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

export default Buyers;
