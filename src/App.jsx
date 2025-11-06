import "./App.css";
import Header from "./components/Header";
import Boxes from "./components/Boxes";
import Main from "./components/Main";
import { useEffect, useState } from "react";
function App() {
  const [stats, setStats] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("stats")) || {
        sessions: 0,
        focus: 0,
        break: 0,
        tasks: 0,
        alreadyIn: [],
      }
    );
  });
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);
  return (
    <div>
      <Header></Header>
      <Boxes stats={stats}></Boxes>
      <Main statsSetter={setStats} stats={stats}></Main>
      <footer>
        <p>
          Designed by{" "}
          <a href="https://www.linkedin.com/in/samdanielraj/">Sam Daniel Raj</a>
          . Recreated by me
        </p>
      </footer>
    </div>
  );
}

export default App;
