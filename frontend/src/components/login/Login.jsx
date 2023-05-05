import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginAPI } from "../../services/AuthorizationService";


function Login() {
  // const [credentials, setCredentials] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const formSubmit = (data) => {
    // setCredentials(data);
    console.log(data);
    loginAPI(data).then((res) => {
      Cookies.set("token", res.data);
      console.log(res);
      navigate("/agent");

    }).catch((err) => {
      console.log(err.response.data);
      alert(err.response.data);
    });
  };

  return (
    <div
      className="shadow-lg bg-gray-700 w-1/4 py-10 text-white h-max"
      style={{ padding: "30px 30px" }}
    >
      <form className="form flex flex-col" onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="Username">Email</label>
        <input
          type="text"
          id="email"
          className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", { required: "Username is required" })}
        />
        <p style={{ color: "red" }}>{errors.username?.message}</p>
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
          Login
        </button>

        <div className="mt-3">
          <Link to={"/register"} className="nav-link ">
            {" "}
            Don't have an account ?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
