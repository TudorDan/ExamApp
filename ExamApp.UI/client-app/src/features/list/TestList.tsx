import { observer } from "mobx-react-lite";
import React from "react";
import { ITest } from "../../app/models/test";

interface IProps {
  tests: ITest[];
  selectTest: (id: string) => void;
}

const TestList: React.FC<IProps> = ({ tests, selectTest }) => {
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
                  src="assets/img/speakers/7.jpg"
                  alt="Speaker 1"
                  className="img-fluid"
                ></img>

                <div className="details">
                  <h3>
                    <button onClick={() => selectTest(test.id)}>
                      {test.title.length > 30
                        ? test.title.substring(0, 30) + "..."
                        : test.title}
                    </button>
                  </h3>

                  <p>
                    {test.description.length > 30
                      ? test.description.substring(0, 30) + "..."
                      : test.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default observer(TestList);
