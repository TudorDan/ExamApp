import { AxiosResponse } from "axios";
import React from "react";

interface IProps {
  error: AxiosResponse;
  text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
  return (
    <div id="loading" className="mt-3">
      <div className="error-message py-0" style={{ display: "block" }}>
        {error.statusText}
      </div>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <ul className="error-message py-0" style={{ display: "block" }}>
          {Object.values(error.data.errors)
            .flat()
            .map((err: any, i) => (
              <li key={i} className="ms-3">
                {err}
              </li>
            ))}
        </ul>
      )}
      {text && (
        <div className="error-message pt-0" style={{ display: "block" }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
