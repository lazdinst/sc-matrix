import React from 'react';

export default function Card({ imageUrl, imageAlt, headerText, units }) {
  return (
    <div className="card">
      <img src={imageUrl} alt={imageAlt} />
      <h3 className="card-header">{headerText}</h3>
      <div className="flex-row-column">
        {units && units.map((unit, index) => (
          <div key={index}>
            <span>{unit.name}</span>
            <div className="icon-with-value">
              {/* <img src={iconUrl} alt={row.iconAlt} /> */}
              {/* <span>{row.}</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}