import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import "react-widgets/dist/css/react-widgets.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./app/layout/ScrollToTop";
import dateFnsLocalizer from "react-widgets-date-fns";

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
