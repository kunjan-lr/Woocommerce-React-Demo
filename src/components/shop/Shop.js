import React from "react";
import { Outlet } from "react-router-dom";

function Shop() {
  return (
    <div className="home">
      <div className="container">
        <h1 className="text-center mt-5">Shop</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Shop;