import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { defaultExperience } from '../data/defaultContent';
import { Briefcase, Calendar, Award } from 'lucide-react';

export default function Experience() {
  const [items, setItems] = useState(defaultExperience);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${API_URL}/api/content/experience`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => console.log('Using default experience content'));
  }, [API_URL]);

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-[#0B0D1B] text-gray-900 dark:text-white transition-colors">
      <SEO title="Education & Leadership" description="Education and leadership timeline." />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 mb-4 shadow-sm">
            <Award size={14} />
            <span>CAREER PATHWAY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Education &amp; Leadership Timeline
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Professional trajectory, key milestones, and academic achievements.
          </p>
        </div>

        {/* Timeline */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading timeline...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 text-gray-500">
            No career items added yet.
          </div>
        ) : (
          <div className="relative border-l-2 border-purple-500/40 dark:border-purple-500/30 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
            {items.map((item, index) => (
              <div key={item._id || index} className="relative group">
                {/* Node Dot */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#0B0D1B] border-4 border-purple-600 dark:border-purple-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                </div>

                {/* Card Container */}
                <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-purple-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-900/40">
                      <Calendar size={13} />
                      {[item.start_date, item.end_date].filter(Boolean).join(' - ') || 'Present'}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {item.company.includes('University') ? 'Academic' : 'Leadership & Clubs'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {item.position}
                  </h3>

                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm mb-4">
                    <Briefcase size={16} />
                    <span>{item.company}</span>
                  </div>

                  {item.description && (
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

