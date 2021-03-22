import React, { useState, useEffect } from "react";
import axios from "axios";
import { ITest } from "../models/test";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import TestList from "../../features/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/details/TestDetails";
import TestForm from "../../features/form/TestForm";

const App = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ITest | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectTest = (id: string) => {
    setSelectedTest(tests.filter((t) => t.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedTest(null);
    setEditMode(true);
  };

  const handleCreateTest = (test: ITest) => {
    setTests([...tests, test]);
  };

  const handleEditTest = (test: ITest) => {
    setTests([...tests.filter((t) => t.id !== test.id), test]);
  };

  useEffect(() => {
    axios.get<ITest[]>("http://localhost:34565/api/tests").then((response) => {
      setTests(response.data);
    });
  }, []);

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />

      <Home />

      <main id="main">
        <About />

        <TestList tests={tests} selectTest={handleSelectTest} />

        {selectedTest && !editMode && (
          <TestDetails
            test={selectedTest}
            setEditMode={setEditMode}
            setSelectedTest={setSelectedTest}
          />
        )}

        {editMode && (
          <TestForm
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

export default App;
