import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { defaultExperience } from '../data/defaultContent';

export default function Experience() {
  const [items, setItems] = useState(defaultExperience);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/content/experience`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => console.log('Using default experience content'));
  }, [API_URL]);

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <SEO title="Education & Leadership" description="Education and leadership timeline." />
      <h1 className="text-4xl font-bold mb-12">Education &amp; Leadership</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">Nothing to show yet.</p>
      ) : (
        <ol className="relative border-l-2 border-blue-500 ml-3">
          {items.map((item) => (
            <li key={item._id} className="mb-10 ml-6">
              <span className="absolute -left-[9px] w-4 h-4 bg-blue-500 rounded-full" />
              <p className="text-sm text-gray-500">
                {[item.start_date, item.end_date].filter(Boolean).join(' - ')}
              </p>
              <h3 className="text-xl font-bold">{item.position}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{item.company}</p>
              {item.description && <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
