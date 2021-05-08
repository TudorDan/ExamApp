import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section id="supporters" className="section-with-bg mt-5">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Not found</h2>
        </div>

        <div
          className="row no-gutters supporters-wrap clearfix justify-content-center"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="col-12">
            <div className="supporter-logo">
              <img
                src="assets/img/supporters/notFound.png"
                className="img-fluid"
                alt="not found"
              ></img>
            </div>
          </div>
        </div>

        <Link to={"/"} className="d-flex justify-content-center">
          <button className="btn-2">Back</button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
