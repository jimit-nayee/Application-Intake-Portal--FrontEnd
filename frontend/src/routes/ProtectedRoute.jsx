import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Agent_Page from "../components/agent_page/Agent_Page";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
     
    // if (!login) {
    //   navigate("/");
    // }
  });

  const { Component } = props;

  return <Component />;
};

export default ProtectedRoute;