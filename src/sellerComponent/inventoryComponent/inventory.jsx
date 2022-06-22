import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import {
  getInventory,
  printInventory,
  resetCarryOver,
  resetInventory,
} from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import { Link } from "react-router-dom";
function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [variety, setVariety] = useState([]);
  const [search, setSearch] = useState("");
  const [overselling, setOverselling] = useState(false);
  useEffect(() => {
    getInventoryList();
  }, [search, overselling]);

  const getInventoryList = async () => {
    const formData = {
      search: search,
      allow_overselling: overselling,
    };
    const { data } = await getInventory(formData);
    console.log(data);
    if (!data.error) {
      let list = [
        ...new Map(
          data.results.inventories.map((item) => [
            item.productId.variety.variety,
            item,
          ])
        ).values(),
      ];
      setInventory(data.results.inventories);
      setVariety(list);
    }
  };

  const getTypes = (varietyId) => {
    const types = inventory.filter(
      (inv) => String(inv.productId.variety._id) === String(varietyId)
    );
    const list = [
      ...new Map(
        types.map((item) => [item.productId.type.type, item])
      ).values(),
    ];
    list.sort((a, b) =>
      a.productId.type.type > b.productId.type.type
        ? 1
        : b.productId.type.type > a.productId.type.type
        ? -1
        : 0
    );
    return list;
  };

  const getUnits = (typeId) => {
    const units = inventory.filter(
      (inv) => String(inv.productId.type._id) === String(typeId)
    );
    const list = [
      ...new Map(
        units.map((item) => [item.productId.units.unit, item])
      ).values(),
    ];
    return list;
  };

  const getConsignments = (typeId, unitId) => {
    const consignments = inventory.filter(
      (inv) =>
        String(inv.productId.type._id) === String(typeId) &&
        String(inv.productId.units._id) === String(unitId)
    );
    consignments.sort((a, b) =>
      a.consignment > b.consignment ? 1 : b.consignment > a.consignment ? -1 : 0
    );
    return consignments;
  };

  const getTotal = (typeId, unitId, i) => {
    const units = inventory.filter(
      (inv) =>
        String(inv.productId.type._id) === String(typeId) &&
        String(inv.productId.units._id) === String(unitId)
    );
    let total = 0;
    if (i === 1) {
      total = units.reduce(function (a, b) {
        return a + b.carry_over;
      }, 0);
    } else if (i === 2) {
      total = units.reduce(function (a, b) {
        return a + b.purchase;
      }, 0);
    } else if (i === 3) {
      total = units.reduce(function (a, b) {
        return a + b.ready_to_sell;
      }, 0);
    } else if (i === 4) {
      total = units.reduce(function (a, b) {
        return a + b.sold;
      }, 0);
    } else if (i === 5) {
      total = units.reduce(function (a, b) {
        return a + b.void;
      }, 0);
    } else if (i === 6) {
      total = units.reduce(function (a, b) {
        return a + b.remaining;
      }, 0);
    }
    return total;
  };

  const reset = async () => {
    const { data } = await resetInventory();
    if (!data.error) {
      await getInventoryList();
    }
  };

  const resetCO = async () => {
    const { data } = await resetCarryOver();
    if (!data.error) {
      await getInventoryList();
    }
  };

  const print = async (type) => {
    const formData = {
      search: search,
      station: "",
      type: type,
    };
    await printInventory(formData);
  };

  return (
    <>
      <Header />
      <section className="inventory_section">
        <div className="container">
          <div className="product_search row py-3 align-items-center">
            <div className="col-md-auto pe-lg-5 order-md-0 order-1 mt-md-0 mt-3 pt-md-0 pt-2">
              <div className="product_show_top flex-md-nowrap flex-wrap d-flex align-items-center justify-content-md-start justify-content-center">
                <Link
                  className="product_comman_btn me-md-2 mb-md-0 mb-2"
                  to="/"
                >
                  <img src="assets/img/arrow-left-line.png" alt="Back" />
                  Back
                </Link>
                <div className="dropdown comman_dropdown me-md-2 mb-md-0 mb-2">
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
                <div className="dropdown comman_dropdown me-md-2 mb-md-0 mb-2">
                  <button
                    className="product_comman_btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Action
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="" onClick={reset}>
                        Reset Stock
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="" onClick={resetCO}>
                        Reset C/Over
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="">
                        Adjust C/Over
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="">
                        Saves Remain C/Overs
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={() => print(1)}
                      >
                        Print Running Balance
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={() => print(2)}
                      >
                        Print Stock Sheet
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-sm">
              <div className="product_search">
                <form
                  action=""
                  className="row align-items-center justify-content-xl-between justify-content-start"
                >
                  <div className="col-xl-6 col-lg-8 mb-xl-0 mb-lg-0 mb-md-3 mb-4">
                    <div className="form-group d-flex">
                      <input
                        type="search"
                        className="form-control"
                        id="search"
                        name="search"
                        placeholder="Search Product..."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <Link className="search_btn" to="">
                        <img src="assets/img/Search.png" alt="Search" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="form-group Toggle_chekbox Toggle_chekbox_design  d-flex justify-content-xl-center justify-content-lg-start justify-content-md-start justify-content-start align-items-center">
                      <input
                        className="d-none"
                        type="checkbox"
                        id="overselling"
                        checked={overselling}
                        onChange={() => setOverselling(!overselling)}
                      />
                      <label for="overselling">Allow Overselling: </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="inventory_main">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ background: "#5f6874" }}>
                    <th>Product</th>
                    <th>Unit</th>
                    <th>
                      Total <br />
                      Supplier (CON#)
                    </th>
                    <th>
                      Carry <br /> over{" "}
                    </th>
                    <th>
                      Today's <br /> Purchases{" "}
                    </th>
                    <th>
                      Ready <br /> To Sell{" "}
                    </th>
                    <th>Sold </th>
                    <th>Void </th>
                    <th>
                      Remaining <br /> Stock{" "}
                    </th>
                    <th>
                      Physical <br /> Stock{" "}
                    </th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {variety.map((item, index) => (
                    <>
                      <tr key={index}>
                        <td
                          colSpan={11}
                          className="prdocuct_head"
                          style={{ textAlign: "center" }}
                        >
                          <span>{item.productId.variety.variety}</span>
                        </td>
                      </tr>
                      {getTypes(item.productId.variety._id).map(
                        (item1, index1) => {
                          return getUnits(item1.productId.type._id).map(
                            (item2, index2) => {
                              return getConsignments(
                                item2.productId.type._id,
                                item2.productId.units._id
                              ).map((item3, index3) => (
                                <tr key={`${index1}${index2}`}>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {index2 === 0 && index3 === 0 ? (
                                      <div className="product_inventry">
                                        <div className="product_inventry_img">
                                          <img
                                            src={`${process.env.REACT_APP_APIENDPOINTNEW}${item1.productId?.type?.image}`}
                                            alt=""
                                          />
                                        </div>
                                        <span>
                                          {item1.productId?.type?.type}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {index3 === 0
                                      ? item2.productId?.units.unit
                                      : ""}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? `${item3.consignment.supplier.business_trading_name} (C#${item3.consignment.consign})`
                                      : "Total"}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.carry_over
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          1
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.purchase
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          2
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.ready_to_sell
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          3
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.sold
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          4
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.void
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          5
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment
                                      ? item3.remaining
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          6
                                        )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    +
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    -
                                  </td>
                                </tr>
                              ));
                            }
                          );
                        }
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inventory;
