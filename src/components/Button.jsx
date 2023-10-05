import React from 'react';

export default function Button(props) {
  return (
    <button className={`button-sc ${props.theme}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
}