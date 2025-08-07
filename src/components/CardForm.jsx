import React from "react";

function CardForm({ formData, setFormData, errors, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Handle card number formatting
    if (name === "number") {
      finalValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }

    // Handle numeric-only fields with max length
    if (name === "month" || name === "year") {
      finalValue = value.replace(/\D/g, "").slice(0, 2);
    }
    if (name === "cvc") {
      finalValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  return (
    <form className="card-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Cardholder Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Jane Appleseed"
          className={errors.name ? "input-error" : ""}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="number">Card Number</label>
        <input
          type="text"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="e.g. 1234 5678 9123 0000"
          maxLength="19"
          className={errors.number ? "input-error" : ""}
          aria-invalid={!!errors.number}
        />
        {errors.number && <p className="error-message">{errors.number}</p>}
      </div>

      <div className="expiry-cvc-group">
        <div className="form-group">
          <label htmlFor="month">Exp. Date (MM/YY)</label>
          <div id="expiry-date-group">
            <input
              type="text" /* Use text to allow custom formatting and prevent steppers */
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="MM"
              className={errors.month ? "input-error" : ""}
              aria-invalid={!!errors.month}
            />
            <input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="YY"
              className={errors.year ? "input-error" : ""}
              aria-invalid={!!errors.year}
            />
          </div>
          {(errors.month || errors.year) && (
            <p className="error-message">{errors.month || errors.year}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="e.g. 123"
            maxLength="3"
            className={errors.cvc ? "input-error" : ""}
            aria-invalid={!!errors.cvc}
          />
          {errors.cvc && <p className="error-message">{errors.cvc}</p>}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Confirm
      </button>
    </form>
  );
}

export default CardForm;
