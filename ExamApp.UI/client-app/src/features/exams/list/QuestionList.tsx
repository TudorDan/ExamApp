import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const QuestionList: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadQuestions, questionsUnsorted, loadingInitial } =
    rootStore.questionStore;
  const { test, loadTest } = rootStore.testStore;

  useEffect(() => {
    loadQuestions(match.params.id);
    loadTest(match.params.id);
  }, [loadQuestions, match.params.id, loadTest]);

  if (loadingInitial) return <Loading content="Loading questions..." />;

  return (
    <section id="schedule" className="mt-5 section-with-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>{test?.title}</h2>

          <p>{test?.description}</p>
        </div>
        <h3 className="sub-heading">Duration: 45 minutes</h3>

        <div
          className="tab-content row justify-content-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="col-lg-9 tab-pane fade show active">
            {questionsUnsorted.length === 0 ? (
              <div className="row schedule-item">
                <h4>
                  No questions present in the current test. Please add some.
                </h4>
              </div>
            ) : (
              questionsUnsorted.map((question) => (
                <div key={question.id} className="row schedule-item">
                  <h4>{question.content}</h4>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`${question.id}1`}
                      readOnly
                      checked={question.correctAnswer === 1 ? true : false}
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor={`${question.id}1`}
                    >
                      {question.answer1}
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`${question.id}2`}
                      readOnly
                      checked={question.correctAnswer === 2 ? true : false}
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor={`${question.id}2`}
                    >
                      {question.answer2}
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`${question.id}3`}
                      readOnly
                      checked={question.correctAnswer === 3 ? true : false}
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor={`${question.id}3`}
                    >
                      {question.answer3}
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`${question.id}4`}
                      readOnly
                      checked={question.correctAnswer === 4 ? true : false}
                    ></input>
                    <label
                      className="form-check-label"
                      htmlFor={`${question.id}4`}
                    >
                      {question.answer4}
                    </label>
                  </div>
                </div>
              ))
            )}

            <div className="mt-5 text-center">
              <button
                onClick={() => history.push(`/tests/${test?.id}`)}
                className="btn-2"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(QuestionList);
