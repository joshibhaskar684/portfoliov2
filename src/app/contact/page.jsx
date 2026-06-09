"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:joshibhaskar684@gmail.com?subject=Message from ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;
    window.location.href = mailtoLink;
  };

  const contactLinks = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
      value: "joshibhaskar684@gmail.com",
      href: "mailto:joshibhaskar684@gmail.com",
    },
    {
      icon: <FaPhone className="text-xl" />,
      label: "Phone",
      value: "+91 6395653472",
      href: "tel:+916395653472",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: "LinkedIn",
      value: "linkedin.com/in/bhaskar-joshi-ji",
      href: "https://linkedin.com/in/bhaskar-joshi-ji/",
    },
    {
      icon: <FaGithub className="text-xl" />,
      label: "GitHub",
      value: "github.com/joshibhaskar684",
      href: "https://github.com/joshibhaskar684",
    },
  ];

  return (
    <section className="relative min-h-screen bg-background text-foreground py-20 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl">
            Have a project in mind, looking for a developer, or just want to connect? Let’s build something amazing together 🚀
          </p>
          <div className="h-1 w-20 bg-blue-600 mt-6 rounded-full mx-auto lg:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT COLUMN: Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            
            <div className="space-y-6">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-foreground/5 transition-colors duration-300 border border-transparent hover:border-foreground/10"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/60 mb-1">{link.label}</p>
                    <p className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Location & Status Card */}
            <div className="mt-8 p-6 bg-foreground/5 border border-foreground/10 rounded-2xl flex items-start gap-4">
              <span className="text-2xl mt-1">📍</span>
              <div>
                <p className="font-bold text-lg text-foreground">Haldwani, Uttarakhand, India</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <p className="text-sm font-medium text-foreground/80">Available for internships & freelance work</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="bg-white dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 p-8 md:p-10 rounded-3xl shadow-lg h-fit">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-background border border-gray-300 dark:border-gray-700 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-background border border-gray-300 dark:border-gray-700 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl bg-background border border-gray-300 dark:border-gray-700 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/20 transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}