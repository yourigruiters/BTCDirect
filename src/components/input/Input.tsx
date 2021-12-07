import React from "react";
import "./Input.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <input
        className="input"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default Input;
