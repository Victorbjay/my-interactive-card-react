import React from "react";
import iconComplete from "../assets/images/icon-complete.svg";

function ThankYou({ onContinue }) {
  return (
    <div className="completed-state">
      <img src={iconComplete} alt="Checkmark Icon" />
      <h2>Thank You!</h2>
      <p>We've added your card details</p>
      <button className="submit-btn" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}

export default ThankYou;
