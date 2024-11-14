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
  const [resultMessage, setResultMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error
  const [showMessage, setShowMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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

    setShowLoading(true);

    // If there are no errors, send the form data to the server
    try {
      // Send form data to the server
      const response = await axios.post("/api/v1/inquiries", formData);
      console.log("Server response:", response.data.message);
      setResultMessage(response.data.message);
      setMessageType("success");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Full server error:", error.response);
        console.error("Server error:", error.response.data.message);
        setResultMessage(error.response.data.message);
        setMessageType("error");
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
      } else {
        console.error("Error sending data to server:", error.message);
        setResultMessage("An unexpected error occurred. Please try again.");
        setMessageType("error");
      }
    } finally {
      setShowLoading(false);
    }
  }

  // Log validation errors to the console
  // useEffect(() => {
  //   if (errors) {
  //     console.log("Validation errors:", errors);
  //   }
  // }, [errors]);

  // Show the result message for 3 seconds
  useEffect(() => {
    if (resultMessage) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [resultMessage]);

  return (
    <>
      <div className="container relative max-w-2xl p-4">
        <div
          className={`py-2 px-4 rounded ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white message-box ${showMessage ? "show" : ""}`}
        >
          <p>{resultMessage}</p>
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
      <div
        role="status"
        className={`loading absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          showLoading ? "show" : ""
        }`}
      >
        <svg
          aria-hidden="true"
          className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className={`overlay absolute top-0 left-0 right-0 bottom-0 bg-gray-400 opacity-70 ${
          showLoading ? "show" : ""
        }`}
      ></div>
    </>
  );
};

export default ContactForm;
