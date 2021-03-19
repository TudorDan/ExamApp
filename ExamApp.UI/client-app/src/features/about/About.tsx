import React from "react";

const About = () => {
  return (
    <section id="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6">
            <h2>About The Site</h2>
            <p>
              An individual project as a student for the last Codecool module,
              about a business worthy subject, using some of the current web
              development technologies.
            </p>
          </div>

          <div className="col-lg-3">
            <h3>Details</h3>
            <p>App where users can create their own multiple choice tests.</p>
          </div>

          <div className="col-lg-3">
            <h3>How</h3>
            <p>
              To start creating a test,
              <br />
              just register or login.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
