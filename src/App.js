import { useState, useEffect } from "react";
import BusRoutes from "./components/BusRoutes";
import TramRoutes from "./components/TramRoutes";
import TrolleyRoutes from "./components/TrolleyRoutes";
import "./App.css";
import axios from "axios";

function App() {
  const [linii, setLinii] = useState([]);

  useEffect(() => {
    axios
      .get("https://lab.dekolor.ro/linii_stb.php")
      .then((response) => {
        console.log(response.data);
        setLinii(response.data.lines);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App container">
      <h1>Orar</h1>
      <hr />
      <div className="routes">
        <TramRoutes linii={linii.filter((linie) => linie.type === "TRAM")} />
        <TrolleyRoutes
          linii={linii.filter((linie) => linie.type === "CABLE_CAR")}
        />
        <BusRoutes linii={linii.filter((linie) => linie.type === "BUS")} />
      </div>
    </div>
  );
}

export default App;
