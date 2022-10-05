import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";

const TestList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadTests, testsUnsorted, loadingInitial } = rootStore.testStore;

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  if (loadingInitial) return <Loading content="Loading Tests..." />;

  return (
    <section id="speakers" className="mt-5">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Test Titles</h2>
          <p>Here are some of our tests</p>
        </div>

        <div className="row">
          {testsUnsorted.map((test) => (
            <div key={test.id} className="col-lg-4 col-md-6">
              <div className="speaker" data-aos="fade-up" data-aos-delay="100">
                <img
                  src={`assets/img/speakers/${test.category}.jpg`}
                  alt="Speaker 1"
                  className="img-fluid"
                ></img>

                <div className="details">
                  <h3>
                    <Link to={`/tests/${test.id}`}>
                      {test.title.length > 30
                        ? test.title.substring(0, 30) + "..."
                        : test.title}
                    </Link>
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
