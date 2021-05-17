import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ITest } from "../../../app/models/test";
import { v4 as uuid } from "uuid";
import TestStore from "../../../app/stores/testStore";
import Loading from "../../../app/layout/Loading";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";

interface DetailParams {
  id: string;
}

const TestForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const testStore = useContext(TestStore);
  const {
    createTest,
    editTest,
    submitting,
    test: initialFormState,
    loadTest,
    clearTest,
  } = testStore;

  const [test, setTest] = useState<ITest>({
    id: "",
    title: "",
    description: "",
    category: "",
    creation: "",
  });

  useEffect(() => {
    if (match.params.id && test.id.length === 0) {
      loadTest(match.params.id).then(
        () => initialFormState && setTest(initialFormState)
      );
    }
    return () => {
      clearTest();
    };
  }, [test.id.length, loadTest, match.params.id, initialFormState, clearTest]);

  // const handleSubmit = (event: any) => {
  //   if (test.id.length === 0) {
  //     let newTest = {
  //       ...test,
  //       id: uuid(),
  //     };
  //     createTest(newTest).then(() => history.push(`/tests/${newTest.id}`));
  //   } else {
  //     editTest(test).then(() => history.push(`/tests/${test.id}`));
  //   }
  // };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTest({ ...test, [name]: value });
  };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  if (submitting) return <Loading content="Loading form..." />;

  return (
    <section id="contact" className="section-bg mt-5">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          {match.params.id ? <h2>Edit Test</h2> : <h2>Create Test</h2>}

          <p>For registered examiners only</p>
        </div>

        <div className="form">
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="php-email-form">
                <div className="form-group mt-3">
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={test.title}
                    component={TextInput}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <Field
                    onChange={handleInputChange}
                    className="form-control"
                    name="description"
                    rows={5}
                    placeholder="Description"
                    value={test.description}
                    component="textarea"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <Field
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder="Category"
                    value={test.category}
                    component="input"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <input
                    name="date"
                    type="datetime-local"
                    className="form-control"
                    placeholder="Date"
                    value={test.creation}
                  />
                </div>

                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your test has been created. Thank you!
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit">Submit</button>

                  <button
                    onClick={() => history.push("/tests")}
                    type="button"
                    className="btn-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default observer(TestForm);
