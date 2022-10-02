import React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, any> {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <>
      <input
        {...input}
        type={{ ...input }?.type}
        placeholder={placeholder}
        width={width}
        className="form-control"
      />
      {touched && !!error && <span className="final-form-error">{error}</span>}
    </>
  );
};

export default TextInput;
