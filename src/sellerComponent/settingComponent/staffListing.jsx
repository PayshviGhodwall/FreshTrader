import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { getStaff } from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function StaffListing() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaffListing();
  }, []);

  const getStaffListing = async () => {
    const { data } = await getStaff();
    if (!data.error) {
      setStaff(data.results.staffs);
    }
  };

  return (
    <>
      <Header />
      <section class="Supplier_index">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-sm">
              <div class="product_search">
                <form
                  action=""
                  class="row align-items-center justify-content-md-between justify-content-start"
                >
                  {/* <div class="col-xl-5 col-lg-6 col-md-7 ps-md-0 mb-md-0 mb-2">
                    <div class="form-group d-flex">
                      <input
                        type="search"
                        class="form-control"
                        id="search"
                        name="search"
                        placeholder="Search Product or Supplier..."
                      />
                      <button class="search_btn" type="submit">
                        <img src="assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div> */}
                  <div class="justify-content-end d-flex">
                    <Link class="product_comman_btn ms-0" to="/add-staff">
                      Add Staff Account
                    </Link>
                    <Link class="product_comman_btn ms-3" to="/salesman">
                      Add Salesman
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="Supplier_index_table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>S No.</th>
                    <th>Date</th>
                    <th>Userame</th>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{moment(item.createdAt).format("LL")}</td>
                        <td>{item.username}</td>
                        <td>{item.role}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>
                          <Link
                            class="tables_btns tables_green_btn "
                            style={{}}
                            to={`/edit-staff/${item._id}`}
                          >
                            <i class="fa fa-edit" aria-hidden="true"></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StaffListing;
