import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeConsignmentStatus,
  deleteConsignment,
  getConsignments,
} from "../../apiServices/sellerApiHandler/purchaseApiHandler";
import Header from "../commonComponent/header";

function Purchase() {
  const [cons, setCons] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getPurchaseList();
  }, [search, sort, filter, date]);

  const getPurchaseList = async () => {
    const { data } = await getConsignments(search, sort, filter, date);
    if (!data.error) {
      setCons(data.results.consignments);
    }
  };
  const completeCons = async (id, status) => {
    const formData = {
      consignmentId: id,
      status: status,
    };
    const { data } = await changeConsignmentStatus(formData);
    if (!data.error) {
      await getPurchaseList();
    }
  };

  const deleteCons = async (id) => {
    const { data } = await deleteConsignment(id);
    if (!data.error) {
      await getPurchaseList();
    }
  };

  return (
    <>
      <Header />
      <section class="purchses_page">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-lg-4 col-md-6 mb-lg-0 mb-md-2 mb-2">
              <form class="date_select row" action="">
                <div class="form-group col pe-0">
                  <input class="form-control" type="date" id="date" />
                </div>
                <div class="form-group col-auto ps-0">
                  <Link
                    class="product_comman_btn border-0"
                    onClick={() =>
                      setDate(document.getElementById("date").value)
                    }
                    to=""
                  >
                    Select date
                  </Link>
                </div>
              </form>
            </div>
            <div class="col px-xxl-4 mb-lg-0 mb-md-2 mb-2">
              <div class="row mx-0">
                <div class="col-md-auto col-6 px-1">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn  dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#000!important" }}
                    >
                      Sort By
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(1)}
                        >
                          Supplier
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(2)}
                        >
                          Documents
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(3)}
                        >
                          Priced
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(4)}
                        >
                          Value High'
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(5)}
                        >
                          Value Low
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(6)}
                        >
                          Completion date (Earliest)
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setSort(7)}
                        >
                          Completion Date (Lastest)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-auto col-6 px-1">
                  <div class="dropdown comman_dropdown mx-0">
                    <button
                      class="product_comman_btn  dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#000!important" }}
                    >
                      Filter
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(1)}
                        >
                          Active
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(2)}
                        >
                          On Hold
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(3)}
                        >
                          Complete
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(4)}
                        >
                          Awaiting Delivery
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(5)}
                        >
                          Documents Complete
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(5)}
                        >
                          Documents Missing
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(6)}
                        >
                          Priced
                        </Link>
                      </li>
                      <li>
                        <Link
                          class="dropdown-item"
                          to=""
                          onClick={() => setFilter(7)}
                        >
                          Price Pending
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-3 col-md-6 product_search mb-md-0 mb-2">
              <form action="" class="row align-items-center">
                <div class="col">
                  <div class="form-group d-flex">
                    <input
                      type="search"
                      class="form-control"
                      id="search"
                      name="search"
                      placeholder="Search Supplier..."
                      onChange={(e) => setSearch(e.target.value)}
                      autoComplete="off"
                    />
                    <button class="search_btn" type="submit">
                      <img src="assets/img/Search.png" alt="Search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-auto">
              <Link class="customer_btn ms-0" to="/add-consignment">
                Add <br /> Consignment
              </Link>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="purchses_page_table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Supplier</th>
                    <th>Type</th>
                    <th>
                      #CON. <br /> NOTE
                    </th>
                    <th>ID</th>
                    <th>Documents</th>
                    <th>Priced</th>
                    <th>Value ($)</th>
                    <th>SOld (%)</th>
                    <th>
                      Completion <br /> Date
                    </th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cons.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.supplier.business_trading_name}</td>
                        <td>{item.type}</td>
                        <td>{item.consign_notes}</td>
                        <td>{item.con_id}</td>
                        <td>{item.documents}</td>
                        <td>{item.priced}</td>
                        <td>{item.value}</td>
                        <td>{Math.round(item.sold_percentage)}%</td>
                        <td>
                          {" "}
                          {item.status === "COMPLETE"
                            ? moment(item.completion_date).format("LL")
                            : ""}
                        </td>
                        <td>{item.status}</td>
                        <td>
                          <div class="dropdown table_dropdown">
                            <button
                              class="btn "
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img src="assets/img/dots.png" alt="" />
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() =>
                                    completeCons(item._id, "ACTIVE")
                                  }
                                >
                                  Make Active
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() =>
                                    completeCons(item._id, "ON HOLD")
                                  }
                                >
                                  Put On Hold
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to={`/create-consignment/${item._id}`}
                                >
                                  Amend
                                </Link>
                              </li>
                              <li>
                                <Link class="dropdown-item" to="">
                                  Print A4 Info
                                </Link>
                              </li>
                              <li>
                                <Link
                                  class="dropdown-item"
                                  to=""
                                  onClick={() => deleteCons(item._id)}
                                >
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
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

export default Purchase;
