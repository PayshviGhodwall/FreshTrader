import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./sellerComponent/loginComponent/login";
import Product from "./sellerComponent/productComponent/product";
import AddProduct from "./sellerComponent/productComponent/addProduct";
import AddProductHere from "./sellerComponent/productComponent/addProductHere";
import AddProductUnit from "./sellerComponent/productComponent/addProductUnit";
import Inventory from "./sellerComponent/inventoryComponent/inventory";
import NewOrders from "./sellerComponent/orderComponent/newOrders";
import Orders from "./sellerComponent/orderComponent/orders";
import ViewNewOrders from "./sellerComponent/orderComponent/viewNewOrders";
import CounterOffer from "./sellerComponent/orderComponent/counterOffer";
import SendCounterOffer from "./sellerComponent/orderComponent/sendCounterOffer";
import ViewCounterOffer from "./sellerComponent/orderComponent/viewCounterOffer";
import ResendOffer from "./sellerComponent/orderComponent/resendOffer";
import ConfirmOrders from "./sellerComponent/orderComponent/confirmOrders";
import ViewConfirmOrders from "./sellerComponent/orderComponent/viewConfirmOrders";
import Notifications from "./sellerComponent/orderComponent/notifications";
import Accounting from "./sellerComponent/accountingComponent/accounting";
import Transcations from "./sellerComponent/accountingComponent/transcations";
import ProductSingle from "./sellerComponent/inputSaleComponent/productSingle";
import Setting from "./sellerComponent/settingComponent/setting";
import AccountSetting from "./sellerComponent/settingComponent/accountSetting";
import PosLayout from "./sellerComponent/settingComponent/posLayout";
import StationDevice from "./sellerComponent/settingComponent/stationDevice";
import PartnerBuyers from "./sellerComponent/settingComponent/partnerBuyers";
import Salesman from "./sellerComponent/settingComponent/salesman";
import Pallets from "./sellerComponent/accountingComponent/pallets";
import Eod from "./sellerComponent/accountingComponent/eod";
import SmcsReport from "./sellerComponent/accountingComponent/smcsReport";
import SupplierIndex from "./sellerComponent/accountingComponent/supplierIndex";
import CustomerFiles from "./sellerComponent/accountingComponent/customerFiles";
import Purchase from "./sellerComponent/purchaseComponent/purchase";
import AddConsignment from "./sellerComponent/purchaseComponent/addConsignment";
import CreateConsignment from "./sellerComponent/purchaseComponent/createConsignment";
import CompleteConsignment from "./sellerComponent/purchaseComponent/completeConsignment";
import InputBussinessSale from "./sellerComponent/inputBussinessSaleComponent/inputBussinessSale";
import AddNewBussiness from "./sellerComponent/inputBussinessSaleComponent/addNewBussiness";
import ProductSingle1 from "./sellerComponent/inputSaleComponent/productSingle1";
import SelectSupplier from "./sellerComponent/productComponent/selectSupplier";
import ScrollToTop from "./sellerComponent/commonComponent/scrollToTop";
import Logout from "./sellerComponent/commonComponent/logout";
import MainHeader from "./sellerComponent/commonComponent/mainHeader";
import Sellers from "./adminComponent/sellersComponent/sellers";
import SideBar from "./adminComponent/commonComponent/sideBar";
import AddSeller from "./adminComponent/sellersComponent/addSeller";
import BusinessPOS from "./sellerComponent/inputBussinessSaleComponent/businessPOS";
import AdminLogin from "./adminComponent/loginComponent/adminLogin";
import AdminDashboard from "./adminComponent/dashboardComponent/adminDashboard";
import AdminForgotPassword from "./adminComponent/loginComponent/adminForgotPassword";
import AdminOtp from "./adminComponent/loginComponent/adminOtp";
import AdminResetPassword from "./adminComponent/loginComponent/adminResetPassword";
import Buyers from "./adminComponent/buyersComponent/buyers";
import BuyerDetail from "./adminComponent/buyersComponent/buyersDetail";
import SellerDetail from "./adminComponent/sellersComponent/sellerDetail";
import Subscriptions from "./adminComponent/subscriptionComponent/subscriptions";
import SubscriptionDetail from "./adminComponent/subscriptionComponent/subscriptionsDetail";
import Support from "./sellerComponent/supportComponent/support";
import StaffListing from "./sellerComponent/settingComponent/staffListing";
import SupportListing from "./sellerComponent/supportComponent/supportListing";
import AddStaff from "./sellerComponent/settingComponent/staff";
import EditStaff from "./sellerComponent/settingComponent/editStaff";
import { getStaffDetail } from "./apiServices/sellerApiHandler/settingApiHandler";
import UnAuth from "./sellerComponent/commonComponent/unAuth";
import CustomerFile from "./sellerComponent/accountingComponent/customerFile";
import ViewTransaction from "./sellerComponent/accountingComponent/viewTransaction";
import ViewTransactionPaid from "./sellerComponent/accountingComponent/viewTransactionPaid";
import Welcome from "./buyerComponent/welcome";
import BuyerLogin from "./buyerComponent/buyerLogin";
import BuyerSignup from "./buyerComponent/buyerSignup";
import FaqScreen from "./buyerComponent/faqScreen";
import ProtectedRoutes from "./sellerComponent/commonComponent/protectedRoutes";
import PrivateRoute from "./sellerComponent/commonComponent/protectedRoutes";

