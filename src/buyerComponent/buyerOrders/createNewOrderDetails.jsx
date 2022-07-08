import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  getSellersProducts,
} from "../../apiServices/buyerApiHandler/buyerOrderApiHandler";
import { useParams } from "react-router-dom";
import { getSellerProduct } from "../../apiServices/sellerApiHandler/productApiHandler";
import { toast } from "react-toastify";

function CreateNewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [unit, setUnit] = useState("");
  const [variety, setVariety] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(0);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    getOrders();
  }, [search, filter]);

  let { id } = useParams();
  const getOrders = async () => {
    const formData = {
      seller: id,
      sortBy: filter,
      search: search,
    };
    const { data } = await getSellersProducts(formData);
    if (!data.error) {
      let list = [
        ...new Map(
          data.results.products.map((item) => [item.variety.variety, item])
        ).values(),
      ];
      setVariety(list);
      setOrderDetails(data.results.products);
      setSeller(data.results.seller);
    }
  };
  console.log(filter);

  const getTypes = (varietyId) => {
    const types = orderDetails.filter(
      (inv) => String(inv.variety._id) === String(varietyId)
    );

    types.sort((a, b) =>
      a.type.type > b.type.type ? 1 : b.type.type > a.type.type ? -1 : 0
    );
    console.log(types);
    return types;
  };

  const addCart = async (item, index2, index) => {
    if (!unit) {
      toast.error("Please enter unit");
      return;
    }
    const formData = {
      seller: id,
      productId: item._id,
      quantity: unit,
      grade: item.grades,
    };

    const { data } = await addToCart(formData);
    if (!data.error) {
      document.getElementById(`unit${index2}${index}`).value = "";
    }
  };

  return (
    <>
      {" "}
      <div class="fresh_trader_main">
        <div class="buyer-container">
          <div class="trader_main_inner">
            <header class="freshtrader_header">
              <div class="row w-100 align-items-center">
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/create-new-order">
                    <img src="/assets/img/back-btn.png" alt="" />
                  </Link>
                </div>
                <div class="col px-0 text-center">
                  <a class="header_menus" href="javscript:;">
                    {seller.business_trading_name}
                  </a>
                </div>
                <div class="col-auto">
                  <Link class="back-btn" to="/buyer/cart">
                    <img src="/assets/img/cart.png" alt="" />
                  </Link>
                </div>
              </div>
            </header>
            <div class="freshtrader_main_body table_overflow">
              <div class="freshtrader_main_data">
                <div class="row comman_section_outer">
                  <div class="col-12 comman_header_main py-3">
                    <form class="search_box row">
                      <div class="col position-relative">
                        <input
                          class="form-control"
                          type="text"
                          name="search"
                          id="search"
                          placeholder="Search Product..."
                          autoComplete="off"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <span class="search_icon">
                          <i class="fa fa-search"></i>
                        </span>
                      </div>
                      <div class="col-auto ps-0 filter_btn_1">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          href="javscript:;"
                        >
                          <img src="/assets/img/filter.png" alt="" />
                        </a>
                      </div>
                    </form>
                  </div>
                  <div class="col-12 comman_table header_change_table">
                    <div class="table-responsive">
                      <table class="table">
                        {variety.map((item2, index2) => (
                          <>
                            <thead>
                              <tr>
                                <th>{item2.variety.variety}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getTypes(item2.variety._id).map(
                                (item, index) => (
                                  <tr>
                                    <td>
                                      <div class="">
                                        <div class="row align-items-center mb-3">
                                          <div class="col-auto">
                                            <span class="product_img">
                                              <img
                                                src={`${process.env.REACT_APP_APIENDPOINTNEW}${item?.type?.image}`}
                                                alt=""
                                              />
                                            </span>
                                          </div>
                                          <div class="col">
                                            <div class="product_content">
                                              <strong>{item.type.type}</strong>
                                              <span>{item.units.unit}</span>
                                              <span>Grade : {item.grades}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <form
                                          class="Add_unitform row align-items-center"
                                          action=""
                                        >
                                          <div class="col-5 text-end">
                                            <label for="">Units :</label>
                                          </div>
                                          <div class="col d-flex">
                                            <input
                                              type="number"
                                              id={`unit${index2}${index}`}
                                              class="form-control"
                                              onChange={(e) =>
                                                setUnit(e.target.value)
                                              }
                                            />
                                            <Link
                                              class="btn_form"
                                              to=""
                                              onClick={() =>
                                                addCart(item, index2, index)
                                              }
                                            >
                                              Add
                                            </Link>
                                          </div>
                                        </form>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="freshtrader_menus_outer">
              <div class="freshtrader_menus shadow">
                <a class="menus-single active" href="index.html">
                  <img src="/assets/img/home_menus.png" alt="" />
                </a>
                <a class="menus-single" href="cart.html">
                  <img src="/assets/img/cart_menus.png" alt="" />
                </a>
                <a class="menus-single" href="order.html">
                  <img src="/assets/img/list_menus.png" alt="" />
                </a>
                <a class="menus-single" href="menu.html">
                  <img src="/assets/img/category_menus.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade sorting_modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Sort By
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4 pb-5">
              <form class="row" action="">
                <div class="form-group col-12 custom_checkbox mb-3">
                  <input
                    type="radio"
                    id="check1"
                    name="check1"
                    onChange={() => setFilter(1)}
                  />
                  <label for="check1">Product Varities (A to Z)</label>
                </div>
                <div class="form-group col-12 custom_checkbox mb-3">
                  <input
                    type="radio"
                    id="check2"
                    name="check1"
                    onChange={() => setFilter(2)}
                  />
                  <label for="check2">Product Varities (Z to A)</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewOrderDetails;
