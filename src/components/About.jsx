import React from "react";

function About() {

  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://media.istockphoto.com/photos/about-us-word-and-idea-picture-id1144188586?k=20&m=1144188586&s=612x612&w=0&h=sW7l-zb8pg8HfcIFCLYxuvDsO3aIR-UMj9nehY8GghE="
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">About</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
