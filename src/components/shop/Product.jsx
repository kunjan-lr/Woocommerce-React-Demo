import React, { useEffect, useState } from 'react'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useParams } from "react-router";
import Relatedproducts from './Relatedproducts';
import Swal from "sweetalert2";

const api = new WooCommerceRestApi({
  url: "http://157.245.96.72/testproject",
  consumerKey: "ck_853ec9ed13fb578d5ba64aeef8922ca1f352e7ed",
  consumerSecret: "cs_21d7839e1246b53736045b182b5c30ae2f2ce268",
  version: "wc/v3",
});

function Product() {
  const [product, setProducts] = useState([]);
  const [variations, setVariations] = useState([]);
  
  let { productSlug } = useParams();

    //const cartProduct=[]
    
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
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart successfully'
      })   
    }

  useEffect(() => {        
    api.get(`products/${productSlug}`, {
        //per_page: 2,
    }).then((response) => {      
      if (response.status === 200) {
          setProducts(response.data);
      }
    })
    .catch((error) => {
        console.log(error.response.data);
    }); 
  },[productSlug]);

  useEffect(() => {        
    api.get(`products/${productSlug}/variations`, {
        //per_page: 2,
    }).then((response) => {      
      if (response.status === 200) {
          setVariations(response.data);
      }
    })
    .catch((error) => {
        console.log(error.response.data);
    }); 
  },[productSlug]);

  //console.log(variations);  

  const [variation, setVariation] = useState({});
  const handleChange = e => {
    const { name, value } = e.target;
    setVariation(prevVal => {
      return {
        ...prevVal,
        [name]: value
      }
    })
  };
    
  // })
  const handleSubmit = (e, product) => {
  //const handleSubmit = e => {
      e.preventDefault();
      let _id;
      let _price;
      variations.length && variations.every(({attributes, id, price}) => {
        
        let isItemExist = true;
        //console.log(variation);
        const option = attributes?.map(({name,option},idx) => {
          //console.log(option, '===option')
          if(variation[name] === option && isItemExist) {
            isItemExist = true
          } else {
            isItemExist = false
          }
        })

        if(isItemExist) {
          _id = id;
          _price = price;
          return false
        }        
        return true

      })
      console.log(_id,'id===')
      console.log(_price,'price===')
      // console.log(product)      

      const localcartproducts = JSON.parse(window.localStorage.getItem("cartitems"));
      const found = localcartproducts?.some(el => el.id === product.id);

      if(found){
        let productinfo = localcartproducts.map((item)=> { if(product.id == item.id){
          return { ...item, quantity: item.quantity + 1}
        }else{
          return item;
        }})
        window.localStorage.setItem('cartitems', JSON.stringify(productinfo));
      }else{
        let allProducts = [];
        if(localcartproducts?.length) 
          allProducts = [ ...localcartproducts, {...product, variation_id: _id, quantity: 1, price: _price, variation: variation} ];
        else 
          allProducts.push({...product, variation_id: _id, quantity: 1, price: _price, variation: variation})
          window.localStorage.setItem('cartitems', JSON.stringify(allProducts));
      }  
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart successfully'
      }) 
      // const data = variation;
      // const json = JSON.stringify(data);
      // console.clear();
      // console.log(variation);
  };
  //console.log(variation,'att===')
  //console.log(product);
  
  return (
    <div className="about">
      {product && (
      <>        
          <div className="row align-items-center my-5 pb-5">
            <div className="col-lg-7">
              <div id="custCarousel" className="carousel slide" data-ride="carousel" align="center">
                <div className="carousel-inner">
                {product.images && product.images.map((element, index) => {
                return(
                  <div className={ index === 0 ? "carousel-item active" : "carousel-item" }>
                    <span className="onsale" data-shape="type-2">{product.sale_price ? 'SALE!' : ''}</span>
                    <img src={element.src} alt="product" />
                  </div> 
                  )
                })} 
                </div>
                <a className="carousel-control-prev" href="#custCarousel" data-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#custCarousel" data-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </a>
                <ol className="carousel-indicators list-inline">
                {product.images && product.images.map((element, index) => {
                return(
                  <li className={index === 0 ? "list-inline-item active" : "list-inline-item" }>
                    <a id="carousel-selector-0" className="selected" data-slide-to={index} data-target="#custCarousel">
                      <img src={element.src} className="img-fluid" />
                    </a>
                  </li>
                   )
                  })}        
                  </ol>
              </div>
            </div>
            <div className="col-lg-5">
              <h1 className="font-weight-light">{product.name}</h1>
              <h6 className="text-success text-uppercase">{product.stock_status}</h6>
              <div className='newprice' dangerouslySetInnerHTML={{ __html: product.price_html }} />
              <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
              {product.type == 'variable'?
              <form onSubmit={(e) => { handleSubmit(e, product); }}>
              {product.attributes && product.attributes.map((element, index) => {
                return(
                  <>
                  <label>{element.name}</label>
                  <select className="form-control" value={variation[element.name]} name={element.name} onChange={handleChange} >
                    <option>Choose an option</option>
                    {element.options.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                    })}
                  </select>
                  </>
                  )
              })}
              <button className='mt-2 btn btn-primary' type='submit'>Add to cart</button>
              </form>
              : <button className='mt-2 btn btn-primary' onClick={(e) => { addToCart(e, product); }}>Add to cart</button> }
              <h6 className="text-warning text-uppercase pt-3">Sku: <span className="text-primary">{product.sku}</span></h6>
              <h6 className="text-warning text-uppercase">Categories:  
              {product.categories && product.categories.map((element, index) => {
                return(
                  <span className="text-primary"> {" "}{element.name} {index === product.categories.length - 1 ? "" : ","}</span>
                )
              })}
              </h6>
            </div>
          </div>
          <div className="pt-5">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Description</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Additional information</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Reviews</a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <h6 className='pt-4 pl-2'>Description</h6>
              <div className='pl-2' dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
            <div className="tab-pane" id="tabs-2" role="tabpanel">
              <h6 className='pt-4 pl-2'>Additional information</h6>
              <table className="table table-bordered">
                <tbody>
                {product.attributes && product.attributes.map((element, index) => {
                  return(
                    <tr>
                    <td>{element.name}</td>
                    <td>{element.options.join(', ')}</td>
                    </tr>
                    )
                })}
                </tbody>
              </table>
            </div>
            <div className="tab-pane" id="tabs-3" role="tabpanel">
              <h6 className='pt-4 pl-2'>Reviews</h6>
            </div>
          </div>
          </div>
          <Relatedproducts />        
      </>    
      )} 
    </div>
  )
}

export default Product