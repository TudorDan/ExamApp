import React from "react";
import About from "../about/About";

const Home = () => {
  return (
    <>
      <section id="hero">
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
          <h1 className="mb-4 pb-0">
            Suitable
            <br />
            <span>Diverse</span> Tests
          </h1>

          <p className="mb-4 pb-0">Brevity is the soul of wit.</p>
        </div>
      </section>

      <About />
    </>
  );
};

export default Home;
