import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <SEO title="404 Page Not Found" description="The page you are looking for does not exist." />
      <div>
        <h1 className="text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4 dark:text-white">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
