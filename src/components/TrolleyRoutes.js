import { useState, useEffect } from "react";
import "../App.css";

function TrolleyRoutes(props) {
  const [linii, setLinii] = useState([]);

  useEffect(() => {
    setLinii(props.linii);
  }, [linii, props.linii]);

  const displayLines = linii.map((linie) => {
    return (
      <button
        onClick={() => {
          props.handleShow(linie);
        }}
        key={linie.id_linie}
        className="btn btn-success badgelinie"
      >
        {linie.nume}
      </button>
    );
  });

  return (
    <div className="card routes-card">
      <div className="card-header">Linii de troleibuz</div>
      <div className="card-body">{displayLines}</div>
    </div>
  );
}

export default TrolleyRoutes;
