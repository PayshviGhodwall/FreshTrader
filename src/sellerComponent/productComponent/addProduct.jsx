import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addSellerProduct,
  getCategoryList,
  getProductType,
} from "../../apiServices/sellerApiHandler/productApiHandler";
import { getVariety } from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [category, setCategory] = useState([]);
  const [variety, setVariety] = useState([]);
  const [type, setType] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [varietyValue, setVarietyValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [gst, setGst] = useState("");

  useEffect(() => {
    getCateList();
  }, []);

  const navigate = useNavigate();

  const getCateList = async () => {
    const { data } = await getCategoryList();
    console.log(data);
    if (!data.error) {
      let list = ["Select Category"];
      list = list.concat(data.results.category);
      setCategory(list);
    }
  };

  const getVarietyList = async (item) => {
    const { data } = await getVariety(item);
    console.log(data);
    if (!data.error) {
      let list = [{ _id: -1, variety: "Select Variety" }];
      list = list.concat(data.results.varieties);
      setVariety(list);
    }
  };
  const getTypeList = async (item) => {
    const { data } = await getProductType(item);
    console.log(data);
    if (!data.error) {
      let list = [{ _id: -1, type: "Select Type" }];
      list = list.concat(data.results.types);
      setType(list);
    }
  };
  const onChange = async (e, index) => {
    console.log("jg");
    if (index === 1) {
      setCategoryValue(e.target.value);
      await getVarietyList(e.target.value);
    } else if (index === 2) {
      setVarietyValue(e.target.value);
      await getTypeList(e.target.value);
    } else {
      setTypeValue(e.target.value);
    }
  };

  const addProduct = async () => {
    const { data } = await addSellerProduct(
      categoryValue,
      varietyValue,
      typeValue,
      document.getElementById("gst").checked
    );
    console.log(data);
    if (!data.error) {
      navigate(`/select-supplier/${data.results.product._id}`);
    }
  };

  return (
    <>
      <Header />
      <section class="add_product_page py-md-5 py-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-12">
              <div class="add_product_box">
                <div class="row">
                  <div class="col-12 Product_heading">
                    <h2>Add Type</h2>
                  </div>
                  <div class="col-12">
                    <form class="row">
                      <div class="form-group">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => onChange(e, 1)}
                        >
                          {category.map((item, index) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </select>
                      </div>
                      <div class="form-group">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => onChange(e, 2)}
                        >
                          {variety.map((item, index) => {
                            return (
                              <option value={item._id}>{item.variety}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="form-group">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => onChange(e, 3)}
                        >
                          {type.map((item, index) => {
                            return (
                              <option value={item._id}>{item.type}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="form-group add_type_text mt-md-3 mt-2">
                        <label for="">
                          Your Product Isn't Here?
                          <Link to="/add-product-here"> Add it here</Link>
                        </label>
                      </div>
                      <div class="form-group product_checkbox">
                        <input class="d-none" type="checkbox" id="gst" />
                        <label for="gst">Dose this product have GST?</label>
                      </div>
                      <div class="form-group mt-md-3 mt-2">
                        <Link to="" onClick={() => addProduct()}>
                          <button class="custom_btns">Next</button>
                        </Link>
                      </div>
                    </form>
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

export default AddProduct;
