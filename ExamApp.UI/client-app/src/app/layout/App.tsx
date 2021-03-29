import { useEffect, useContext } from "react";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import TestList from "../../features/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/details/TestDetails";
import TestForm from "../../features/form/TestForm";
import Loading from "./Loading";
import TestStore from "../stores/testStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const testStore = useContext(TestStore);
  const { editMode, selectedTest } = testStore;

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]);

  if (testStore.loadingInitial) return <Loading content="Loading Tests..." />;

  return (
    <>
      <NavBar />

      <Home />

      <main id="main">
        <About />

        <TestList />

        {selectedTest && !editMode && <TestDetails />}

        {editMode && (
          <TestForm
            key={selectedTest && (selectedTest.id || 0)}
            test={selectedTest!}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default observer(App);
