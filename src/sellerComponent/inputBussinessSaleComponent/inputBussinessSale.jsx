import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBusinesses } from "../../apiServices/sellerApiHandler/inputBusinessSaleApiHandler";
import Header from "../commonComponent/header";

function InputBussinessSale() {
  const [letter, setLetter] = useState("A");
  const [businesses, setBusinesses] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    search();
  }, [letter, filter]);

  const search = async () => {
    const formData = {
      search: letter,
      smcs: filter,
    };
    const { data } = await getBusinesses(formData);
    console.log(data);
    if (!data.error) {
      setBusinesses(data.results.buyers);
    }
  };
  return (
    <>
      <Header />
      <section className="business_sale pb-md-4 pb-4">
        <div className="container-fluid px-md-4 px-3">
          <div className="row py-3">
            <div className="col-2 d-lg-block d-none"></div>
            <div className="col-lg-10">
              <div className="row align-items-center business_sale_top">
                <div className="col-auto">
                  <Link className="product_comman_btn" to="/add-new-bussiness">
                    <img
                      src="assets/img/AddProduct.png"
                      alt="Add New Business"
                    />
                    Add New Business
                  </Link>
                </div>
                <div className="col-sm">
                  <div className="row align-items-center justify-content-lg-end">
                    <div className="col text-md-end mb-md-0 mb-2 mt-md-0 mt-3 px-md-3 px-4">
                      <label className="filter_tag">Filter :</label>
                    </div>
                    <div className="col-md-auto">
                      <Link
                        className={filter === true ? "btns-part2" : "btns-part"}
                        to=""
                        onClick={() => setFilter(true)}
                      >
                        SMCS Business Only
                      </Link>
                      <Link
                        className={
                          filter === false ? "btns-part2" : "btns-part"
                        }
                        to=""
                        onClick={() => setFilter(false)}
                      >
                        Non SMCS Only
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2">
              <div className="business_sale_filter mt-lg-4 pb-lg-0 pb-md-4 pb-4">
                <div className="row sale_filter_outer">
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "A" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("A")}
                    >
                      A
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "B" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("B")}
                    >
                      b
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "C" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("C")}
                    >
                      c
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "D" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("D")}
                    >
                      d
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "E" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("E")}
                    >
                      e
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "F" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("F")}
                    >
                      f
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "G" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("G")}
                    >
                      g
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "H" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("H")}
                    >
                      h
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "I" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("I")}
                    >
                      i
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "J" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("J")}
                    >
                      j
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "K" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("K")}
                    >
                      k
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "L" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("L")}
                    >
                      l
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "M" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("M")}
                    >
                      m
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "N" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("N")}
                    >
                      n
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "O" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("O")}
                    >
                      o
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "P" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("P")}
                    >
                      p
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "Q" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("Q")}
                    >
                      q
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "R" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("R")}
                    >
                      r
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "S" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("S")}
                    >
                      s
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "T" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("T")}
                    >
                      t
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "U" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("U")}
                    >
                      u
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "V" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("V")}
                    >
                      v
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "W" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("W")}
                    >
                      w
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "X" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("X")}
                    >
                      x
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "Y" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("Y")}
                    >
                      y
                    </Link>
                  </div>
                  <div className="col-lg-4 col-md-auto col px-1 mb-lg-3">
                    <Link
                      className={letter === "Z" ? "filter_btn2" : "filter_btn"}
                      to=""
                      onClick={() => setLetter("Z")}
                    >
                      z
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="business_sale_data">
                <div className="row">
                  {businesses.map((item, index) => (
                    <div
                      className="col-lg-2 col-md-3 col-6 mb-md-4 mb-2 px-md-3 px-2"
                      key={index}
                    >
                      <Link
                        className="business_sale_btn"
                        to={`/business-pos/${item.buyer._id}`}
                      >
                        {item.buyer.business_trading_name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InputBussinessSale;
