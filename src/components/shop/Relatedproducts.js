import React, { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const api = new WooCommerceRestApi({
  url: "http://157.245.96.72/testproject",
  consumerKey: "ck_853ec9ed13fb578d5ba64aeef8922ca1f352e7ed",
  consumerSecret: "cs_21d7839e1246b53736045b182b5c30ae2f2ce268",
  version: "wc/v3",
});

function Relatedproducts() {
  const [product, setProducts] = useState([]);
  const [relatedproduct, setRelatedproducts] = useState([]);

  let { productSlug } = useParams();

  const cartProduct = [];

  const addToCart = (event, product) => {
    const localcartproducts = JSON.parse(
      window.localStorage.getItem("cartitems")
    );
    const found = localcartproducts?.some((el) => el.id === product.id);

    if (found) {
      let productinfo = localcartproducts.map((item) => {
        if (product.id === item.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      window.localStorage.setItem("cartitems", JSON.stringify(productinfo));
    } else {
      cartProduct.push({ ...product, quantity: 1 });
      window.localStorage.setItem("cartitems", JSON.stringify(cartProduct));
    }
  };

  useEffect(() => {
    api
      .get(`products/${productSlug}`, {
        //per_page: 2,
      })
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [productSlug]);

  //console.log(product.related_ids);

  useEffect(() => {
    product.related_ids &&
      product.related_ids.map((element) => {
        api
          .get(`products/${element}`, {
            //per_page: 2,
          })
          .then((response) => {
            if (response.status === 200) {
              setRelatedproducts(pre=>[...pre,response.data])
            }   
          });
      });
  }, [product]);

  //console.log("hbh",relatedproduct);

  return (
    <>
      <div className="pt-5">
      <h4>Related Products</h4>
      <div className="row">
            {relatedproduct.length>0 && relatedproduct.map((r, index) => {
            return (
                <div className="col-lg-3 text-center mb-5" key={index}>
                <img src={r.images[0]["src"]} alt={r.name} className="product-image" width={250} height={250} />
                <h6 className="mt-2">
                    <Link to={`/shop/${r.id}`}>{r.name}</Link>
                </h6>
                <div dangerouslySetInnerHTML={{ __html: r.price_html }} />
                <button className="mt-2 btn btn-primary" onClick={(e) => { addToCart(e, r); }} >
                    Add to cart
                </button>
                </div>
            );
            })}
      </div>
      </div>
    </>
  );
}

export default Relatedproducts;
