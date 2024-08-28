import { useState, useEffect } from "react";
import "../App.css";

function BusRoutes(props) {
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
        key={linie.id}
        className="btn btn-primary badgelinie"
        style={{ background: linie.color, borderColor: linie.color }}
      >
        {linie.name}
      </button>
    );
  });

  if (props.render) {
    return (
      <div className="card routes-card">
        <div className="card-header">Linii de autobuz</div>
        <div className="card-body">{displayLines}</div>
      </div>
    );
  }
}

export default BusRoutes;
