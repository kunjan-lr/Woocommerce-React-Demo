import React from "react";
import emailjs from "emailjs-com";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

function Contact() {

  const SERVICE_ID = "service_3ao0h9o";
  const TEMPLATE_ID = "template_yt87o74";
  const USER_ID = "CG0Ll2K3BR8pGDQXU";
  const recaptchaRef = React.createRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
    e.target.reset()
  }

  return (
    <>
    <div className="contact">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://img.freepik.com/premium-photo/concept-contact-us-blank-wooden-cubes-square-dice-with-symbol-email-telephone-address-placed-wood-background_44868-1254.jpg"
              alt=""
            />
          </div>
          <div className="col-lg-5 contact-form">
            <h1 className="font-weight-light">Contact</h1>
            <Form onSubmit={handleOnSubmit}>
              <Form.Field
                id="form-input-control-email"
                control={Input}
                label="Email"
                name="user_email"
                placeholder="Email…"
                required
                icon="mail"
                iconPosition="left"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Name"
                name="user_name"
                placeholder="Name…"
                required
                icon="user circle"
                iconPosition="left"
              />
              <Form.Field
                id="form-textarea-control-opinion"
                control={TextArea}
                label="Message"
                name="user_message"
                placeholder="Message…"
                required
              />
              <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChange} />
              <Button type="submit" color="green" className="btn btn-primary">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contact;
