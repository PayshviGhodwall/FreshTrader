import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addPalletsReceived,
  addPalletsTaken,
  getPallets,
  getPalletsCount,
  returnPallets,
  searchBuyers,
  searchSuppliers,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import Header from "../commonComponent/header";

function Pallets() {
  const [count, setCount] = useState("");
  const [list, setList] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [pallets, setPallets] = useState("");
  const [palletsList, setPalletsList] = useState([]);
  const [returnPalletsValue, setReturnPalletsValue] = useState("");
  const [filter, setFilter] = useState(0);
  const [sorting, setSorting] = useState(0);

  useEffect(() => {
    getPalletsCountList();
    getPalletsList();
  }, [filter, sorting]);

  const getPalletsCountList = async () => {
    const { data } = await getPalletsCount();
    if (!data.error) setCount(data.results);
    console.log(data);
  };

  const getPalletsList = async () => {
    console.log(filter);
    const { data } = await getPallets(filter, sorting);
    if (!data.error) setPalletsList(data.results.sellerPallets);
    console.log(data);
  };

  const getFilter = (select) => {
    setFilter(select);
  };
  const getSorting = (select) => {
    setSorting(select);
  };

  const onChange = async (e, index) => {
    if (index === 1) {
      if (e.target.value) {
        const response = await searchSuppliers(e.target.value);
        if (!response.data.error) setList(response.data.results.suppliers);
      } else {
        setList([]);
        setSelectValue("");
      }
    } else if (index === 2) {
      if (e.target.value) {
        const response = await searchBuyers(e.target.value);
        if (!response.data.error) setList(response.data.results.buyers);
      } else {
        setList([]);
        setSelectValue("");
      }
    }
  };

  const onSelect = async (list, index) => {
    if (index === 1) {
      document.getElementById("search1").value = list.business_trading_name;
      setList([]);
      setSelectValue(list._id);
    } else if (index === 2) {
      document.getElementById("search2").value = list.business_trading_name;
      setList([]);
      setSelectValue(list._id);
    }
  };

  const onChangePallets = async (e, index) => {
    if (index === 1) {
      setPallets(e.target.value);
    } else if (index === 2) {
      setPallets(e.target.value);
    }
  };

  const addSupplierPallets = async () => {
    const response = await addPalletsReceived(selectValue, pallets);
    if (!response.data.error) {
      setList([]);
      setSelectValue("");
      setPallets("");
      document.getElementById("search1").value = "";
      document.getElementById("pallet1").value = "";
      await getPalletsCountList();
      await getPalletsList();
    }
  };

  const addBuyerPallets = async () => {
    const response = await addPalletsTaken(selectValue, pallets);
    if (!response.data.error) {
      setList([]);
      setSelectValue("");
      setPallets("");
      document.getElementById("search2").value = "";
      document.getElementById("pallet2").value = "";
      await getPalletsCountList();
      await getPalletsList();
    }
  };
  const getReturnPallet = async (e) => {
    setReturnPalletsValue(e.target.value);
  };

  const returnPallet = async (id, index) => {
    const response = await returnPallets(id, returnPalletsValue);
    if (!response.data.error) {
      document.getElementById(`return${index}`).value = "";
      await getPalletsList();
      await getPalletsCountList();
    }
  };
  const allReturnPallet = async (item) => {
    const noOfPallets = item.pallets_received
      ? item.pallets_received
      : item.pallets_taken;
    const response = await returnPallets(item._id, noOfPallets);
    if (!response.data.error) {
      await getPalletsList();
      await getPalletsCountList();
    }
  };

  return (
    <>
      <Header />
      <section class="pallets">
        <div class="container">
          <div class="row py-3 align-items-center">
            <div class="col-lg-3 mb-lg-0 mb-md-2 mb-3">
              <div class="row">
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
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getSorting(1)}
                      >
                        Seller (A-Z)
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getSorting(2)}
                      >
                        Seller (Z-A)
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getSorting(3)}
                      >
                        Pallets (Highest)
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getSorting(4)}
                      >
                        Pallets (Lowest)
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="col-auto dropdown comman_dropdown mx-0  ps-0">
                  <button
                    class="product_comman_btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filter
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getFilter(1)}
                      >
                        Pallets Received
                      </Link>
                    </li>
                    <li>
                      <Link
                        class="dropdown-item"
                        to=""
                        onClick={() => getFilter(2)}
                      >
                        Pallets Taken
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 mb-md-0 mb-3">
              <form class="row pallets_form align-items-center">
                <div class="col-lg-5 col mb-md-2 mb-2">
                  <label for="">
                    Pallets <br />
                    Recieved(+)
                  </label>
                </div>
                <div class="col-auto d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col-lg-5">
                  <div class="form-group position-relative">
                    <input
                      class="form-control"
                      type="text"
                      id=""
                      value={count.pallets_received}
                    />
                    <a
                      href="javascript:;"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal11"
                      class="pallets_form_btn"
                    >
                      +
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-3 col-md-4 mb-md-0 mb-3">
              <form class="row pallets_form align-items-center">
                <div class="col-lg-5 col mb-md-2 mb-2">
                  <label for="">
                    Pallets <br />
                    Taken(-)
                  </label>
                </div>
                <div class="col-auto d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col-lg-5">
                  <div class="form-group position-relative">
                    <input
                      class="form-control"
                      type="text"
                      id=""
                      value={count.pallets_taken}
                    />
                    <a
                      href="javascript:;"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal12"
                      class="pallets_form_btn"
                    >
                      -
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-lg-3 col-md-4 mb-md-0 mb-3">
              <form class="row pallets_form align-items-center">
                <div class="col-lg-5 col mb-md-2 mb-2">
                  <label for="">
                    Pallets <br />
                    On Hand(=)
                  </label>
                </div>
                <div class="col-auto d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col-lg-5">
                  <div class="form-group position-relative">
                    <input
                      class="form-control"
                      type="text"
                      id=""
                      value={count.pallets_on_hand}
                    />
                    <a
                      href="javascript:;"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal13"
                      class="pallets_form_btn"
                    >
                      =
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="pallets-table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Buyer/Supplier</th>
                    <th>Pallets Recieved</th>
                    <th>Pallets Taken</th>
                    <th>#return Pallets</th>
                    <th>Return</th>
                    <th>Return All</th>
                  </tr>
                </thead>
                <tbody>
                  {palletsList.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.supplier.business_trading_name}</td>
                        <td>{item.pallets_received}</td>
                        <td>{item.pallets_taken}</td>
                        <td>
                          <div class="form-group">
                            <input
                              class="consiment_data_box"
                              type="text"
                              id={`return${index}`}
                              name={`return${index}`}
                              onChange={(e) => getReturnPallet(e)}
                            />
                          </div>
                        </td>
                        <td>
                          <Link
                            onClick={() => returnPallet(item._id, index)}
                            class="tables_btns"
                            to=""
                          >
                            Return
                          </Link>
                        </td>
                        <td>
                          <Link
                            onClick={() => allReturnPallet(item)}
                            class="tables_btns tables_green_btn"
                            to=""
                          >
                            Return All
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
        class="modal fade comman_modal"
        id="exampleModal11"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header p-4">
              <div class="row align-items-center w-100 justify-content-between">
                <div class="col mb-md-0 mb-2">
                  <h5 class="modal-title text-white">Pallets Recieved</h5>
                </div>
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn-close btn_modal_design"
                    data-bs-dismiss="modal"
                    aria-label=""
                  ></button>
                </div>
              </div>
            </div>
            <div class="modal-body p-0">
              <forn class="row mx-0">
                <div class="col-12 p-4 comman_modal_search">
                  <div class="product_search py-2">
                    <div class="form-group d-flex">
                      <input
                        type="search"
                        class="form-control shadow-none"
                        id="search1"
                        name="search1"
                        placeholder="Search Suppliers..."
                        onChange={(e) => onChange(e, 1)}
                        autoComplete="off"
                      />

                      <button class="search_btn" type="submit">
                        <img src="assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      list.length ? "nav-issFlyout-show" : "nav-issFlyout"
                    }
                  >
                    <div className="nav-template nav-flyout-content">
                      <div className="autocomplete-results-container">
                        {list.map((item, index) => {
                          return (
                            <div className="s-suggestion-container">
                              <div
                                className="s-suggestion s-suggestion-ellipsis-direction"
                                onClick={() => onSelect(item, 1)}
                              >
                                <span>{item.business_trading_name}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 px-4 py-5 comman_ad_box">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <label class="text-white" for="">
                        Pallets
                      </label>
                    </div>
                    <div class="col d-flex">
                      <input
                        type="text"
                        class="form-control shadow-none"
                        defaultValue="0"
                        onChange={(e) => onChangePallets(e, 1)}
                        id="pallet1"
                      />
                      <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => addSupplierPallets()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </forn>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade comman_modal"
        id="exampleModal12"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header p-4">
              <div class="row align-items-center w-100 justify-content-between">
                <div class="col mb-md-0 mb-2">
                  <h5 class="modal-title text-white">Pallets Taken</h5>
                </div>
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn-close btn_modal_design"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
            <div class="modal-body p-0">
              <forn class="row mx-0">
                <div class="col-12 p-4 comman_modal_search">
                  <div class="product_search py-2">
                    <div class="form-group d-flex">
                      <input
                        type="search"
                        class="form-control shadow-none"
                        id="search2"
                        name="search2"
                        placeholder="Search Buyers..."
                        onChange={(e) => onChange(e, 2)}
                        autoComplete="off"
                      />
                      <button class="search_btn" type="submit">
                        <img src="assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={
                      list.length ? "nav-issFlyout-show" : "nav-issFlyout"
                    }
                  >
                    <div className="nav-template nav-flyout-content">
                      <div className="autocomplete-results-container">
                        {list.map((item, index) => {
                          return (
                            <div className="s-suggestion-container">
                              <div
                                className="s-suggestion s-suggestion-ellipsis-direction"
                                onClick={() => onSelect(item, 2)}
                              >
                                <span>{item.business_trading_name}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 px-4 py-5 comman_ad_box">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <label class="text-white" for="">
                        Pallets
                      </label>
                    </div>
                    <div class="col d-flex">
                      <input
                        type="text"
                        class="form-control shadow-none"
                        defaultValue="0"
                        onChange={(e) => onChangePallets(e, 2)}
                        id="pallet2"
                      />
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => addBuyerPallets()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </forn>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade comman_modal"
        id="exampleModal13"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal_design">
            <div class="modal-header p-4">
              <div class="row align-items-center w-100 justify-content-between">
                <div class="col mb-md-0 mb-2">
                  <h5 class="modal-title text-white">Pallets On Hand</h5>
                </div>
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn-close btn_modal_design"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
            <div class="modal-body p-0">
              <forn class="row mx-0">
                <div class="col-12 p-4 comman_modal_search">
                  <p>
                    Input The Pallets you have on hand. It can not be less than
                    your recieved pallets minus the pallets taken.
                  </p>
                </div>
                <div class="col-12 px-4 py-5 comman_ad_box">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <label class="text-white" for="">
                        Pallets
                      </label>
                    </div>
                    <div class="col d-flex">
                      <input
                        type="text"
                        class="form-control shadow-none"
                        value="0"
                      />
                      <button type="submit">Equal</button>
                    </div>
                  </div>
                </div>
              </forn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pallets;
