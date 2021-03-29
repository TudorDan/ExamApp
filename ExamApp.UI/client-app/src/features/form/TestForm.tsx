import React, { FormEvent, useContext, useState } from "react";
import { ITest } from "../../app/models/test";
import { v4 as uuid } from "uuid";
import TestStore from "../../app/stores/testStore";
import Loading from "../../app/layout/Loading";
import { observer } from "mobx-react-lite";

interface IProps {
  test: ITest;
}

const TestForm: React.FC<IProps> = ({ test: initialFormState }) => {
  const testStore = useContext(TestStore);
  const { createTest, editTest, submitting, cancelFormOpen } = testStore;

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
      };
    }
  };

  const [test, setTest] = useState<ITest>(initializeForm);

  const handleSubmit = (event: any) => {
    if (test.id.length === 0) {
      let newTest = {
        ...test,
        id: uuid(),
      };
      createTest(newTest);
    } else {
      editTest(test);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTest({ ...test, [name]: value });
  };

  if (submitting) return <Loading content="Loading form..." />;

  return (
    <section id="contact" className="section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Create Test</h2>

          <p>For registered examiners only.</p>
        </div>

        <div className="form">
          <form onSubmit={handleSubmit} className="php-email-form">
            <div className="form-group mt-3">
              <input
                onChange={handleInputChange}
                type="text"
                className="form-control"
                name="title"
                id="title"
                placeholder="Title"
                value={test.title}
                required
              />
            </div>

            <div className="form-group mt-3">
              <textarea
                onChange={handleInputChange}
                className="form-control"
                name="description"
                rows={5}
                placeholder="Description"
                value={test.description}
                required
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

              <button onClick={cancelFormOpen} type="button" className="btn-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default observer(TestForm);
