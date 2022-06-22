import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  changeOrderStatus,
  getOrderDetails,
} from "../../apiServices/sellerApiHandler/orderApiHandler";
import { getProductConsignments } from "../../apiServices/sellerApiHandler/inputBusinessSaleApiHandler";

function ViewConfirmOrders() {
  const [data, setData] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrDetails();
  }, []);

  const getOrDetails = async () => {
    const { data } = await getOrderDetails(id);
    if (!data.error) {
      console.log(data);
      for (const product of data.results.order.product) {
        product.consignmentList = await getConsignments(product.product._id);
      }
      setData(data.results.order);
    }
  };
  const getConsignments = async (productId) => {
    const { data } = await getProductConsignments({ productId });
    if (!data.error) {
      return data.results.consignments;
    }
  };
  const changeConsignment = async (id, index) => {
    let productData = { ...data };
    const consignment = productData.product[index].consignmentList.filter(
      (a) => String(a._id) === String(id)
    );
    productData.product[index].consignment = consignment[0];
    setData(productData);
  };

  const declineConfirmOrders = async (status) => {
    const { data } = await changeOrderStatus(id, status);
    if (!data.error) {
      navigate("/confirm-orders");
    }
  };
  return (
    <>
      <Header />
      <section class="similler_order">
        <div class="container">
          <div class="row py-3 align-items-start">
            <div class="col-md-auto mb-md-0 mb-2">
              <Link class="product_comman_btn m-0" to="/confirm-orders">
                <img src="../assets/img/arrow-left-line.png" alt="Back" />
                Back
              </Link>
            </div>
            <div class="col">
              <div class="order_top_mains">
                <div class="row">
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Order Date</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{moment(data.createdAt).format("LL")}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Buyer</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{data.buyer?.business_trading_name}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Phone</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{data.phone_number}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Notes</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{data.notes}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Pickup Date</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>
                          {moment(data.pick_up_date).format(
                            "ddd, MMMM Do YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Pickup Time</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{data.pick_up_time}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div class="row order_top_box align-items-center">
                      <div class="col-5">
                        <strong>Trans Type</strong>
                      </div>
                      <div class="col-auto px-0">
                        <span class="text-white">:</span>
                      </div>
                      <div class="col pe-0">
                        <span>{data.payment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="similler_order_table comman_table_design">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Variety</th>
                    <th>Type</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                    <th>SELECT SUPPLIER (CON#) </th>
                  </tr>
                </thead>
                <tbody>
                  {data.product?.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.product.variety.variety}</td>
                        <td>{item.product.type.type}</td>
                        <td>{item.product.units.unit}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <select
                            class="form-select table_select form-select-icon"
                            aria-label="Default select example"
                            onChange={(e) =>
                              changeConsignment(e.target.value, index)
                            }
                          >
                            <option value="">
                              Select Supplier (Consignment ID)
                            </option>
                            {item.consignmentList.map((cons, index2) => (
                              <option value={cons._id}>
                                {cons.supplier.business_trading_name} (#
                                {cons.consign})
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div class="row justify-content-center py-4">
            <div class="col-auto text-center">
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn tables_red_btn"
                to=""
                onClick={() => declineConfirmOrders("CANCELED")}
              >
                Cancel
              </Link>

              <button
                className="product_comman_btn dropdown-toggle mx-md-3 mb-md-0 mb-2"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ border: "none" }}
              >
                Stations
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>

              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
              >
                Print Order PDF
              </Link>
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
              >
                Print Order Docket
              </Link>

              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
              >
                Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewConfirmOrders;
