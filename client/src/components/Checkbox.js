import React from "react";
import "../choix.css"

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="round">
    <input
      id="checkbox"
      type="checkbox"
      name={label}
      checked={isSelected}
      onChange={onCheckboxChange}
      className="form-check-input"
    />
    <label>
      <strong>
      {label}
      </strong>
    </label>
  </div>
);

export default Checkbox;