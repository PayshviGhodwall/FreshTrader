import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  addProductInConsignment,
  changeConsignmentStatus,
  getConsignmentDetail,
  getSuppliersProduct,
  removeProductFromConsignment,
} from "../../apiServices/sellerApiHandler/purchaseApiHandler";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreateConsignment() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [consData, setConsData] = useState("");
  const [supplierProduct, setSupplierProduct] = useState([]);
  const [variety, setVariety] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [gp, setGp] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getConsData();
    supplierProductList();
  }, [products]);

  const getConsData = async () => {
    const { data } = await getConsignmentDetail(id);
    console.log();

    if (!data.error) {
      setConsData(data.results.consignment);
      let defaultValues = {};
      defaultValues.supplier =
        data.results.consignment.supplier.business_trading_name;
      defaultValues.co_op_agent = data.results.consignment.co_op_agent;
      defaultValues.consign = data.results.consignment.consign;
      defaultValues.con_id = data.results.consignment.con_id;
      defaultValues.consign_pallets = data.results.consignment.consign_pallets;
      defaultValues.consign_notes = data.results.consignment.consign_notes;
      defaultValues.grading = data.results.consignment.grading;
      defaultValues.grader_name = data.results.consignment.grader_name;
      defaultValues.documents_received =
        data.results.consignment.documents_received;
      defaultValues.purchase = data.results.consignment.purchase;
      defaultValues.status = data.results.consignment.status;

      reset({ ...defaultValues });
    }
    const total_cost = data.results.consignment.products.reduce(function (
      a,
      b
    ) {
      return a + +b.total_cost;
    },
    0);
    setTotalCost(total_cost);

    const total_sale = data.results.consignment.products.reduce(function (
      a,
      b
    ) {
      return a + +b.total_sales;
    },
    0);
    setTotalSale(total_sale);

    const total_gp = data.results.consignment.products.reduce(function (a, b) {
      return a + +b.gross_profit;
    }, 0);
    setGp(total_gp);

    supplierProductList(data.results.consignment.supplier._id);
  };

  const supplierProductList = async (id, search) => {
    const formData = { supplierId: id, search: search };
    const { data } = await getSuppliersProduct(formData);
    if (!data.error) {
      let list = [
        ...new Map(
          data.results.products.map((item) => [item.variety.variety, item])
        ).values(),
      ];
      console.log(list);

      setVariety(list);
      setSupplierProduct(data.results.products);
      console.log(data);
    }
  };
  const getTypes = (varietyId) => {
    const types = supplierProduct.filter(
      (inv) => String(inv.variety._id) === String(varietyId)
    );
    const list = [
      ...new Map(types.map((item) => [item.type.type, item])).values(),
    ];
    list.sort((a, b) =>
      a.type.type > b.type.type ? 1 : b.type.type > a.type.type ? -1 : 0
    );
    console.log(list);
    return list;
  };

  const getUnits = (typeId) => {
    const units = supplierProduct.filter(
      (inv) => String(inv.type._id) === String(typeId)
    );
    const list = [
      ...new Map(units.map((item) => [item.units.unit, item])).values(),
    ];
    console.log(list);
    return list;
  };
  const isAdded = (id) => {
    const pa = consData.products.filter(
      (inv) => String(inv.productId._id) === String(id)
    );
    if (pa.length) {
      return true;
    } else {
      return false;
    }
  };

  const addProduct = async (index, index1, index2, item) => {
    console.log(index1, index2, item);
    const add = {
      productId: item._id,

      consign: document.getElementById(`consign${index}${index1}${index2}`)
        .value,
      advised: +document.getElementById(`advise${index}${index1}${index2}`)
        .value,
      received: +document.getElementById(`recieve${index}${index1}${index2}`)
        .value,
      waste: +document.getElementById(`waste${index}${index1}${index2}`).value,
      graded: +document.getElementById(`grade${index}${index1}${index2}`).value,
      cost_per_unit: +document.getElementById(`cost${index}${index1}${index2}`)
        .value,
      average_sales_price: +document.getElementById(
        `sale${index}${index1}${index2}`
      ).value,
      total_cost:
        +document.getElementById(`recieve${index}${index1}${index2}`).value *
        +document.getElementById(`cost${index}${index1}${index2}`).value,
      inv_on_hand: +document.getElementById(`recieve${index}${index1}${index2}`)
        .value,
    };

    const formData = {
      consignmentId: id,
      products: consData.products.concat([add]),
    };

    const { data } = await addProductInConsignment(formData);
    if (!data.error) {
      await getConsData();
    }
  };
  const deleteProduct = async (product_id) => {
    const formData = {
      consignmentId: id,
      productId: product_id,
    };
    console.log(formData);
    const { data } = await removeProductFromConsignment(formData);
    if (!data.error) {
      await getConsData();
    }
  };
  const completeCons = async () => {
    const formData = {
      consignmentId: id,
      status: "COMPLETE",
    };
    const { data } = await changeConsignmentStatus(formData);
    if (!data.error) {
      navigate(`/complete-consignment/${id}`);
    }
  };

  return (
    <>
      <Header />
      <section class="add_consignment">
        <div class="container">
          <div class="row consignment_form py-3">
            <div class="col-lg-4 col-md-6 mb-lg-0 md-md-3 mb-2">
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">Supplier</label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="text"
                    id="supplier"
                    name="supplier"
                    {...register("supplier", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">CO-OP Agent</label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col-lg-3 col-md-4">
                  <div class="consiment-check mb-4">
                    <input
                      class="d-none"
                      type="checkbox"
                      id="co_op_agent"
                      name="co_op_agent"
                      {...register("co_op_agent", {
                        required: true,
                      })}
                    />
                    <label for="co_op_agent"></label>
                  </div>
                </div>
              </div>
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">Consign</label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="text"
                    id="consign"
                    name="consign"
                    {...register("consign", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">
                    Con ID <br />
                    (Optional Nickname)
                  </label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="text"
                    id="con_id"
                    name="con_id"
                    {...register("con_id", {
                      required: false,
                    })}
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 px-lg-4 mb-lg-0 md-md-3 mb-2">
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">
                    Consign <br /> Pallets
                  </label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="number"
                    id="consign_pallets"
                    name="consign_pallets"
                    {...register("consign_pallets", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div class="form-group row align-items-center invisible">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">
                    Consign <br /> Pallets
                  </label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div class="form-group row align-items-start mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">
                    Consiment <br />
                    Notes
                  </label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <textarea
                    class="form-control"
                    name="consign_notes"
                    id="consign_notes"
                    cols="30"
                    rows="10"
                    {...register("consign_notes", {
                      required: true,
                    })}
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-lg-0 md-md-3 mb-4">
              <div class="form-group row align-items-center mb-md-5 mb-3">
                <div class="col-12 mb-md-4 mb-3 pt-2">
                  <strong class="heading_check text-white">Grading :</strong>
                </div>
                <div class="col-4 px-md-3 px-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="checknew1"
                      name="grading"
                      value="None"
                      {...register("grading", {
                        required: true,
                      })}
                    />
                    <label for="checknew1">None</label>
                  </div>
                </div>
                <div class="col-4 px-md-3 px-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="checknew2"
                      name="grading"
                      value="Internal"
                      {...register("grading", {
                        required: true,
                      })}
                    />
                    <label for="checknew2">Internal</label>
                  </div>
                </div>
                <div class="col-4 px-md-3 px-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="checknew3"
                      name="grading"
                      value="External"
                      {...register("grading", {
                        required: true,
                      })}
                    />
                    <label for="checknew3">External</label>
                  </div>
                </div>
              </div>
              <div class="form-group row align-items-center mb-2">
                <div class="col-md-5 mb-md-0 mb-2">
                  <label class="mb-0 form_tag">Grader Name</label>
                </div>
                <div class="col-auto px-0 d-md-block d-none">
                  <span class="text-white">:</span>
                </div>
                <div class="col">
                  <input
                    class="form-control"
                    type="text"
                    id="grader_name"
                    name="grader_name"
                    {...register("grader_name", {
                      required: true,
                    })}
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-md-6 mt-xl-4 mb-xl-3 mb-lg-0 md-md-3 mb-4">
              <div class="row form-group consignment_form_bottom justify-content-md-center justify-content-end">
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="check1"
                      name="status"
                      value="AWAITING DELIVERY"
                      {...register("status", {
                        required: true,
                      })}
                    />
                    <label for="check1">Awaiting Delivery</label>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="check2"
                      name="status"
                      value="ACTIVE"
                      {...register("status", {
                        required: true,
                      })}
                    />
                    <label for="check2">Active</label>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="check3"
                      name="status"
                      value="ON HOLD"
                      {...register("status", {
                        required: true,
                      })}
                    />
                    <label for="check3">On Hold</label>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="checkbox"
                      id="documents_received"
                      name="documents_received"
                      {...register("documents_received", {
                        required: true,
                      })}
                    />
                    <label for="documents_received">Documents Recieved</label>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="smcs_purchase"
                      name="purchase"
                      value="SMCS"
                      {...register("purchase", {
                        required: true,
                      })}
                    />
                    <label for="smcs_purchase">SMCS Purchase</label>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                  <div class="consiment-check">
                    <input
                      class="d-none"
                      type="radio"
                      id="cash_purchase"
                      value="CASH"
                      name="purchase"
                      {...register("purchase", {
                        required: true,
                      })}
                    />
                    <label for="cash_purchase">Cash Purchase</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="add_consignment_table consignment_comman comman_table_design">
            <div class="table-responsive">
              <table class="table mb-0">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Product/Edit</th>
                    <th>Consign#</th>
                    <th>Advised</th>
                    <th>Recieved</th>
                    <th>Waste</th>
                    <th>Graded</th>
                    <th>
                      Cost ($) <br /> Per Unit{" "}
                    </th>
                    <th>
                      total <br /> Cost ($)
                    </th>
                    <th>Sold</th>
                    <th>%Sold</th>
                    <th>
                      Avg. Sales <br />
                      Price
                    </th>
                    <th>
                      total <br /> Sales ($)
                    </th>
                    <th>Void</th>
                    <th>
                      INV. <br /> On Hand
                    </th>
                    <th>
                      Gross <br /> Profit
                    </th>
                    <th>
                      Gross <br /> Profit(%)
                    </th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {consData?.products?.map((product, index) => (
                    <tr>
                      <td>
                        {product.productId?.variety?.variety}, <br />
                        {product.productId?.type?.type}, <br />(
                        {product.productId?.units?.unit})
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          id=""
                          name=""
                          defaultValue={product.consign}
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          id=""
                          name=""
                          defaultValue={product.advised}
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          id=""
                          name=""
                          defaultValue={product.received}
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.waste}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.graded}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.cost_per_unit}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.total_cost}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.sold}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.sold_percentage}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.average_sales_price}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.total_sales}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.void}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.inv_on_hand}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.gross_profit}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <input
                          class="consiment_data_box"
                          type="text"
                          defaultValue={product.gross_profit_percentage}
                          id=""
                          name=""
                        />
                      </td>
                      <td>
                        <Link
                          class="icon_design"
                          to=""
                          onClick={() => deleteProduct(product.productId._id)}
                        >
                          <img src="../assets/img/delete_white.png" alt="" />
                        </Link>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product">
                      <a
                        class="product_comman_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        href="javscript:;"
                      >
                        <img
                          src="../assets/img/AddProduct.png"
                          alt="AddProduct"
                        />
                        Add Product
                      </a>
                    </td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                    <td class="consignment-product"></td>
                  </tr>
                  <tr>
                    <td>Total Stats</td>
                    <td>Total Cost ($): {totalCost} </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total Sales ($): {totalSale}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Gross Profit ($): {gp.toFixed(2)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>GP (%): {((+gp / +totalSale) * 100).toFixed(2)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row justify-content-center py-4">
            <div class="col-md-5 col-10">
              <div class="row">
                <div class="col-md-4 mb-md-0 mb-3 text-center">
                  <a class="product_comman_btn" href="javascript:;">
                    Print A4 Info
                  </a>
                </div>
                <div class="col-md-4 mb-md-0 mb-3 text-center">
                  <a class="product_comman_btn" href="javascript:;">
                    Print A4 Balance
                  </a>
                </div>
                <div class="col-md-4 mb-md-0 mb-3 text-center">
                  <Link
                    class="product_comman_btn"
                    to=""
                    onClick={() => completeCons()}
                  >
                    Complete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        class="modal fade add_product_modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content modal_design">
            <div class="modal-header px-md-3 py-3 px-2 border-0">
              <div class="row align-items-center w-100 justify-content-between mx-auto">
                <div class="col-md-auto mb-md-0 mb-2">
                  <h5 class="modal-title text-white">Add Product</h5>
                </div>
                <div class="col-lg-5 col-md-6">
                  <div class="product_search">
                    <form action="" class="">
                      <div class="form-group d-flex">
                        <input
                          type="search"
                          class="form-control"
                          id="search"
                          name="search"
                          placeholder="Search Product..."
                          onChange={(e) =>
                            supplierProductList(
                              consData.supplier._id,
                              e.target.value
                            )
                          }
                        />
                        <button class="search_btn" type="submit">
                          <img src="../assets/img/Search.png" alt="Search" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn-close btn_modal_design position-relative top-0 end-0 d-flex align-items-center justify-content-center"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
            <div class="modal-body p-0">
              <div class="addproduct_table comman_table_design border-0">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit</th>
                        <th>Consign#</th>
                        <th>Advised</th>
                        <th>Recieved</th>
                        <th>Waste</th>
                        <th>Graded</th>
                        <th>
                          Cost($) <br />
                          (Per Unit)
                        </th>
                        <th>
                          Sales <br />
                          Price($)
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {variety.map((item, index) => {
                        return (
                          <>
                            <tr>
                              <td
                                colSpan={10}
                                class="prdocuct_head text-center"
                              >
                                <span>{item.variety.variety}</span>
                              </td>
                            </tr>
                            {getTypes(item.variety._id).map((item1, index1) => (
                              <tr>
                                <td>
                                  <div class="supplier_product">
                                    <img
                                      src={`${process.env.REACT_APP_APIENDPOINTNEW}${item1.type.image}`}
                                      alt=""
                                    />
                                  </div>
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <span class="consign_data">
                                        {item2.type.type}
                                        <br />({item2.units.unit})
                                      </span>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="text"
                                          id={`consign${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`advise${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`recieve${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`waste${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`grade${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`cost${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) => (
                                      <div class="form-group mb-2">
                                        <input
                                          class="consiment_data_box"
                                          type="number"
                                          id={`sale${index}${index1}${index2}`}
                                          name=""
                                        />
                                      </div>
                                    )
                                  )}
                                </td>

                                <td>
                                  {getUnits(item1.type._id).map(
                                    (item2, index2) =>
                                      isAdded(item2._id) ? (
                                        <a
                                          class="consinment_btns_design added_now mb-2"
                                          href="javascript:;"
                                        >
                                          Added
                                        </a>
                                      ) : (
                                        <Link
                                          class="consinment_btns_design add_now mb-2"
                                          to=""
                                          onClick={() =>
                                            addProduct(
                                              index,
                                              index1,
                                              index2,
                                              item2
                                            )
                                          }
                                        >
                                          Add
                                        </Link>
                                      )
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
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
    </>
  );
}

export default CreateConsignment;
