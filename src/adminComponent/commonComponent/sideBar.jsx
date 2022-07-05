import React from "react";
import { Link } from "react-router-dom";

function SideBar({ sideBar }) {
  return (
    <>
      <div class={sideBar ? "navigation" : "navigation navigation-mini"}>
        <ul>
          <li className="">
            <div class="image text-center">
              {sideBar ? (
                <img src="/assets/img/logo.png" />
              ) : (
                <img
                  src="/assets/img/mini-logo.png"
                  style={{ width: "60px" }}
                />
              )}
            </div>
          </li>
          <li
            class={
              window.location.href.includes("/dashboard")
                ? " list active"
                : "list"
            }
          >
            <Link to="/admin/dashboard">
              <span class="icon">
                <ion-icon name="home-sharp"></ion-icon>
              </span>
              <span class="title">Dashboard</span>
            </Link>
          </li>
          <li
            class={
              window.location.href.includes("/seller-management") ||
              window.location.href.includes("/add-seller") ||
              window.location.href.includes("/seller-detail")
                ? " list active"
                : "list"
            }
          >
            <Link to="/admin/seller-management">
              <span class="icon">
                <ion-icon name="lock-closed-sharp"></ion-icon>
              </span>
              <span class="title">Sellers Management</span>
            </Link>
          </li>
          <li
            class={
              window.location.href.includes("/buyer-management") ||
              window.location.href.includes("/buyer-detail")
                ? " list active"
                : "list"
            }
          >
            <Link to="/admin/buyer-management">
              <span class="icon">
                <ion-icon name="call-sharp"></ion-icon>
              </span>
              <span class="title">Buyers Management</span>
            </Link>
          </li>
          <li
            class={
              window.location.href.includes("/subscription-management") ||
              window.location.href.includes("/subscription-detail")
                ? " list active"
                : "list"
            }
          >
            <Link to="/admin/subscription-management">
              <span class="icon">
                <ion-icon name="person-sharp"></ion-icon>
              </span>
              <span class="title">Subscription Management</span>
            </Link>
          </li>
          <li
            class={
              window.location.href.includes("/support-management") ||
              window.location.href.includes("/view-chat")
                ? " list active"
                : "list"
            }
          >
            <Link to="/admin/support-management">
              <span class="icon">
                <ion-icon name="paper-plane-sharp"></ion-icon>
              </span>
              <span class="title">Support Management</span>
            </Link>
          </li>
          <li class="list">
            <a href="#">
              <span class="icon">
                <ion-icon name="log-out-sharp"></ion-icon>
              </span>
              <span class="title">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
