import React, { useContext, useEffect, useState } from "react";
import { TestFormValues } from "../../../app/models/test";
import { v4 as uuid } from "uuid";
import Loading from "../../../app/layout/Loading";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  title: isRequired({ message: "The exam title is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  category: isRequired("Category"),
  creation: isRequired("Creation"),
  time: isRequired("Time"),
});

interface DetailParams {
  id: string;
}

const TestForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { createTest, editTest, loadTest } = rootStore.testStore;

  const [test, setTest] = useState(new TestFormValues());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);

      loadTest(match.params.id)
        .then((test) => setTest(new TestFormValues(test)))
        .finally(() => setLoading(false));
    }
  }, [loadTest, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);
    const dateAndTime = combineDateAndTime(values.creation, values.time);
    const { creation, time, ...test } = values;
    test.creation = dateAndTime;
    if (!test.id) {
      let newTest = {
        ...test,
        id: uuid(),
      };
      createTest(newTest);
    } else {
      editTest(test);
    }
  };

  if (loading) return <Loading content="Loading form..." />;

  return (
    <section id="contact" className="section-bg mt-5">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          {match.params.id ? <h2>Edit Test</h2> : <h2>Create Test</h2>}

          <p>For registered examiners only</p>
        </div>

        <div className="form">
          <FinalForm
            validate={validate}
            initialValues={test}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
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
                    className="form-control"
                    name="description"
                    rows={5}
                    placeholder="Description"
                    value={test.description}
                    component={TextAreaInput}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <Field
                    component={SelectInput}
                    className="form-control"
                    name="category"
                    value={test.category}
                    options={category}
                  />
                </div>

                <div className="form-group mt-3 input-group">
                  <Field
                    id="date-input"
                    component={DateInput}
                    name="creation"
                    date={true}
                    className="form-control p-0"
                    placeholder="Creation"
                    value={test.creation}
                  />

                  <Field
                    id="time-input"
                    component={DateInput}
                    name="time"
                    time={true}
                    className="form-control p-0"
                    placeholder="Time"
                    value={test.time}
                  />
                </div>

                <div className="text-center mt-3">
                  <button
                    disabled={loading || invalid || pristine}
                    type="submit"
                    style={{ minHeight: "44px" }}
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{
                        display: submitting ? "block" : "none",
                        margin: "0 20px",
                      }}
                    ></span>
                    <span className={submitting ? "visually-hidden" : ""}>
                      Submit
                    </span>
                  </button>

                  <button
                    onClick={
                      test.id
                        ? () => history.push(`/tests/${test.id}`)
                        : () => history.push("/tests")
                    }
                    disabled={loading}
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
