import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getSuppliers } from "../../apiServices/sellerApiHandler/accountingApiHandler";
import {
  createConsignment,
  getSuppliersProduct,
} from "../../apiServices/sellerApiHandler/purchaseApiHandler";
import Header from "../commonComponent/header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddConsignment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [coop, setCoop] = useState(false);
  const [supplierProduct, setSupplierProduct] = useState([]);
  const [variety, setVariety] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    data.supplier = selectedSupplier;
    data.co_op_agent = coop;

    for (const product of products) {
      delete product.products;
    }
    data.products = products;

    const response = await createConsignment(data);
    if (!response.data.error) {
      navigate(`/create-consignment/${response.data.results.consignment._id}`);
    }
  };
  useEffect(() => {
    getSupplierList();
    if (selectedSupplier) supplierProductList();
  }, [selectedSupplier, products]);

  const getSupplierList = async () => {
    const { data } = await getSuppliers();
    if (!data.error) {
      let list = [{ _id: -1, business_trading_name: "Select Supplier" }];
      list = list.concat(data.results.suppliers);
      setSupplierList(list);
    }
  };
  const getSupplierValue = async (id) => {
    const supplier = supplierList.filter((a) => String(id) === String(a._id));
    if (supplier.length) {
      setSelectedSupplier(id);
      setCoop(supplier[0].market_seller);
    }
  };

  const supplierProductList = async (search) => {
    const formData = { supplierId: selectedSupplier, search: search };
    const { data } = await getSuppliersProduct(formData);
    if (!data.error) {
      let list = [
        ...new Map(
          data.results.products.map((item) => [item.variety.variety, item])
        ).values(),
      ];

      setVariety(list);
      setSupplierProduct(data.results.products);
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
    return list;
  };

  const getUnits = (typeId) => {
    const units = supplierProduct.filter(
      (inv) => String(inv.type._id) === String(typeId)
    );
    const list = [
      ...new Map(units.map((item) => [item.units.unit, item])).values(),
    ];
    return list;
  };
  const isAdded = (id) => {
    const pa = products.filter((inv) => String(inv.productId) === String(id));
    if (pa.length) {
      return true;
    } else {
      return false;
    }
  };

  const addProduct = (index, index1, index2, item) => {
    console.log(index1, index2, item);
    const add = {
      productId: item._id,
      products: item,
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

    console.log(document.getElementById(`grade${index}${index1}${index2}`));

    setProducts(products.concat([add]));
  };

  console.log(products);

  const onChangeProductValue = async (value, index, no) => {
    let values = [...products];
    if (no === 1) values[index].consign = value;
    else if (no === 2) values[index].advised = value;
    else if (no === 3) values[index].received = value;
    else if (no === 4) values[index].waste = value;
    else if (no === 5) values[index].graded = value;
    else if (no === 6) values[index].cost_per_unit = value;

    values[index].total_cost =
      values[index].received * values[index].cost_per_unit;

    setProducts(values);
  };

  const deleteProduct = async (id) => {
    let product = products;
    product = product.filter((item) => String(item.productId) !== String(id));
    setProducts(product);
  };

  return (
    <>
      <Header />
      <section class="add_consignment">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      id="supplier"
                      name="supplier"
                      onChange={(e) => getSupplierValue(e.target.value)}
                    >
                      {supplierList.map((item, index) => {
                        return (
                          <option value={item._id}>
                            {item.business_trading_name}
                          </option>
                        );
                      })}
                    </select>
                    {errors?.supplier && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                        checked={coop}
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
                    {errors?.consign && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                    {errors?.con_id && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                    {errors?.consign_pallets && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                    {errors?.consign_notes && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                  {errors?.grading && (
                    <p className="form-error mt-3">This field is required</p>
                  )}
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
                    {errors?.grader_name && (
                      <p className="form-error mt-2">This field is required</p>
                    )}
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
                    {errors?.status && (
                      <p className="form-error mt-3">This field is required</p>
                    )}
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
                    {errors?.documents_received && (
                      <p className="form-error mt-3">This field is required</p>
                    )}
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
                    {errors?.purchase && (
                      <p className="form-error mt-3">This field is required</p>
                    )}
                  </div>
                  <div class="col-xl-2 col-lg-3 col-md-6 col-6 my-xl-0 my-lg-3 my-md-3 my-2">
                    <div class="consiment-check">
                      <input
                        class="d-none"
                        type="radio"
                        id="cash_purchase"
                        name="purchase"
                        value="CASH"
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
            <div class="add_consignment_table comman_table_design">
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
                    {products.map((product, index) => (
                      <tr>
                        <td>
                          {product?.products?.variety?.variety}, <br />
                          {product?.products?.type?.type}, <br />(
                          {product?.products?.units?.unit})
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            id=""
                            name=""
                            defaultValue={product.consign}
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 1)
                            }
                          />
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            id=""
                            name=""
                            defaultValue={product.advised}
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 2)
                            }
                          />
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            id=""
                            name=""
                            defaultValue={product.received}
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 3)
                            }
                          />
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            defaultValue={product.waste}
                            id=""
                            name=""
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 4)
                            }
                          />
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            defaultValue={product.graded}
                            id=""
                            name=""
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 5)
                            }
                          />
                        </td>
                        <td>
                          <input
                            class="consiment_data_box"
                            type="text"
                            defaultValue={product.cost_per_unit}
                            id=""
                            name=""
                            onChange={(e) =>
                              onChangeProductValue(e.target.value, index, 6)
                            }
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
                        <td>0</td>
                        <td>0%</td>
                        <td>${product.average_sales_price}</td>

                        <td>$0</td>
                        <td>0</td>
                        <td>{product.inv_on_hand}</td>
                        <td>$0</td>
                        <td>0%</td>
                        <td>
                          <Link
                            class="icon_design"
                            to=""
                            onClick={() => deleteProduct(product.productId)}
                          >
                            <img src="assets/img/delete_white.png" alt="" />
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
                            src="assets/img/AddProduct.png"
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
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row justify-content-center py-4">
              <div class="col-6 text-center">
                <button
                  class="customer_btn ms-0"
                  type="submit"
                  style={{ border: "none" }}
                >
                  Create Consignment{}
                </button>
              </div>
            </div>
          </div>
        </form>
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
                          placeholder="Search Product"
                          onChange={(e) => supplierProductList(e.target.value)}
                        />
                        <button class="search_btn" type="submit">
                          <img src="assets/img/Search.png" alt="Search" />
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

export default AddConsignment;
