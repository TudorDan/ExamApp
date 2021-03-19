import React from "react";
import { ITest } from "../../app/models/test";

interface IProps {
  tests: ITest[];
}

const TestList: React.FC<IProps> = ({ tests }) => {
  return (
    <section id="speakers">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Test Titles</h2>
          <p>Here are some of our tests</p>
        </div>

        <div className="row">
          {tests.map((test) => (
            <div key={test.id} className="col-lg-4 col-md-6">
              <div className="speaker" data-aos="fade-up" data-aos-delay="100">
                <img
                  src="assets/img/speakers/1.jpg"
                  alt="Speaker 1"
                  className="img-fluid"
                ></img>
                <div className="details">
                  <h3>
                    <a href="speaker-details.html">{test.title}</a>
                  </h3>
                  <p>{test.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestList;
