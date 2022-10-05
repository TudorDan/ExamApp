import React from "react";
import useWindowDimensions from "./useWindowDimensions";

const Loading: React.FC<{
  content?: string;
  errorMessage?: string;
  sentMessage?: string;
}> = ({ content, errorMessage, sentMessage }) => {
  const { height } = useWindowDimensions();

  return (
    <div id="loading" className="my-5" style={{ minHeight: height - 60 - 480 }}>
      <div className="loading" style={{ display: content ? "block" : "none" }}>
        {content}
      </div>
      <div
        className="error-message"
        style={{ display: errorMessage ? "block" : "none" }}
      >
        {errorMessage}
      </div>
      <div
        className="sent-message"
        style={{ display: sentMessage ? "block" : "none" }}
      >
        {sentMessage}
      </div>
    </div>
  );
};

export default Loading;
