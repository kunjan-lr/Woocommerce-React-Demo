import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  const userdata = JSON.parse(window.localStorage.getItem("customerinfo"));
  return (
    <>
      <div className="cover">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <p className="mb-0 phone pl-md-2">
                <Link to="">
                  <i className="fas fa-phone mr-1"></i>+55 61 0123 456
                </Link>
                <Link to="">
                  <i className="fas fa-paper-plane mr-1"></i>email@email.com
                </Link>
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="social-icon mr-4">
                <p className="mb-0 d-flex">
                  <Link to="">
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-instagram"></i>
                  </Link>
                  <Link to="">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </p>
              </div>
              <div className="reg">
                <Link to={`signup`} className="mr-2 mb-0">
                  Sign-Up
                </Link>
                <Link to={`login`}>Log In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navigation ">
        <nav className="navbar navbar-expand navbar-dark bg-dark bg-color">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/2560px-WooCommerce_logo.svg.png"
                width={100}
              />
            </NavLink>
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shop">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blog">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/faqs">
                    FAQs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </li>
                {userdata ? (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-account">
                      My account
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navigation;
