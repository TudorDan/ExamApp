import React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, any> {}

const SelectInput: React.FC<IProps> = ({
  input,
  options,
  meta: { touched, error },
}) => {
  return (
    <>
      <select
        value={input.value}
        className="form-control"
        onChange={(e) => input.onChange(e.currentTarget.value)}
        required
      >
        {options.map((option: any) => {
          return (
            <option
              key={option.key}
              value={option.value}
              disabled={option.value === ""}
              defaultChecked={option.value === ""}
              hidden={option.value === ""}
            >
              {option.text}
            </option>
          );
        })}
      </select>
      {touched && !!error && <span>{error}</span>}
    </>
  );
};

export default SelectInput;
