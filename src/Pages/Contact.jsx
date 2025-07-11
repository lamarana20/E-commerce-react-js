import React, { useState } from "react";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(form.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "", phone: "" });

      toast.success("🎉 Thanks for reaching out! We'll get back to you soon!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  submitted && setTimeout(() => setSubmitted(false), 5000);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
      <p className="text-center text-gray-600 mb-10">
        Have a question or need help with your order? Fill out the form below and we'll get back to you soon.
      </p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
          ✅ Thank you for reaching out! Our marketing team will be in touch with you shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Phone</label>
          <PhoneInput
            defaultCountry="US"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(value) => setForm({ ...form, phone: value })}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded p-2"
          ></textarea>
          {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
