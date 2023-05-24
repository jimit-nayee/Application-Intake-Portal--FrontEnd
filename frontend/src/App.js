import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomerForApprovement from "./components/customer_for_approvement_page/AddCustomerForApprovement";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import CustomerList from "./components/admin/customer_list/CustomerList";
import AdminPage from "./components/admin/AdminPage";
import ReviewerPage from "./components/reviewer/ReviewerPage";
import AgentPage from "./components/agent/AgentPage";
import AgentCustomersList from "./components/agent/agent_customer_list/AgentCustomersList";
import EmployeeList from "./components/admin/employee_list/EmployeeList";
import ReviewList from "./components/review_page/ReviewList";
import { useEffect } from "react";
import api from "./services/mainService";
import Cookies from "js-cookie";
import RichTextEditor from "./components/text-editor/RichTextEditor";
import jwtDecode from "jwt-decode";
import PasswordForm from "./components/passwordForm/PasswordForm";
import { Typography } from "@material-ui/core";

function App() {

  // useEffect(() => {
  //   api.post("http://localhost:8080/csrf", { withCredentials: true })

  // }, []);

  console.log("app componenet loaded")
  return (

    <div className="App flex flex-col " style={{ height: "100vh" }}>  {/* flex */}
      {/* <AddCustomerForApprovement/>  */}


      <Routes>

        <Route path='/editor' element={<RichTextEditor />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:email" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/password/:email/:verification_id/:expireTime" element={<PasswordForm />} />
        <Route path="/admin_page" element={<AdminPage />}  >
          <Route path="add" element={<AddCustomerForApprovement />} />
          <Route index element={<CustomerList />} />
          <Route path="list" element={<CustomerList />} />
          <Route path="emplist" element={<EmployeeList />} />
          <Route path="reviewlist" element={<ReviewList />} />
        </Route>

        <Route path="/agent_page" element={<AgentPage />}  >
          <Route path="add" element={<AddCustomerForApprovement />} />
          <Route path="list" element={<AgentCustomersList />} />
          <Route index element={<AgentCustomersList />} />
        </Route>

        <Route path="/reviewer_page" element={<ReviewerPage />}  >
          <Route path="add" element={<AddCustomerForApprovement />} />
          <Route index path="list" element={<ReviewList />} />
          <Route index element={<ReviewList />} />
        </Route>
        <Route exact path="/*" element={<div>
          <Typography variant="h1" style={{ textAlign: "center" }}>404 page not found</Typography>
        </div>} />
      </Routes>
    </div>
  );
}

export default App;
