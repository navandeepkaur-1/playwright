import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedData(formData);
  }

  function handleReset() {
    setFormData(initialForm);
    setSubmittedData(null);
  }

  return (
    <main className="container">
      <h1> Welcome! </h1>
      <section className="card">
        <h1>Contact Form</h1>
        <p>Enter your details and submit the form.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="actions">
            <button type="submit">Submit</button>
            <button type="button" className="secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        {submittedData && (
          <section className="result" aria-label="submitted-data">
            <h2>Submitted Data</h2>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Phone:</strong> {submittedData.phone}</p>
            <p><strong>Message:</strong> {submittedData.message}</p>
          </section>
        )}
      </section>
    </main>
  );
}

export default App;