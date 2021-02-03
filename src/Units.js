import React from "react";

import minerals from "./images/minerals.gif";
import vespene from "./images/vespene.gif";

const Unit = (props) => {
  const { unit } = props;
  const { name, mins, gas } = unit;
  console.log(unit);

  return (
    <div className="unit-list-item">
      <div>{name}</div>
      <div>
        <img alt="minerals" src={minerals} /> {mins}
      </div>
      <div>
        <img alt="gas" src={vespene} /> {gas}
      </div>
    </div>
  );
};

const Units = ({ units }) => {
  return (
    <div className="unit-list">
      {units.map((unit) => (
        <Unit unit={unit} />
      ))}
    </div>
  );
};

export default Units;
