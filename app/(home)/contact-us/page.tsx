"use client";

import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // TODO: Replace with real API call or email integration
  };

  return (
    <main className="flex-grow py-16 mt-16 bg-primary-foreground/5">
      <div className="container mx-auto px-4 max-w-screen-lg">
        {/* Heading */}
        <div className="text-start mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-theme-body text-lg md:text-xl max-w-2xl ">
            Have questions or want to work with us? Fill out the form below and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-secondary/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-secondary/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-secondary/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-secondary/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="Subject of your message"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-secondary/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-accent/90 text-accent-foreground font-bold py-3 px-8 rounded-xl text-base transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 mt-4 font-medium text-center">
              Thank you! Your message has been submitted.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
