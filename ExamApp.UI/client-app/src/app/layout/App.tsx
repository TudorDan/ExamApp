import React, { useState, useEffect, useContext } from "react";
import { ITest } from "../models/test";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import TestList from "../../features/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/details/TestDetails";
import TestForm from "../../features/form/TestForm";
import agent from "../api/agent";
import Loading from "./Loading";
import TestStore from "../stores/testStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const testStore = useContext(TestStore);
  const [tests, setTests] = useState<ITest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ITest | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectTest = (id: string) => {
    setSelectedTest(tests.filter((t) => t.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedTest(null);
    setEditMode(true);
  };

  const handleCreateTest = (test: ITest) => {
    setSubmitting(true);
    agent.Tests.create(test)
      .then(() => {
        setTests([...tests, test]);
        setSelectedTest(test);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditTest = (test: ITest) => {
    setSubmitting(true);
    agent.Tests.update(test)
      .then(() => {
        setTests([...tests.filter((t) => t.id !== test.id), test]);
        setSelectedTest(test);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteTest = (id: string) => {
    setSubmitting(true);
    agent.Tests.delete(id)
      .then(() => {
        setTests([...tests.filter((t) => t.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    testStore.loadTests();
  }, [testStore]);

  if (testStore.loadingInitial) return <Loading content="Loading Exams..." />;

  if (submitting) return <Loading content="Loading..." />;

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />

      <Home />

      <main id="main">
        <About />

        <TestList tests={testStore.tests} selectTest={handleSelectTest} />

        {selectedTest && !editMode && (
          <TestDetails
            test={selectedTest}
            setEditMode={setEditMode}
            setSelectedTest={setSelectedTest}
            deleteTest={handleDeleteTest}
          />
        )}

        {editMode && (
          <TestForm
            key={selectedTest && (selectedTest.id || 0)}
            setEditMode={setEditMode}
            test={selectedTest!}
            createTest={handleCreateTest}
            editTest={handleEditTest}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default observer(App);
