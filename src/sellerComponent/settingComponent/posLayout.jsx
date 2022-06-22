import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addSellerProduct,
  changeVarietyStatus,
  editCategoryName,
  getLayout,
  getMyPOSProducts,
  getVariety,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function PosLayout() {
  const [variety, setVariety] = useState([]);
  const [FruitItem, setFruitItem] = useState([]);
  const [herbsItem, setHerbsItem] = useState([]);
  const [vegetablesItem, setVegetablesItem] = useState([]);
  const [othersItem, setOthersItem] = useState([]);
  const [totalItem, setTotalItem] = useState([]);
  const [layout, setLayout] = useState([]);
  const [category, setCategory] = useState("Fruits");
  const [categoryName, setCategoryName] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(0);

  useEffect(() => {
    getVarietyList();
    posLayout();
    getPosProduct();
  }, [category, search, filter]);

  const posLayout = async () => {
    const { data } = await getLayout(category);
    console.log(data);
    setLayout(data.results.products);
    setCategoryName(data.results.categories);
  };

  const getVarietyList = async () => {
    const { data } = await getVariety(category);
    console.log(data);
    if (!data.error) {
      let list = [{ _id: -1, variety: "Select Heading" }];
      list = list.concat(data.results.varieties);

      setVariety(list);
    }
  };

  const getPosProduct = async (variety) => {
    if (!variety) {
      setFruitItem([]);
      setHerbsItem([]);
      setVegetablesItem([]);
      setOthersItem([]);
      setTotalItem([]);
      return;
    }
    const { data } = await getMyPOSProducts(search, filter, category, variety);
    if (!data.error) {
      let fruits = data.results.products.filter(
        (item) => item.variety.product === "Fruits"
      );
      let herbs = data.results.products.filter(
        (item) => item.variety.product === "Herbs"
      );
      let vegetables = data.results.products.filter(
        (item) => item.variety.product === "Vegetables"
      );
      let others = data.results.products.filter(
        (item) => item.variety.product === "Others"
      );
      setFruitItem(fruits);
      setHerbsItem(herbs);
      setVegetablesItem(vegetables);
      setOthersItem(others);
      setTotalItem(data.results.products);
    }
  };
  const addProduct = async (item) => {
    console.log(item);
    const { data } = await addSellerProduct(item, category);
    console.log(data);
    if (!data.error) {
      await getPosProduct(item.variety?._id);
      await posLayout();
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const filterBy = async (select) => {
    setFilter(select);
  };

  const editCategory = (e, index) => {
    let editName = categoryName;
    editName[index].alias = e.target.value;
    setCategoryName(editName);
  };
  const editCategoryNm = async () => {
    const { data } = await editCategoryName(categoryName);
    if (!data.error) {
      await posLayout();
    }
  };

  const toggle = async (status, id) => {
    console.log(status, id, "uguigi");
    const formData = {
      varietyId: id,
      status: status,
    };
    const response = await changeVarietyStatus(formData);
    if (!response.data.error) {
      await posLayout();
    }
  };

  console.log(variety);
  return (
    <>
      <Header />
      <section className="product_page pos-layout pb-md-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="product_tabs_btn">
                <ul className="nav nav-tabs border-0" id="myTab" role="tablist">
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

                      {categoryName.length ? categoryName[0].alias : "Fruits"}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setCategory("Vegetables")}
                    >
                      <span>
                        <img src="assets/img/Vegetables.png" alt="Vegetables" />
                      </span>
                      {categoryName.length
                        ? categoryName[1].alias
                        : "Vegetables"}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link "
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setCategory("Herbs")}
                    >
                      <span>
                        <img src="assets/img/Medicinal.png" alt="Medicinal" />
                      </span>
                      {categoryName.length ? categoryName[2].alias : "Herbs"}
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link "
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      onClick={() => setCategory("Others")}
                    >
                      <span>
                        <img src="assets/img/Other.png" alt="Other" />
                      </span>
                      {categoryName.length ? categoryName[3].alias : "Others"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="row py-3">
                <div className="col">
                  <div className="product_search">
                    <form
                      action=""
                      className="row align-items-center justify-content-md-start justify-content-center"
                    >
                      <div className="col-auto">
                        <div className="">
                          <a
                            className="product_comman_btn m-0 text-center"
                            href="javascript:;"
                          >
                            <img src="assets/img/Undo.png" alt="Undo" />
                            Undo
                          </a>
                        </div>
                      </div>
                      <div className="col-auto px-0">
                        <div className="">
                          <a
                            className="product_comman_btn m-0 text-center"
                            href="javascript:;"
                          >
                            Save
                          </a>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="">
                          <Link
                            className="product_comman_btn m-0 text-center"
                            to=""
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Edit Category Name
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm mt-md-0 mt-3">
                        <p className="m-0 text-white">
                          Remeber to press save after you make changes
                        </p>
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
                          <div className="row pos-layout-top">
                            <div className="col-12 mb-md-3 mb-2">
                              <span>Enable/Disable Column</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className="product_main_bottom"
                          style={{ overflowX: "scroll", overflowY: "hidden" }}
                        >
                          <form
                            action=""
                            className="row mx-0 pos-layout-form py-3"
                          >
                            <div className="col layout-width">
                              <div className="row flex-nowrap">
                                {layout.map((item, index) => {
                                  return (
                                    <>
                                      <div
                                        className="col-2 text-center"
                                        key={index}
                                      >
                                        <div className="table_toggle_radio_2 mb-3">
                                          <input
                                            className="d-none"
                                            type="checkbox"
                                            id={`checktoggle${index}`}
                                            checked={item.variety.status}
                                            onChange={() =>
                                              toggle(
                                                document.getElementById(
                                                  `checktoggle${index}`
                                                ).checked,
                                                item.variety._id
                                              )
                                            }
                                          />
                                          <label
                                            for={`checktoggle${index}`}
                                          ></label>
                                        </div>

                                        <div className="form-group mb-md-4 mb-3">
                                          <select className="form-control">
                                            {variety.map((item1, index) => {
                                              return (
                                                <>
                                                  <option
                                                    key={index}
                                                    value={item1._id}
                                                    selected={
                                                      String(
                                                        item.variety._id
                                                      ) === String(item1._id)
                                                        ? true
                                                        : false
                                                    }
                                                  >
                                                    {item1.variety}
                                                  </option>
                                                </>
                                              );
                                            })}
                                          </select>
                                        </div>

                                        {item.types.map((type, index1) => {
                                          return (
                                            <div
                                              className="form-group mb-md-4 mb-3"
                                              key={index1}
                                            >
                                              <a
                                                className="layout-box-white"
                                                href="javscript:;"
                                              >
                                                <div className="layout-white-content">
                                                  <strong>{type.type}</strong>
                                                  {/* <span>{type.type}</span> */}
                                                  <span>{type.inv}</span>
                                                </div>
                                              </a>
                                            </div>
                                          );
                                        })}

                                        <div
                                          className="form-group mb-md-4 mb-3"
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModalProduct"
                                          onClick={() =>
                                            getPosProduct(item.variety._id)
                                          }
                                        >
                                          <a
                                            className="layout-box"
                                            href="javscript:;"
                                          >
                                            <i className="fa fa-plus"></i>
                                          </a>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                                <div className="col-2 text-center">
                                  <div className="table_toggle_radio_2 mb-3 d-visible">
                                    <input
                                      className="d-none"
                                      type="checkbox"
                                      id="check1"
                                    />
                                    <label for="check1"></label>
                                  </div>

                                  <div className="form-group mb-md-4 mb-3">
                                    <select className="form-control">
                                      {variety.map((item, index) => {
                                        return (
                                          <option value={item._id} key={index}>
                                            {item.variety}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>

                                  <div
                                    className="form-group mb-md-4 mb-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModalProduct"
                                    onClick={() => getPosProduct("")}
                                  >
                                    <a
                                      className="layout-box"
                                      href="javscript:;"
                                    >
                                      <i className="fa fa-plus"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
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
      </section>
      <div
        className="modal fade Supplier_product"
        id="exampleModalProduct"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content modal_design">
            <div className="modal-header p-4 border-0">
              <div className="row">
                <div className="col-12 mb-3">
                  <h5 className="modal-title text-white">Add Product to POS</h5>
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
                            onChange={(e) => onChange(e)}
                            autoComplete="off"
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
                              onClick={() => filterBy(1)}
                            >
                              Added
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              to=""
                              onClick={() => filterBy(2)}
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
                      <th colSpan={3} className="prdocuct_head text-center">
                        <span>Fruits</span>
                      </th>
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
                              src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.image}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type}</p>
                          </span>
                        </td>

                        <td>
                          {item.isAdded ? (
                            <Link className="table_btns_design added_now" to="">
                              Added
                            </Link>
                          ) : (
                            <Link
                              className="table_btns_design add_now"
                              to=""
                              onClick={() => addProduct(item)}
                            >
                              Add
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {herbsItem.length ? (
                    <tr>
                      <th colSpan={3} className="prdocuct_head text-center">
                        <span>Herbs</span>
                      </th>
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
                              src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.image}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type}</p>
                          </span>
                        </td>

                        <td>
                          {item.isAdded ? (
                            <Link className="table_btns_design added_now" to="">
                              Added
                            </Link>
                          ) : (
                            <Link
                              className="table_btns_design add_now"
                              to=""
                              onClick={() => addProduct(item)}
                            >
                              Add
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {vegetablesItem.length ? (
                    <tr>
                      <th colSpan={3} className="prdocuct_head text-center">
                        <span>Vegetables</span>
                      </th>
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
                              src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.image}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type}</p>
                          </span>
                        </td>

                        <td>
                          {item.isAdded ? (
                            <Link className="table_btns_design added_now" to="">
                              Added
                            </Link>
                          ) : (
                            <Link
                              className="table_btns_design add_now"
                              to=""
                              onClick={() => addProduct(item)}
                            >
                              Add
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {othersItem.length ? (
                    <tr>
                      <th colSpan={3} className="prdocuct_head text-center">
                        <span>Others</span>
                      </th>
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
                              src={`${process.env.REACT_APP_APIENDPOINTNEW}${item.image}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <span className="supplier_data">
                            {item.variety.variety} <br />
                            <p>{item.type}</p>
                          </span>
                        </td>

                        <td>
                          {item.isAdded ? (
                            <Link className="table_btns_design added_now" to="">
                              Added
                            </Link>
                          ) : (
                            <Link
                              className="table_btns_design add_now"
                              to=""
                              onClick={() => addProduct(item)}
                            >
                              Add
                            </Link>
                          )}
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
                <div className="col-md-12">
                  <div className="settings_tabls">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          {" "}
                          <tr>
                            <th>Category Name</th>
                            <th>Alias Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span>Fruits</span>
                            </td>
                            <td>
                              <input
                                className="form-control w-100"
                                type="text"
                                id="price"
                                name="price"
                                defaultValue={
                                  categoryName.length
                                    ? categoryName[0].alias
                                    : ""
                                }
                                onChange={(e) => editCategory(e, 0)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Vegetables</span>
                            </td>
                            <td>
                              <input
                                className="form-control w-100"
                                type="text"
                                id="price"
                                name="price"
                                defaultValue={
                                  categoryName.length
                                    ? categoryName[1].alias
                                    : ""
                                }
                                onChange={(e) => editCategory(e, 1)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pb-2">
                              <span>Herbs</span>
                            </td>
                            <td className="pb-2">
                              <input
                                className="form-control w-100"
                                type="text"
                                id="price"
                                name="price"
                                defaultValue={
                                  categoryName.length
                                    ? categoryName[2].alias
                                    : ""
                                }
                                onChange={(e) => editCategory(e, 2)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="pb-4">
                              <span>Others</span>
                            </td>
                            <td className="pb-4">
                              <input
                                className="form-control w-100"
                                type="text"
                                id="price"
                                name="price"
                                defaultValue={
                                  categoryName.length
                                    ? categoryName[3].alias
                                    : ""
                                }
                                onChange={(e) => editCategory(e, 3)}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>
                              <Link
                                className="table_small_btn w-50"
                                to=""
                                onClick={() => editCategoryNm()}
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
    </>
  );
}

export default PosLayout;
