import React from 'react';

const RaceList = (props) => {
  const { race, units } = props;

  return (
    <div>
      <div className="unit-list">
        {units.map((unit, idx) => (
          <div key={`${unit}${idx}`} className="unit">
            {unit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceList;
