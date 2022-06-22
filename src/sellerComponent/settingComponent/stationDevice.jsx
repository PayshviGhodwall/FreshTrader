import React from "react";
import { useForm } from "react-hook-form";
import Header from "../commonComponent/header";

function StationDevice() {
  return (
    <>
      <Header />{" "}
      <section className="stations_devices py-md-5 py-5">
        <div className="container py-md-5">
          <div className="row justify-content-center mx-0">
            <div className="col-xl-6 col-lg-7 col-md-10 col-12">
              <form className="stations_box box_design row pb-4">
                <div className="form-group col-12 py-md-4 py-3 mb-4 border-bottom">
                  <div className="row align-items-center px-md-4 px-2 py-2">
                    <div className="col-md-3 mb-md-0 mb-2 pe-md-0">
                      <label for="">Select Station :</label>
                    </div>
                    <div className="col-md-6">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>Station</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <button className="custom_btns" type="submit">
                        Add Station
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-3">
                  <div className="row align-items-center px-md-4 px-2">
                    <div className="col-md-3 mb-md-0 mb-2 pe-md-0">
                      <label for="">A4 Printer :</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Input Printer Email"
                      />
                    </div>
                    <div className="col-md-3">
                      <button className="custom_btns" type="submit">
                        Add Station
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-3">
                  <div className="row align-items-center px-md-4 px-2">
                    <div className="col-md-3 mb-md-0 mb-2 pe-md-0">
                      <label for="">Thermal Printer :</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Station"
                      />
                    </div>
                    <div className="col-md-3">
                      <button className="custom_btns" type="submit">
                        Add New <br />
                        Printer
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12 mb-3">
                  <div className="row align-items-center px-md-4 px-2">
                    <div className="col-md-3 mb-md-0 mb-2 pe-md-0">
                      <label for="">Card Reader :</label>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Station"
                      />
                    </div>
                    <div className="col-md-3">
                      <button className="custom_btns" type="submit">
                        Add New <br />
                        Reader
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StationDevice;
