import React, { useState } from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps<string, any> {}

const SelectInput: React.FC<IProps> = ({
  input,
  options,
  meta: { touched, error },
}) => {
  const [touch, setTouch] = useState(false);

  return (
    <>
      <select
        value={input.value}
        id="select-input"
        className="form-control"
        onChange={(e) => input.onChange(e.currentTarget.value)}
        onFocusCapture={() => setTouch(true)}
      >
        {options.map((option: any) => {
          return (
            <option
              key={option.key}
              value={option.value}
              disabled={option.value === ""}
              defaultChecked={option.value === ""}
              hidden={option.value === ""}
              className="final-form-option"
            >
              {option.text}
            </option>
          );
        })}
      </select>
      {(touch || touched) && error && (
        <span className="final-form-error">{error}</span>
      )}
    </>
  );
};

export default SelectInput;
