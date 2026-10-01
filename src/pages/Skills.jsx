import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { CardSkeleton } from '../components/Skeleton';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/skills`);
      setSkills(res.data);

      const grouped = {};
      res.data.forEach(skill => {
        const cat = skill.category || 'General';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(skill);
      });
      setCategories(grouped);
    } catch (err) {
      console.error('Error fetching skills', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <SEO title="Skills" description="Detailed list of programming languages, frameworks, and technical tools." />
      <h1 className="text-4xl font-bold mb-12">My Skills</h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        Object.entries(categories).map(([category, categorySkills]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <div key={skill._id || skill.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 shadow-sm">
                  <h3 className="font-bold text-lg">{skill.name}</h3>
                  {skill.level && (
                    <>
                  <div className="mt-2 bg-gray-300 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{
                        width: skill.level === 'Beginner' ? '35%' : skill.level === 'Intermediate' ? '65%' : '90%'
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium">{skill.level}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
