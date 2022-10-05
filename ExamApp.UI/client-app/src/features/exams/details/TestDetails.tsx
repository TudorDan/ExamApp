import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../../../app/layout/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const TestDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { test, deleteTest, submitting, loadTest, loadingInitial } =
    rootStore.testStore;

  useEffect(() => {
    loadTest(match.params.id);
  }, [loadTest, match.params.id]);

  if (loadingInitial) return <Loading content="Loading test..." />;

  if (submitting) return <Loading content="Deleting test..." />;

  if (!test) return <h2>Not Found</h2>;

  return (
    <section id="speakers-details" className="mt-5">
      <div className="container">
        <div className="section-header">
          <h2>Test Details</h2>

          <p>For registered users only.</p>
        </div>

        <div className="row" id="test">
          <div
            className="col-md-6 test-info"
            style={{
              background: `url(${process.env.PUBLIC_URL}/assets/img/speakers/${test.category}.jpg)`,
            }}
          >
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8 position-relative">
                <h3>{test!.category}</h3>

                <a href="/" className="about-btn scrollto">
                  Take the test
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="details">
              <h2>{test!.title}</h2>

              <p>
                <i className="bi bi-signpost"></i>&nbsp;&nbsp;Author..
              </p>

              <p>
                <i className="bi bi-signpost"></i>&nbsp;&nbsp;
                {format(test!.creation, "y eeee do MMM h:mm a")}
              </p>

              <p>
                <i className="bi bi-signpost"></i>&nbsp;&nbsp;
                {test!.description}
              </p>

              <div className="social d-flex mt-5 justify-content-around">
                <Link to={`/manage/${test.id}`}>
                  <button className="btn-2">Edit</button>
                </Link>

                <button
                  onClick={() => {
                    deleteTest(test!.id);
                    history.push("/tests");
                  }}
                  className="btn-2"
                >
                  Delete
                </button>

                <button
                  onClick={() => history.push("/tests")}
                  className="btn-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(TestDetails);
