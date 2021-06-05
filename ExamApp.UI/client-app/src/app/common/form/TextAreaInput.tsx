import React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, any> {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  rows,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <>
      <textarea
        rows={rows}
        {...input}
        placeholder={placeholder}
        className="form-control"
      />
      {touched && !!error && <span className="final-form-error">{error}</span>}
    </>
  );
};

export default TextAreaInput;
