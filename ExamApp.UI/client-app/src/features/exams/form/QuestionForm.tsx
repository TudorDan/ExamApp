import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Loading from "../../../app/layout/Loading";
import { QuestionFormValues } from "../../../app/models/question";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../../app/common/form/TextInput";

const validate = combineValidators({
  content: isRequired({ message: "Question content is required" }),
  answer1: isRequired("Answer 1"),
  answer2: isRequired("Answer 2"),
  answer3: isRequired("Answer3"),
  answer4: isRequired("Answer4"),
  correctAnswer: isRequired("Correct Answer"),
});

interface DetailParams {
  id: string;
}

const QuestionForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createQuestion,
    editQuestion,
    loadQuestions,
    deleteQuestion,
    questionsUnsorted,
    loadingInitial,
    submitting,
  } = rootStore.questionStore;
  const { test, loadTest } = rootStore.testStore;

  const [questionId, setQuestionId] = useState("");

  useEffect(() => {
    loadQuestions(match.params.id);
    loadTest(match.params.id);
  }, [loadQuestions, match.params.id, loadTest]);

  const handleFinalFormSubmit = (values: QuestionFormValues) => {
    const { correctAnswer } = values;
    values.correctAnswer = Number(correctAnswer);
    if (!values.id) {
      setQuestionId("create");
      let newQuestion = { ...values, id: uuid(), testId: test?.id! };
      createQuestion(newQuestion);
    } else {
      setQuestionId(values.id);
      let existingQuestion = { ...values, id: values.id!, testId: test?.id! };
      editQuestion(existingQuestion);
    }
  };

  if (loadingInitial) return <Loading content="Loading form..." />;

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
              <FinalForm
                validate={validate}
                onSubmit={handleFinalFormSubmit}
                render={({ handleSubmit, invalid, pristine }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="php-email-form question-form mt-3"
                  >
                    <div className="form-group mt-3">
                      <Field
                        type="text"
                        name="content"
                        id="content"
                        placeholder="Question Content"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <Field
                        type="text"
                        name="answer1"
                        placeholder="Answer1"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <Field
                        type="text"
                        name="answer2"
                        placeholder="Answer2"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <Field
                        type="text"
                        name="answer3"
                        placeholder="Answer3"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <Field
                        type="text"
                        name="answer4"
                        placeholder="Answer4"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <Field
                        type="number"
                        name="correctAnswer"
                        placeholder="Correct Answer"
                        component={TextInput}
                        required
                      />
                    </div>

                    <div className="text-center mt-3 mb-2">
                      <button
                        disabled={invalid || pristine}
                        type="submit"
                        className="btn-2"
                      >
                        Submit
                      </button>

                      <button
                        onClick={() => history.push(`/tests/${test?.id}`)}
                        type="button"
                        className="btn-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              />
            ) : (
              questionsUnsorted.map((question) => (
                <FinalForm
                  key={question.id}
                  validate={validate}
                  initialValues={question}
                  onSubmit={handleFinalFormSubmit}
                  render={({ handleSubmit, invalid, pristine }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="php-email-form question-form mt-3"
                    >
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="content"
                          id="content"
                          placeholder="Question Content"
                          component={TextInput}
                          value={question.content}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer1"
                          placeholder="Answer1"
                          component={TextInput}
                          value={question.answer1}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer2"
                          placeholder="Answer2"
                          component={TextInput}
                          value={question.answer2}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer3"
                          placeholder="Answer3"
                          component={TextInput}
                          value={question.answer3}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer4"
                          placeholder="Answer4"
                          component={TextInput}
                          value={question.answer4}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="number"
                          name="correctAnswer"
                          placeholder="Correct Answer"
                          component={TextInput}
                          value={question.correctAnswer}
                          required
                        />
                      </div>

                      <div className="text-center mt-3 mb-2">
                        <button
                          disabled={invalid || pristine}
                          type="submit"
                          className="btn-2"
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                            style={{
                              display:
                                submitting && question.id === questionId
                                  ? "block"
                                  : "none",
                              margin: "0 20px",
                            }}
                          ></span>
                          <span
                            className={
                              submitting && question.id === questionId
                                ? "visually-hidden"
                                : ""
                            }
                          >
                            Edit
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setQuestionId(`d${question.id}`);
                            deleteQuestion(question.id);
                            history.push(
                              `/questions/create/${question.testId}`
                            );
                          }}
                          type="button"
                          className="btn-2"
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                            style={{
                              display:
                                submitting && questionId === `d${question.id}`
                                  ? "block"
                                  : "none",
                              margin: "0 20px",
                            }}
                          ></span>
                          <span
                            className={
                              submitting && questionId === `d${question.id}`
                                ? "visually-hidden"
                                : ""
                            }
                          >
                            Delete
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                />
              ))
            )}

            {questionsUnsorted.length === 0 ? (
              ""
            ) : (
              <>
                <FinalForm
                  validate={validate}
                  onSubmit={handleFinalFormSubmit}
                  initialValues={null}
                  keepDirtyOnReinitialize={false}
                  render={({ handleSubmit, invalid, pristine }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="php-email-form question-form mt-3"
                    >
                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="content"
                          id="content"
                          placeholder="Question Content"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer1"
                          placeholder="Answer1"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer2"
                          placeholder="Answer2"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer3"
                          placeholder="Answer3"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="text"
                          name="answer4"
                          placeholder="Answer4"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="form-group mt-3">
                        <Field
                          type="number"
                          name="correctAnswer"
                          placeholder="Correct Answer"
                          component={TextInput}
                          required
                        />
                      </div>

                      <div className="text-center mt-3 mb-2">
                        <button
                          disabled={invalid || pristine}
                          type="submit"
                          className="btn-2"
                        >
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                            style={{
                              display:
                                submitting && questionId === "create"
                                  ? "block"
                                  : "none",
                              margin: "0 20px",
                            }}
                          ></span>
                          <span
                            className={
                              submitting && questionId === "create"
                                ? "visually-hidden"
                                : ""
                            }
                          >
                            Submit
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                />

                <div className="mt-5 text-center">
                  <button
                    onClick={() => history.push(`/tests/${test?.id}`)}
                    type="button"
                    className="btn-2"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(QuestionForm);
