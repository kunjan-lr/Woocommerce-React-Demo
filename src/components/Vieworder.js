import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "http://157.245.96.72/testproject",
  consumerKey: "ck_853ec9ed13fb578d5ba64aeef8922ca1f352e7ed",
  consumerSecret: "cs_21d7839e1246b53736045b182b5c30ae2f2ce268",
  version: "wc/v3",
});

function Vieworder() {
  let { orderId } = useParams();
  const [userInfo, setUserinfo] = useState([]);

  useEffect(() => {
    api.get(`orders/${orderId}`)
    .then((response) => {
      setUserinfo(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }, [orderId]);
  
  //console.log(userInfo)
 
  return (
    <div className="shop">
      <div className="container">
        <div className="align-items-center my-5">
          <h1 className="font-weight-light">Order #{orderId}</h1>
          <p>Order #{orderId} was placed on November 3, 2022 and is currently On hold.</p>
          <h3>Order details</h3>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
              {userInfo.line_items && userInfo.line_items.map((item, index) => {                                            
                return (
                <tr key={index}>
                  <td>{item.name +'×'+ item.quantity}
                  { item.variation_id>0 && item.meta_data ? 
                    item.meta_data.map((meta, index) => {                                            
                    return (
                    <ul>
                    <li>{meta.display_key +':'+ meta.display_value}</li>
                    </ul>
                    );                                            
                    })
                    : ''
                  }                 
                  </td>
                  <td>{userInfo.currency_symbol+item.price.toFixed(2)}</td>
                </tr>
                );                                            
              })}
              <tr>
                <td><strong>Subtotal:</strong></td>
                <td>{userInfo.currency_symbol+userInfo.total}</td>
              </tr>
              <tr>
                <td><strong>Payment method:</strong></td>
                <td>{userInfo.payment_method_title}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td>{userInfo.currency_symbol+userInfo.total}</td>
              </tr>
            </thead>
          </table>
          
          <h3>Billing address</h3>
          <p>{userInfo.billing?.first_name + ' ' + userInfo.billing?.last_name}</p>
          <p>{userInfo.billing?.address_1}</p>
          <p>{userInfo.billing?.address_2}</p>
          <p>{userInfo.billing?.city + ' ' + userInfo.billing?.postcode}</p>
          <p>{userInfo.billing?.state + ', ' +userInfo.billing?.country}</p>
          <p>{userInfo.billing?.phone}</p>
          <p>{userInfo.billing?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Vieworder;
