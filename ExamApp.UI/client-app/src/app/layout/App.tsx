import React, { useState, useEffect } from "react";
import axios from "axios";
import { ITest } from "../models/test";
import NavBar from "../../features/nav/NavBar";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import TestList from "../../features/list/TestList";

const App = () => {
  const [tests, setTests] = useState<ITest[]>([]);

  useEffect(() => {
    axios.get<ITest[]>("http://localhost:34565/api/tests").then((response) => {
      setTests(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Home />

      <About />

      <main id="main">
        <TestList tests={tests} />
      </main>
    </>
  );
};

export default App;
