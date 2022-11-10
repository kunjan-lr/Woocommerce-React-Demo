import React, { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import NumericInput from 'react-numeric-input';
//import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const api = new WooCommerceRestApi({
  url: "testproject", /*Add your api url and key*/
  consumerKey: "",
  consumerSecret: "",
  version: "wc/v3",
});

function Cart() {
  let total = 0;

  const cartproducts = JSON.parse(window.localStorage.getItem("cartitems"));
  const [updatecart, setUpdatecart] = useState();
  
  const removeProduct = (event, productid) => {
    setUpdatecart((current) =>
      current.filter((updatecart) => {
        return updatecart.id !== productid;
      })
    );
  };

  useEffect(() => {
    cartproducts && setUpdatecart(cartproducts)
  }, [])

  useEffect(() => {
    updatecart && window.localStorage.setItem("cartitems", JSON.stringify(updatecart));
    window.localStorage.setItem('cartitemstotal', total);
  }, [updatecart])
 
  const getSum = (quantity, price) => {
    const sum = price * quantity;
    total += sum;
    return sum.toFixed(2);
  };

  const onChangeHandler = (valuer, productid) => {

    const localcartproducts = JSON.parse(window.localStorage.getItem("cartitems"));
    const found = localcartproducts?.some(el => el.id === productid);

    if(found){
      let productinfo = localcartproducts.map((item)=> { if(productid === item.id){        
        return { ...item, quantity: valuer}
      }else{
        return item;
      }})
      setUpdatecart(productinfo)
      window.localStorage.setItem('cartitems', JSON.stringify(productinfo));
    }

  };

  // const placeOrder = (event, cartproducts) => {
  //   var datafiltered = cartproducts.map(function (el) {
  //     return {
  //       product_id: el.id,
  //       variation_id: el.variation_id,
  //       quantity: el.quantity,
  //     };
  //   });

  //   const orderInfo = {
  //     payment_method: "bacs",
  //     payment_method_title: "Direct Bank Transfer",
  //     set_paid: true,
  //     billing: {
  //       first_name: "John",
  //       last_name: "Doe",
  //       address_1: "969 Market",
  //       address_2: "",
  //       city: "San Francisco",
  //       state: "CA",
  //       postcode: "94103",
  //       country: "US",
  //       email: "john.doe@example.com",
  //       phone: "(555) 555-5555",
  //     },
  //     shipping: {
  //       first_name: "John",
  //       last_name: "Doe",
  //       address_1: "969 Market",
  //       address_2: "",
  //       city: "San Francisco",
  //       state: "CA",
  //       postcode: "94103",
  //       country: "US",
  //     },
  //     line_items: datafiltered,
  //     shipping_lines: [
  //       {
  //         method_id: "flat_rate",
  //         method_title: "Flat Rate",
  //         total: total.toFixed(2),
  //       },
  //     ],
  //   }; 

  //   api.post("orders", orderInfo)
  //     .then((data) => {
  //       //console.log(data);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Place order Successfully'
  //       })
  //       localStorage.clear();
  //       setUpdatecart('')
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Ooops, something went wrong'
  //       })
  //     });
    
  //};  

  return (
    <>
      <div className="cart">
        <div className="container">
          <div className="align-items-center my-5">
            <h1 className="font-weight-light">Cart</h1>
          </div>
          <table className="table table-bordered m-0 mb-5 ">
            <thead>
              <tr>
                <th className="text-center py-3 px-4">
                  Product Name &amp; Details
                </th>
                <th className="text-center py-3 px-4">Price</th>
                <th className="text-center py-3 px-4">Quantity</th>
                <th className="text-center py-3 px-4">Total</th>
                <th className="text-center py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {updatecart &&
                updatecart.map((product) => {
                  return (
                    <tr className="cartinformation" key={product.id}>
                      <td className="p-4">
                        <div className="media align-items-center">
                          <img
                            src={product.images[0]["src"]}
                            alt={product.name}
                            className="d-block ui-w-40 ui-bordered mr-4"
                            width={80}
                            height={80}
                          />
                          {product.type === 'variable' ? 
                          <div className="media-body">{product.name} - {product.variation && Object.keys(product.variation).map(function(k){return product.variation[k]}).join(",")}</div>                                                    
                          : <div className="media-body">{product.name}</div>}
                          </div>
                      </td>
                      <td className="text-center font-weight-semibold align-middle p-4">
                        
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {Number(product.price).toFixed(2)}
                      </td>
                      <td className="align-middle p-4 text-center">
                        <NumericInput min={1} value={product.quantity} onChange={(e) => {
                            onChangeHandler(e, product.id);
                          }} className="form-control text-center" />
                      </td>
                      <td className="text-center font-weight-semibold align-middle p-4">
                        <span className="woocommerce-Price-currencySymbol">$</span>
                        {getSum(product.quantity, product.price)}
                      </td>
                      <td className="text-center align-middle px-0">
                        <a href="" onClick={(e) => { removeProduct(e, product.id); }}
                          className="shop-tooltip close float-none text-danger">×</a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
            <div className="mt-4"></div>
            <div className="d-flex">
              <div className="text-right mt-4">
                <label className="text-muted font-weight-normal m-0">
                  Total price
                </label>
                <div className="text-large">
                  <strong>
                    <span className="woocommerce-Price-currencySymbol">
                      ${total.toFixed(2)}
                    </span>
                  </strong>
                </div>
                {/* <button
                  className="mt-2 btn btn-primary"
                  onClick={(e) => { placeOrder(e, cartproducts); }}>
                  Place order
                </button> */}
                <Link to={ '/checkout/' } className="mt-2 btn btn-primary">Proceed to checkout</Link>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
