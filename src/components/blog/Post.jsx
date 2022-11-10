import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Post() {
  const [data, setData] = useState(null);
  let { postSlug } = useParams();

  useEffect(() => {
    // Fetch post using the postSlug
    fetch(`/blog/wp-json/wp/v2/posts/${postSlug}`)
    .then((res) => res.json())
    .then((data) => setData(data));
  }, [postSlug]);

  //console.log(data);

  return (    
    <div className="home">
      {data && (
        <>
        <div class="container">
        <img className="img-fluid rounded mb-4 mb-lg-0" src={data.fimg_url} alt="" />  
        <h1 className="mt-5"><div dangerouslySetInnerHTML={{ __html: data.title.rendered }} /></h1>
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </div>
        </>    
      )} 
      </div>     
  );
}

export default Post;
