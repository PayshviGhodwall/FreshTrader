import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import { Link } from "react-router-dom";
import {
  deleteSellerProduct,
  getMyProductList,
  getMyVarietyList,
  getSellerProduct,
  undoSellerProduct,
  updateSellerProduct,
} from "../../apiServices/sellerApiHandler/productApiHandler";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";

function Product() {
  const [seller, setSeller] = useState("");
  const [variety, setVariety] = useState([]);
  const [type, setType] = useState([]);
  const [category, setCategory] = useState("Fruits");
  const [varietyValue, setVarietyValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [sellerData, setSellerData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  useEffect(() => {
    getVarietyList();
    if (!seller) getSeller();
  }, [category]);

  const getSeller = async () => {
    const { data } = await getSellerData();
    console.log(data);
    if (!data.error) {
      setSeller(data.results.seller);
      if (data.results.seller.market === "Sydney Produce and Growers Market")
        setCategory("Fruits");
      else setCategory("Flowers");
    }
  };

  const getVarietyList = async () => {
    const { data } = await getMyVarietyList(category);
    console.log(data);
    if (!data.error) {
      setVariety(data.results.varietyList);
      if (data.results.varietyList.length) {
        setVarietyValue(data.results.varietyList[0]._id);
        await getTypeList(data.results.varietyList[0]._id);
      } else {
        setType([]);
        setSellerData([]);
      }
    }
  };
  const getTypeList = async (id) => {
    const { data } = await getMyProductList(id);
    console.log(data);
    if (!data.error) {
      setType(data.results.typeList);
      setTypeValue(data.results.typeList[0]._id);
      await getSellerProd(id, data.results.typeList[0]._id);
    }
  };
  const getValue = async (item, index) => {
    if (index === 1) {
      setVarietyValue(item);
      await getTypeList(item);
    } else {
      setTypeValue(item);
      await getSellerProd(varietyValue, item);
    }
  };

  const getSellerProd = async (v, t, search = "") => {
    const formData = {
      category: category,
      variety: v,
      type: t,
      search: search,
      active_consignment: document.getElementById("active_consignment").checked,
    };
    const { data } = await getSellerProduct(formData);
    console.log(data);
    if (!data.error) {
      setSellerData(data.results.products);
    }
  };

  const updatePrice = async (e, i, type, supplier, unitType) => {
    let prev = [...prevData];
    prev.push(sellerData);
    setPrevData(prev);
    if (unitType === "Per KG") {
      sellerData[i].price = [
        {
          price: e.target.value,
        },
      ];
    } else {
      if (type === "Set One") {
        for (const supplier of sellerData[i].suppliers) {
          const price = sellerData[i].price.filter(
            (p) => String(p.supplier) === String(supplier._id)
          );
          if (price.length) {
            sellerData[i].price = sellerData[i].price.map((p) => {
              if (String(p.supplier) === String(supplier._id)) {
                p.price = e.target.value;
              }
              return p;
            });
          } else
            sellerData[i].price.push({
              supplier: supplier._id,
              price: e.target.value,
            });
        }
      } else {
        const price = sellerData[i].price.filter(
          (p) => String(p.supplier) === String(supplier._id)
        );
        if (price.length) {
          sellerData[i].price = sellerData[i].price.map((p) => {
            if (String(p.supplier) === String(supplier._id)) {
              p.price = e.target.value;
            }
            return p;
          });
        } else
          sellerData[i].price.push({
            supplier: supplier._id,
            price: e.target.value,
          });
        console.log(e.target.value);
        document.getElementById(`price${supplier._id}${i}`).value =
          e.target.value;
      }
    }
    setSelectedProduct(sellerData[i]);
    setSellerData(sellerData);
  };

  const updateInventoryCode = async (e, i, type, supplier) => {
    let prev = [...prevData];
    prev.push(sellerData);
    setPrevData(prev);
    if (type === "Set One") {
      for (const supplier of selectedProduct.suppliers) {
        const inventory_code = selectedProduct.inventory_code.filter(
          (p) => String(p.supplier) === String(supplier._id)
        );
        if (inventory_code.length) {
          selectedProduct.inventory_code = selectedProduct.inventory_code.map(
            (p) => {
              if (String(p.supplier) === String(supplier._id)) {
                p.inventory_code = e.target.value;
              }
              return p;
            }
          );
        } else
          selectedProduct.inventory_code.push({
            supplier: supplier._id,
            inventory_code: e.target.value,
          });
      }
    } else {
      const inventory_code = selectedProduct.inventory_code.filter(
        (p) => String(p.supplier) === String(supplier._id)
      );
      if (inventory_code.length) {
        selectedProduct.inventory_code = selectedProduct.inventory_code.map(
          (p) => {
            if (String(p.supplier) === String(supplier._id)) {
              p.inventory_code = e.target.value;
            }
            return p;
          }
        );
      } else
        selectedProduct.inventory_code.push({
          supplier: supplier._id,
          inventory_code: e.target.value,
        });
    }
    setSelectedProduct(selectedProduct);
  };

  const updateGST = async (i) => {
    let prev = [...prevData];
    prev.push(sellerData);
    setPrevData(prev);
    let newSellerData = [...sellerData];
    newSellerData[i].add_gst = document.getElementById(`gst${i}`).checked;
    setSelectedProduct(newSellerData[i]);
    setSellerData(newSellerData);
    await updateSellerProd(newSellerData[i]);
  };

  const updateAvailability = async (i) => {
    let prev = [...prevData];
    let newSellerData = [...sellerData];
    prev.push(newSellerData);
    setPrevData(prev);
    newSellerData[i].available_on_order_app = document.getElementById(
      `availability${i}`
    ).checked;
    setSelectedProduct(newSellerData[i]);
    setSellerData(newSellerData);
    await updateSellerProd(newSellerData[i]);
  };

  const updateGrade = async (i, grade) => {
    let prev = [...prevData];
    prev.push(sellerData);
    setPrevData(prev);
    if (document.getElementById(`${grade}${i}`).checked)
      sellerData[i].grades.push(grade);
    else
      sellerData[i].grades = sellerData[i].grades.filter((gr) => gr !== grade);
    setSelectedProduct(sellerData[i]);
    await updateSellerProd(sellerData[i]);
  };

  const updateSellerProd = async (formData) => {
    formData.productId = formData._id;
    const { data } = await updateSellerProduct(formData);
    if (!data.error) {
      await getSellerProd(varietyValue, typeValue);
    }
  };

  const deleteSellerProd = async (item) => {
    let formData = { productId: item._id };
    const { data } = await deleteSellerProduct(formData);
    console.log(data);
    if (!data.error) {
      await getSellerProd(varietyValue, typeValue);
    }
  };

  const onSearch = async (e) => {
    await getSellerProd(varietyValue, typeValue, e.target.value);
  };
  const getPrice = (product, supplier) => {
    let price = "";
    if (supplier) {
      const priceData = product.price.filter(
        (p) => String(p.supplier) === String(supplier)
      );
      if (priceData.length) price = priceData[0].price;
    } else {
      price = product.price.length ? product.price[0].price : "";
    }
    return price;
  };

  const getInventoryCode = (productId, supplier) => {
    let inventory_code = "";
    sellerData.map((a, index) => {
      if (String(a._id) === String(productId)) {
        const inventoryData = a.inventory_code.filter(
          (p) => String(p.supplier) === String(supplier)
        );
        if (inventoryData.length)
          inventory_code = inventoryData[0].inventory_code;
      }
    });
    return inventory_code;
  };

  const undo = async () => {
    let prev = [...prevData];
    const newData = prev.pop();
    console.log(newData);
    if (newData) {
      let products = [];
      for (const product of newData) {
        const suppliers = product.suppliers.map(({ _id }) => {
          return _id;
        });
        products.push({
          _id: product._id,
          seller: product.seller,
          variety: product.variety._id,
          category: category,
          type: product.type._id,
          price: product.price,
          add_gst: product.add_gst,
          inventory_code: product.inventory_code,
          available_on_order_app: product.available_on_order_app,
          grades: product.grades,
          units: product.units._id,
          suppliers: suppliers,
          inventory_code: product.inventory_code,
        });
      }
      const { data } = await undoSellerProduct({ products });
      if (!data.error) {
        await getSellerProd(varietyValue, typeValue);
        setPrevData(prev);
        setSellerData([...newData]);
      }
    }
  };
  console.log(prevData);
  return (
    <>
      <Header />
      <section className="product_page pb-md-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="product_tabs_btn">
                <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
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
                          onClick={() => setCategory("Fruits")}
                        >
                          <span>
                            <img src="assets/img/Fruits.png" alt="Fruits" />
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
                          onClick={() => setCategory("Vegetables")}
                        >
                          <span>
                            <img
                              src="assets/img/Vegetables.png"
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
                          onClick={() => setCategory("Herbs")}
                        >
                          <span>
                            <img
                              src="assets/img/Medicinal.png"
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
                          onClick={() => setCategory("Others")}
                        >
                          <span>
                            <img src="assets/img/Other.png" alt="Other" />
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
                          onClick={() => setCategory("Flowers")}
                        >
                          <span>
                            <img src="assets/img/Fruits.png" alt="Flowers" />
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
                          onClick={() => setCategory("Foliage")}
                        >
                          <span>
                            <img
                              src="assets/img/Vegetables.png"
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
                  <div className="product_search">
                    <form action="" className="row align-items-center">
                      <div className="col-xl-5 col-lg-4 mb-xl-0 mb-lg-0 mb-md-3 mb-3">
                        <div className="form-group d-flex">
                          <input
                            type="search"
                            className="form-control"
                            id="search"
                            name="search"
                            placeholder="Search Product or Supplier..."
                            onChange={(e) => onSearch(e)}
                          />
                          <button className="search_btn" type="submit">
                            <img src="assets/img/Search.png" alt="Search" />
                          </button>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group Toggle_chekbox_1 d-flex justify-content-xl-center justify-content-lg-start justify-content-md-start justify-content-start">
                          <input
                            className="d-none"
                            type="checkbox"
                            id="active_consignment"
                            onChange={() =>
                              getSellerProd(varietyValue, typeValue)
                            }
                          />
                          <label htmlFor="active_consignment">
                            Show Product in Active <br />
                            Consignments Only
                          </label>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="product_top_btns">
                          <Link
                            className="product_comman_btn"
                            to=""
                            onClick={() => undo()}
                          >
                            <img src="assets/img/Undo.png" alt="Undo" />
                            Undo
                          </Link>
                          <Link
                            className="product_comman_btn"
                            to="/add-product"
                          >
                            <img
                              src="assets/img/AddProduct.png"
                              alt="AddProduct"
                            />
                            Add Product
                          </Link>
                        </div>
                      </div>
                    </form>
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
                      <div className="product_main_outer">
                        <div className="product_main_top">
                          <div className="row mb-4">
                            <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                              <div className="choose_heading">
                                <h3>
                                  Choose Variety{" "}
                                  <span>{variety.length} variety</span>
                                </h3>
                              </div>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal2"
                                className="show_all "
                              >
                                Show All{" "}
                                <span>
                                  <i
                                    className="fa fa-expand"
                                    style={{
                                      fontSize: "15px",
                                      color: "#FFF",
                                      marginLeft: "5px",
                                    }}
                                  ></i>
                                </span>
                              </a>
                            </div>
                            <div className="d-flex">
                              <div
                                className="col-12 d-flex "
                                style={{ overflowX: "hidden" }}
                              >
                                {variety.map((item, index) => {
                                  return (
                                    <div className="choose_btn" key={index}>
                                      <Link
                                        className={
                                          String(varietyValue) ===
                                          String(item._id)
                                            ? "active"
                                            : ""
                                        }
                                        to=""
                                        onClick={() => getValue(item._id, 1)}
                                      >
                                        {item.variety}
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                              <div
                                className="right-arrow"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal2"
                              >
                                <i className="fa fa-angle-right"></i>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                              <div className="choose_heading">
                                <h3>
                                  Choose Type <span></span>
                                </h3>
                              </div>
                              <a
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal3"
                                className="show_all"
                              >
                                Show All
                                <span>
                                  <i
                                    className="fa fa-expand"
                                    style={{
                                      fontSize: "15px",
                                      color: "#FFF",
                                      marginLeft: "5px",
                                    }}
                                  ></i>
                                </span>
                              </a>
                            </div>
                            <div className="d-flex">
                              <div
                                className="col-12 d-flex"
                                style={{ overflowX: "hidden" }}
                              >
                                {type.map((item, index) => {
                                  return (
                                    <div className="choose_btn" key={index}>
                                      <Link
                                        className={
                                          String(typeValue) === String(item._id)
                                            ? "active"
                                            : ""
                                        }
                                        to=""
                                        onClick={() => getValue(item._id, 2)}
                                      >
                                        {item.type}
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                              <div
                                className="right-arrow "
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal3"
                              >
                                <i className="fa fa-angle-right"></i>
                              </div>
                            </div>
                          </div>
                          <div className="product_main_bottom">
                            <div className="row product_tables mx-0">
                              <div className="col-12">
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr style={{ background: "#374251" }}>
                                        <th>Product</th>
                                        <th>Unit Suppliers</th>
                                        <th>
                                          Price ($) <br />
                                          (INC GST)
                                        </th>
                                        <th>Set/Save</th>
                                        <th>Gst</th>
                                        <th>
                                          Inventory code <br />
                                          Set/Save
                                        </th>
                                        <th>
                                          Available <br />
                                          on order app
                                        </th>
                                        <th>
                                          Grades <br />
                                          on order app
                                        </th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sellerData?.map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            {index === 0 ? (
                                              <td rowSpan={sellerData.length}>
                                                <div className="unit_box">
                                                  <>
                                                    <span>
                                                      <img
                                                        src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.type.image}`}
                                                        alt=""
                                                      />
                                                    </span>
                                                    <Link
                                                      className="table_small_btn mb-2"
                                                      to={`/add-product-unit/${item._id}`}
                                                    >
                                                      Add Unit
                                                    </Link>
                                                    <br />
                                                  </>
                                                </div>
                                              </td>
                                            ) : (
                                              ""
                                            )}
                                            <td>
                                              <div className="unit_data">
                                                <span>{item.units.unit}</span>
                                                {item.units.unit !== "Per KG"
                                                  ? item.suppliers.map(
                                                      (item1, index1) => {
                                                        return (
                                                          <span key={index1}>
                                                            {
                                                              item1.business_trading_name
                                                            }
                                                          </span>
                                                        );
                                                      }
                                                    )
                                                  : ""}
                                              </div>
                                            </td>
                                            <td>
                                              <div className="form-group tables_input">
                                                <input
                                                  className="form-control"
                                                  type="number"
                                                  id="price"
                                                  name="price"
                                                  defaultValue={
                                                    item.units.unit === "Per KG"
                                                      ? getPrice(item, "")
                                                      : ""
                                                  }
                                                  onChange={(e) => {
                                                    item.units.unit !== "Per KG"
                                                      ? updatePrice(
                                                          e,
                                                          index,
                                                          "Set One"
                                                        )
                                                      : updatePrice(
                                                          e,
                                                          index,
                                                          "Set One",
                                                          "",
                                                          "Per KG"
                                                        );
                                                  }}
                                                />
                                                {item.units.unit !== "Per KG"
                                                  ? item.suppliers.map(
                                                      (item1, index1) => {
                                                        return (
                                                          <input
                                                            key={index1}
                                                            className="form-control"
                                                            type="number"
                                                            id={`price${item1._id}${index}`}
                                                            name={`price${item1._id}${index}`}
                                                            value={getPrice(
                                                              item,
                                                              item1._id
                                                            )}
                                                            onChange={(e) =>
                                                              updatePrice(
                                                                e,
                                                                index,
                                                                "Set Diff",
                                                                item1
                                                              )
                                                            }
                                                          />
                                                        );
                                                      }
                                                    )
                                                  : ""}
                                              </div>
                                            </td>
                                            <td>
                                              {item.units.unit !== "Per KG" ? (
                                                <Link
                                                  className="table_small_btn mb-2"
                                                  to=""
                                                  onClick={() =>
                                                    updateSellerProd(
                                                      selectedProduct
                                                    )
                                                  }
                                                >
                                                  Set One Price
                                                </Link>
                                              ) : (
                                                <Link
                                                  className="table_small_btn mb-2"
                                                  to=""
                                                  onClick={() =>
                                                    updateSellerProd(
                                                      selectedProduct
                                                    )
                                                  }
                                                >
                                                  Set Price
                                                </Link>
                                              )}
                                              <br />
                                              {item.units.unit !== "Per KG"
                                                ? item.suppliers.map(
                                                    (item1, index) => {
                                                      return (
                                                        <>
                                                          <Link
                                                            key={index}
                                                            className="table_small_btn mb-2"
                                                            to=""
                                                            onClick={() =>
                                                              updateSellerProd(
                                                                selectedProduct
                                                              )
                                                            }
                                                          >
                                                            Save Price
                                                          </Link>
                                                          <br />
                                                        </>
                                                      );
                                                    }
                                                  )
                                                : ""}
                                            </td>

                                            <td>
                                              {item.units.unit !== "Per KG" ? (
                                                <div className="form-group custom_check_box">
                                                  <input
                                                    type="checkbox"
                                                    id={`gst${index}`}
                                                    checked={item.add_gst}
                                                    onClick={() =>
                                                      updateGST(index)
                                                    }
                                                  />
                                                  <label
                                                    htmlFor={`gst${index}`}
                                                  ></label>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </td>
                                            <td>
                                              {item.units.unit !== "Per KG" ? (
                                                <a
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#exampleModal"
                                                  className="table_small_btn"
                                                  onClick={() =>
                                                    setSelectedProduct(item)
                                                  }
                                                >
                                                  Set/Save
                                                </a>
                                              ) : (
                                                ""
                                              )}
                                            </td>
                                            <td>
                                              <div className="form-group Toggle_chekbox_1 Toggle_chekbox_changes d-flex justify-content-center">
                                                <input
                                                  className="d-none"
                                                  type="checkbox"
                                                  id={`availability${index}`}
                                                  checked={
                                                    item.available_on_order_app
                                                  }
                                                  onChange={() =>
                                                    updateAvailability(index)
                                                  }
                                                />
                                                <label
                                                  htmlFor={`availability${index}`}
                                                ></label>
                                              </div>
                                            </td>
                                            <td>
                                              <div className="select_grades">
                                                <div className="dropdown">
                                                  <button
                                                    className="btn dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton1"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                  >
                                                    Grades
                                                  </button>
                                                  <div
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton1"
                                                  >
                                                    <div className="row">
                                                      <div className="col-12">
                                                        <div className="form-group custom_radio">
                                                          <input
                                                            type="checkbox"
                                                            id={`N/A${index}`}
                                                            defaultChecked={item.grades?.includes(
                                                              "N/A"
                                                            )}
                                                            onChange={() =>
                                                              updateGrade(
                                                                index,
                                                                "N/A"
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            htmlFor={`N/A${index}`}
                                                          >
                                                            N/A
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-12">
                                                        <div className="form-group custom_radio">
                                                          <input
                                                            type="checkbox"
                                                            id={`EG${index}`}
                                                            defaultChecked={item.grades?.includes(
                                                              "EG"
                                                            )}
                                                            onChange={() =>
                                                              updateGrade(
                                                                index,
                                                                "EG"
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            htmlFor={`EG${index}`}
                                                          >
                                                            EG
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-12">
                                                        <div className="form-group custom_radio">
                                                          <input
                                                            type="checkbox"
                                                            id={`NO.1${index}`}
                                                            defaultChecked={item.grades?.includes(
                                                              "NO.1"
                                                            )}
                                                            onChange={() =>
                                                              updateGrade(
                                                                index,
                                                                "NO.1"
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            htmlFor={`NO.1${index}`}
                                                          >
                                                            NO.1
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-12">
                                                        <div className="form-group custom_radio">
                                                          <input
                                                            type="checkbox"
                                                            id={`NO.2${index}`}
                                                            defaultChecked={item.grades?.includes(
                                                              "NO.2"
                                                            )}
                                                            onChange={() =>
                                                              updateGrade(
                                                                index,
                                                                "NO.2"
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            htmlFor={`NO.2${index}`}
                                                          >
                                                            NO.2
                                                          </label>
                                                        </div>
                                                      </div>
                                                      <div className="col-12">
                                                        <div className="form-group custom_radio">
                                                          <input
                                                            type="checkbox"
                                                            id={`OG${index}`}
                                                            defaultChecked={item.grades?.includes(
                                                              "OG"
                                                            )}
                                                            onChange={() =>
                                                              updateGrade(
                                                                index,
                                                                "OG"
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            htmlFor={`OG${index}`}
                                                          >
                                                            OG
                                                          </label>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <Link
                                                to=""
                                                onClick={() =>
                                                  deleteSellerProd(item)
                                                }
                                              >
                                                <img
                                                  className="delete_btn"
                                                  src="assets/img/Delete.png"
                                                  alt="Delete"
                                                />
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
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      ></div>
                      <div
                        className="tab-pane fade"
                        id="contact"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      ></div>
                      <div
                        className="tab-pane fade"
                        id="contact1"
                        role="tabpanel"
                        aria-labelledby="contact1-tab"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <div className="col-md-4">
                  <div className="setting_box_img">
                    <div className="setting_img">
                      <img
                        src={`${process.env.REACT_APP_APIENDPOINTNEW}${selectedProduct?.type?.image}`}
                        alt=""
                      />
                    </div>
                    <strong>{selectedProduct?.type?.type}</strong>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="settings_tabls">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr style={{ background: "#5f6874" }}>
                            <th>Unit Suplliers</th>
                            <th>Inventory Code</th>
                            <th>Set/Save</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span>{selectedProduct?.units?.unit}</span>
                            </td>
                            <td>
                              <div className="form-group tables_input">
                                <input
                                  className="form-control"
                                  type="text"
                                  id="inventory_code"
                                  name="inventory_code"
                                  onChange={(e) =>
                                    updateInventoryCode(
                                      e,
                                      selectedProduct,
                                      "Set One"
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <a
                                className="table_small_btn"
                                onClick={() =>
                                  updateSellerProd(selectedProduct)
                                }
                              >
                                Set One Code
                              </a>
                            </td>
                          </tr>
                          {selectedProduct?.suppliers?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <span>{item.business_trading_name}</span>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="inventory_code"
                                    name="inventory_code"
                                    defaultValue={getInventoryCode(
                                      selectedProduct?._id,
                                      item._id
                                    )}
                                    onChange={(e) =>
                                      updateInventoryCode(
                                        e,
                                        selectedProduct,
                                        "Set Diff",
                                        item
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <a
                                    className="table_small_btn"
                                    onClick={() =>
                                      updateSellerProd(selectedProduct)
                                    }
                                  >
                                    Save Code
                                  </a>
                                </td>
                              </tr>
                            );
                          })}

                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <Link
                                className="table_small_btn w-100"
                                to=""
                                id="exampleModal"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                Save
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row product_box d-flex justify-content-between px-2">
                <div className="choose_heading">
                  <h3>Choose Variety</h3>
                </div>
                {variety.map((item, index) => {
                  return (
                    <div className="col-md-4  my-3" key={index}>
                      <div className="choose_btn-detail">
                        <Link
                          className={
                            String(varietyValue) === String(item._id)
                              ? "active"
                              : ""
                          }
                          to=""
                          onClick={() => getValue(item._id, 1)}
                        >
                          {item.variety}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade settings_section"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row product_box_type d-flex justify-content-between px-2">
                <div className="choose_heading">
                  <h3>Choose Variety</h3>
                </div>
                {type.map((item, index) => {
                  return (
                    <div className="col-md-4  my-3" key={index}>
                      <div className="choose_btn-detail">
                        <Link
                          className={
                            String(typeValue) === String(item._id)
                              ? "active"
                              : ""
                          }
                          to=""
                          onClick={() => getValue(item._id, 2)}
                        >
                          {item.type}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
