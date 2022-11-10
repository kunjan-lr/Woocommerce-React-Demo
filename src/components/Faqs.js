import React, { useEffect, useState } from "react";

function Faqs() {
  const [data, setData] = useState(null);
  //const [pageCount, setPageCount] = useState(0);
  const [page, setpage] = useState(1)

  const fetchPosts=()=>{
    fetch(`/wp-json/wp/v2/posts?per_page=10&page=${page}`)
    .then(res=>{
      //setPageCount(res.headers.get('X-WP-TotalPages'))
      return(
        res.json()
        )
      })
      .then((data) => setData(data))
    }
    
  useEffect(() => {
    fetchPosts()
  }, [page]);

  return (
    <>
      <div className="about">
        <div className="align-items-center my-5">        
          <div id="main">
            <div className="container">
              <h1 className="font-weight-light my-5">FAQs</h1>
              <div className="accordion" id="faq">
              {data && data.map((item, index) => {
                return (
                <div className="card" key={item.id}>
                  <div className="card-header" id={`faqhead-${index}`}>
                    <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target={`#faq-${index}`}
                      aria-expanded="true" aria-controls={`#faq-${index}`}>
                       <span dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                    </a>
                  </div>
                  <div id={`faq-${index}`} className="collapse" aria-labelledby={`faqhead-${index}`} data-parent="#faq">
                    <div className="card-body">
                    <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
                    </div>
                  </div>
                </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faqs;
