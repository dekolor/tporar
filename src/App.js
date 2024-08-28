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
  const [linieSelectata, setLinieSelectata] = useState([]);
  const [show, setShow] = useState(false);
  //const [filter, setFilter] = useState([true, true, true]);

  /*const handleFilterChange = (pos) => {
    //todo
    const updatedFilterState = filter.map((item, index) =>
      index !== pos ? !item : item
    );

    setFilter(updatedFilterState);
  };*/
  const handleClose = () => setShow(false);
  const handleShow = (liniealeasa) => {
    setLinieSelectata(liniealeasa);
    setShow(true);
  };

  const handleOrar = (linie) => {
    if (linie.organization?.id === "1") {
      return (
        <>
          Vezi plecarile de la capatul:
          <div className="row">
            <div className="col">
              <a
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-danger"
                href={"https://stbsa.ro/ora_sta3/" + linie.name + "%20Tur.pdf"}
              >
                1
              </a>
            </div>
            <div className="col">
              <a
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-danger"
                href={
                  "https://stbsa.ro/ora_sta3/" + linie.name + "%20Retur.pdf"
                }
              >
                2
              </a>
              <div />
            </div>
          </div>
        </>
      );
    } else if (linie.organization?.id === "35") {
      // STV
      return (
        <>
          <b className="obj">Vezi plecarile pe site-ul STV:</b>
          <div className="mx-auto" style={{ width: 200 }}>
            <a
              target={"_blank"}
              rel="noreferrer"
              className="btn btn-danger"
              href={"https://www.stvsa.ro/traseu-linia-" + linie.name + "/"}
            >
              Programul liniei {linie.nume}
            </a>
          </div>
        </>
      );
    } else if (linie.organization?.id === "36") {
      // STCM
      return (
        <>
          <b className="obj">Vezi plecarile pe site-ul STCM:</b>
          <div className="mx-auto" style={{ width: 200 }}>
            <a
              target={"_blank"}
              rel="noreferrer"
              className="btn btn-danger"
              href={"https://stcm.ro/program-r" + linie.name + "/"}
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
              href={"https://info.stbsa.ro/traseu/" + linie.id}
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
      .get("https://info.stbsa.ro/rp/api/lines")
      .then((response) => {
        setLinii(response.data.lines);
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
            href="https://www.stb.ro/tarife"
            target={"_blank"}
            rel="noreferrer"
            className="btn btn-info"
          >
            Informatii bilet
          </a>
        </div>
      </div>
      <hr />
      {/* Filtre:
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
      </label> */}
      <div className="routes">
        <TramRoutes
          render={true}
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.type === "TRAM")}
        />
        <TrolleyRoutes
          render={true}
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.type === "CABLE_CAR")}
        />
        <BusRoutes
          render={true}
          handleShow={handleShow}
          linii={linii.filter((linie) => linie.type === "BUS")}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Orar linie: {linieSelectata.name}</Modal.Title>
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
