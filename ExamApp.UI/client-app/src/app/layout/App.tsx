import { useEffect, useContext } from "react";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import TestList from "../../features/exams/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/exams/details/TestDetails";
import TestForm from "../../features/exams/form/TestForm";
import Loading from "./Loading";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import QuestionList from "../../features/exams/list/QuestionList";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <Loading content="Loading App..." />;

  return (
    <>
      <ToastContainer position="bottom-right" />
      <NavBar />

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/tests" component={TestList} />

        <Route exact path="/tests/:id" component={TestDetails} />

        <Route
          key={location.key}
          exact
          path={["/createTest", "/manage/:id"]}
          component={TestForm}
        />

        <Route exact path="/questions/:id" component={QuestionList} />

        <Route component={NotFound} />
      </Switch>

      <Footer />
    </>
  );
};

export default withRouter(observer(App));
