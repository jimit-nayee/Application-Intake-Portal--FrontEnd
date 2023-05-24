import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import home_page from "../../images/home_page.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginAPI } from "../../services/AuthorizationService";
import jwt from 'jwt-decode'

import { useAuth } from "../../utils/auth";
import { Toaster, toast } from "react-hot-toast";
import api from "../../services/mainService";


const PasswordForm = () => {

    const [user, setUser] = useState({});
    const [loginButtonText, setLoginText] = useState("Set Password")
    const params = useParams();
    const navigate=useNavigate();
    const [isExpired,setIsExpired]=useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
        let expireTime=params.expireTime;
        let currentTime=Date.now();
        if(currentTime>expireTime)
        {
            alert("Link has expired, Kindly re-register");
            navigate("/register");
        }else{
            setIsExpired(false)
        }
    })

    const formSubmit = (data) => {

        api.post("http://localhost:8080/verify",data).then(()=>{
            toast.success("Password set Successfully, You will be redirected to login page within 4 seconds");
            setTimeout(() => {
                navigate("/");
            }, 4000);
        }).catch((e)=>{
            console.log(e);
            alert("Error occured")
        })
    }
    return (
       
        isExpired ? "": <>
        <div
     className="flex items-center justify-center"
     style={{
       width: "100vw",
       height: "100vh",
       background: `url(${home_page})`,
       backgroundPosition: "center",
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
       display: "flex",
       flexDirection: "column"
     }}
   >

           <div
               className="shadow-lg bg-gray-700 w-1/4 py-10 text-white h-max"
               style={{ padding: "30px 30px" }}
           >
               <Toaster
                   position="top-center"
                   reverseOrder={false}
               />
               <form className="form flex flex-col" onSubmit={handleSubmit(formSubmit)}>

                <input type="hidden"  value={params.email} {...register("email")} />
                <input type="hidden" value={params.verification_id} {...register("verification_id")} />
                   <label htmlFor="password">Password</label>
                   <input
                       type="password"
                       id="password"
                       value={params.password}
                       className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       {...register("password", { required: "Username is required" })}
                   />
                   <p style={{ color: "red" }}>{errors.username?.message}</p>
                   <label htmlFor="Password">Confirm Password</label>
                   <input
                       type="password"
                       id="ConfirmPassword"
                       className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                       {...register("ConfirmPassword", {
                           required: "Confirm Password is required",
                       })}
                   />
                   {/* <label htmlFor="Role">    Login as</label>
               <select
           name=""
           id="Role"
           className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
           {...register("role", {
             required: "Role is required",
           })}
         >
           <option selected disabled>
               Select
           </option>

           <option value="ROLE_ADMIN">Admin</option>
           <option value="ROLE_AGENT">Agent</option>
           <option value="ROLE_REVIEWER">Reviewer</option>
         </select> */}
                   <p style={{ color: "red" }}>{errors.password?.message}</p>
                   <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
                       {loginButtonText}
                   </button>
{/* 
                   <div className="mt-3">
                       <Link to={"/register"} className="nav-link ">
                           {" "}
                           Don't have an account ?{" "}
                       </Link>
                   </div> */}
               </form>
           </div>
       </div>
       </>
       
    )
}

export default PasswordForm