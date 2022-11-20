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
  const [filter, setFilter] = useState([true, true, true]);

  const handleFilterChange = (pos) => {
    //todo
    const updatedFilterState = filter.map((item, index) =>
      index !== pos ? !item : item
    );

    setFilter(updatedFilterState);
  };
  const handleClose = () => setShow(false);
  const handleShow = (liniealeasa) => {
    setLinieSelectata(liniealeasa);
    setShow(true);
  };

  const handleOrar = (linie) => {
    if (linie.organizatie_id === "1") {
      return (
        <>
          Vezi plecarile de la capatul:
          <div className="row">
            <div className="col">
              <a
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-danger"
                href={"https://stbsa.ro/ora_sta3/" + linie.nume + "%20Tur.pdf"}
              >
                {linie.capat_retur}
              </a>
            </div>
            <div className="col">
              <a
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-danger"
                href={
                  "https://stbsa.ro/ora_sta3/" + linie.nume + "%20Retur.pdf"
                }
              >
                {linie.capat_tur}
              </a>
              <div />
            </div>
          </div>
        </>
      );
    } else if (linie.organizatie_id === "35") {
      // STV
      return (
        <>
          <b className="obj">Vezi plecarile pe site-ul STV:</b>
          <div className="mx-auto" style={{ width: 200 }}>
            <a
              target={"_blank"}
              rel="noreferrer"
              className="btn btn-danger"
              href={"https://www.stvsa.ro/traseu-linia-" + linie.nume + "/"}
            >
              Programul liniei {linie.nume}
            </a>
          </div>
        </>
      );
    } else if (linie.organizatie_id === "36") {
      // STCM
      return (
        <>
          <b className="obj">Vezi plecarile pe site-ul STCM:</b>
          <div className="mx-auto" style={{ width: 200 }}>
            <a
              target={"_blank"}
              rel="noreferrer"
              className="btn btn-danger"
              href={"https://stcm.ro/program-r" + linie.nume + "/"}
            >
              Programul liniei {linie.nume}
            </a>
          </div>
        </>
      );
    } else {
      // default (Fallback pentru RegioServ care nu au site in 2022 💀)
      return (
        <>
          <b className="obj">Vezi plecarile pe aplicatia InfoTB:</b>
          <div className="mx-auto" style={{ width: 200 }}>
            <a
              target={"_blank"}
              rel="noreferrer"
              className="btn btn-danger"
              href={"https://info.stbsa.ro/traseu/" + linie.id_linie}
            >
              Programul liniei {linie.nume}
            </a>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    axios
      .get("https://stb.dekolor.ro/api/simplelines")
      .then((response) => {
        setLinii(response.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App container">
      <div className="d-flex justify-content-between">
        <div className="p-2">
          <h1>Transport Public Bucuresti</h1>
        </div>
        <div className="p-2">
          <a
            href="https://stbsa.ro/calatorii"
            target={"_blank"}
            rel="noreferrer"
            className="btn btn-info"
          >
            Informatii bilet
          </a>
        </div>
      </div>
      <hr />
      Filtre:
      <label>
        <input
          type="checkbox"
          checked={filter[0]}
          onChange={() => handleFilterChange(0)}
          id="btn-check"
          className="form-check-input filter"
        />
        Linii Tramvai
      </label>
      <label>
        <input
          type="checkbox"
          checked={filter[1]}
          onChange={() => handleFilterChange(1)}
          className="form-check-input filter"
        />
        Linii Troleibuz
      </label>
      <label>
        <input
          type="checkbox"
          checked={filter[2]}
          onChange={() => handleFilterChange(2)}
          className="form-check-input filter"
        />
        Linii Autobuz
      </label>
      <div className="routes">
        <TramRoutes
          render={filter[0]}
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.tip === "TRAM")}
        />
        <TrolleyRoutes
          render={filter[1]}
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.tip === "CABLE_CAR")}
        />
        <BusRoutes
          render={filter[2]}
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
