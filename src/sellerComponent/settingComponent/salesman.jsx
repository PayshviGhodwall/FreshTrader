import React, { useEffect, useState } from "react";
import Header from "../commonComponent/header";
import { useForm } from "react-hook-form";
import {
  addSalesman,
  deleteSalesman,
  getSalesman,
} from "../../apiServices/sellerApiHandler/settingApiHandler";
import { Link } from "react-router-dom";

function Salesman() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);

  const onSubmit = async (data) => {
    const response = await addSalesman(data);
    if (!response.data.error) {
      document.getElementById("nick_name").value = "";
      document.getElementById("full_name").value = "";
      await getList();
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const { data } = await getSalesman();
    if (!data.error) {
      setData(data.results.sellerSalesman);
    }
  };

  const deleSalesman = async (id) => {
    const { data } = await deleteSalesman(id);
    if (!data.error) {
      await getList();
    }
  };

  return (
    <>
      <Header />
      <section className="salesman_page">
        <div className="container-fluid px-0">
          <div className="salesman_page_table comman_table_design border-0">
            <div className="table-responsive">
              <form onSubmit={handleSubmit(onSubmit)}>
                <table className="table">
                  <thead>
                    <tr style={{ background: "#374251" }}>
                      <th>Nickname</th>
                      <th>FUllname</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.nick_name}</td>
                          <td>{item.full_name}</td>
                          <td>
                            <Link
                              className="icon_design"
                              onClick={() => deleSalesman(item._id)}
                              to=""
                            >
                              <img src="assets/img/delete_white.png" alt="" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control table_input"
                            id="nick_name"
                            name="nick_name"
                            {...register("nick_name", { required: true })}
                          />
                        </div>
                        {errors?.nick_name && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}
                      </td>
                      <td>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control table_input"
                            id="full_name"
                            name="full_name"
                            {...register("full_name", { required: true })}
                          />
                        </div>
                        {errors?.full_name && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}
                      </td>
                      <td>
                        <button
                          className="table_comman_btn tables_green_btn"
                          type="submit"
                        >
                          Add Salesman
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Salesman;
