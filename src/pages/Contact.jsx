import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${API_URL}/api/contact`, {
        name: form.name,
        email: form.email,
        message: `Subject: ${form.subject}\n\n${form.message}`
      });

      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <section className={`min-h-screen flex items-center py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Get in touch</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Have a project in mind? Let's talk about it.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 p-8 rounded-2xl ${
              isDark
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200 shadow-sm'
            }`}
          >
            {/* Messages */}
            {success && (
              <div className={`p-4 rounded-lg flex gap-3 ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                <CheckCircle className={isDark ? 'text-green-400' : 'text-green-600'} />
                <p className={isDark ? 'text-green-400' : 'text-green-700'}>
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className={`p-4 rounded-lg flex gap-3 ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
                <AlertCircle className={isDark ? 'text-red-400' : 'text-red-600'} />
                <p className={isDark ? 'text-red-400' : 'text-red-700'}>{error}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={`w-full px-4 py-3 rounded-lg outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className={`w-full px-4 py-3 rounded-lg outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
                className={`w-full px-4 py-3 rounded-lg outline-none transition-colors ${
                  isDark
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 rounded-lg outline-none transition-colors resize-none ${
                  isDark
                    ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
