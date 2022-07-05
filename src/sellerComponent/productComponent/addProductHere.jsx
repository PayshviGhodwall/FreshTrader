import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addMissingProduct,
  getCategoryList,
  getProductType,
} from "../../apiServices/sellerApiHandler/productApiHandler";
import { getVariety } from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddProductHere() {
  const [category, setCategory] = useState([]);
  const [variety, setVariety] = useState([]);
  const [type, setType] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [varietyValue, setVarietyValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [varietyValueId, setVarietyValueId] = useState("");
  const [typeValueId, setTypeValueId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    getCateList();
  }, []);

  // const navigate = useNavigate();

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
    console.log(e.target.value);
    if (index === 1) {
      setCategoryValue(e.target.value);
      await getVarietyList(e.target.value);
    } else if (index === 2) {
      setVarietyValueId(e.target.value);
      const value = variety.filter(
        (a) => String(a._id) === String(e.target.value)
      );
      setVarietyValue(value[0].variety);

      await getTypeList(e.target.value);
    } else if (index === 3) {
      setTypeValueId(e.target.value);
      const value = type.filter(
        (a) => String(a._id) === String(e.target.value)
      );
      setTypeValue(value[0].type);
    } else if (index === 4) {
      setVarietyValue(e.target.value);
    } else if (index === 5) {
      setTypeValue(e.target.value);
    }
  };
  const addProduct = async () => {
    const formData = new FormData();
    formData.append("category", categoryValue);
    formData.append("variety", varietyValue);
    formData.append("type", typeValue);
    formData.append("varietyId", varietyValueId);
    formData.append("typeId", typeValueId);

    console.log(selectedFile);
    if (selectedFile) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    const { data } = await addMissingProduct(formData);
    console.log(data);
    if (!data.error) {
      navigate(`/add-product`);
    }
  };
  const onFileSelection = (event) => {
    console.log(event);
    let file = event.target.files[0];
    if (file && file.size < 2880) {
      toast.error("Minimum File size should be 1MB.");
      return;
    } else if (file && file.size > 5242880) {
      toast.error("File size exceeded. Max size should be 5MB.");
      return;
    } else {
      // Update the state
      console.log(file);
      setImageFile(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };
  console.log(selectedFile);

  return (
    <>
      <Header />
      <section className="add_product_page py-md-5 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10 col-12">
              <div className="add_product_box">
                <div className="row">
                  <div className="col-12 Product_heading">
                    <h2>Add A Missing Product</h2>
                  </div>
                  <div className="col-12">
                    <form className="row" action="">
                      <div className="form-group col-12">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => onChange(e, 1)}
                        >
                          {category.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-12">
                        <div className="row align-items-center">
                          <div className="form-group col-sm">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={(e) => onChange(e, 2)}
                            >
                              {variety.map((item, index) => {
                                return (
                                  <option value={item._id} key={index}>
                                    {item.variety}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-auto px-0 d-md-block d-none">
                            <span className="plus"> Or </span>
                          </div>
                          <div className="form-group col veriety_fields">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Type in Variety"
                              onChange={(e) => onChange(e, 4)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row align-items-center">
                          <div className="form-group col-sm">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={(e) => onChange(e, 3)}
                            >
                              {type.map((item, index) => {
                                return (
                                  <option value={item._id} key={index}>
                                    {item.type}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-auto px-0 d-md-block d-none">
                            <span className="plus"> Or </span>
                          </div>
                          <div className="form-group col veriety_fields">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Type in the type in Variety"
                              onChange={(e) => onChange(e, 5)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-12 mt-2">
                        <div className="row align-items-start">
                          <div className="col-md-4">
                            <div className="circle">
                              <img className="profile-pic_1" src={imageFile} />
                            </div>
                          </div>
                          <div className="col">
                            <div className="row">
                              <div className="col-12 py-3">
                                <label className="photo_update" for="">
                                  Add Photo (Optional)
                                </label>
                              </div>
                              <div className="col-6">
                                <a
                                  className="upload-button1"
                                  href="javascript:;"
                                >
                                  <i className="fa fa-camera"></i>Take Photo
                                </a>
                              </div>
                              <div className="col-6">
                                <div className="p-image">
                                  <div class="file file--upload">
                                    <label for="input-file">
                                      <i className="far fa-folder-open"></i>
                                      Upload Photo
                                    </label>
                                    <input
                                      id="input-file"
                                      type="file"
                                      onChange={(e) => onFileSelection(e)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group mt-2 product_checkbox">
                        <input className="d-none" type="checkbox" id="gst" />
                        <label for="gst">Dose this product have GST?</label>
                      </div>
                      <div className="form-group mt-md-3 mt-2">
                        <Link to="" onClick={() => addProduct()}>
                          <button className="custom_btns">Next</button>
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

export default AddProductHere;
