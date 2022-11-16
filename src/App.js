import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BusRoutes from "./components/BusRoutes";
import TramRoutes from "./components/TramRoutes";
import TrolleyRoutes from "./components/TrolleyRoutes";
import "./App.css";
import axios from "axios";

function App() {
  const [linii, setLinii] = useState([]);
  const [linieSelectata, setLinieSelectata] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (liniealeasa) => {
    setLinieSelectata(liniealeasa);
    setShow(true);
  };

  const handleOrar = (linie) => {
    if (linie.organizatie_id === "1") {
      return (
        <div className="row">
          <div className="col">
            <a
              target={"_blank"}
              className="btn btn-danger"
              href={"https://stbsa.ro/ora_sta3/" + linie.nume + "%20Tur.pdf"}
            >
              {linie.capat_retur}
            </a>
          </div>
          <div className="col">
            <a
              target={"_blank"}
              className="btn btn-danger"
              href={"https://stbsa.ro/ora_sta3/" + linie.nume + "%20Retur.pdf"}
            >
              {linie.capat_tur}
            </a>
            <div />
          </div>
        </div>
      );
    } else if (linie.organizatie_id === "35") {
      // STV
      return (
        <div className="mx-auto" style={{ width: 100 }}>
          <a
            target={"_blank"}
            className="btn btn-danger"
            href={"https://www.stvsa.ro/traseu-linia-" + linie.nume + "/"}
          >
            Programul liniei {linie.nume}
          </a>
        </div>
      );
    } else if (linie.organizatie_id === "36") {
      // STCM
      return (
        <div className="mx-auto" style={{ width: 100 }}>
          <a
            target={"_blank"}
            className="btn btn-danger"
            href={"https://stcm.ro/program-r" + linie.nume + "/"}
          >
            Programul liniei {linie.nume}
          </a>
        </div>
      );
    } else {
      // default (Fallback pentru RegioServ care nu au site in 2022 💀)
      return (
        <div className="mx-auto" style={{ width: 100 }}>
          <a
            target={"_blank"}
            className="btn btn-danger"
            href={"https://info.stbsa.ro/traseu/" + linie.id_linie}
          >
            Programul liniei {linie.nume}
          </a>
        </div>
      );
    }
  };

  useEffect(() => {
    axios
      .get("https://stb.dekolor.ro/api/simplelines")
      .then((response) => {
        console.log(response.data);
        setLinii(response.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App container">
      <h1>Orar</h1>
      <hr />
      <div className="routes">
        <TramRoutes
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.tip === "TRAM")}
        />
        <TrolleyRoutes
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.tip === "CABLE_CAR")}
        />
        <BusRoutes
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.tip === "BUS")}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Orar linie: {linieSelectata.nume}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{handleOrar(linieSelectata)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Inchide
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
