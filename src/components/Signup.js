import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import Swal from "sweetalert2";

function Signup() {
  const [registerinfo, setRegisterinfo] = useState();
  const [tokon, setToken] = useState();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    let userinfo = Object.fromEntries(new FormData(target));

    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin123" }),
    };

    fetch(
      "http://157.245.96.72/testproject/wp-json/jwt-auth/v1/token",
      requestData
    )
      .then((response) => response.json())
      .then((data) => setToken(data))
      .catch((e) => console.log(e));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      Authorizatiocustomerinfon: tokon,
      body: JSON.stringify(userinfo),
    };
    fetch(
      "http://157.245.96.72/testproject/wp-json/wp/v2/users/register",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setRegisterinfo(data)

        Swal.fire({
          icon: 'success',
          title: registerinfo.message
        })

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userdata = JSON.parse(window.localStorage.getItem("customerinfo"));
  
  return (

    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            {userdata ? (
              <>
                Hello, {userdata['data'].user_login}
                <Link
                  onClick={(e) => {
                    window.localStorage.removeItem("customerinfo");
                    window.location.href = "/login";
                  }}
                >
                  {" "}
                  Logout
                </Link>
              </>
            ) : (
              <>
                <h1 className="font-weight-light">Sign up</h1>
                {registerinfo?.message ? registerinfo.message :
                <Form onSubmit={handleOnSubmit}>
                  <Form.Field>
                    <label>Username: </label>
                    <input
                      name="username"
                      placeholder="Username"
                      autocomplete="off"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email: </label>
                    <input
                      name="email"
                      placeholder="Email"
                      autocomplete="off"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password: </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="off"
                      required
                    />
                  </Form.Field>
                  <label></label>
                  <Button className="mt-2 btn btn-primary" type="submit">
                    Register
                  </Button>
                </Form>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
