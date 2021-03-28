import React from "react";

const Loading: React.FC<{
  content?: string;
  errorMessage?: string;
  sentMessage?: string;
}> = ({ content, errorMessage, sentMessage }) => {
  return (
    <div id="loading" className="my-3">
      <div className="loading">{content}</div>
      {/* <div className="error-message">{errorMessage}</div>
      <div className="sent-message">{sentMessage}</div> */}
    </div>
  );
};

export default Loading;
