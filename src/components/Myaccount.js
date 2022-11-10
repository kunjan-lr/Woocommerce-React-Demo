import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import moment from "moment";
import ReactPaginate from 'react-paginate';

const api = new WooCommerceRestApi({
    url: "http://157.245.96.72/testproject",
    consumerKey: "ck_853ec9ed13fb578d5ba64aeef8922ca1f352e7ed",
    consumerSecret: "cs_21d7839e1246b53736045b182b5c30ae2f2ce268",
    version: "wc/v3",
});

function Myaccount() {

    const [orders, setOrders] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setpage] = useState(1)
    const [loginInfo, setLogininfo] = useState(JSON.parse(localStorage.getItem("customerinfo")))

    const fetchOrders = () => {
        api.get(`orders?customer=${loginInfo['data'].ID}`, {
                per_page: 5,
                page: page
            })
            .then((response) => {                
                if (response.status === 200) {
                    setOrders(response.data);
                    setPageCount(response.headers['x-wp-totalpages'])
                }
            })
            .catch((error) => { });
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);
    
    return (
        <section className="py-5 header">
            <div className="container py-4">
                <header className="text-center mb-5 pb-5 text-black">
                    <h1 className="display-4">My account</h1>
                </header>
                <div className="row">
                    <div className="col-md-3">
                        <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link mb-3 p-3 shadow active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                <i className="fa fa-dashboard mr-2"></i>
                                <span className="font-weight-bold small text-uppercase">Dashboard</span></a>

                            <a className="nav-link mb-3 p-3 shadow" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                <i className="fa fa-calendar-minus-o mr-2"></i>
                                <span className="font-weight-bold small text-uppercase">Orders</span></a>

                            <a className="nav-link mb-3 p-3 shadow" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                <i className="fa fa-address-card mr-2"></i>
                                <span className="font-weight-bold small text-uppercase">Addresses</span></a>

                            <a className="nav-link mb-3 p-3 shadow" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                <i className="fa fa-user mr-2"></i>
                                <span className="font-weight-bold small text-uppercase">Account details</span></a>

                            <Link className="nav-link mb-3 p-3 shadow"
                                onClick={(e) => {
                                    window.localStorage.removeItem("customerinfo");
                                    window.location.href = "/login";
                                }}
                            >
                                {" "}
                                <i className="fa fa-sign-out mr-2"></i>
                                <span className="font-weight-bold small text-uppercase">Log out</span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade shadow rounded bg-white show active p-5" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">

                                <p className="text-muted mb-2">Hello, {loginInfo['data'].user_login} (not {loginInfo['data'].user_login}?
                                    <Link
                                        onClick={(e) => {
                                            window.localStorage.removeItem("customerinfo");
                                            window.location.href = "/login";
                                        }}
                                    >
                                        {" "}
                                        Log out
                                    </Link>)
                                    From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                            </div>

                            <div className="tab-pane fade shadow rounded bg-white p-5" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                <h4 className="mb-4">Orders</h4>
                                <table className="table table-striped table-hover table-bordered">
                                    <thead>
                                        <tr className="table-primary">
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.map((order, index) => {     
                                            let txt = ''
                                            if(order.line_items.length > 1){
                                                txt = 'items'
                                            }else{
                                                txt = 'item'
                                            }                              
                                            return (
                                                <tr key={index}>
                                                    <td>#{order.id}</td>
                                                    <td>{moment(order.date_created).format("MMM d, Y")}</td>
                                                    <td className='text-capitalize'>{order.status}</td>
                                                    <td><span className="woocommerce-Price-currencySymbol">$</span>{order.total} for {order.line_items.length +' '+txt}</td>
                                                    <td><Link to= {`view-order/${order.id}`} className='ui green button btn btn-primary'>View</Link></td>
                                                </tr>
                                            );                                            
                                        })}
                                    </tbody>
                                </table>
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

                            <div className="tab-pane fade shadow rounded bg-white p-5" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                <h4 className="mb-4">Addresses</h4>
                                <p className="text-muted mb-2">The following addresses will be used on the checkout page by default.</p>
                            </div>

                            <div className="tab-pane fade shadow rounded bg-white p-5" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                <h4 className="mb-4">Account details</h4>
                                <p className="text-muted mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Myaccount