import { useState, useEffect } from "react";
import "../App.css";

function TrolleyRoutes(props) {
  const [linii, setLinii] = useState([]);

  useEffect(() => {
    setLinii(props.linii);
  }, [linii, props.linii]);

  const displayLines = linii.map((linie) => {
    return (
      <button key={linie.id} className="btn btn-success badgelinie">
        {linie.name}
      </button>
    );
  });

  return (
    <div className="card routes-card">
      <div className="card-header">Trolley Routes</div>
      <div className="card-body">{displayLines}</div>
    </div>
  );
}

export default TrolleyRoutes;
