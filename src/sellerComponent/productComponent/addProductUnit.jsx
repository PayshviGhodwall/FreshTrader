import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addProductUnit,
  addUnit,
  getMyProductUnit,
  getProductDetail,
  getProductUnit,
  removeProductUnit,
} from "../../apiServices/sellerApiHandler/productApiHandler";
import Header from "../commonComponent/header";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddProductUnit() {
  const [unit, setUnit] = useState([]);
  const [addedUnit, setAddedUnit] = useState([]);
  const [unitValue, setUnitValue] = useState("");
  const [product, setProduct] = useState("");
  let { id } = useParams();

  useEffect(() => {
    getProductDetails();
    getAddedUnits();
  }, []);

  const getProductUnits = async (_id) => {
    const { data } = await getProductUnit(_id);
    console.log(data);
    if (!data.error) {
      let list = [{ _id: -1, unit: { unit: "Select Unit" } }];
      list = list.concat(data.results.units);
      setUnit(list);
    }
  };
  const removeUnit = async (unit) => {
    const { data } = await removeProductUnit({ productId: id, units: unit });
    console.log(data);
    if (!data.error) {
      await getAddedUnits();
    }
  };
  const addMissingUnit = async () => {
    if (!document.getElementById("unit").value) {
      toast.error("Please Type unit");
      return;
    }
    if (!document.getElementById("weight").value) {
      toast.error("Please Type weight");
      return;
    }
    const formData = {
      unit: document.getElementById("unit").value,
      weight: document.getElementById("weight").value,
      variety: product.variety._id,
    };
    const { data } = await addUnit(formData);
    console.log(data);
    if (!data.error) {
      document.getElementById("unit").value = "";
      document.getElementById("weight").value = "";
      await getProductDetails();
    }
  };
  const getProductDetails = async () => {
    const { data } = await getProductDetail(id);
    if (!data.error) {
      setProduct(data.results.product);
      await getProductUnits(data.results.product.variety._id);
    }
  };
  const getAddedUnits = async () => {
    const { data } = await getMyProductUnit(id);
    if (!data.error) {
      setAddedUnit(data.results.units);
    }
  };
  const addProUnit = async () => {
    let formData = {
      productId: id,
      units: unitValue,
    };
    const { data } = await addProductUnit(formData);
    if (!data.error) {
      await getAddedUnits();
    }
  };

  return (
    <>
      <Header />
      <section className="add_product_page py-md-5 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="add_product_unit">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="row align-items-start">
                      <div className="col-md-auto mb-md-0 mb-3">
                        <div className="product_unit_img">
                          <span>
                            <img
                              src={`${process.env.REACT_APP_APIENDPOINTNEW}${product?.type?.image}`}
                              alt=""
                            />
                          </span>
                          <strong>{product?.type?.type}</strong>
                        </div>
                      </div>
                      <div className="col">
                        <div className="row mb-lg-0 mb-md-4 mb-4">
                          <div className="col-12">
                            <div className="unit_heading border-bottom border-dark pb-md-4 pb-3 mb-md-4 mb-3">
                              <strong>Select Unit</strong>
                              <p>All the units product is sold as.</p>
                            </div>
                          </div>
                          <div className="col-lg-6 border-end border-dark mb-lg-0 mb-md-4 mb-4">
                            <div className="select_unit_part">
                              <div className="unit_heading">
                                <strong>Select Unit</strong>
                                <p>Select and add the unit below.</p>
                              </div>
                              <form className="row mt-3">
                                <div className="form-group col-md-8 mb-4">
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) =>
                                      setUnitValue(e.target.value)
                                    }
                                  >
                                    {unit.map((item, index) => {
                                      return (
                                        <option
                                          value={item.unit._id}
                                          key={index}
                                        >
                                          {item.unit.unit}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <Link
                                    to=""
                                    className="custom_btns"
                                    onClick={() => addProUnit()}
                                  >
                                    Add
                                  </Link>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="col-lg-6 ps-md-3">
                            <div className="select_unit_part">
                              <div className="unit_heading">
                                <strong>Add Your Own Unit</strong>
                                <p>
                                  If the unit you want is missing. add it below
                                  you will need to add the weight in(KG) for
                                  your inventory section. please ensure this is
                                  accurate.
                                </p>
                              </div>
                              <form className="row mt-3 align-items-center">
                                <div className="form-group col">
                                  <input
                                    className="form-control"
                                    type="text"
                                    id="unit"
                                    placeholder="Type in Unit"
                                  />
                                </div>
                                <div className="form-groupc col-auto px-0">
                                  <span className="plus"> + </span>
                                </div>
                                <div className="form-group col">
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="weight"
                                    placeholder="Unit Weight (KG)"
                                  />
                                </div>
                                <div className="form-group mt-md-3 mt-4">
                                  <Link
                                    to=""
                                    className="custom_btns"
                                    onClick={() => addMissingUnit()}
                                  >
                                    Add
                                  </Link>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="row added_units_box">
                      <div className="col-12 px-0 border-bottom border-dark py-md-3 py-2">
                        <strong className="added_unit">Added Units</strong>
                      </div>
                      <div className="col-12 px-0">
                        <div className="unit_inner_box">
                          <div className="row mx-0 pt-md-4 pt-3">
                            {addedUnit?.map((un, index) => (
                              <div
                                className="col-md-4 col-6 px-1 mb-md-3 mb-2"
                                key={index}
                              >
                                <Link className="unit_single" to="">
                                  {un.units?.unit}
                                  <i
                                    className="fa fa-times"
                                    onClick={() => removeUnit(un.units._id)}
                                  ></i>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 px-1 mt-md-4 mt-3 pt-2">
                        <Link to="/product" className="custom_btns w-auto">
                          Complete
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddProductUnit;
