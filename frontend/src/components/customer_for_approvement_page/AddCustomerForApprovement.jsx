import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, TextField } from '@mui/material';
import debounce from 'debounce';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners"
import { Toaster, toast } from 'react-hot-toast';
import { registerCustomerAPI, validateAPI } from '../../services/CustomerService';
import api from '../../services/mainService';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import ProgressBar from "@ramonak/react-progress-bar";
// import { Toast } from 'react-toastify/dist/components';

const err = (e) => toast.error(e)
const success = (e) => toast.success(e)
// let fileData = { file: "" }

function AddCustomerForApprovement() {

  // useEffect(() => {

  //   api.get("http://localhost:8080/csrf", { withCredentials: true })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  let [details, setDetails] = useState({ email: "", fname: "", lname: "", address: "", state: "", city: "" });
  let [fnameCheckmark, setFnameCheckmark] = useState("none");
  let [lnameCheckmark, setLnameCheckmark] = useState("none");
  let [cityChecckmark, setCityCheckmark] = useState("none");
  let [stateCheckmark, setStateCheckmark] = useState("none");
  let [customerFound, setCustomerFound] = useState(false);
  let [submitting, setSubmitting] = useState(false)
  let [submitted, setSubmitted] = useState(false);
  let [error, setError] = useState("")
  let [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {

    let res = validateAPI(details);

    res.then((res) => {

      if (res.data.result === "true") {
        setCustomerFound(true);
        res.data.fname === "false" && details.fname !== "" ? setFnameCheckmark("visible") : setFnameCheckmark("hidden");
        res.data.lname === "false" && details.lname !== "" ? setLnameCheckmark("visible") : setLnameCheckmark("hidden");
        res.data.city === "false" && details.city !== "" ? setCityCheckmark("visible") : setCityCheckmark("hidden");
        res.data.state === "false" && details.state !== "" ? setStateCheckmark("visible") : setStateCheckmark("hidden");
      }
      console.log(res.data)
      if (res.data.fname === "true" && res.data.lname === "true" && res.data.city === "true" && res.data.state === "true") {
        setIsFormValid(true)
      }

    })

  }, [details])

  const handleFileChange = (event) => {
    setError("")
    setFile(event.target.files[0]);
    // let reader = new FileReader();
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (event) => {
    //   console.log("File data", event.target.result)
    //   fileData.file = event.target.result;
    // }
  };

  const handleViewClick = () => {
    const fileurl = URL.createObjectURL(file);
    window.open(fileurl, '_blank');
  }

  console.log("add customer for approvement component reloaded")

  const {
    register,
    handleSubmit
  } = useForm();

  const handleChange = (e) => {
    setIsFormValid(false)
    if (e.target.getAttribute("name") === "email") {
      setCustomerFound(false)
    }
    setDetails({ ...details, [e.target.getAttribute("name")]: e.target.value })
  }

  const formSubmit = (data) => {
    //this has to be dynamic via jwt token
    let approvemntStatus = "2";

    data["pdf"] = file;
    data["approvementStatus"] = approvemntStatus;

    if (!file) {
      setError("File is missing");
      err("file is missing")
      return
    }
    setSubmitting(true);


    console.log("progress", uploadProgress)
    // alert(jwtDecode(Cookies.get("token")).sub)
    registerCustomerAPI(
      { ...data, approvemntStatus: approvemntStatus, addedBy: jwtDecode(Cookies.get("token")).sub }
      , setUploadProgress).then((res) => {
        setSubmitting(false)
        setSubmitted(true)
        setDetails({ email: "", fname: "", lname: "", address: "", state: "", city: "" })
        setFile(null)

        if (res.data.result === "true") {
          setCustomerFound(true);
        }
        else if (res.data.result === "submitted") {
          setUploadProgress(0)
          success("customer submitted for approvement")
        } else {
          setCustomerFound(false)
        }
      }).catch((err) => {
        toast.error("failed to add customer")
        setSubmitting(false)
      });
  };

  return (
    <>
      <div >
        <div>
          <Toaster
            position="top-left"
            reverseOrder={false}
          />
        </div>
        <div className="agent_page " style={{ width: "100vw", height: "100vh" }}>
          <div className="containerr px-2 relative "  >
            <div className='shadow-lg  p-8  w-screen'>
              <div className='top flex justify-between'>
              </div>
              <div className='flex'>
                <div className='w-1/4 mt-4 flex flex-col items-end justify-center'>
                  <div className='flex  justify-center items-center'>
                    <div className='rounded-full border-2  border-black border-solid flex justify-center' style={{ width: "30px" }} >
                      1
                    </div>
                    <div className='bg-black ' style={{ height: "5px", width: "100px" }}>

                    </div>
                  </div>
                  <div className='px-4 text-lime-700'>
                    Application Progress 1
                  </div>
                </div>
                <div className='w-1/4 mt-4 flex flex-col  items-start justify-center'>
                  <div className='flex  justify-center items-center'>
                    <div className='bg-black ' style={{ height: "5px", width: "150px" }}>

                    </div>
                    <div className='rounded-full border-2  border-black border-solid flex justify-center' style={{ width: "30px" }} >
                      2
                    </div>
                    <div className='bg-black ' style={{ height: "5px", width: "150px" }}>

                    </div>
                  </div>
                  <div className='flex justify-center w-full text-lime-700'>
                    Application Progress 2
                  </div>
                </div>
                <div className='w-1/4 mt-4 flex flex-col  items-start justify-center'>
                  <div className='flex  justify-center items-center'>
                    <div className='bg-black ' style={{ height: "5px", width: "150px" }}>

                    </div>
                    <div className='rounded-full border-2  border-black border-solid flex justify-center' style={{ width: "30px" }} >
                      3
                    </div>
                    <div className='bg-black ' style={{ height: "5px", width: "150px" }}>

                    </div>
                  </div>
                  <div className='flex justify-center w-full text-lime-700'>
                    Application Progress 3
                  </div>
                </div>
                <div className='w-1/4 mt-4 flex flex-col  items-start justify-center'>
                  <div className='flex  justify-center items-center'>

                    <div className='bg-black ' style={{ height: "5px", width: "150px" }}>

                    </div>
                    <div className='rounded-full border-2  border-black border-solid flex justify-center' style={{ width: "30px" }} >
                      4
                    </div>
                  </div>
                  <div className='flex justify-center w-full text-lime-700'>
                    Application Progress 4
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------------- */}
            <form id="form" action="" onSubmit={handleSubmit(formSubmit)} >
              <div className="bottom mt-10 px-8 py-4 flex flex-col shadow-md  gap-2 md:flex-row sm:flex-row   ">
                <div className="left w-1/2 sm:w-full ">
                  <div className="heading px-2 bg-gray-100 text-lime-700 text-bold">
                    <h2>Enter the follwing details</h2>
                  </div>
                  <div className="form " style={{ width: "80%" }}>

                    <div className="id flex items-center ">
                      <div className='flex items-center flex-1'>
                        <TextField id="standard-basic" label="Custmore  id" className='w-full' variant="standard" placeholder='Enter email id' {...register("email")} required onChange={debounce(handleChange, 300)
                        } autoComplete="off" tabIndex={-1}
                        />
                      </div>
                      <div>
                        {customerFound ? <span className="visible">✔️</span> : ""}
                        {!customerFound && details.email !== "" ? <span className="visible">❌</span> : ""}
                      </div>
                    </div>
                    <div className="fname flex items-center">
                      <div className='flex items-center flex-1'>
                        <TextField id="standard-basic" label="Custmore first name" className='w-full' variant="standard" {...register("fname")} disabled={!customerFound} required onChange={debounce(handleChange, 300)} />

                      </div>
                      <div>
                        {customerFound && details.fname !== "" ? <span className={fnameCheckmark !== "visible" ? 'visible' : 'hidden'}>✔️</span> : ``}
                        {customerFound && details.fname !== "" ?
                          <span style={{ visibility: fnameCheckmark === "none" ? "hidden" : fnameCheckmark, display: "block" }} className="hidden">❌</span> : ""}
                      </div>
                    </div>
                    <div className="lname flex items-center">
                      <div className='flex items-center flex-1'>
                        <TextField id="standard-basic" label="Customer last name" className='w-full' variant="standard"  {...register("lname")} required disabled={!customerFound} onChange={debounce(handleChange, 300)} autoComplete="off" />

                      </div>
                      <div>
                        {customerFound && details.lname !== "" ? <span className={lnameCheckmark !== "visible" ? 'visible' : 'hidden'}>✔️</span> : ``}
                        {customerFound && details.lname !== "" ?
                          <span style={{ visibility: lnameCheckmark === "none" ? "hidden" : lnameCheckmark, display: "block" }} className="hidden">❌</span> : ""}
                      </div>
                    </div>
                    <div className="address flex items-center w-full">
                      <div className='flex items-center gap-2 flex-1'>
                        <TextField id="standard-basic" label="Customer Address" className='w-full' variant="standard" {...register("address")} required disabled={!customerFound} onChange={debounce(handleChange, 300)} autoComplete="off" />
                      </div>
                      <div>
                        {customerFound && details.address !== "" ? <span className="visible">✔️</span> : ``}

                      </div>

                    </div>
                    <div className="state flex items-center w-full">
                      <div className='flex items-center gap-2 flex-1'>
                        <TextField id="standard-basic" label="Customer State" className='w-full' variant="standard" {...register("state")} required disabled={!customerFound} onChange={debounce(handleChange, 300)} autoComplete="off" />
                      </div>
                      <div>
                        {customerFound && details.state !== "" ? <span className={stateCheckmark !== "visible" ? 'visible' : 'hidden'}>✔️</span> : ``}
                        {customerFound && details.state !== "" ?
                          <span style={{ visibility: stateCheckmark === "none" ? "hidden" : stateCheckmark, display: "block" }} className="hidden">❌</span> : ""}
                      </div>
                    </div>
                    <div className="city flex items-center w-full">
                      <div className='flex items-center flex-1'>
                        <TextField id="standard-basic" label="Customer City" className='w-full' variant="standard" {...register("city")} disabled={!customerFound} required autoComplete="off" onChange={debounce(handleChange, 300)} />

                      </div>
                      <div>
                        {customerFound && details.city !== "" ? <span className={cityChecckmark !== "visible" ? 'visible' : 'hidden'}>✔️</span> : ``}
                        {customerFound && details.city !== "" ?
                          <span style={{ visibility: cityChecckmark === "none" ? "hidden" : cityChecckmark, display: "block" }} className="hidden">❌</span> : ""}
                      </div>
                    </div>
            

                    {
                      submitting ?
                        <>
                          <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <div>
                              Uploading File
                              <ProgressBar completed={uploadProgress} style={{ width: "100%" }} />
                            </div>

                          </div>

                        </>

                        :
                        <div className="submit flex justify-center mt-4 mb-4" variant="outlined">
                          <  Button type='submit' variant="outlined" disabled={!isFormValid}>Submit</Button>
                        </div>
                    }
                    {/* <div className="submit flex justify-center mt-4 mb-4" variant="outlined">
                      {
                        submitting ? <>
                        <ProgressBar completed={uploadProgress} style={{width:"100%"}}/>
                        </> : <Button type='submit' variant="outlined" disabled={!isFormValid}>Submit</Button>
                      }
                    </div> */}
                  </div>
                </div>

                <div className="right w-1/2 sm:w-full">
                  <div className=''>
                    <div className="heading px-2 bg-gray-100 text-lime-700 text-bold">
                      <h2>File to upload</h2>
                    </div>
                    <div className='flex flex-col items-center mt-5'>
                      <div className="flex flex-col items-center mt-2 bg-gray-100 gap-4 w-1/2 py-4">
                        <div className="icon">
                          <FileUploadIcon />
                        </div>
                        <div className="small-heading">
                          PSEG installation form
                        </div>
                        <div className="upload-btn ">
                          {file ? (
                            <>
                              <label className='w-full bg-transparent hover:bg-lime-700 text-lime-700 hover:text-white font-semibold py-2 px-4  border border-lime-700 hover:border-transparent rounded' onClick={handleViewClick}>View</label>
                              &nbsp; &nbsp;
                              <label className='w-full bg-transparent hover:bg-lime-700 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-700 hover:border-transparent rounded'>
                                Change <input type="file" size="60" style={{ display: "none", width: "100%", heigth: "100%" }} accept=".pdf" onChange={handleFileChange} id="file" />
                              </label>
                            </>
                          ) : (
                            <label className='w-full bg-transparent hover:bg-lime-700 text-lime-700 font-semibold hover:text-white py-2 px-4  border border-lime-700 hover:border-transparent rounded '>
                              Upload <input type="file" size="60" style={{ display: "none", width: "100%", heigth: "100%" }} accept=".pdf" onChange={handleFileChange} id="file" />
                            </label>
                          )}
                        </div>
                        <div className="description">
                          <p>File number limit : 1</p>
                          <p>size limit : 10MB</p>
                          <p>Allowed Type: PDF</p>
                        </div>
                      </div>
                      {file ? <h1 style={{ color: "red" }}>{error}</h1> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCustomerForApprovement