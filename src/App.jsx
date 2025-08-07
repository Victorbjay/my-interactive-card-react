import { useState } from "react";
import "./App.css";
import CardDisplay from "./components/CardDisplay";
import CardForm from "./components/CardForm";
import ThankYou from "./components/ThankYou";

function App() {
  const initialFormData = {
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  };

  // State for all form data
  const [formData, setFormData] = useState(initialFormData);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State to control which view is shown (form or thank you message)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // The complete validation logic
  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    // Name validation
    if (!formData.name) newErrors.name = "Can't be blank";

    // Card Number validation
    if (!formData.number) {
      newErrors.number = "Can't be blank";
    } else if (/[a-zA-Z]/.test(formData.number.replace(/\s/g, ""))) {
      newErrors.number = "Wrong format, numbers only";
    } else if (formData.number.replace(/\s/g, "").length !== 16) {
      newErrors.number = "Card number must be 16 digits";
    }

    // Expiry Month validation
    if (!formData.month) {
      newErrors.month = "Can't be blank";
    } else if (
      !/^\d{1,2}$/.test(formData.month) ||
      +formData.month < 1 ||
      +formData.month > 12
    ) {
      newErrors.month = "Invalid month";
    }

    // Expiry Year validation
    if (!formData.year) {
      newErrors.year = "Can't be blank";
    } else if (!/^\d{2}$/.test(formData.year)) {
      newErrors.year = "Invalid year";
    } else if (
      +formData.year < currentYear ||
      (+formData.year === currentYear && +formData.month < currentMonth)
    ) {
      newErrors.year = "Card has expired";
    }

    // CVC validation
    if (!formData.cvc) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d{3}$/.test(formData.cvc)) {
      newErrors.cvc = "Must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleContinue = () => {
    // Reset all state back to initial values
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <main className="main-container">
      <CardDisplay formData={formData} />
      <div className="form-container">
        {isSubmitted ? (
          <ThankYou onContinue={handleContinue} />
        ) : (
          <CardForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </main>
  );
}

export default App;
