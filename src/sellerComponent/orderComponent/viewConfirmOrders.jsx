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
import { toast } from "react-toastify";

function ViewConfirmOrders() {
  const [data, setData] = useState("");
  const [processed, setProcessed] = useState(false);
  const [processedData, setProcessedData] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrDetails();
    if (processed)
      navigate(`/business-pos/${processedData.buyerId}`, {
        state: { data: processedData },
      });
  }, [processed]);

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
  const processOrder = async () => {
    console.log(data);
    let pr = [];
    for (const product of data.product) {
      if (!product.consignment) {
        toast.error("Select Consignment for all products");
        return;
      }
      pr.push({
        product: product.product,
        consignment: product.consignment,
        quantity: product.quantity,
        per_unit_price: product.consignment.products.cost_per_unit,
        per_kg_source: false,
      });
    }

    const formData = {
      payment: data.payment.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }),
      product: pr,
      orderId: id,
      buyerId: data.buyer._id,
    };
    setProcessedData(formData);
    setProcessed(true);
  };
  return (
    <>
      <Header />
      <section className="similler_order">
        <div className="container">
          <div className="row py-3 align-items-start">
            <div className="col-md-auto mb-md-0 mb-2">
              <Link className="product_comman_btn m-0" to="/confirm-orders">
                <img src="../assets/img/arrow-left-line.png" alt="Back" />
                Back
              </Link>
            </div>
            <div className="col">
              <div className="order_top_mains">
                <div className="row">
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Order Date</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{moment(data.createdAt).format("LL")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Buyer</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{data.buyer?.business_trading_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Phone</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{data.phone_number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Notes</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{data.notes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Pickup Date</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>
                          {moment(data.pick_up_date).format(
                            "ddd, MMMM Do YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Pickup Time</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{data.pick_up_time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 my-md-2 my-1">
                    <div className="row order_top_box align-items-center">
                      <div className="col-5">
                        <strong>Trans Type</strong>
                      </div>
                      <div className="col-auto px-0">
                        <span className="text-white">:</span>
                      </div>
                      <div className="col pe-0">
                        <span>{data.payment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="similler_order_table comman_table_design">
            <div className="table-responsive">
              <table className="table mb-0">
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
                      <tr key={index}>
                        <td>{item.product.variety.variety}</td>
                        <td>{item.product.type.type}</td>
                        <td>{item.product.units.unit}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <select
                            className="form-select table_select form-select-icon"
                            aria-label="Default select example"
                            onChange={(e) =>
                              changeConsignment(e.target.value, index)
                            }
                          >
                            <option value="">
                              Select Supplier (Consignment ID)
                            </option>
                            {item.consignmentList.map((cons, index2) => (
                              <option value={cons._id} key={index2}>
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

          <div className="row justify-content-center py-4">
            <div className="col-auto text-center">
              <Link
                className="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn tables_red_btn"
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
                className="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
              >
                Print Order PDF
              </Link>
              <Link
                className="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
              >
                Print Order Docket
              </Link>

              <Link
                className="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn"
                to=""
                onClick={() => processOrder()}
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
