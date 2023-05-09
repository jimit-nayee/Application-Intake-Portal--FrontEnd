import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import home_page from "../../images/home_page.jpg";
import { registerAPI } from "../../services/EmployeeService";


function Register() {
  // const [details, setdetails] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (data) => {
    console.log(data);
   data={...data,is_approved:0};
    // setdetails(data);
    registerAPI(data);
    navigate("/");
  };
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100vw",
        height: "100vh",
        background: `url(${home_page})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <pre>
      {JSON.stringify(details,2,undefined)}
    </pre> */}
      <div
        className="shadow-lg bg-gray-700 sd:w-full md:px-5 md:py-5 lg:w-1/4 py-10 text-white h-max "
        style={{ padding: "30px 30px" }}
      >
        <form
          className="form flex flex-col"
          onSubmit={handleSubmit(formSubmit)}
        >
          <label htmlFor="Username">Email</label>
          <input
            type="text"
            id="Username"
            className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("email", { required: "Username is required" })}
          />
          <p style={{ color: "red" }}>{errors.username?.message}</p>

          <p style={{ color: "red" }}>{errors.email?.message}</p>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <label htmlFor="mono">Mobile Number</label>
          <input
            type="number"
            id="mono"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("mono", {
              required: "Mobile Number  is required",
            })}
          />


          <p style={{ color: "red" }}>{errors.confirm_password?.message}</p>
          <label htmlFor="Role">Role</label>
          <select
            name=""
            id="Role"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            {...register("role", {
              required: "Role is required",
            })}
          >
            <option selected disabled>
              Select Role
            </option>

            <option value="ROLE_AGENT">Agent</option>
            <option value="ROLE_REVIEWER">Reviewer</option>
          </select>
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Register
          </button>

          <div className="mt-3">
            <Link to={"/"} className="nav-link ">
              {" "}
              Already Have an Account?{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
