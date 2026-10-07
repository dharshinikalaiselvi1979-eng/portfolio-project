import { mediaUrl } from '../utils/media';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../components/SEO';
import { ArrowRight, Search } from 'lucide-react';
import { defaultProjects } from '../data/defaultContent';
import { API_URL } from '../utils/config';

export default function Projects() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [projects, setProjects] = useState(defaultProjects);
  const [filteredProjects, setFilteredProjects] = useState(defaultProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState(null);
  const [allTechs, setAllTechs] = useState(() => [
    ...new Set(defaultProjects.flatMap((p) => p.technologies || []))
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/projects`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setProjects(res.data);
        setFilteredProjects(res.data);
        const techs = [...new Set(res.data.flatMap((p) => p.technologies || []))];
        setAllTechs(techs);
      }
    } catch (err) {
      console.log('Using default projects content');
    }
  };

  const handleFilter = (search = searchTerm, tech = selectedTech) => {
    let filtered = projects;

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tech) {
      filtered = filtered.filter(p => p.technologies?.includes(tech));
    }

    setFilteredProjects(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    handleFilter(e.target.value, selectedTech);
  };

  const handleTechFilter = (tech) => {
    const newTech = selectedTech === tech ? null : tech;
    setSelectedTech(newTech);
    handleFilter(searchTerm, newTech);
  };

  return (
    <main className={`${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      <SEO title="Projects" description="Projects built by Dharshini K M." />
      <section className={`py-20 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">Projects</h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Browse through my portfolio of recent work
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className={`relative ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <Search className={`absolute left-4 top-3.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearch}
                className={`w-full pl-12 pr-4 py-3 rounded-lg outline-none ${
                  isDark
                    ? 'bg-gray-800 text-white placeholder-gray-500'
                    : 'bg-white text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>

            {/* Tech Filter */}
            {allTechs.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {allTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => handleTechFilter(tech)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedTech === tech
                        ? 'bg-blue-600 text-white'
                        : isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project._id || project.title} project={project} isDark={isDark} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No projects found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProjectCard({ project, isDark }) {
  return (
    <a
      href={project.link || '#'}
      target="_blank"
      rel="noreferrer"
      className={`group rounded-xl overflow-hidden transition-all hover:scale-105 block ${
        isDark
          ? 'bg-gray-800 hover:shadow-lg hover:shadow-blue-500/20'
          : 'bg-white hover:shadow-lg shadow-sm border border-gray-200'
      }`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-300">
        {project.image ? (
          <img
            src={mediaUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">{project.title}</h3>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full ${
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

        {/* View Link */}
        <div className="flex items-center text-blue-500 font-semibold group-hover:gap-3 gap-2 transition-all">
          View Project
          <ArrowRight size={18} />
        </div>
      </div>
    </a>
  );
}
