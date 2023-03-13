import React from "react";
import "../Contacts/contact.scss";

function Contact() {
  return (
    <div id="englishContact">
      <footer id="footer">
        <div className="container">
          <div className="footer-ribbon">
            <span>Still haven't found what you're looking for?</span>
          </div>
          <div className="row py-5 my-4">
            <div className="col-md-1">
              <img
                src="https://res.cloudinary.com/phongvn2611/image/upload/v1640440365/english/avatar/footer-logo_lkmeg5.png"
                alt=""
              />
            </div>

            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0"></div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <div className="contact-details"></div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <span className="flex-center" style={{ color: "#fffff5" }}>
                  © Copyright Learning English - 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
