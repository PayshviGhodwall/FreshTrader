import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import {
  adjustCarryOver,
  adjustInventory,
  getInventory,
  printInventory,
  resetCarryOver,
  resetInventory,
  resetPhysicalStock,
  resetSoldToday,
  undoInventory,
  updateOverselling,
} from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import { Link } from "react-router-dom";
import { getSellerData } from "../../apiServices/sellerApiHandler/loginApiHandler";
function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [variety, setVariety] = useState([]);
  const [search, setSearch] = useState("");
  const [overselling, setOverselling] = useState(false);
  const [carryOver, setCarryOver] = useState(false);
  const [updatedInv, setUpdatedInv] = useState([]);
  const [undo, setUndo] = useState([]);

  useEffect(() => {
    getInventoryList();
    getsellerInfo();
  }, [search, overselling]);

  const getsellerInfo = async () => {
    const { data } = await getSellerData();
    if (!data.error) {
      setOverselling(data.results.seller.allow_overselling);
    }
  };

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
    list.sort((a, b) =>
      a.productId.units.weight > b.productId.units.weight
        ? 1
        : b.productId.units.weight > a.productId.units.weight
        ? -1
        : 0
    );
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
        return a + b.purchase;
      }, 0);
    } else if (i === 2) {
      total = units.reduce(function (a, b) {
        return a + b.total_sold;
      }, 0);
    } else if (i === 3) {
      total = units.reduce(function (a, b) {
        return a + b.carry_over;
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
    } else if (i === 7) {
      total = units.reduce(function (a, b) {
        return a + b.physical_stock ? b.physical_stock : 0;
      }, 0);
    } else if (i === 8) {
      total = units.reduce(function (a, b) {
        return a + b.physical_stock ? b.physical_stock : 0;
      }, 0);

      let rem = units.reduce(function (a, b) {
        return a + b.remaining;
      }, 0);

      total = total ? rem - total : 0;
    }
    return total.toFixed(2);
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

  const soldToday = async () => {
    const { data } = await resetSoldToday();
    if (!data.error) {
      await getInventoryList();
    }
  };
  const phStock = async () => {
    const { data } = await resetPhysicalStock();
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

  const onOverselling = async (value) => {
    const formData = {
      allow_overselling: value,
    };
    const { data } = await updateOverselling(formData);
    if (!data.error) {
      setOverselling(value);
    }
  };

  const adjustInv = async (value, id, index) => {
    const prev = inventory.filter((a) => String(a._id) === String(id));

    const formData = {
      inventoryId: id,
      purchase: index === "p" ? value : prev[0].purchase,
      total_sold: index === "ts" ? value : prev[0].total_sold,
      voids: index === "v" ? value : prev[0].void,
      physical_stock: index === "ph" ? value : prev[0].physical_stock,
    };
    setTimeout(async () => {
      const { data } = await adjustInventory(formData);
      if (!data.error) {
        await getInventoryList();
        let prevValue = [...undo];
        prevValue.push({
          _id: prev[0]._id,
          carry_over: prev[0].carry_over,
          purchase: prev[0].purchase,
          total_sold: prev[0].total_sold,
          voids: prev[0].void,
          physical_stock: prev[0].physical_stock,
        });
        setUndo(prevValue);
      }
    }, 2000);
  };
  console.log(updatedInv);

  const changeCarryOver = async (id, value) => {
    const prev = inventory.filter((a) => String(a._id) === String(id));
    const upInv = updatedInv.filter((a) => String(a._id) === String(id));

    let carry = [];
    if (upInv.length) {
      carry = carry.map((item) => {
        if (String(item._id) === String(id)) item.carry_over = +value;
        return item;
      });
    } else {
      carry.push({ _id: id, carry_over: +value });
      console.log(carry);
    }

    setUpdatedInv([...carry]);
  };

  const adjCarryOver = async () => {
    const formData = {
      inventoryIds: updatedInv,
    };
    const { data } = await adjustCarryOver(formData);
    if (!data.error) {
      let prevValue = [...undo];
      for (const inv of inventory) {
        if (inv.consignment) {
          prevValue.push({
            _id: inv._id,
            carry_over: inv.carry_over,
            purchase: inv.purchase,
            total_sold: inv.total_sold,
            voids: inv.void,
            physical_stock: inv.physical_stock,
          });
        }
      }

      setUndo(prevValue);
      await getInventoryList();
    }
  };

  const undoFunction = async () => {
    if (undo.length) {
      const formData = {
        inventoryIds: undo,
      };
      const { data } = await undoInventory(formData);
      if (!data.error) {
        await getInventoryList();
      }
    }
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
                      <Link className="dropdown-item" to="" onClick={soldToday}>
                        Reset Sold Today
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="" onClick={phStock}>
                        Reset Ph/Stock
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={() => setCarryOver(true)}
                      >
                        Adjust C/Over
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={() => adjCarryOver()}
                      >
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
                    <li>
                      <Link
                        className="dropdown-item"
                        to=""
                        onClick={undoFunction}
                      >
                        Undo
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
                    <div className="form-group Toggle_chekbox_1 Toggle_chekbox_design  d-flex justify-content-xl-center justify-content-lg-start justify-content-md-start justify-content-start align-items-center">
                      <input
                        className="d-none"
                        type="checkbox"
                        id="overselling"
                        checked={overselling}
                        onChange={() => onOverselling(!overselling)}
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
            <div className="table-responsive table-fixed">
              <table className="table">
                <thead>
                  <tr style={{ background: "#5f6874" }}>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Unit</th>

                    <th>
                      Total <br />
                      Supplier (CON#)
                    </th>
                    <th>Purchased</th>
                    <th>
                      Total <br />
                      Sold
                    </th>
                    <th>
                      Carry <br /> over{" "}
                    </th>

                    <th>
                      Sold <br /> Today
                    </th>
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
                          colSpan={12}
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
                                    {index2 === 0 && index3 === 0
                                      ? item2.productId?.type.type
                                      : ""}
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
                                    {item3.consignment ? (
                                      <input
                                        class="consiment_data_box"
                                        type="number"
                                        name=""
                                        defaultValue={item3.purchase}
                                        onChange={(e) =>
                                          adjustInv(
                                            e.target.value,
                                            item3._id,
                                            "p"
                                          )
                                        }
                                      />
                                    ) : (
                                      getTotal(
                                        item2.productId.type._id,
                                        item2.productId.units._id,
                                        1
                                      )
                                    )}
                                  </td>
                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment ? (
                                      <input
                                        class="consiment_data_box"
                                        type="number"
                                        name=""
                                        defaultValue={item3.total_sold}
                                        onChange={(e) =>
                                          adjustInv(
                                            e.target.value,
                                            item3._id,
                                            "ts"
                                          )
                                        }
                                      />
                                    ) : (
                                      getTotal(
                                        item2.productId.type._id,
                                        item2.productId.units._id,
                                        2
                                      )
                                    )}
                                  </td>

                                  <td
                                    className={
                                      index2 === 0 && index3 === 0
                                        ? "border_design"
                                        : ""
                                    }
                                  >
                                    {item3.consignment && carryOver ? (
                                      <input
                                        class="consiment_data_box"
                                        type="number"
                                        name=""
                                        defaultValue={item3.carry_over}
                                        onChange={(e) =>
                                          changeCarryOver(
                                            item3._id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ) : (
                                      getTotal(
                                        item2.productId.type._id,
                                        item2.productId.units._id,
                                        3
                                      )
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
                                    {item3.consignment ? (
                                      <input
                                        class="consiment_data_box"
                                        type="number"
                                        name=""
                                        defaultValue={item3.void}
                                        onChange={(e) =>
                                          adjustInv(
                                            e.target.value,
                                            item3._id,
                                            "v"
                                          )
                                        }
                                      />
                                    ) : (
                                      getTotal(
                                        item2.productId.type._id,
                                        item2.productId.units._id,
                                        5
                                      )
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
                                      ? item3.remaining.toFixed(2)
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
                                    {item3.consignment ? (
                                      <input
                                        class="consiment_data_box"
                                        type="number"
                                        name=""
                                        defaultValue={item3.physical_stock}
                                        onChange={(e) =>
                                          adjustInv(
                                            e.target.value,
                                            item3._id,
                                            "ph"
                                          )
                                        }
                                      />
                                    ) : (
                                      getTotal(
                                        item2.productId.type._id,
                                        item2.productId.units._id,
                                        7
                                      )
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
                                      ? item3.physical_stock
                                        ? item3.remaining - item3.physical_stock
                                        : 0
                                      : getTotal(
                                          item2.productId.type._id,
                                          item2.productId.units._id,
                                          8
                                        )}
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
