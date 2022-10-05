import { FORM_ERROR } from "final-form";
import { useRef } from "react";
import { useContext } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const validate = combineValidators({
  userName: isRequired("username"),
  displayName: isRequired("display name"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    if (closeModalRef.current !== null) {
      closeModalRef.current.click();
    }
  };

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
        submitSucceeded,
      }) => (
        <div id="register-modal" className="modal fade">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Register to Exams</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeModalRef}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <Field
                      name="userName"
                      placeholder="User Name"
                      component={TextInput}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <Field
                      name="displayName"
                      placeholder="Display Name"
                      component={TextInput}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <Field
                      name="email"
                      placeholder="Email"
                      component={TextInput}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <Field
                      name="password"
                      placeholder="Password"
                      type="password"
                      component={TextInput}
                    />
                  </div>

                  {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage error={submitError} />
                  )}
                  {submitSucceeded && closeModal()}
                  <div className="text-center mt-3">
                    <button
                      disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                      type="submit"
                      className="btn"
                    >
                      Login
                    </button>
                  </div>
                  <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default RegisterForm;
