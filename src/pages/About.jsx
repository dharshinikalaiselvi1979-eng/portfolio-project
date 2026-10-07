import { mediaUrl } from '../utils/media';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SocialLinks from '../components/SocialLinks';
import { defaultAbout } from '../data/defaultContent';

import { API_URL } from '../utils/config';

export default function About() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/about`);
      if (res.data && res.data.title) setAbout(res.data);
    } catch (err) {
      console.log('Using default about content');
    }
  };

  return (
    <main className={`${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <p className={`text-sm mb-8 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            <span className="text-blue-500">Home</span> / About
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder / Profile */}
            <div className="flex justify-center">
              {about.image ? (
                <img
                  src={mediaUrl(about.image)}
                  alt="Profile"
                  className={`w-full max-w-sm rounded-2xl object-cover ${
                    isDark ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg'
                  }`}
                />
              ) : (
                <div className={`w-full h-80 max-w-sm rounded-2xl flex flex-col items-center justify-center border ${
                  isDark ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-200 border-gray-300 text-gray-600'
                }`}>
                  <span className="text-xl font-bold text-blue-500">dharshini.dev</span>
                  <p className="text-sm mt-2">Full-Stack Developer</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{about.title}</h1>
              <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {about.description}
              </p>
              <SocialLinks isDark={isDark} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
