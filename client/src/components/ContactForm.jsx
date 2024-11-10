import React, { useState, useEffect } from "react";
import axios from "axios";
import validationMessages from "../validation/validationMessages";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Validate each field based on the field name
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return !value.trim() ? validationMessages.nameRequired : "";
      case "email":
        if (!value.trim()) return validationMessages.emailRequired;
        if (!/\S+@\S+\.\S+/.test(value)) return validationMessages.emailInvalid;
        return "";
      case "message":
        return !value.trim() ? validationMessages.messageRequired : "";
      default:
        return "";
    }
  };

  // Handle form field changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    setErrors({ ...errors, [name]: validateField(name, value) });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields before submitting the form
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    // If there are errors, set errors and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If there are no errors, send the form data to the server
    try {
      // Send form data to the server
      await axios.post("/api/v1/inquiries", formData);

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error.response) {
        // Handle validation error messages
        const errorMessages = error.response.data.errors.reduce((acc, curr) => {
          if (
            curr.path === "email" &&
            curr.msg === "Please enter a valid email"
          ) {
            acc.email = formData.email
              ? curr.msg
              : validationMessages.emailRequired;
          } else {
            acc[curr.path] = curr.msg;
          }
          return acc;
        }, {});
        setErrors(errorMessages);
      }
    }
  }

  // Log validation errors to the console
  // useEffect(() => {
  //   if (errors) {
  //     console.log("Validation errors:", errors);
  //   }
  // }, [errors]);

  return (
    <div className="container relative max-w-2xl p-4">
      <div className="absolute left-1/2 -translate-x-1/2 py-2 px-4 rounded bg-green-500 text-white">
        <p>Message</p>
      </div>
      <h1 className="text-2xl">Contact form for sending Email</h1>
      <form>
        <div className="flex flex-col">
          <label htmlFor="name" className="mt-2">
            Name
          </label>
          <input
            id="name"
            className="py-1 px-2 border border-solid border-gray-300 rounded-sm"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mt-2">
            Email
          </label>
          <input
            id="email"
            className="py-1 px-2 border border-solid border-gray-300 rounded-sm"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="mt-2">
            Message
          </label>
          <textarea
            id="message"
            className="py-1 px-2 border border-solid border-gray-300 rounded-sm"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className="text-red-500">{errors.message}</p>}
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
