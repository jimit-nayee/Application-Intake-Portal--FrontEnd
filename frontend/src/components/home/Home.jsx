import React from "react";
import Login from "../login/Login";
import home_page from "../../images/home_page.jpg";

function Home() {
  return (
    <section
      className="w-full  h-full"
      style={{
        background: `url(${home_page})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className=" h-full flex flex-row-reverse items-center "
        style={{ paddingRight: "150px" }}
      >
        <Login />
      </div>
    </section>
  );
}

export default Home;
