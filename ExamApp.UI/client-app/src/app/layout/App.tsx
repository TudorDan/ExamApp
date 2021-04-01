import { useEffect, useContext } from "react";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import TestList from "../../features/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/details/TestDetails";
import TestForm from "../../features/form/TestForm";
import Loading from "./Loading";
import TestStore from "../stores/testStore";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const testStore = useContext(TestStore);

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]);

  if (testStore.loadingInitial) return <Loading content="Loading Tests..." />;

  return (
    <>
      <NavBar />

      <Route exact path="/" component={Home} />

      <main id="main">
        <Route exact path="/tests" component={TestList} />

        <Route exact path="/tests/:id" component={TestDetails} />

        <Route
          key={location.key}
          exact
          path={["/createTest", "/manage/:id"]}
          component={TestForm}
        />
      </main>

      <Footer />
    </>
  );
};

export default withRouter(observer(App));