function App() {
  const [staff, setStaff] = useState("");

  useEffect(() => {
    if (localStorage.getItem("staff")) getstaffInfo();
  }, []);

  const getstaffInfo = async () => {
    console.log(localStorage.getItem("staff"));
    const { data } = await getStaffDetail(localStorage.getItem("staff"));
    if (!data.error) {
      setStaff(data.results.staff);
    }
  };
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<MainHeader />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {staff?.access?.includes(5) || !staff ? (
            <>
              <Route path="/product" element={<Product />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-product-here" element={<AddProductHere />} />
              <Route
                path="/add-product-unit/:id"
                element={<AddProductUnit />}
              />
              <Route path="/select-supplier/:id" element={<SelectSupplier />} />{" "}
            </>
          ) : (
            <Route path="/product" element={<UnAuth />} />
          )}

          {staff?.access?.includes(7) || !staff ? (
            <Route path="/inventory" element={<Inventory />} />
          ) : (
            <Route path="/inventory" element={<UnAuth />} />
          )}
          <Route path="/orders" element={<Orders />} />
          <Route path="/new-orders" element={<NewOrders />} />
          <Route path="/view-new-orders/:id" element={<ViewNewOrders />} />
          <Route path="/counter-offer/:id" element={<CounterOffer />} />
          <Route path="/send-counter-offer" element={<SendCounterOffer />} />
          <Route
            path="/view-counter-offer/:id"
            element={<ViewCounterOffer />}
          />
          <Route path="/resend-offer" element={<ResendOffer />} />
          <Route path="/confirm-orders" element={<ConfirmOrders />} />
          <Route
            path="/view-confirm-orders/:id"
            element={<ViewConfirmOrders />}
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/transactions" element={<Transcations />} />
          <Route path="/view-transaction/:id" element={<ViewTransaction />} />
          <Route
            path="/view-transaction-paid/:id"
            element={<ViewTransactionPaid />}
          />

          <Route path="/customer-files/:id" element={<CustomerFiles />} />
          <Route path="/customer-file" element={<CustomerFile />} />

          <Route path="/supplier-index" element={<SupplierIndex />} />
          <Route path="/smcs-report" element={<SmcsReport />} />
          {staff?.access?.includes(1) || !staff ? (
            <Route path="/eod" element={<Eod />} />
          ) : (
            <Route path="/eod" element={<UnAuth />} />
          )}
          {staff?.access?.includes(9) || !staff ? (
            <Route path="/pallets" element={<Pallets />} />
          ) : (
            <Route path="/pallets" element={<UnAuth />} />
          )}
          {staff?.access?.includes(11) || !staff ? (
            <>
              {" "}
              <Route path="/purchase" element={<Purchase />} />{" "}
              <Route path="/add-consignment" element={<AddConsignment />} />
              <Route
                path="/create-consignment/:id"
                element={<CreateConsignment />}
              />
              <Route
                path="/complete-consignment/:id"
                element={<CompleteConsignment />}
              />
            </>
          ) : (
            <Route path="/purchase" element={<UnAuth />} />
          )}
          {staff?.access?.includes(3) || !staff ? (
            <Route
              path="/input-bussiness-sale"
              element={<InputBussinessSale />}
            />
          ) : (
            <Route path="/input-bussiness-sale" element={<UnAuth />} />
          )}
          <Route path="/business-pos/:id" element={<BusinessPOS />} />
          <Route path="/add-new-bussiness" element={<AddNewBussiness />} />
          {staff?.access?.includes(2) || !staff ? (
            <Route path="/product-single" element={<ProductSingle />} />
          ) : (
            <Route path="/product-single" element={<UnAuth />} />
          )}
          <Route path="/product-single1" element={<ProductSingle1 />} />
          <Route path="/setting" element={<Setting />} />
          {staff?.access?.includes(4) || !staff ? (
            <Route path="/account-setting" element={<AccountSetting />} />
          ) : (
            <Route path="/account-setting" element={<UnAuth />} />
          )}
          {staff?.access?.includes(12) || !staff ? (
            <Route path="/pos-layout" element={<PosLayout />} />
          ) : (
            <Route path="/pos-layout" element={<UnAuth />} />
          )}
          <Route path="/station-device" element={<StationDevice />} />
          <Route path="/partner-buyers" element={<PartnerBuyers />} />
          <Route path="/salesman" element={<Salesman />} />
          <Route path="/add-support" element={<Support />} />
          {!staff ? (
            <>
              <Route path="/add-staff" element={<AddStaff />} />
              <Route path="/staff" element={<StaffListing />} />
              <Route path="/edit-staff/:id" element={<EditStaff />} />{" "}
            </>
          ) : (
            <Route path="/staff" element={<UnAuth />} />
          )}
          <Route path="/support" element={<SupportListing />} />

          <Route path="/logout" element={<Logout />} />

          <Route path="/un-Authorized" element={<UnAuth />} />

          {/* Admin Routes */}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route path="/admin/otp-screen" element={<AdminOtp />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/seller-management" element={<Sellers />} />
          <Route path="/admin/add-seller" element={<AddSeller />} />
          <Route path="/admin/buyer-management" element={<Buyers />} />
          <Route path="/admin/buyer-detail/:id" element={<BuyerDetail />} />
          <Route path="/admin/seller-detail/:id" element={<SellerDetail />} />
          <Route
            path="/admin/subscription-management"
            element={<Subscriptions />}
          />
          <Route
            path="/admin/subscription-detail/:id"
            element={<SubscriptionDetail />}
          />

          {/* Buyer Routes */}

          <Route path="/buyer/welcome-screen" element={<Welcome />} />
          <Route path="/buyer/login" element={<BuyerLogin />} />
          <Route path="/buyer/signup" element={<BuyerSignup />} />
          <Route path="/buyer/faq-screen" element={<FaqScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
