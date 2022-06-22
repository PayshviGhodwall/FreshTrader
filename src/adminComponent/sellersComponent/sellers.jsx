import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import {
  changeSellerStatus,
  getSellerList,
} from "../../apiServices/adminApiHandler/sellerApiHandler";
import moment from "moment";

function Sellers() {
  const [sideBar, setSideBar] = useState(true);
  const [seller, setSeller] = useState({
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
    getSellerListing();
  }, []);

  const getSellerListing = async () => {
    const { data } = await getSellerList(0);
    if (!data.error) {
      const newRows = [];
      console.log(data);
      data.results.sellers.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1;
        // returnData.date = moment(list.createdAt).format("LL");
        returnData.name = list.business_trading_name;
        returnData.mobile_number = "+61" + list.phone_number;
        returnData.email = list.email;
        returnData.type = list.market;
        returnData.status = (
          <div class="mytoggle mt-2">
            <label class="switch">
              <input
                type="checkbox"
                checked={list.status}
                onChange={() => changeStatus(list._id)}
              />
              <span class="slider round"></span>
            </label>
          </div>
        );

        returnData.action = (
          <>
            <Link
              class="product_comman_btn-view ms-0"
              to={`/admin/seller-detail/${list._id}`}
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      console.log([{ ...seller, rows: newRows }]);

      setSeller({ ...seller, rows: newRows });
    }
  };
  console.log(seller);

  const changeStatus = async (id) => {
    const { data } = await changeSellerStatus(id);
    if (!data.error) {
      await getSellerListing();
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
            <h1 className="d-flex justify-content-between py-2">
              Sellers Management
              <Link class="product_comman_btn ms-0" to="/admin/add-seller">
                Add New Seller
              </Link>
            </h1>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="">
                <MDBDataTable
                  bordered
                  hover
                  data={seller}
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

export default Sellers;
