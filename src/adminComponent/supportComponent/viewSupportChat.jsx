import React, { useEffect, useState } from "react";
import AdminHeader from "../commonComponent/adminHeader";
import SideBar from "../commonComponent/sideBar";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import {
  changeSellerStatus,
  getSellerList,
} from "../../apiServices/adminApiHandler/sellerApiHandler";
import moment from "moment";
import {
  changeSupportStatus,
  deleteSupport,
  getSupport,
} from "../../apiServices/adminApiHandler/supportApiHandler";

function ViewChatSupport() {
  const [sideBar, setSideBar] = useState(true);
  const sideBarValue = () => {
    setSideBar(!sideBar);
  };

  useEffect(() => {}, []);

  return (
    <>
      <AdminHeader sideBarValue={sideBarValue} sideBar={sideBar} />
      <div class="content-wrapper d-flex">
        <aside class="main-sidebar">
          <SideBar sideBar={sideBar} />
        </aside>

        <div
          class={sideBar ? "admin-content" : "admin-content admin-content-mini"}
        >
          <div class="content-header sty-one tooltippp ">
            <h1 className="d-flex justify-content-between py-2">
              Support Management
            </h1>
          </div>
          <div className="row">
            <div class="chat col-md-12 col-12">
              <div
                class="chat-texts "
                style={{
                  background: "#fff",
                }}
              >
                <div class="text">
                  <div class="profile-pic">
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />{" "}
                  </div>
                  <div class="text-content">
                    <h5>Joannie</h5>
                    Lorem ipsum dolor sit amet.
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text sent">
                  <div class="profile-pic">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt=""
                    />
                  </div>
                  <div class="text-content">
                    <h5>Laurie</h5>Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Voluptates, saepe?
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text">
                  <div class="profile-pic">
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />{" "}
                  </div>
                  <div class="text-content">
                    <h5>Joannie</h5>Lorem ipsum dolor sit amet.
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text">
                  <div class="profile-pic">
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />{" "}
                  </div>
                  <div class="text-content">
                    <h5>Joannie</h5> Lorem ipsum dolor sit amet.
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text sent">
                  <div class="profile-pic">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt=""
                    />
                  </div>
                  <div class="text-content">
                    <h5>Laurie</h5>Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Voluptates, saepe?
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text">
                  <div class="profile-pic">
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />{" "}
                  </div>
                  <div class="text-content">
                    <h5>Joannie</h5>Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet.
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>
                <div class="text">
                  <div class="profile-pic">
                    {" "}
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt=""
                    />{" "}
                  </div>
                  <div class="text-content">
                    <h5>Joannie</h5>Lorem ipsum dolor sit amet.
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>

                <div class="text sent">
                  <div class="profile-pic">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt=""
                    />
                  </div>
                  <div class="text-content">
                    <h5>Laurie</h5>Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Voluptates, saepe?
                    <span class="timestamp">12:00hrs</span>
                  </div>
                </div>
              </div>

              <div class="send-message">
                <div class="message-text">
                  <div class="smiley">
                    <i class="lni lni-smile"></i>
                  </div>
                  <input type="text" placeholder="Send Message" />
                  <div class="attachment">
                    <i class="lni lni-upload"></i>
                  </div>
                </div>
                <button
                  style={{
                    border: "none",
                    padding: "5px 10px",

                    borderRadius: "20px",
                  }}
                >
                  <i class="fa fa-paper-plane"></i>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
}

export default ViewChatSupport;
