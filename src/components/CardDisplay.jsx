import React from "react";
import cardLogo from "../assets/images/card-logo.svg";
import cardFrontBg from "../assets/images/bg-card-front.png";
import cardBackBg from "../assets/images/bg-card-back.png";

function CardDisplay({ formData }) {
  return (
    <div className="card-display">
      <div
        className="card card-back"
        style={{ backgroundImage: `url(${cardBackBg})` }}
      >
        <span className="card-cvc">{formData.cvc || "000"}</span>
      </div>
      <div
        className="card card-front"
        style={{ backgroundImage: `url(${cardFrontBg})` }}
      >
        <img src={cardLogo} alt="Card Logo" className="card-logo" />
        <div className="card-number">
          {formData.number || "0000 0000 0000 0000"}
        </div>
        <div className="card-details">
          <span className="card-holder-name">
            {formData.name || "Jane Appleseed"}
          </span>
          <span className="card-expiry-date">
            <span className="exp-month">{formData.month || "00"}</span>/
            <span className="exp-year">{formData.year || "00"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardDisplay;
