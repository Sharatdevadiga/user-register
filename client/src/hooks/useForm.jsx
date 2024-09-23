// src/useForm.js
import { useState } from "react";

const useForm = (url) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (formData) => {
    setIsSubmitting(true);
    setError(false);
    setErrorMessage("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log(result);
      setSubmitted(true);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitted, error, errorMessage, submitForm };
};

export default useForm;
