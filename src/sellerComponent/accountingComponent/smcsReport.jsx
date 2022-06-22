import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import { Link } from "react-router-dom";
import {
  emailSMCS,
  getSMCSReport,
} from "../../apiServices/sellerApiHandler/accountingApiHandler";
import { toast } from "react-toastify";

function SmcsReport() {
  const [SMCS, setSMCS] = useState([]);
  const [total, setTotal] = useState("");
  const [SMCSCode, setSMCSCode] = useState("");
  const [SMCSNotified, setSMCSNotified] = useState(false);
  const [week, setWeek] = useState("");
  const [transactionIds, setTransactionIds] = useState([]);
  useEffect(() => {
    getReport();
  }, [week]);

  const getReport = async (download = false) => {
    const formData = {
      week: week.week,
      year: week.year,
      download: download,
    };
    const { data } = await getSMCSReport(formData);
    if (!data.error) {
      if (download) {
        if (!SMCS.length) {
          toast.error("No record available");
          return;
        }
        const url = document.createElement("a");
        url.href = data.results.file;
        url.target = "_blank";
        url.click();
      } else {
        let ids = [];
        for (const report of data.results.report) {
          ids = ids.concat(report.transactionIds);
        }
        setSMCS(data.results.report);
        setSMCSCode(data.results.smcs_code);
        setSMCSNotified(data.results.smcs_notified);
        setTotal(data.results.total);
        setTransactionIds(ids);
      }
    }
  };

  const email = async () => {
    if (!SMCS.length) {
      toast.error("No record available");
      return;
    }
    const formData = {
      week: week.week,
      year: week.year,
      transactionIds: transactionIds,
    };
    const { data } = await emailSMCS(formData);
    if (!data.error) {
    }
  };

  const selectWeek = async () => {
    if (!document.getElementById("week").value) {
      toast.error("Please Select Week");
      return;
    }
    const date = document.getElementById("week").value.split("-W");
    setWeek({
      week: date[1],
      year: date[0],
    });
  };
  return (
    <>
      <Header />
      <section className="smcs-report">
        <div className="container">
          <div className="row py-3 align-items-center">
            <div className="col mb-lg-0 mb-md-2 mb-2">
              <div className="row mb-2">
                <div className="col-auto mb-md-0 mb-2">
                  <Link className="product_comman_btn m-0" to="/accounting">
                    <img src="assets/img/arrow-left-line.png" alt="Back" />
                    Back
                  </Link>
                </div>
                <div className="col-sm">
                  <div className="date_select row">
                    <div className="form-group col-md-8 col pe-0">
                      <input className="form-control" type="week" id="week" />
                    </div>
                    <div className="form-group col-auto ps-0">
                      <button
                        className="product_comman_btn border-0"
                        onClick={() => selectWeek()}
                      >
                        Select Week
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="row align-items-center smcs_form_part my-md-0 my-3"
                action=""
              >
                <div className="col-md-auto mb-md-0 mb-2 pe-md-0">
                  <label htmlFor="">Total Value($)</label>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-md-3 mb-md-0 mb-2 form-group">
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        value={`$${total}`}
                      />
                    </div>
                    <div className="col-md-6 form-group ps-md-0 toogle_btn_check">
                      <input
                        className="d-none"
                        type="checkbox"
                        id="smcs_notified"
                        value={SMCSNotified}
                      />
                      <label htmlFor="smcs_notified" className="">
                        <span>Status</span>
                        <span>Not Emailed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="row smcs_btn justify-content-center">
                <div className="col-xl-8">
                  <div className="row">
                    <div className="col-md-4 col-4">
                      <Link className="product_comman_btn" to="">
                        Print A4 Report
                      </Link>
                    </div>
                    <div className="col-md-4 col-4 px-md-3 px-1">
                      <Link
                        className="product_comman_btn"
                        to=""
                        onClick={() => getReport(true)}
                      >
                        Download Report Pdf
                      </Link>
                    </div>
                    <div className="col-md-4 col-4">
                      <Link
                        className="product_comman_btn"
                        to=""
                        onClick={email}
                      >
                        Email Report to SMCS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="smcs-report-table comman_table_design">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>SMCS Number</th>
                    <th>Customer</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {SMCS.map((item, index) => (
                    <tr key={index}>
                      <td>{item.buyer.smcs_code}</td>
                      <td>{item.buyer.business_trading_name}</td>
                      <td>${item.total}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#374251!important" }}>
                    <th style={{ color: "#fff" }}>Total: {SMCSCode}</th>
                    <th style={{ color: "#fff" }}></th>
                    <th style={{ color: "#fff" }}>${total}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SmcsReport;
