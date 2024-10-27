import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/api/v1/inquiries", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="container max-w-2xl p-4">
      <h1 className="text-2xl">Contact form for sending Email</h1>
      <form>
        <div className="flex flex-col">
          <label htmlFor="name" className="mt-2">
            Name
          </label>
          <input
            id="name"
            className="border border-solid border-gray-300 rounded-sm"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <input
            id="email"
            className="border border-solid border-gray-300 rounded-sm"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mt-2">
            Message
          </label>
          <textarea
            id="message"
            className="border border-solid border-gray-300 rounded-sm"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 text-white rounded-sm mt-4 px-4 py-2"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
