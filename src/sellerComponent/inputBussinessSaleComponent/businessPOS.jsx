import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  checkBusinessOverdue,
  getBusinessDetail,
  getProductConsignments,
  processTransaction,
  undoTransaction,
} from "../../apiServices/sellerApiHandler/inputBusinessSaleApiHandler";
import {
  getSalesman,
  getStaff,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
import {
  getMyProductList,
  getMyProductUnit,
  getMyVarietyList,
  getProductDetail,
} from "../../apiServices/sellerApiHandler/productApiHandler";
import moment from "moment";
import { toast } from "react-toastify";
function BusinessPOS() {
  const [business, setBusiness] = useState("");
  const [overdue, setOverdue] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [salesmens, setSalesmens] = useState([]);
  const [salesman, setSalesman] = useState("");
  const [stations, setStations] = useState([]);
  const [station, setStation] = useState("");
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("Fruits");
  const [varieties, setVarieties] = useState([]);
  const [variety, setVariety] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [productConsignments, setProductConsignments] = useState([]);
  const [productConsignment, setProductConsignment] = useState("");
  const [productUnits, setProductUnits] = useState([]);
  const [productUnit, setProductUnit] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState("");
  const [totalUnit, setTotalUnit] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pallets, setPallets] = useState(0);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [print, setPrint] = useState("");
  const [payment, setPayment] = useState("");
  const [refundType, setRefundType] = useState("");
  const [withoutPayment, setWithoutPayment] = useState(false);
  const [makeNonSMCS, setMakeNonSMCS] = useState(false);
  const [emailBuyer, setEmailBuyer] = useState(false);
  const [transactionId, setTransactionId] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getBusiness();
    getOverdue();
    getSalesmens();
    if (!seller) getSeller();
    getVarietyList();
    if (variety) getTypeList();
  }, [category, variety]);

  const getBusiness = async () => {
    const { data } = await getBusinessDetail(id);
    if (!data.error) {
      setBusiness(data.results.buyer);
    }
  };

  const getOverdue = async () => {
    const { data } = await checkBusinessOverdue(id);
    if (!data.error) {
      setOverdue(data.results.buyer.overdue);
    }
  };

  const getSalesmens = async () => {
    const { data } = await getStaff({ role: "Salesman" });
    if (!data.error) {
      setSalesmens(data.results.staffs);
    }
  };

  const getSeller = async () => {
    const { data } = await getSellerData();
    if (!data.error) {
      setSeller(data.results.seller);
      if (data.results.seller.market === "Sydney Produce and Growers Market")
        setCategory("Fruits");
      else setCategory("Flowers");
    }
  };

  const getVarietyList = async () => {
    const { data } = await getMyVarietyList(category);
    if (!data.error) {
      setVarieties(data.results.varietyList);
      if (data.results.varietyList.length) {
        if (!variety) {
          setVariety(data.results.varietyList[0]._id);
          await getTypeList();
        }
      } else {
        setType([]);
      }
    }
  };

  const getTypeList = async () => {
    const { data } = await getMyProductList(variety);
    if (!data.error) {
      setTypes(data.results.typeList);
    }
  };

  const getDetail = async (productId) => {
    const { data } = await getProductDetail(productId);
    if (!data.error) {
      setType(data.results.product);
      return data.results.product;
    }
  };

  const getConsignments = async (productId) => {
    const { data } = await getProductConsignments({ productId });
    if (!data.error) {
      setProductConsignments(data.results.consignments);
    }
  };

  const getUnits = async (productId) => {
    const { data } = await getMyProductUnit(productId);
    if (!data.error) {
      setProductUnits(data.results.units);
    }
  };

  const selectType = async (productId) => {
    const detail = await getDetail(productId);
    await getConsignments(productId);
    await getUnits(productId);
    setProductPrice(detail.price.length ? detail.price[0].price : 0);
  };

  const changeProductUnit = async (index) => {
    setProductUnit(index);
    await getConsignments(productUnits[index]._id);
    setProductPrice(
      productUnits[index].price.length ? productUnits[index].price[0].price : 0
    );
  };

  const changeConsignment = (consignmentId) => {
    console.log(consignmentId);
    const consignment = productConsignments.filter(
      (con) => String(con._id) === String(consignmentId)
    );
    if (consignment.length) {
      setProductConsignment(consignment[0]);
      setProductPrice(+consignment[0].products.average_sales_price);
    }
  };

  const clearProduct = () => {
    setProductPrice(0);
    setProductQuantity(0);
  };

  const addProduct = () => {
    if (!productConsignment) {
      toast.error("Please Select Supplier");
      return;
    }
    if (!productQuantity) {
      toast.error("Please Select Unit");
      return;
    }
    if (!productPrice) {
      toast.error("Please Select Price");
      return;
    }
    const product = {
      product: productUnits[productUnit],
      quantity: productQuantity,
      consignment: productConsignment,
      per_unit_price: productPrice,
    };
    setProducts([...products, ...[product]]);
    const quantity = [...products, ...[product]].reduce(function (a, b) {
      return a + b.quantity;
    }, 0);
    const total = [...products, ...[product]].reduce(function (a, b) {
      return a + b.quantity * b.per_unit_price;
    }, 0);
    setTotalUnit(quantity);
    setTotalPrice(total.toFixed(2));
    const add = document.getElementById("product_modal");
    add.click();
    setProductPrice(0);
    setProductQuantity(0);
    setProductConsignment("");
    setProductUnit(0);
    setType("");
  };

  const selectProductToAmend = async (item, index) => {
    await getDetail(item.product._id);
    setProductConsignment(item.consignment);
    setProductPrice(item.per_unit_price);
    setProductQuantity(item.quantity);
    setProductIndex(index);
  };

  const changeProductToAmend = async (index) => {
    await getDetail(products[index].product._id);
    setProductConsignment(products[index].consignment);
    setProductPrice(products[index].per_unit_price);
    setProductQuantity(products[index].quantity);
    setProductIndex(index);
  };

  const saveProduct = () => {
    if (!productQuantity) {
      toast.error("Please Select Unit");
      return;
    }
    if (!productPrice) {
      toast.error("Please Select Price");
      return;
    }
    for (const product of products) {
      product.quantity = productQuantity;
      product.per_unit_price = productPrice;
    }
    setProducts(products);
    const quantity = products.reduce(function (a, b) {
      return a + b.quantity;
    }, 0);
    const total = products.reduce(function (a, b) {
      return a + b.quantity * b.per_unit_price;
    }, 0);
    setTotalUnit(quantity);
    setTotalPrice(total.toFixed(2));
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(
      (pr) => String(pr.product._id) !== String(productId)
    );
    setProducts(updatedProducts);
    const quantity = updatedProducts.reduce(function (a, b) {
      return a + b.quantity;
    }, 0);
    const total = updatedProducts.reduce(function (a, b) {
      return a + b.quantity * b.per_unit_price;
    }, 0);
    setTotalUnit(quantity);
    setTotalPrice(total.toFixed(2));
  };

  const addDeliveryNote = () => {
    if (!document.getElementById("note").value) {
      toast.error("Please Add a Delivery Note");
      return;
    }
    setDeliveryNote(document.getElementById("note").value);
    const add = document.getElementById("delivery_modal");
    add.click();
  };

  const processTrans = async () => {
    if (!products.length) {
      toast.error("Please Add Product");
      return;
    }
    if (!salesman) {
      toast.error("Please Select Salesman");
      return;
    }
    // if (!station) {
    //   toast.error("Please Select Station");
    //   return;
    // }
    if (!payment) {
      toast.error("Please Select Payment Mode");
      return;
    }

    if (print !== "Invoice" || print !== "") {
      if (!deliveryNote) {
        toast.error("Please Add Delivery note");
        return;
      }
    }
    if (!pallets) {
      toast.error("Please Add Number of Pallets");
      return;
    }
    if (payment === "Credit Note") {
      if (!refundType) {
        toast.error("Please Add Refund Type");
        return;
      }
    }
    let productList = [];
    for (const product of products) {
      productList.push({
        productId: product.product._id,
        quantity: product.quantity,
        price: product.per_unit_price,
        total: product.per_unit_price * product.quantity,
        consignment: product.consignment._id,
        refund_type: payment === "Credit Note" ? product.refund_type : "",
      });
    }
    const formData = {
      buyer: business._id,
      salesman: salesman,
      station: station,
      products: productList,
      type: payment.toUpperCase(),
      print: print.toUpperCase(),
      total: totalPrice,
      pallets: pallets,
      delivery_note: deliveryNote,
      orderId: orderId,
      refund_type: payment === "Credit Note" ? refundType : "",
      cash_transaction_without_payment: withoutPayment,
      make_smcs: makeNonSMCS,
      email: emailBuyer,
    };
    const { data } = await processTransaction(formData);
    if (!data.error) {
      let Ids = [...transactionId];
      Ids.push(data.results.transaction._id);
      setSalesman("");
      setStation("");
      setProducts([]);
      setPayment("");
      setPallets(0);
      setPrint("");
      setDeliveryNote("");
      setOrderId("");
      setProductIndex(0);
      setType("");
      setTotalPrice(0);
      setTotalUnit(0);
      setRefundType("");
      setWithoutPayment(false);
      setMakeNonSMCS(false);
      setEmailBuyer(false);
      setTransactionId(Ids);
    }
  };

  const Undo = async () => {
    if (transactionId.length) {
      const formData = {
        transactionId: transactionId.pop(),
      };
      const { data } = await undoTransaction(formData);
      if (!data.error) {
        let Ids = [...transactionId];
        Ids.pop();
        setTransactionId(Ids);
      }
    }
  };

  const refundAll = (refund_type) => {
    setRefundType(refund_type);
    for (const product of products) {
      product.refund_type = refund_type;
    }
    setProducts(products);
  };

  const refund = (index, refund_type) => {
    products[index].refund_type = refund_type;
    setProducts(products);
  };

  if (overdue) {
    return (
      <div
        className="modal fade settings_section"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row setting_box">
                <button
                  type="button"
                  className="btn-close btn_modal_design mt-2"
                  data-bs-dismiss="modal"
                  id="exampleModal"
                  aria-label="Close"
                ></button>
                <div className="col-md-12">
                  <div className="delete_box">
                    <strong>Overdue Invoices</strong>
                    <p>
                      [Buyer] has invoices that are now overdue. Would you like
                      to still proceed with this sale?
                    </p>
                  </div>
                  <div className="row my-5">
                    <div className="d-flex text-center justify-content-between">
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to="/input-bussiness-sale"
                        >
                          Go Back
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to={`/customer-files/${id}`}
                        >
                          Customer File
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          className="tables_btns tables_green_btn "
                          to=""
                          onClick={() => setOverdue(false)}
                        >
                          Proceed
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <section className="product_page pb-md-5 pb-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="product_tabs_btn">
                  <ul
                    className="nav nav-tabs border-0"
                    id="myTab"
                    role="tablist"
                  >
                    {seller?.market === "Sydney Produce and Growers Market" ? (
                      <>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={() => {
                              setCategory("Fruits");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img
                                src="../assets/img/Fruits.png"
                                alt="Fruits"
                              />
                            </span>
                            Fruits
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={() => {
                              setCategory("Vegetables");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img
                                src="../assets/img/Vegetables.png"
                                alt="Vegetables"
                              />
                            </span>
                            Vegetables
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact"
                            type="button"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false"
                            onClick={() => {
                              setCategory("Herbs");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img
                                src="../assets/img/Medicinal.png"
                                alt="Medicinal"
                              />
                            </span>
                            Herbs
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="contact1-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact1"
                            type="button"
                            role="tab"
                            aria-controls="contact1"
                            aria-selected="false"
                            onClick={() => {
                              setCategory("Others");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img src="../assets/img/Other.png" alt="Other" />
                            </span>
                            Others
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={() => {
                              setCategory("Flowers");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img
                                src="../assets/img/Fruits.png"
                                alt="Flowers"
                              />
                            </span>
                            Flowers
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={() => {
                              setCategory("Foliage");
                              setVariety("");
                            }}
                          >
                            <span>
                              <img
                                src="../assets/img/Vegetables.png"
                                alt="Foliage"
                              />
                            </span>
                            Foliage
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="row py-3">
                  <div className="col">
                    <div className="product_search row align-items-center">
                      <div className="col-xxl-8 col">
                        <div className="row">
                          <div className="col">
                            <div className="product_show_top flex-md-nowrap flex-wrap d-flex align-items-center justify-content-md-start justify-content-center">
                              {/* <Link className="product_comman_btn me-4" to="/">
                                <img
                                  src="../assets/img/arrow-left-line.png"
                                  alt="Back"
                                />
                                Back
                              </Link> */}
                              <div className="dropdown comman_dropdown me-2">
                                <button
                                  className="product_comman_btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
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
                              </div>
                              <div className="dropdown comman_dropdown me-2">
                                <button
                                  className="product_comman_btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Salesman
                                </button>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  {salesmens.map((item, index) => (
                                    <li key={index}>
                                      <Link
                                        className="dropdown-item"
                                        to=""
                                        onClick={() => setSalesman(item._id)}
                                      >
                                        {item.first_name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="dropdown comman_dropdown me-2">
                                <button
                                  className="product_comman_btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <img
                                    src="../assets/img/settings.png"
                                    alt="Settings"
                                  />
                                  Setting
                                </button>
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <Link
                                      className="dropdown-item"
                                      to=""
                                      onClick={() => Undo()}
                                    >
                                      Undo
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="dropdown-item" to="">
                                      Previous Transaction
                                    </Link>
                                  </li>
                                  <li>
                                    <div className="d-flex">
                                      <Link className="dropdown-item" to="">
                                        Email Buyer Invoice
                                      </Link>
                                      <div class=" mt-2 px-2 ">
                                        <input
                                          type="checkbox"
                                          id="Email"
                                          name="Email"
                                          value="Email"
                                          onChange={(e) =>
                                            setEmailBuyer(e.target.checked)
                                          }
                                        />
                                        <label for="Email"></label>
                                        <br />
                                      </div>
                                    </div>
                                  </li>

                                  <li>
                                    <div className="d-flex">
                                      <Link className="dropdown-item" to="">
                                        Print A4 Invoice
                                      </Link>
                                      <div class=" mt-2 px-2 ">
                                        <input
                                          type="checkbox"
                                          id="Print"
                                          name="Print"
                                          value="Print"
                                          onChange={(e) =>
                                            setPrint(
                                              e.target.checked ? "Invoice" : ""
                                            )
                                          }
                                        />
                                        <label for="Print"></label>
                                        <br />
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="d-flex">
                                      <Link className="dropdown-item" to="">
                                        Cash Transaction
                                        <br /> Without Payment
                                      </Link>

                                      <div class=" mt-3 px-2 ">
                                        <input
                                          type="checkbox"
                                          id="Cash"
                                          name="Cash"
                                          value="Cash"
                                          onChange={(e) =>
                                            setWithoutPayment(e.target.checked)
                                          }
                                        />
                                        <label for="Cash"></label>
                                        <br />
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="d-flex">
                                      <Link className="dropdown-item " to="">
                                        Make Non-SMCS{" "}
                                      </Link>

                                      <div class=" mt-2 px-2 ">
                                        {console.log(makeNonSMCS)}
                                        <input
                                          type="checkbox"
                                          id="Non-SMCS"
                                          name="Non-SMCS"
                                          value="Non-SMCS"
                                          onChange={(e) =>
                                            setMakeNonSMCS(e.target.checked)
                                          }
                                        />
                                        <label for="Non-SMCS"></label>
                                        <br />
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="m-auto text-center">
                                <span className="input_sale_value">
                                  {business.business_trading_name}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-auto">
                            <Link
                              className="customer_btn"
                              to={`/customer-files/${id}`}
                            >
                              Customer File
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-4 col-xl-auto mt-xl-0 mt-lg-3 mt-md-3 mt-3 text-end">
                        <span className="input_sale_value">
                          Input Business Sale #00897
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row product_main_outer">
                          <div className="col-xl-8 col-lg-7 px-0">
                            <div className="product_main_top">
                              <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                                  <div className="choose_heading">
                                    <h3>
                                      Choose Variety{" "}
                                      <span>{varieties.length} Variety</span>
                                    </h3>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div
                                    className="col-12 d-flex "
                                    style={{ overflowX: "hidden" }}
                                  >
                                    {varieties.map((item, index) => (
                                      <div className="choose_btn" key={index}>
                                        <Link
                                          className={
                                            String(variety) === String(item._id)
                                              ? "active"
                                              : ""
                                          }
                                          to=""
                                          onClick={() => setVariety(item._id)}
                                        >
                                          {item.variety}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                  <div
                                    className="right-arrow"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal5"
                                  >
                                    <i className="fa fa-angle-right"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="product_main_bottom">
                              <div className="product_show">
                                {types.map((item, index) => (
                                  <Link
                                    key={index}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1"
                                    to=""
                                    className="product_show_box"
                                    onClick={() => selectType(item.productId)}
                                  >
                                    <span className="ellipsis-2">
                                      {item.type}
                                    </span>
                                    <img
                                      src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.image}`}
                                      alt=""
                                    />
                                    <strong>{item.inv}</strong>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-5 px-0">
                            <div className="row order_bill mx-0">
                              <div className="col-12 order_bill_head">
                                <div className="row align-items-center">
                                  <div className="col-md-auto text-md-start text-center">
                                    <strong>New Order Bill</strong>
                                  </div>
                                  <div className="col-sm text-md-end text-center mt-md-0 mt-2">
                                    <span>
                                      {moment(Date.now()).format("dddd, LLL")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 p-md-4 p-3">
                                <div className="bill_details">
                                  <div className="bill_details_mainn mb-2">
                                    <div
                                      className="accordion"
                                      id="accordionExample"
                                    >
                                      {products.map((item, index) => (
                                        <div
                                          className="accordion-item"
                                          key={index}
                                        >
                                          <div
                                            className="accordion-header"
                                            id="headingOne"
                                          >
                                            <button
                                              className="accordion-button pt-0"
                                              type="button"
                                              data-bs-toggle="collapse"
                                              data-bs-target="#collapseOne"
                                              aria-expanded="true"
                                              aria-controls="collapseOne"
                                            >
                                              <div className="row py-1">
                                                <div className="col-6">
                                                  <span className="top_details">
                                                    {item.product.type.type}
                                                  </span>
                                                </div>
                                                <div className="col-6 text-end">
                                                  <span className="top_details">
                                                    $
                                                    {(
                                                      item.per_unit_price *
                                                      item.quantity
                                                    ).toFixed(2)}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="row py-1">
                                                <div className="col-6">
                                                  <span className="mid_details">
                                                    Units/Kg
                                                  </span>
                                                </div>
                                                <div className="col-6 text-end">
                                                  <span className="mid_details">
                                                    {item.quantity}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="row py-1">
                                                <div className="col-6">
                                                  <span className="mid_details">
                                                    @
                                                  </span>
                                                </div>
                                                <div className="col-6 text-end">
                                                  <span className="mid_details">
                                                    ${item.per_unit_price}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="row py-1">
                                                <div className="col-6">
                                                  <span className="mid_details">
                                                    Supplier
                                                  </span>
                                                </div>
                                                <div className="col-6 text-end">
                                                  <span className="mid_details">
                                                    {
                                                      item.consignment.supplier
                                                        .business_trading_name
                                                    }
                                                  </span>
                                                </div>
                                              </div>
                                            </button>
                                          </div>
                                          <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                          >
                                            <div className="accordion-body p-0 pb-2">
                                              <div className="row mx-auto">
                                                <div className="col-auto px-1">
                                                  <Link
                                                    className="amed"
                                                    data-bs-target="#exampleModal2"
                                                    data-bs-toggle="modal"
                                                    to=""
                                                    onClick={() =>
                                                      selectProductToAmend(
                                                        item,
                                                        index
                                                      )
                                                    }
                                                  >
                                                    Amend
                                                  </Link>
                                                </div>
                                                {payment === "Credit Note" ? (
                                                  <>
                                                    <div className="col-auto px-1">
                                                      <Link
                                                        className="amed"
                                                        to=""
                                                        onClick={() =>
                                                          refund(
                                                            index,
                                                            "RETURN"
                                                          )
                                                        }
                                                      >
                                                        Return
                                                      </Link>
                                                    </div>
                                                    <div className="col-auto px-1">
                                                      <Link
                                                        className="amed"
                                                        to=""
                                                        onClick={() =>
                                                          refund(index, "VOID")
                                                        }
                                                      >
                                                        Void
                                                      </Link>
                                                    </div>
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                                <div className="col-auto px-1">
                                                  <Link
                                                    className="delete_btnns"
                                                    to=""
                                                    onClick={() =>
                                                      removeProduct(
                                                        item.product._id
                                                      )
                                                    }
                                                  >
                                                    <img
                                                      src="../assets/img/Delete.png"
                                                      alt=""
                                                    />
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="row py-1">
                                    <div className="col-6">
                                      <span className="mid_details">
                                        Total Unit
                                      </span>
                                    </div>
                                    <div className="col-6 text-end">
                                      <span className="mid_details">
                                        {totalUnit}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="row py-1">
                                    <div className="col-6">
                                      <span className="mid_details">
                                        Total Amount
                                      </span>
                                    </div>
                                    <div className="col-6 text-end">
                                      <span className="mid_details">
                                        {totalPrice}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="row bill_details_bottom align-items-center mt-3 justify-content-center">
                                  <div className="col-md-6 px-md-2 d-flex align-items-center justify-content-center mb-md-0 mb-2">
                                    <span
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal3"
                                      className="pallets_out"
                                    >
                                      Pallets <br />
                                      out
                                    </span>
                                    <span className="datashow mx-2">
                                      {pallets}
                                    </span>
                                  </div>
                                  <div className="col-md-6 px-md-2 d-flex align-items-center justify-content-center">
                                    <span
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal4"
                                      className="pallets_out delivery_note"
                                    >
                                      Delivery <br />
                                      Note
                                    </span>
                                    <span className="datashow mx-2">
                                      {deliveryNote ? (
                                        <i
                                          class="fa fa-check"
                                          aria-hidden="true"
                                        ></i>
                                      ) : (
                                        ""
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {payment !== "Credit Note" ? (
                                <div className="col-12">
                                  <div className="row pay_refund_print">
                                    <div className="col-12 comman_bill_head">
                                      <strong>Print</strong>
                                    </div>
                                    <div className="col-12">
                                      <div className="row refund_print">
                                        <div className="col-md-3 col-6 border-end border-dark">
                                          <Link
                                            to=""
                                            onClick={() => setPrint("Invoice")}
                                          >
                                            Invoice <br />${totalPrice}
                                          </Link>
                                        </div>
                                        <div className="col-md-3 col-6 border-end border-dark">
                                          <Link
                                            to=""
                                            onClick={() =>
                                              setPrint("Delivery Docket")
                                            }
                                          >
                                            Delivery <br />
                                            Docket
                                          </Link>
                                        </div>
                                        <div className="col-md-3 col-6 border-end border-dark">
                                          <Link
                                            to=""
                                            onClick={() => setPrint("Both")}
                                          >
                                            Both
                                          </Link>
                                        </div>
                                        <div className="col-md-3 col-6">
                                          <Link
                                            to=""
                                            onClick={() =>
                                              setPayment("Credit Note")
                                            }
                                          >
                                            Credit <br />
                                            Notes
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-12">
                                  <div className="row pay_refund_print">
                                    <div className="col-12 comman_bill_head">
                                      <strong>All Inventory</strong>
                                    </div>
                                    <div className="col-12">
                                      <div className="row all_inventry align-items-center justify-content-center">
                                        <div className="col-md-4">
                                          <Link
                                            to=""
                                            onClick={() => refundAll("RETURN")}
                                          >
                                            Return
                                          </Link>
                                        </div>
                                        <div className="col-auto px-md-0 text-center my-md-0 my-2">
                                          <span>Or</span>
                                        </div>
                                        <div className="col-md-4">
                                          <Link
                                            to=""
                                            onClick={() => refundAll("VOID")}
                                          >
                                            Void
                                          </Link>
                                        </div>
                                        <div className="col-md-3"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="col-12">
                                <div className="row pay_refund_method">
                                  <div className="col-12 comman_bill_head">
                                    <strong>Payment and refund method</strong>
                                  </div>
                                  <div
                                    className="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch"
                                    onClick={() => setPayment("Draft Invoice")}
                                  >
                                    <span
                                      className={
                                        payment === "Draft Invoice"
                                          ? "pay_refund_box2  w-100 text-center"
                                          : "pay_refund_box  w-100 text-center"
                                      }
                                    >
                                      Draft <br />
                                      Invoice
                                    </span>
                                  </div>
                                  <div
                                    className="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch"
                                    onClick={() => {
                                      setPayment("Invoice");
                                      setPrint("Delivery Docket");
                                    }}
                                  >
                                    <span
                                      className={
                                        payment === "Invoice"
                                          ? "pay_refund_box2  w-100 text-center"
                                          : "pay_refund_box  w-100 text-center"
                                      }
                                    >
                                      Invoice
                                    </span>
                                  </div>
                                  <div
                                    className="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch"
                                    onClick={() => {
                                      setPayment("Cash");
                                      setPrint("Delivery Docket");
                                    }}
                                  >
                                    <span
                                      className={
                                        payment === "Cash"
                                          ? "pay_refund_box2  w-100 text-center"
                                          : "pay_refund_box  w-100 text-center"
                                      }
                                    >
                                      Cash
                                    </span>
                                  </div>
                                  <div
                                    className="col-md-3 col-6 mb-md-0 mb-2 px-2 d-flex align-items-stretch"
                                    onClick={() => {
                                      setPayment("Card");
                                      setPrint("Delivery Docket");
                                    }}
                                  >
                                    <span
                                      className={
                                        payment === "Card"
                                          ? "pay_refund_box2  w-100 text-center"
                                          : "pay_refund_box  w-100 text-center"
                                      }
                                    >
                                      Card
                                    </span>
                                  </div>
                                  <div
                                    className="mt-3"
                                    style={{ color: "white", fontSize: "13px" }}
                                  >
                                    <span>
                                      {print && payment
                                        ? `${payment} >> Print > ${print}`
                                        : moment(Date.now()).format(
                                            "dddd, LLL"
                                          )}
                                    </span>
                                  </div>
                                  <div className="col-12 mt-md-4 mt-3">
                                    <button
                                      className="custom_btns"
                                      type="submit"
                                      onClick={processTrans}
                                    >
                                      Process
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade product_artboard"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal_design">
              <div className="modal-body p-md-4 p-3">
                <button
                  type="button"
                  className="btn-close btn_modal_design"
                  id="product_modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setProductPrice(0);
                    setProductQuantity(0);
                    setProductConsignment("");
                    setProductUnit(0);
                    setType("");
                  }}
                ></button>
                <div className="row artboard_main align-items-end mb-md-4 mb-3">
                  <div className="col-md-5 d-flex justify-content-md-start justify-content-center">
                    <div className="setting_box_img">
                      <div className="setting_img">
                        <img
                          src={`${process.env.REACT_APP_APIENDPOINTNEW}${type?.type?.image}`}
                          alt=""
                        />
                      </div>
                      <strong>{type?.type?.type}</strong>
                    </div>
                  </div>
                  <div className="col-md-7 artboard_table">
                    <div className="table-responsive mb-md-4 pb-md-2">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr style={{ background: "#5f6874" }}>
                              <th style={{ border: "none" }}>Price</th>
                              <th style={{ border: "none" }}>Unit</th>
                              <th style={{ border: "none" }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span className="artboard_data">
                                  ${productPrice}
                                </span>
                              </td>
                              <td>
                                <span className="artboard_data">
                                  {productQuantity}
                                </span>
                              </td>
                              <td>
                                <span className="artboard_data">
                                  ${(productPrice * productQuantity).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row artboard_bottomm">
                  <div className="col-md-6">
                    <div className="artboard_form">
                      <form action="">
                        <div className="form-group mb-3">
                          <label htmlFor=""> Supplier </label>
                          <select
                            className="form-select form-select-icon"
                            onChange={(e) => changeConsignment(e.target.value)}
                          >
                            <option value="">
                              Select Supplier (Consignment ID)
                            </option>
                            {productConsignments.map((item, index) => (
                              <option key={index} value={item._id}>
                                {item.supplier.business_trading_name} (#C
                                {item.consign})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="table-responsive unit_scroll">
                          <table className="table mb-0 ">
                            <thead>
                              <tr style={{ background: "#5f6874" }}>
                                <th style={{ border: "none" }}>
                                  Default <br />
                                  Unit
                                </th>
                                <th style={{ border: "none" }}>
                                  Per Kg <br />
                                  Source
                                </th>
                                <th style={{ border: "none" }}>
                                  Select <br />
                                  Unit
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {productUnits.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="Business_radio">
                                      <input
                                        className="d-none"
                                        type="radio"
                                        id={`unit${index}`}
                                        name="unit"
                                        checked={
                                          index === productUnit ? true : false
                                        }
                                        onChange={() =>
                                          changeProductUnit(index)
                                        }
                                      />
                                      <label
                                        className="p-0"
                                        for={`unit${index}`}
                                      ></label>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="Business_radio">
                                      <input
                                        className="d-none"
                                        type="radio"
                                        id={`source${index}`}
                                        name="source"
                                      />
                                      <label
                                        className="p-0"
                                        for={`source${index}`}
                                      ></label>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="unit_bg d-flex align-items-center justify-content-between">
                                      <span>{item.units.unit}</span>
                                      <span>
                                        {item.price.length
                                          ? `$${item.price[0].price}`
                                          : ""}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="calculator_keyboard mt-md-0 mt-4">
                      <div className="row mx-0">
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "7")
                                  )
                                }
                              >
                                7
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "8")
                                  )
                                }
                              >
                                8
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "9")
                                  )
                                }
                              >
                                9
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "4")
                                  )
                                }
                              >
                                4
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "5")
                                  )
                                }
                              >
                                5
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "6")
                                  )
                                }
                              >
                                6
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "1")
                                  )
                                }
                              >
                                1
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "2")
                                  )
                                }
                              >
                                2
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "3")
                                  )
                                }
                              >
                                3
                              </button>
                            </div>
                            <div className="col-md-8 col-8 px-md-1 px-2 mb-3">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "0")
                                  )
                                }
                              >
                                0
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    !String(productQuantity).includes(".")
                                      ? String(productQuantity) + "."
                                      : productQuantity
                                  )
                                }
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start flex-wrap justify-content-center">
                          <button
                            className="delete_btn_calcu"
                            onClick={clearProduct}
                          >
                            Delete
                          </button>
                          <button
                            className="add_btn_calcu"
                            onClick={() => addProduct()}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade amed_modal"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal_design">
              <div className="modal-header px-4">
                <h5 className="modal-title text-white">Amend</h5>
                <button
                  type="button"
                  className="btn-close btn_modal_design"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setProductPrice(0);
                    setProductQuantity(0);
                    setProductConsignment("");
                    setType("");
                  }}
                ></button>
              </div>
              <div className="modal-body p-md-4 p-3">
                <div className="row artboard_main align-items-end">
                  <div className="col-md-12 d-flex justify-content-md-start justify-content-center">
                    <div className="row">
                      <div className="col-auto">
                        <div className="amed_img">
                          <img
                            src={`${process.env.REACT_APP_APIENDPOINTNEW}${type?.type?.image}`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col amed_content">
                        <strong>{type?.type?.type}</strong>
                        <span>{type?.variety?.variety}</span>
                        <span>
                          {productConsignment?.supplier?.business_trading_name}{" "}
                          (#C
                          {productConsignment?.consign})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9 artboard_table py-3">
                    <div className="table-responsive">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr style={{ background: "#5f6874" }}>
                              <th>Price</th>
                              <th>Unit</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span className="artboard_data">
                                  ${productPrice}
                                </span>
                              </td>
                              <td>
                                <span className="artboard_data">
                                  {productQuantity}
                                </span>
                              </td>
                              <td>
                                <span className="artboard_data">
                                  ${productPrice * productQuantity}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row artboard_bottomm">
                  <div className="col-md-12">
                    <div className="calculator_keyboard mt-md-0 mt-0">
                      <div className="row mx-0">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "7")
                                  )
                                }
                              >
                                7
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "8")
                                  )
                                }
                              >
                                8
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "9")
                                  )
                                }
                              >
                                9
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "4")
                                  )
                                }
                              >
                                4
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "5")
                                  )
                                }
                              >
                                5
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "6")
                                  )
                                }
                              >
                                6
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "1")
                                  )
                                }
                              >
                                1
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "2")
                                  )
                                }
                              >
                                2
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "3")
                                  )
                                }
                              >
                                3
                              </button>
                            </div>
                            <div className="col-md-8 col-8 px-md-1 px-2 mb-3">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    +(String(productQuantity) + "0")
                                  )
                                }
                              >
                                0
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setProductQuantity(
                                    !String(productQuantity).includes(".")
                                      ? String(productQuantity) + "."
                                      : productQuantity
                                  )
                                }
                              >
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-6 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                              <button
                                className="delete_btn_calcu"
                                onClick={clearProduct}
                              >
                                Delete
                              </button>
                              <button
                                className="add_btn_calcu save_btn"
                                onClick={saveProduct}
                              >
                                Save
                              </button>
                            </div>
                            <div className="col-md-6 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                              <button
                                className="same_arrow"
                                disabled={productIndex === 0}
                                onClick={() =>
                                  changeProductToAmend(productIndex - 1)
                                }
                              >
                                <img
                                  src="../assets/img/arrow-up-fill.png"
                                  alt=""
                                />
                              </button>
                              <button
                                className="same_arrow"
                                disabled={productIndex === products.length - 1}
                                onClick={() =>
                                  changeProductToAmend(productIndex + 1)
                                }
                              >
                                <img
                                  src="../assets/img/arrow-down-fill.png"
                                  alt=""
                                />
                              </button>
                              <button className="Undo_button">Undo</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade pattels_out"
          id="exampleModal3"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal_design">
              <div className="modal-header px-4">
                <h5 className="modal-title text-white">Pallets Out</h5>
                <button
                  type="button"
                  className="btn-close btn_modal_design"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-md-4 p-3">
                <div className="row artboard_bottomm">
                  <div className="col-md-12 mb-4">
                    <form className="pattels_out_form row mx-0" action="">
                      <div className="col-md-8">
                        <div className="row">
                          <div className="form-group col-4 px-md-1 px-2">
                            <span
                              className="plus button"
                              onClick={() => setPallets(pallets + 1)}
                            >
                              +
                            </span>
                          </div>
                          <div className="form-group col-4 px-md-1 px-2">
                            <input
                              className="form-control"
                              type="number"
                              name="pallets"
                              id="pallets"
                              value={pallets}
                              maxLength="12"
                              onChange={(e) => setPallets(e.target.value)}
                            />
                          </div>
                          <div className="form-group col-4 px-md-1 px-2">
                            <span
                              className="min button"
                              onClick={() =>
                                setPallets(pallets ? pallets - 1 : 0)
                              }
                            >
                              -
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pe-md-0 mt-md-0 mt-2">
                        <label htmlFor="">
                          Enter the number of pallets taken.
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-12">
                    <div className="calculator_keyboard mt-md-0 mt-0">
                      <div className="row mx-0">
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "7"))
                                }
                              >
                                7
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "8"))
                                }
                              >
                                8
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "9"))
                                }
                              >
                                9
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "4"))
                                }
                              >
                                4
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "5"))
                                }
                              >
                                5
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "6"))
                                }
                              >
                                6
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "1"))
                                }
                              >
                                1
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "2"))
                                }
                              >
                                2
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "3"))
                                }
                              >
                                3
                              </button>
                            </div>
                            <div className="col-md-8 col-8 px-md-1 px-2 mb-3">
                              <button
                                className="keyboard_btn"
                                type="button"
                                onClick={() =>
                                  setPallets(+(String(pallets) + "0"))
                                }
                              >
                                0
                              </button>
                            </div>
                            <div className="col-md-4 col-4 px-md-1 px-2 mb-md-3 mb-2">
                              <button className="keyboard_btn" type="button">
                                .
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 px-2 d-flex align-items-start flex-wrap mb-md-0 mb-2 justify-content-center">
                          <button
                            className="delete_btn_calcu"
                            onClick={() => setPallets(0)}
                          >
                            Delete
                          </button>
                          <button
                            className="add_btn_calcu"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade pattels_out delevery_note"
          id="exampleModal4"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal_design">
              <div className="modal-header px-4">
                <h5 className="modal-title text-white">Delivery Note</h5>
                <button
                  type="button"
                  className="btn-close btn_modal_design"
                  data-bs-dismiss="modal"
                  id="delivery_modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-md-4 p-3">
                <div className="row">
                  <div className="col-12">
                    <div className="row delevery_note_form">
                      <div className="form-group col-12">
                        <label htmlFor="">Enter Your Deliver note below.</label>
                        <textarea
                          name="note"
                          id="note"
                          className="form-control"
                          placeholder="Type..."
                        ></textarea>
                      </div>
                      <div className="form-group mt-md-3 mt-2">
                        <button
                          className="custom_btns"
                          type="submit"
                          onClick={() => addDeliveryNote()}
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade settings_section"
          id="exampleModal5"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="row setting_box d-flex justify-content-between px-2">
                  <div className="choose_heading">
                    <h3>Choose Variety</h3>
                  </div>
                  {varieties.map((item, index) => (
                    <div className="col-md-4 my-3" key={index}>
                      <div className="choose_btn-detail">
                        <Link
                          className={
                            String(variety) === String(item._id) ? "active" : ""
                          }
                          to=""
                          onClick={() => setVariety(item._id)}
                        >
                          {item.variety}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BusinessPOS;
