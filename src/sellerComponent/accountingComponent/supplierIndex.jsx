import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  addProductSupplier,
  addSupplier,
  deleteSupplier,
  getMyProducts,
  getSuppliers,
  searchSuppliers,
  updateSupplier,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";
import EditSupplier from "./editSupplier";

function SupplierIndex() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [supplierList, setSupplierList] = useState([]);
  const [FruitItem, setFruitItem] = useState([]);
  const [herbsItem, setHerbsItem] = useState([]);
  const [vegetablesItem, setVegetablesItem] = useState([]);
  const [othersItem, setOthersItem] = useState([]);
  const [totalItem, setTotalItem] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);
  const [editData, setEditData] = useState("");

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);

    const response = await addSupplier(data);
    if (!response.data.error) {
      document.getElementById("business_trading_name").value = "";
      document.getElementById("phone_number").value = "";
      document.getElementById("email").value = "";
      document.getElementById("abn").value = "";
      document.getElementById("entity_name").value = "";
      document.getElementById("address").value = "";
      document.getElementsByName("market_seller")[0].checked = false;
      document.getElementsByName("market_seller")[1].checked = false;
      document.getElementById("smcs_code").value = "";

      await getSupplierList();
    }
  };

  useEffect(() => {
    getSupplierList();
  }, []);

  const getSupplierList = async () => {
    const { data } = await getSuppliers();
    if (!data.error) setSupplierList(data.results.suppliers);
    console.log(data);
  };
  const getEditSupplierData = async (id) => {
    const { data } = await getSuppliers();
    if (!data.error) {
      const supplier_data = data.results.suppliers.filter(
        (item) => String(item._id) === String(id)
      );
      setEditData(supplier_data[0]);
      console.log(editData);
    }
  };

  const onChange = async (e) => {
    if (e.target.value) {
      const response = await searchSuppliers(e.target.value);
      if (!response.data.error)
        setSupplierList(response.data.results.suppliers);
    } else {
      setSupplierList([]);
      await getSupplierList();
    }
  };

  const delSupplier = async (id) => {
    const { data } = await deleteSupplier(id);
    if (!data.error) {
      await getSupplierList();
    }
  };
  const getSupplierProduct = async (id, search = "", filter = 0) => {
    setSupplierId(id);
    const { data } = await getMyProducts(id, search, filter);
    if (!data.error) {
      let fruits = data.results.products.filter(
        (item) => item.category === "Fruits"
      );
      fruits = [
        ...new Map(fruits.map((item) => [item.type.type, item])).values(),
      ];
      console.log(fruits);
      let herbs = data.results.products.filter(
        (item) => item.category === "Herbs"
      );
      herbs = [
        ...new Map(herbs.map((item) => [item.type.type, item])).values(),
      ];
      let vegetables = data.results.products.filter(
        (item) => item.category === "Vegetables"
      );
      vegetables = [
        ...new Map(vegetables.map((item) => [item.type.type, item])).values(),
      ];
      let others = data.results.products.filter(
        (item) => item.category === "Others"
      );
      others = [
        ...new Map(others.map((item) => [item.type.type, item])).values(),
      ];
      setFruitItem(fruits);
      setHerbsItem(herbs);
      setVegetablesItem(vegetables);
      setOthersItem(others);
      setTotalItem(data.results.products);
    }
  };

  const getUnits = (type) => {
    const units = totalItem.filter(
      (item) => String(item.type._id) === String(type)
    );
    console.log(units);
    return units;
  };

  const addProdSupplier = async (item) => {
    if (!item.isAdded) {
      item.suppliers.push(supplierId);
      const { data } = await addProductSupplier(item._id, item.suppliers);
      if (!data.error) {
        await getSupplierProduct(supplierId);
      }
    }
  };

  return (
    <>
      <Header />{" "}
      <section className="Supplier_index">
        <div className="container">
          <div className="product_search row py-3 align-items-center">
            <div className="col-md-auto"></div>
            <div className="col-sm">
              <div className="product_search">
                <form
                  action=""
                  className="row align-items-center justify-content-md-between justify-content-start"
                >
                  <div className="col-xl-5 col-lg-6 col-md-7 ps-md-0 mb-md-0 mb-2">
                    <div className="form-group d-flex">
                      <input
                        type="search"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Search Supplier..."
                        onChange={(e) => onChange(e)}
                        autoComplete="off"
                      />
                      <button className="search_btn" type="submit">
                        <img src="../assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div>
                  <div className="col-auto">
                    <a
                      className="product_comman_btn ms-0"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal6"
                      href="javascript:;"
                    >
                      Add Supplier
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="Supplier_index_table comman_table_design">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Supplier</th>
                    <th>Supplier Id</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Edit Info</th>
                    <th>Product</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.business_trading_name}</td>
                        <td>{item.supplierId}</td>
                        <td>{item.market_seller ? "CO OP" : "Grover"}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>
                          <Link
                            className="icon_design"
                            to=""
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalEdit"
                            onClick={() => getEditSupplierData(item._id)}
                          >
                            <img src="assets/img/edit_white.png" alt="" />
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="tables_btns tables_green_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal7"
                            onClick={() => getSupplierProduct(item._id)}
                            to=""
                          >
                            Products
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="icon_design"
                            to=""
                            onClick={() => delSupplier(item._id)}
                          >
                            <img src="assets/img/delete_white.png" alt="" />
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
      <div
        className="modal fade add_supplier_modal"
        id="exampleModal6"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content modal_design">
            <div className="modal-body">
              <div className="row">
                <div className="col-12 Product_heading">
                  <h2>Add Supplier</h2>
                </div>
                <div className="col-12">
                  <form
                    className="row add_business_form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">
                            Business Trading Name
                          </label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="business_trading_name"
                            name="business_trading_name"
                            {...register("business_trading_name", {
                              required: true,
                            })}
                          />
                          {errors?.business_trading_name && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">Phone Number</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="phone_number"
                            name="phone_number"
                            {...register("phone_number", {
                              required: true,
                            })}
                          />
                          {errors?.phone_number && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">Email Address</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            {...register("email", {
                              required: true,
                            })}
                          />
                          {errors?.email && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">ABN</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="abn"
                            name="abn"
                            {...register("abn", {
                              required: true,
                            })}
                          />
                          {errors?.abn && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">Entity Name</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="entity_name"
                            name="entity_name"
                            {...register("entity_name", {
                              required: true,
                            })}
                          />
                          {errors?.entity_name && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">Address</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="address"
                            name="address"
                            {...register("address", {
                              required: true,
                            })}
                          />
                          {errors?.address && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">
                            In This Business A Market Seller
                          </label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col Business_radio">
                          <input
                            className="d-none"
                            type="radio"
                            id="business1"
                            name="market_seller"
                            value={true}
                            {...register("market_seller", {
                              required: true,
                            })}
                          />
                          <label for="business1">Yes</label>
                        </div>
                        <div className="col Business_radio">
                          <input
                            className="d-none"
                            type="radio"
                            id="business2"
                            name="market_seller"
                            value={false}
                            {...register("market_seller", {
                              required: true,
                            })}
                          />

                          <label for="business2">No</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 my-md-4 my-3">
                      <div className="row align-items-center">
                        <div className="col-12">
                          <label className="mb-0 form_tag1">
                            In This Business A Market Seller, add their SMSC
                            Code below. A buyer Business Account Will be made
                            for the market seller in case you also sell to them.
                            Ignore this account if you only buy from this
                            seller.
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-12 mb-md-2 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-5 mb-md-0 mb-2">
                          <label className="mb-0 form_tag">SMCS</label>
                        </div>
                        <div className="col-auto d-md-block d-none">
                          <span className="text-white">:</span>
                        </div>
                        <div className="col">
                          <input
                            className="form-control"
                            type="text"
                            id="smcs_code"
                            name="smcs_code"
                            {...register("smcs_code", {
                              required: true,
                            })}
                          />
                          {errors?.smcs_code && (
                            <p className="form-error mt-1">
                              This field is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-12 mt-md-4 mt-3">
                      <div className="row justify-content-center">
                        <div className="col-md-4">
                          <button
                            className="custom_btns"
                            // data-bs-toggle="modal"
                            // data-bs-target="#exampleModal7"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Supplier_product"
        id="exampleModal7"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content modal_design">
            <div className="modal-header p-4 border-0">
              <div className="row">
                <div className="col-12 mb-3">
                  <h5 className="modal-title text-white">Supplier Product</h5>
                  <button
                    type="button"
                    className="btn-close btn_modal_design"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="col-12">
                  <div className="product_search">
                    <form
                      action=""
                      className="row align-items-center justify-content-center"
                    >
                      <div className="col">
                        <div className="form-group d-flex">
                          <input
                            type="search"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Search Product"
                            onChange={(e) => {
                              getSupplierProduct(
                                supplierId,
                                e.target.value,
                                filter
                              );
                              setSearch(e.target.value);
                            }}
                          />
                          <button className="search_btn" type="submit">
                            <img src="assets/img/Search.png" alt="Search" />
                          </button>
                        </div>
                      </div>
                      <div className="col-auto">
                        <button
                          className="product_comman_btn ms-0 dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ border: "none" }}
                        >
                          <img src="assets/img/sound-module-fill.png" alt="" />{" "}
                          Filter
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                          style={{
                            position: "absolute",
                            inset: "0px 0px auto auto",
                            margin: "0px",
                            transform: "translate(-24px, 104px)",
                          }}
                        >
                          <li>
                            <Link
                              className="dropdown-item"
                              to=""
                              onClick={(e) => {
                                getSupplierProduct(supplierId, search, 1);
                                setFilter(1);
                              }}
                            >
                              Added
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to=""
                              onClick={(e) => {
                                getSupplierProduct(supplierId, search, 2);
                                setFilter(1);
                              }}
                            >
                              Not Added
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body comman_table_design p-0 mt-0 border-0">
              <div className="table-responsive">
                <table className="table">
                  {FruitItem.length ? (
                    <tr>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center">
                        <span>Fruits</span>
                      </th>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {FruitItem.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span className="supplier_data" key={index}>
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link
                                className="table_btns_design added_now"
                                to=""
                                key={index}
                              >
                                Added
                              </Link>
                            ) : (
                              <Link
                                className="table_btns_design add_now"
                                to=""
                                onClick={() => addProdSupplier(item1)}
                              >
                                Add
                              </Link>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                  {herbsItem.length ? (
                    <tr>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center">
                        <span>Herbs</span>
                      </th>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {herbsItem.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span className="supplier_data" key={index}>
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link
                                className="table_btns_design added_now"
                                to=""
                                key={index}
                              >
                                Added
                              </Link>
                            ) : (
                              <Link className="table_btns_design add_now" to="">
                                Add
                              </Link>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                  {vegetablesItem.length ? (
                    <tr>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center">
                        <span>Vegetables</span>
                      </th>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {vegetablesItem.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span className="supplier_data" key={index}>
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link
                                className="table_btns_design added_now"
                                to=""
                                key={index}
                              >
                                Added
                              </Link>
                            ) : (
                              <Link className="table_btns_design add_now" to="">
                                Add
                              </Link>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                  {othersItem.length ? (
                    <tr>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center">
                        <span>Others</span>
                      </th>
                      <th className="prdocuct_head text-center"></th>
                      <th className="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {othersItem.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span className="supplier_data" key={index}>
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link
                                className="table_btns_design added_now"
                                to=""
                                key={index}
                              >
                                Added
                              </Link>
                            ) : (
                              <Link className="table_btns_design add_now" to="">
                                Add
                              </Link>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade add_supplier_modal"
        id="exampleModalEdit"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content modal_design">
            <div className="modal-body">
              <div className="row">
                {editData ? (
                  <EditSupplier editData={editData} list={getSupplierList} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupplierIndex;
