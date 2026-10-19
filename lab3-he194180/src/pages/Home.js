import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        {" | "} <Link to="/products">View Products</Link> {" | "}
      </nav>
      
      
    </div>
  );
}

export default Home;
