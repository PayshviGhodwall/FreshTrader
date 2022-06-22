import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  getStaff,
  getSupport,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function SupportListing() {
  const [support, setSupport] = useState([]);

  useEffect(() => {
    getSupportListing();
  }, []);

  const getSupportListing = async () => {
    const { data } = await getSupport();
    if (!data.error) {
      setSupport(data.results.support);
    }
  };

  return (
    <>
      <Header />
      <section class="Supplier_index">
        <div class="container">
          <div class="product_search row py-3 align-items-center">
            <div class="col-sm">
              <div class="product_search">
                <form
                  action=""
                  class="row align-items-center justify-content-md-between justify-content-start"
                >
                  {/* <div class="col-xl-5 col-lg-6 col-md-7 ps-md-0 mb-md-0 mb-2">
                    <div class="form-group d-flex">
                      <input
                        type="search"
                        class="form-control"
                        id="search"
                        name="search"
                        placeholder="Search Product or Supplier..."
                      />
                      <button class="search_btn" type="submit">
                        <img src="assets/img/Search.png" alt="Search" />
                      </button>
                    </div>
                  </div> */}
                  <div class="justify-content-end d-flex">
                    <Link class="product_comman_btn ms-0" to="/add-support">
                      Add Support
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid px-0">
          <div class="Supplier_index_table comman_table_design">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>S No.</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {support.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{moment(item.createdAt).format("LL")}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>{item.concern}</td>
                        <td>
                          <div class="mytoggle mt-2">
                            <label class="switch">
                              <input
                                type="checkbox"
                                checked={item.status}
                                // onChange={() => changeStatus(list._id)}
                              />
                              <span class="slider round"></span>
                            </label>
                          </div>
                        </td>

                        <td>
                          <Link
                            class="tables_btns tables_green_btn"
                            to=""
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal1"
                          >
                            view
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade settings_section"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="col-md-12">
                <div class="chat">
                  <div class="chat-texts">
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
        </div>
      </div>
    </>
  );
}

export default SupportListing;
