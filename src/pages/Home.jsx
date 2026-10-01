import { mediaUrl } from '../utils/media';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SocialLinks from '../components/SocialLinks';

export default function Home() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(localStorage.getItem('theme') === 'dark');
    };
    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, []);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const [aboutRes, projectsRes, servRes, testRes] = await Promise.all([
        axios.get(`${API_URL}/api/content/about`).catch(() => ({ data: null })),
        axios.get(`${API_URL}/api/content/projects`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/api/content/services`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/api/content/testimonials`).catch(() => ({ data: [] }))
      ]);
      setAbout(aboutRes.data);
      if (Array.isArray(projectsRes.data)) {
        setProjects(projectsRes.data.slice(0, 6));
      }
      if (Array.isArray(servRes.data)) {
        setServices(servRes.data);
      }
      if (Array.isArray(testRes.data)) {
        setTestimonials(testRes.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Could not load home content', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">Loading...</div>;
  }

  return (
    <main className={`${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      {/* HERO SECTION */}
      <section className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'
      }`}>
        {/* Background Blur Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-blue-600' : 'bg-blue-400'
          }`} />
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-purple-600' : 'bg-purple-400'
          }`} />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 py-16">
          {/* Label */}
          <div className={`inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
            isDark
              ? 'bg-gray-800 text-blue-400 border border-gray-700'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}>
            FULL-STACK DEVELOPER & DESIGNER
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            I build products that feel{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              obvious to use.
            </span>
          </h1>

          {/* Subheading */}
          <p className={`text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {about?.description || 'Full-stack developer building web apps end to end, from database and API to the interface.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
            <Link
              to="/projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              View my work
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className={`px-8 py-4 rounded-lg font-bold transition-all hover:scale-105 border ${
                isDark
                  ? 'border-gray-700 text-white hover:bg-gray-800'
                  : 'border-gray-300 text-gray-900 hover:bg-gray-100'
              }`}
            >
              Get in touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center">
            <SocialLinks isDark={isDark} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <div className={`w-6 h-10 rounded-full border-2 flex justify-center ${
            isDark ? 'border-gray-600' : 'border-gray-400'
          }`}>
            <div className={`w-1 h-2 rounded-full mt-2 ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`} />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Handpicked work I'm proud of
              </p>
            </div>
            <Link
              to="/projects"
              className="text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-2"
            >
              View all
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      {services.length > 0 && (
        <section className={`py-20 px-4 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm">Offerings &amp; Expertise</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Services &amp; Capabilities</h2>
              <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                High quality engineering services delivering performant, scalable, and modern digital products.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service._id || service.id}
                  className={`p-8 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 hover:border-blue-500/50'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-2xl mb-6">
                    {service.icon || '⚡'}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm">Recommendations</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">What People Say</h2>
              <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Feedback and endorsements from mentors, teammates, and collaborators.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <div
                  key={test._id || test.id}
                  className={`p-8 rounded-2xl border flex flex-col justify-between ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  <p className={`italic mb-6 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{test.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {test.image ? (
                      <img src={mediaUrl(test.image)} alt={test.author} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center">
                        {test.author ? test.author.charAt(0) : 'U'}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm">{test.author}</h4>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{test.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
        <div className={`max-w-2xl mx-auto text-center p-12 rounded-2xl ${
          isDark
            ? 'bg-gradient-to-r from-gray-900 to-blue-900 border border-gray-800'
            : 'bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200'
        }`}>
          <h3 className="text-3xl font-bold mb-4">Ready to work together?</h3>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Let's create something amazing. Get in touch with me today.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project, isDark }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.link || '#'}
      target="_blank"
      rel="noreferrer"
      className={`group rounded-xl overflow-hidden transition-all hover:scale-105 cursor-pointer block ${
        isDark
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-300">
        {project.image ? (
          <img
            src={mediaUrl(project.image)}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>No image</span>
          </div>
        )}
        {/* Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex gap-3">
              <span className="p-2 bg-white text-gray-900 rounded-full hover:scale-110 transition">
                <ArrowRight size={20} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-1 rounded ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
