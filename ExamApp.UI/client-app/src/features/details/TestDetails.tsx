import React from "react";
import { ITest } from "../../app/models/test";

interface IProps {
  test: ITest;
}

const TestDetails: React.FC<IProps> = ({ test }) => {
  return (
    <section id="speakers-details">
      <div className="container">
        <div className="section-header">
          <h2>Test Details</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="row" id="test">
          <div className="col-md-6 test-info">
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8 position-relative">
                <h3>Category...</h3>

                <a href="/" className="about-btn scrollto">
                  Take the test
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="details">
              <h2>{test.title}</h2>

              <p>
                <i className="bi bi-signpost"></i>&nbsp;&nbsp;Author..
              </p>

              <p>
                <i className="bi bi-signpost"></i>&nbsp;&nbsp;
                {test.description}
              </p>

              <div className="social d-flex justify-content-around mt-5">
                <button className="btn-2">Edit</button>
                <button className="btn-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDetails;
