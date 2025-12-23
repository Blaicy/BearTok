import React, { useState } from "react";

const Contact = () => {
  const base = import.meta.env.BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${base}images/Bg2.jpg)` }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Contact Beartok
        </h1>
        <p className="mt-4 text-lg text-black/75">
          We’d love to hear from you! Whether it’s a question, feedback, we’re always here.
        </p>

        {/* Contact Info */}
        <div className="mt-5 space-y-6 text-black">
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>support@beartok.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Phone</h2>
            <p>(555) 123-4567</p>
          </div>
          {/* <div>
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <p>Instagram: @beartok | TikTok: @beartok</p>
          </div> */}
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6 bg-white p-6 rounded-2xl shadow-lg"
        >
          <div>
            <label className="block mb-2 font-medium text-black">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 font-semibold text-black bg-amber-500 rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
