import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B0D1B] text-gray-400 border-t border-white/10 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Link to="/" className="text-lg font-extrabold tracking-tight flex items-center">
          <span className="text-[#8B5CF6]">dharshini</span>
          <span className="text-gray-400 font-normal">.dev</span>
        </Link>
        <p>&copy; {new Date().getFullYear()} dharshini.dev. Built with passion and precision.</p>
        <a
          href={process.env.REACT_APP_ADMIN_URL || 'http://localhost:3001'}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-purple-400 hover:text-purple-300 font-medium transition flex items-center gap-1"
        >
          <span>⚡ CMS Admin</span>
        </a>
      </div>
    </footer>
  );
}

