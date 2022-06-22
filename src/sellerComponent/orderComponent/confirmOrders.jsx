import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../apiServices/sellerApiHandler/orderApiHandler";
import Header from "../commonComponent/header";
import moment from "moment";

function ConfirmOrders() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(0);

  useEffect(() => {
    ConfirmOrders();
  }, [sortBy]);

  const ConfirmOrders = async () => {
    const { data } = await getOrders("CONFIRMED", sortBy);
    if (!data.error) {
      for (const or of data.results.orders) {
        or.units = or.product.reduce(function (a, b) {
          return a + b.quantity;
        }, 0);
      }
      setData(data.results.orders);
    }
  };
  return (
    <>
      <Header />
      <section class="confirmed_page">
        <div class="container-fluid px-0">
          <div class="container text-center">
            <div class="row py-3 align-items-center">
              <div class="col-auto dropdown comman_dropdown mx-0">
                <button
                  class="product_comman_btn dropdown-toggle ms-0"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link
                      class="dropdown-item"
                      to=""
                      onClick={() => setSortBy(1)}
                    >
                      Order Date (Earliest)
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to=""
                      onClick={() => setSortBy(2)}
                    >
                      Order Date (Latest)
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to=""
                      onClick={() => setSortBy(3)}
                    >
                      Pick Up Time (Earliest)
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to=""
                      onClick={() => setSortBy(4)}
                    >
                      Pick Up Time (Latest)
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="confirmed_page_table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Order Date</th>
                    <th>Pick Up Date</th>
                    <th>Pick Up Time</th>
                    <th>Buyer</th>
                    <th>Products</th>
                    <th>Units</th>
                    <th>Trans Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{moment(item.createdAt).format("LL")}</td>
                        <td>{moment(item.pick_up_date).format("LL")}</td>
                        <td>{item.pick_up_time}</td>
                        <td>{item.buyer.business_trading_name}</td>
                        <td>{item.product.length}</td>
                        <td>{item.units}</td>
                        <td>{item.payment}</td>
                        <td>
                          <Link
                            class="tables_btns tables_green_btn"
                            to={`/view-confirm-orders/${item._id}`}
                          >
                            View
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

export default ConfirmOrders;
