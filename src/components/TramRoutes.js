import { useState, useEffect } from "react";
import "../App.css";

function TramRoutes(props) {
  const [linii, setLinii] = useState([]);

  useEffect(() => {
    setLinii(props.linii);
  }, [linii, props.linii]);

  const displayLines = linii.map((linie) => {
    return (
      <button key={linie.id} className="btn btn-danger badgelinie">
        {linie.name}
      </button>
    );
  });

  return (
    <div className="card routes-card">
      <div className="card-header">Linii de tramvai</div>
      <div className="card-body">{displayLines}</div>
    </div>
  );
}

export default TramRoutes;
