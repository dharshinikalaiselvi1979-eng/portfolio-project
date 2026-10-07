import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';

export default function SocialLinks({ isDark = false }) {
  const [social, setSocial] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/api/content/about`)
      .then((res) => setSocial(res.data?.social || {}))
      .catch(() => {});
  }, [API_URL]);

  const allSocials = [
    {
      label: 'GitHub',
      key: 'github',
      link: social.github,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      key: 'linkedin',
      link: social.linkedin,
      icon: (
        <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      label: 'Twitter',
      key: 'twitter',
      link: social.twitter,
      icon: (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: 'Email',
      key: 'email',
      link: social.email ? `mailto:${social.email}` : '',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  const socials = allSocials.filter((item) => item.link);

  return (
    <div className="flex space-x-4">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          className={`p-3 rounded-full border transition-all hover:scale-110 flex items-center justify-center ${
            isDark
              ? 'border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-400'
              : 'border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600'
          }`}
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

