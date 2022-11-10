import React, { useEffect, useState } from 'react'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const api = new WooCommerceRestApi({
  url: "testproject", /*Add your api url and key*/
  consumerKey: "",
  consumerSecret: "",
  version: "wc/v3",
});

function Shop() {
    let abutton = ''
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setpage] = useState(1);
    
    const addToCart = (event, product) => {  
      
      const localcartproducts = JSON.parse(window.localStorage.getItem("cartitems"));
      const found = localcartproducts?.some(el => el.id === product.id);

        if(found){
          let productinfo = localcartproducts.map((item)=> { if(product.id === item.id){
            return { ...item, quantity: item.quantity + 1}
          }else{
            return item;
          }})        
          window.localStorage.setItem('cartitems', JSON.stringify(productinfo));
        }else{
          let allProducts = [];
          if(localcartproducts?.length) 
            allProducts = [ ...localcartproducts, {...product, quantity: 1} ];
          else 
            allProducts.push({...product, quantity: 1})
          
          window.localStorage.setItem('cartitems', JSON.stringify(allProducts));
        }
    }
    
    useEffect(() => {        
        api.get("products", {
            per_page: 8,
            page: `${page}`,
        })
        .then((response) => {           
          if (response.status === 200) {
              //console.log(response.headers);
              setPageCount(response.headers["x-wp-totalpages"]);
              setProducts(response.data);
          }                   
        })
        .catch((error) => {
            console.log(error.response.data);
        }); 
    },[page]);

    //console.log(products);
    
  return (
    <div className="shop">
      <div className="container">
        <div className="align-items-center my-5">
            <h1 className="font-weight-light">Shop</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            </div>
            <div className="row">
            {products.map((product, index) => {
              if(product.type === 'simple'){
                 abutton = <button className='mt-2 btn btn-primary' onClick={(e) => { addToCart(e, product); }}>Add to cart</button>
              }else{
                 abutton = <Link to={ `/shop/${product.id}` } className='mt-2 btn btn-primary'>Read More</Link>
              }
              return (                
                <div className="col-lg-3 text-center mb-5" key={index}>
                  <span className="onsale" data-shape="type-2">{product.sale_price ? 'SALE!' : ''}</span>
                    <img src={product?.images?.[0]["src"]} alt={product.name} className="product-image" width={250} height={250} />
                    <h6 className='mt-2'><Link to={ `/shop/${product.id}` }>{product.name}</Link></h6>
                    <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
                    {abutton}
                </div>
              );
            })}            
          </div>
          <ReactPaginate        
            nextLabel="Next >"
            onPageChange={(e)=>{setpage(e.selected+1)}}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
      </div>
    </div>
  )
}

export default Shop