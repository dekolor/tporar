import { useState, useEffect } from "react";
import "../App.css";

function BusRoutes(props) {
  const [linii, setLinii] = useState([]);

  useEffect(() => {
    setLinii(props.linii);
  }, [linii, props.linii]);

  const displayLines = linii.map((linie) => {
    // if (
    //   Number(linie.name.replace(/\D/g, "")) > 399 &&
    //   Number(linie.name.replace(/\D/g, "")) < 500
    // ) {
    //   //regionale
    //   return (
    //     <button key={linie.id} className="btn btn-info badgelinie">
    //       {linie.name}
    //     </button>
    //   );
    // } else if (linie.name[0] == "N") {
    //   //linii de noapte
    //   return (
    //     <button key={linie.id} className="btn btn-dark badgelinie">
    //       {linie.name}
    //     </button>
    //   );
    // } else if (
    //   Number(linie.name.replace(/\D/g, "")) > 599 &&
    //   Number(linie.name.replace(/\D/g, "")) < 700
    // ) {
    //   //temporare
    //   return (
    //     <button key={linie.id} className="btn btn-danger badgelinie">
    //       {linie.name}
    //     </button>
    //   );
    // } else if (
    //   Number(linie.name.replace(/\D/g, "")) > 699 &&
    //   Number(linie.name.replace(/\D/g, "")) < 800
    // ) {
    //   //express
    //   return (
    //     <button key={linie.id} className="btn btn-warning badgelinie">
    //       {linie.name}
    //     </button>
    //   );
    // } else {
    //   return (
    //     <button key={linie.id} className="btn btn-primary badgelinie">
    //       {linie.name}
    //     </button>
    //   );
    // }

    return (
      <button
        key={linie.id}
        className="btn btn-primary badgelinie"
        style={{ background: linie.color, borderColor: linie.color }}
      >
        {linie.name}
      </button>
    );
  });

  return (
    <div className="card routes-card">
      <div className="card-header">Linii de autobuz</div>
      <div className="card-body">{displayLines}</div>
    </div>
  );
}

export default BusRoutes;
