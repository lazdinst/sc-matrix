import React, { ReactElement } from 'react';

interface Unit {
  name: string;
  // Other possible fields related to unit can be added here, e.g., iconUrl, iconAlt, etc.
}

interface CardProps {
  imageUrl: string;
  imageAlt: string;
  headerText: string;
  units: Unit[];
}

const Card: React.FC<CardProps> = ({ imageUrl, imageAlt, headerText, units }): ReactElement => {
  return (
    <div className="card">
      <img src={imageUrl} alt={imageAlt} />
      <h3 className="card-header">{headerText}</h3>
      <div className="flex-row-column">
        {units &&
          units.map((unit, index) => (
            <div key={index}>
              <span>{unit.name}</span>
              <div className="icon-with-value">
                {/* 
                To include icons based on the Unit type:
                <img src={unit.iconUrl} alt={unit.iconAlt} /> 
                <span>{unit.value}</span> 
                */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Card;
