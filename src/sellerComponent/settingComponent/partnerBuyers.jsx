import React, { useEffect, useState } from "react";
import {
  changePartnerBuyer,
  getPartnerBuyers,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import Header from "../commonComponent/header";

function PartnerBuyers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPartnerList();
  }, []);

  const getPartnerList = async () => {
    const { data } = await getPartnerBuyers();
    if (!data.error) setData(data.results.buyers);
    console.log(data);
  };

  const changePartner = async (id) => {
    const { data } = await changePartnerBuyer(id);
    if (!data.error) await getPartnerList();
  };

  return (
    <>
      <Header />
      <section className="partner_buyers">
        <div className="container-fluid px-0">
          <div className="container text-center">
            <p className="my-3 text-white partner_header">
              When a customer become a partner buyer they will able to see your
              product and order from you in the ordering appliction.
            </p>
          </div>
          <div className="partner_buyers_table comman_table_design">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr style={{ background: "#374251" }}>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Partner (Access to order app)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.buyer.business_trading_name}</td>
                        <td>{item.buyer.email}</td>
                        <td>
                          <div className="form-group table_toggle_radio">
                            <input
                              className="d-none"
                              type="checkbox"
                              id={index}
                              checked={item.status}
                              onChange={() => changePartner(item._id)}
                            />
                            <label for={index}></label>
                          </div>
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
    </>
  );
}

export default PartnerBuyers;
