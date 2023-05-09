import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCustomerForApprovement from "./components/customer_for_approvement_page/AddCustomerForApprovement";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Pdf from "./pdf/Pdf"
import CustomerList from "./components/admin/customer_list/CustomerList";
import AdminPage from "./components/admin/AdminPage";
import ReviewerPage from "./components/reviewer/ReviewerPage";
import AgentPage from "./components/agent/AgentPage";
import AgentCustomersList from "./components/agent/agent_customer_list/AgentCustomersList";
import EmployeeList from "./components/admin/employee_list/EmployeeList";
import ReviewList from "./components/review_page/ReviewList";
import { AuthProvider } from "./utils/auth";
import { useEffect } from "react";
import api from "./services/mainService";
import Cookies from "js-cookie";

function App() {

  const isAuth = false;


  useEffect(() => {
    api.get("http://localhost:8080/csrf", { withCredentials: true })
      .then(response => {
        console.log(Cookies.get("XSRF-TOKEN"));
        console.log(response.headers);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (

    <div className="App flex flex-col " style={{ height: "100vh" }}>  {/* flex */}
      {/* <AddCustomerForApprovement/>  */}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

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
        \
        <Route path="/reviewer_page" element={<ReviewerPage />}  >
          <Route path="add" element={<AddCustomerForApprovement />} />
          <Route index path="list" element={<ReviewList />} />
          <Route index element={<ReviewList />} />
        </Route>
        <Route path="/pdf" element={<Pdf />} />
      </Routes>
    </div>
  );
}

export default App;
