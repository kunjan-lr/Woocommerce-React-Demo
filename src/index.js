import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Contact,
  Blog,
  Posts,
  Post,
  Shop,
  Product,
  Cart,
  Products,
  Faqs,
  Checkout,
  Signup,
  Myaccount,
  Vieworder,
} from "./components";
import Login from "./components/Login";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/my-account" element={<Myaccount />} />
      <Route path="/my-account/view-order/:orderId" element={<Vieworder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} >
        <Route path="" element={<Products />} />
        <Route path=":productSlug" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();
