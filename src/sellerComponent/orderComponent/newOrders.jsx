import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../apiServices/sellerApiHandler/orderApiHandler";
import Header from "../commonComponent/header";
import moment from "moment";

function NewOrders() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(0);
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageItem, setPageItem] = useState({});
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const [numOfButtons, setNumOfButtons] = useState([]);

  useEffect(() => {
    getOrder();
  }, [sortBy, currentPage]);

  const getOrder = async () => {
    const { data } = await getOrders("PENDING", sortBy);
    if (!data.error) {
      for (const or of data.results.orders) {
        or.units = or.product.reduce(function (a, b) {
          return a + b.quantity;
        }, 0);
      }
      setData(data.results.orders);
      await pagination(data.results.orders);
    }
  };

  const onPageChangeEvent = (start, end) => {
    console.log(start, end);

    setPageItem({
      start: start,
      end: end,
    });
  };

  const setPageNo = (item) => {
    const numOfPages = Math.ceil(item?.length / postPerPage);
    let numOfButtons = [];
    for (let i = 1; i <= numOfPages; i++) {
      numOfButtons.push(i);
    }
    console.log(numOfPages);
    setNumOfButtons(numOfButtons);
    return numOfButtons;
  };

  const prevPageClick = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageClick = () => {
    if (currentPage === numOfButtons.length) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeNumber = (data) => {
    setCurrentPage(data);
  };

  const pagination = (item) => {
    const pageNo = setPageNo(item);
    setPageItem({
      start: 0,
      end: postPerPage,
    });
    console.log(pageNo);

    let tempNumberOfButtons = [...arrOfCurrButtons];

    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (pageNo.length < 6) {
      tempNumberOfButtons = pageNo;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, pageNo.length];
    } else if (currentPage === 4) {
      const sliced = pageNo.slice(0, 5);
      tempNumberOfButtons = [...sliced, dotsInitial, pageNo.length];
    } else if (currentPage > 4 && currentPage < pageNo.length - 2) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = pageNo.slice(currentPage - 2, currentPage);
      // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = pageNo.slice(currentPage, currentPage + 1);
      // sliced1 (5, 5+1) -> [6]
      tempNumberOfButtons = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        pageNo.length,
      ];
      // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentPage > pageNo.length - 3) {
      // > 7
      const sliced = pageNo.slice(pageNo.length - 4);
      // slice(10-4)
      tempNumberOfButtons = [1, dotsLeft, ...sliced];
    } else if (currentPage === dotsInitial) {
      // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
      // arrOfCurrButtons[3] = 4 + 1 = 5
      // or
      // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
      // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6

      setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentPage === dotsRight) {
      setCurrentPage(arrOfCurrButtons[3] + 2);
    } else if (currentPage === dotsLeft) {
      setCurrentPage(arrOfCurrButtons[3] - 2);
    }
    console.log(tempNumberOfButtons);
    setArrOfCurrButtons(tempNumberOfButtons);
    const value = currentPage * postPerPage;

    onPageChangeEvent(value - postPerPage, value);
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
              <div class="col-sm mt-md-0 mt-3">
                <p class="partner_header text-white mb-0">
                  Unconfirmed Order are deleted after 48 hour.
                </p>
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
                  {data
                    ?.slice(pageItem.start, pageItem.end)
                    .map((item, index) => {
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
                              to={`/view-new-orders/${item._id}`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="table-filter-info d-flex justify-content-end mt-2">
                <div className="dt-pagination">
                  <ul className="dt-pagination-ul">
                    <li
                      className={`dt-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a className="dt-link" onClick={() => prevPageClick()}>
                        Prev
                      </a>
                    </li>
                    {arrOfCurrButtons?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={`dt-item ${
                            currentPage === item ? "active" : ""
                          }`}
                        >
                          <a
                            className="dt-link"
                            onClick={() => changeNumber(item)}
                          >
                            {item}
                          </a>
                        </li>
                      );
                    })}
                    <li
                      className={`dt-item ${
                        currentPage === numOfButtons.length ? "disabled" : ""
                      }`}
                    >
                      <a className="dt-link" onClick={() => nextPageClick()}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewOrders;
