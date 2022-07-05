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
import {
  changeSupportStatus,
  deleteSupport,
  getSupport,
} from "../../apiServices/adminApiHandler/supportApiHandler";

function AdminSupport() {
  const [sideBar, setSideBar] = useState(true);
  const [support, setSupport] = useState({
    columns: [
      {
        label: "S No.",
        field: "sn",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
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
        label: "Subject",
        field: "subject",
        sort: "asc",
        width: 100,
      },
      {
        label: "Description",
        field: "concern",
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
    getSupportListing();
  }, []);

  const getSupportListing = async () => {
    const { data } = await getSupport({
      type: "Seller",
      from: "",
      till: "",
    });
    if (!data.error) {
      const newRows = [];
      console.log(data);
      data.results.supports.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1;
        returnData.date = moment(list.createdAt).format("LL");
        returnData.email = list.email;
        returnData.subject = list.subject;
        returnData.concern = list.concern;
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
            <Link class="product_comman_btn-view me-2 " to="/admin/view-chat">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </Link>
            <Link
              class="product_comman_btn-view ms-0"
              style={{ background: "red" }}
              to=""
              onClick={() => deleteSup(list._id)}
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </Link>
          </>
        );
        newRows.push(returnData);
      });

      setSupport({ ...support, rows: newRows });
    }
  };
  console.log(support);

  const changeStatus = async (id) => {
    const { data } = await changeSupportStatus(id);
    if (!data.error) {
      await getSupportListing();
    }
  };
  const deleteSup = async (id) => {
    const { data } = await deleteSupport(id);
    if (!data.error) {
      await getSupportListing();
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
              Support Management
            </h1>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="">
                <MDBDataTable
                  bordered
                  hover
                  data={support}
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

export default AdminSupport;
