// src/UserForm.js
import { useState } from "react";
import useForm from "../hooks/useForm";

const UserForm = () => {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");

  const { isSubmitting, submitted, error, errorMessage, submitForm } = useForm(
    "http://localhost:3000/api/registerAddress"
  );

  const resetForm = () => {
    setName("");
    setRegion("");
    setCity("");
    setState("");
    setCountry("");
    setPin("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, region, city, state, country, pin };
    submitForm(userData);
    if (!error) resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-slate-800 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Register User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <input
        type="text"
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="border border-slate-600 p-2 mb-4 w-full bg-slate-950"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {submitted && (
        <p className="text-green-500 mt-2">Address added successfully!</p>
      )}
      {error && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </form>
  );
};

export default UserForm;
