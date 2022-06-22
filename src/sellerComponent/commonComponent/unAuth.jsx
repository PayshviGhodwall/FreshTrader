import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addNewBusiness } from "../../apiServices/sellerApiHandler/inventoryApiHandler";
import Header from "../commonComponent/header";

function UnAuth() {
  return (
    <>
      <Header />
      <section class="add_business py-md-3 py-3">
        <div class="container py-md-5">
          <div class="row justify-content-center">
            <div class="col-xl-9 col-lg-9 col-md-10 col-12">
              <div class="add_business_box box_design">
                <div class="row">
                  <div class="col-12 text-center">
                    <i class="fa fa-frown-o sad" aria-hidden="true"></i>
                    <p className="sad_heading">
                      {" "}
                      Oops! You are not authorized to view this page.
                    </p>
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

export default UnAuth;
