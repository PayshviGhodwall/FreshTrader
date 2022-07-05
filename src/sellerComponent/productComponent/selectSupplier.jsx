import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  addProductSupplier,
  addSupplier,
  getMyProducts,
  getSuppliers,
  searchSuppliers,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../apiServices/sellerApiHandler/productApiHandler";

function SelectSupplier() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [FruitItem, setFruitItem] = useState([]);
  const [herbsItem, setHerbsItem] = useState([]);
  const [vegetablesItem, setVegetablesItem] = useState([]);
  const [othersItem, setOthersItem] = useState([]);
  const [totalItem, setTotalItem] = useState([]);
  const [supplierId, setSupplierId] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState([]);

  const navigate = useNavigate();
  let { id } = useParams();

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
    getProductDetails();
  }, []);

  const getSupplierList = async () => {
    const { data } = await getSuppliers();
    if (!data.error) setSupplierList(data.results.suppliers);
    console.log(data);
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
  const supplierOnChange = async (id, index) => {
    let supplier = [...selectedSupplier];
    if (document.getElementById(`product${index}`).checked) {
      supplier.push(id);
    } else {
      supplier = supplier.filter((v) => String(v) !== String(id));
    }
    setSelectedSupplier(supplier);
  };

  const getSupplierProduct = async (id) => {
    setSupplierId(id);
    const { data } = await getMyProducts(id);
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
  const getProductDetails = async () => {
    const { data } = await getProductDetail(id);
    if (!data.error) {
      setData(data.results.product);
    }
  };

  const next = async () => {
    const { data } = await addProductSupplier(id, selectedSupplier);
    if (!data.error) {
      navigate(`/add-product-unit/${id}`);
    }
  };
  return (
    <>
      <Header />{" "}
      <section class="Supplier_index">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-md-auto"></div>
            <div class="col-sm">
              <div class="product_search">
                <form
                  action=""
                  class="row align-items-center justify-content-md-between justify-content-start"
                >
                  <div class="col-xl-4 col-lg-5 col-md-6 ps-md-0 mb-md-0 mb-2">
                    <div className="select-supplier-product">
                      <div className="product-detail d-flex">
                        <span className="unit-box-small">
                          <img
                            src={`${process.env.REACT_APP_APIENDPOINTNEW}${data?.type?.image}`}
                            alt=""
                          />
                        </span>
                        <div className="unit-box-content">
                          <span>{data?.type?.type}</span>
                          <span> {data?.variety?.variety}</span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-5 col-lg-6 col-md-7 ps-md-0 mb-md-0 ">
                    <div className="unit-box-search">
                      <span>Select all the suppliers for this product</span>{" "}
                    </div>

                    <div class="form-group d-flex">
                      <input
                        type="search"
                        class="form-control"
                        id="search"
                        name="search"
                        placeholder="Search Supplier..."
                        onChange={(e) => onChange(e)}
                        autoComplete="off"
                      />
                      <button class="search_btn" type="submit">
                        <img src="../assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div>
                  <div class="col-auto">
                    <a
                      class="product_comman_btn ms-0"
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
        <div class="container-fluid px-0">
          <div class="Supplier_index_table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Select</th>
                    <th>Supplier</th>
                    <th>Supplier Id</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>

                <tbody>
                  {supplierList.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <div class="form-group product_checkbox_1">
                            <input
                              class="d-none"
                              type="checkbox"
                              id={`product${index}`}
                              onChange={() => supplierOnChange(item._id, index)}
                            />
                            <label for={`product${index}`}></label>
                          </div>
                        </td>
                        <td>{item.business_trading_name}</td>
                        <td>{item.supplierId}</td>
                        <td>{item.market_seller ? "CO OP" : "Grover"}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div class="row justify-content-center py-4">
              <Link
                class="customer_btn mx-md-3 mb-md-0 mb-2 tables_green_btn text-center"
                to=""
                style={{ width: "30%" }}
                onClick={() => next()}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div
        class="modal fade add_supplier_modal"
        id="exampleModal6"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content modal_design">
            <div class="modal-body">
              <div class="row">
                <div class="col-12 Product_heading">
                  <h2>Add Supplier</h2>
                </div>
                <div class="col-12">
                  <form
                    class="row add_business_form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">
                            Business Trading Name
                          </label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">Phone Number</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">Email Address</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">ABN</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">Entity Name</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">Address</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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
                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">
                            In This Business A Market Seller
                          </label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col Business_radio">
                          <input
                            class="d-none"
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
                        <div class="col Business_radio">
                          <input
                            class="d-none"
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
                    <div class="form-group col-12 my-md-4 my-3">
                      <div class="row align-items-center">
                        <div class="col-12">
                          <label class="mb-0 form_tag1">
                            In This Business A Market Seller, add their SMSC
                            Code below. A buyer Business Account Will be made
                            for the market seller in case you also sell to them.
                            Ignore this account if you only buy from this
                            seller.
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-group col-12 mb-md-2 mb-3">
                      <div class="row align-items-center">
                        <div class="col-md-5 mb-md-0 mb-2">
                          <label class="mb-0 form_tag">SMCS</label>
                        </div>
                        <div class="col-auto d-md-block d-none">
                          <span class="text-white">:</span>
                        </div>
                        <div class="col">
                          <input
                            class="form-control"
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

                    <div class="form-group col-12 mt-md-4 mt-3">
                      <div class="row justify-content-center">
                        <div class="col-md-4">
                          <button
                            class="custom_btns"
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
        class="modal fade Supplier_product"
        id="exampleModal7"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content modal_design">
            <div class="modal-header p-4 border-0">
              <div class="row">
                <div class="col-12 mb-3">
                  <h5 class="modal-title text-white">Supplier Product</h5>
                  <button
                    type="button"
                    class="btn-close btn_modal_design"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="col-12">
                  <div class="product_search">
                    <form
                      action=""
                      class="row align-items-center justify-content-center"
                    >
                      <div class="col">
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
                      </div>
                      <div class="col-auto">
                        <a class="product_comman_btn ms-0" href="javascript:;">
                          <img src="assets/img/sound-module-fill.png" alt="" />{" "}
                          Filter
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body comman_table_design p-0 mt-0 border-0">
              <div class="table-responsive">
                <table class="table">
                  {FruitItem.length ? (
                    <tr>
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center">
                        <span>Fruits</span>
                      </th>
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {FruitItem.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <div class="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span class="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span class="supplier_data">
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link class="table_btns_design added_now" to="">
                                Added
                              </Link>
                            ) : (
                              <Link
                                class="table_btns_design add_now"
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
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center">
                        <span>Herbs</span>
                      </th>
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {herbsItem.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <div class="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span class="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span class="supplier_data">
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link class="table_btns_design added_now" to="">
                                Added
                              </Link>
                            ) : (
                              <Link class="table_btns_design add_now" to="">
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
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center">
                        <span>Vegetables</span>
                      </th>
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {vegetablesItem.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <div class="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span class="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span class="supplier_data">
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link class="table_btns_design added_now" to="">
                                Added
                              </Link>
                            ) : (
                              <Link class="table_btns_design add_now" to="">
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
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center">
                        <span>Others</span>
                      </th>
                      <th class="prdocuct_head text-center"></th>
                      <th class="prdocuct_head text-center"></th>
                    </tr>
                  ) : (
                    ""
                  )}

                  {othersItem.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <div class="supplier_product">
                            <img
                              src={`${
                                process.env.REACT_APP_APIENDPOINTNEW
                              }${item.type.image.replace("/public", "")}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span class="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type.type}</p>
                          </span>
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return (
                              <span class="supplier_data">
                                {item1.units.unit}
                              </span>
                            );
                          })}
                        </td>
                        <td>
                          {getUnits(item.type._id).map((item1, index) => {
                            return item1.isAdded ? (
                              <Link class="table_btns_design added_now" to="">
                                Added
                              </Link>
                            ) : (
                              <Link class="table_btns_design add_now" to="">
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
    </>
  );
}

export default SelectSupplier;
