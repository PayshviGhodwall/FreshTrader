import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div class="fresh_trader_main">
        <div class="welcome_screen">
          <div class="welcome_screen_inner">
            <div class="">
              <img src="../assets/img/welcome_logo.png" alt="" />
              <p>The Sydney Produce and Growers Market Ordering platform.</p>
              <div class="welcome_screen_btns">
                <Link class="btn_comman btn_green mb-3" to="/buyer/login">
                  Login
                </Link>
                <Link class="btn_comman btn_light" to="/buyer/signup">
                  Create a New Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
