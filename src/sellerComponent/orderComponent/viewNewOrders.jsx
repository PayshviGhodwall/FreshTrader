import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  changeOrderStatus,
  getOrderDetails,
} from "../../apiServices/sellerApiHandler/orderApiHandler";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ViewNewOrders() {
  const [data, setData] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrDetails();
  }, []);

  const getOrDetails = async () => {
    const { data } = await getOrderDetails(id);
    if (!data.error) {
      setData(data.results.order);
    }
  };
  const declineConfirmOrders = async (status) => {
    const { data } = await changeOrderStatus(id, status);
    if (!data.error) {
      if (status === "CONFIRMED") {
        navigate("/confirm-orders");
      } else navigate("/new-orders");
    }
  };
  return (
    <>
      <Header />{" "}
      <section class="similler_order">
        <div class="container">
          <div class="row py-3 align-items-start">
            <div class="col-md-auto mb-md-0 mb-2">
              <Link class="product_comman_btn m-0" to="/new-orders">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div class="row justify-content-center py-4">
            <div class="col-8 text-center">
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_red_btn"
                to=""
                onClick={() => declineConfirmOrders("CANCELED")}
              >
                Decline
              </Link>
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2"
                to={`/counter-offer/${id}`}
              >
                Counter Offer
              </Link>
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
                onClick={() => declineConfirmOrders("CONFIRMED")}
              >
                Confirm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewNewOrders;
