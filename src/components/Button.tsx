import React, { ReactElement, MouseEventHandler } from 'react';

interface ButtonProps {
  theme: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ theme, onClick, label }): ReactElement => {
  return (
    <button className={`button-sc ${theme}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
