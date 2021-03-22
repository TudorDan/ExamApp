import React, { useState, useEffect } from "react";
import axios from "axios";
import { ITest } from "../models/test";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import TestList from "../../features/list/TestList";
import Footer from "../../features/footer/Footer";
import TestDetails from "../../features/details/TestDetails";

const App = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ITest | null>(null);

  const handleSelectTest = (id: string) => {
    setSelectedTest(tests.filter((t) => t.id === id)[0]);
  };

  useEffect(() => {
    axios.get<ITest[]>("http://localhost:34565/api/tests").then((response) => {
      setTests(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Home />

      <main id="main">
        <About />

        <TestList tests={tests} selectTest={handleSelectTest} />

        {selectedTest && <TestDetails test={selectedTest} />}
      </main>

      <Footer />
    </>
  );
};

export default App;
