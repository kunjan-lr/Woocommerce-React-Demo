import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

function Posts() {
  const [data, setData] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setpage] = useState(1)

  const fetchPosts=()=>{
    fetch(`/blog/wp-json/wp/v2/posts?per_page=3&page=${page}`)
    .then(res=>{
      setPageCount(res.headers.get('X-WP-TotalPages'))
      return(
        res.json()
        )
      })
      .then((data) => setData(data))
    }
    
  useEffect(() => {
    fetchPosts()
  }, [page]);

  // const handlePageClick = (event) => {    
  //   fetch(`https://www.logicrays.com/blog/wp-json/wp/v2/posts?page=${event.selected+1 }`)
  //   .then((res) => res.json())
  //   .then((data) => setData(data));
  // };

 //console.log(data);

  return (
    <>
    <div className="home">
      <div className="container">
      {data && data.map((item) => {
        return (
        <Link to={ `/blog/${item.id}` } key={item.id}>
          <div className="row align-items-center my-5">
            <div className="col-lg-7">
              <img className="img-fluid rounded mb-4 mb-lg-0" src={item.fimg_url} alt="" />
            </div>
            <div className="col-lg-5">
              <h1 className="font-weight-light"><div dangerouslySetInnerHTML={{ __html: item.title.rendered }} /></h1>
              <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
            </div>
          </div>
        </Link>
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
    </>
  );
}

export default Posts;
