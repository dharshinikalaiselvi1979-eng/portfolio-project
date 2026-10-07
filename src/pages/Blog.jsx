import { mediaUrl } from '../utils/media';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { TextSkeleton } from '../components/Skeleton';

import { API_URL } from '../utils/config';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <SEO title="Blog" description="Technical articles, web development tutorials, and software engineering insights." />
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      {loading ? (
        <div className="space-y-8">
          <TextSkeleton lines={4} />
          <TextSkeleton lines={4} />
        </div>
      ) : (
        <div className="space-y-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id || blog.id}
              to={`/blog/${blog._id || blog.id}`}
              className="block border-b dark:border-gray-800 pb-8 hover:text-blue-600 dark:hover:text-blue-400 transition group"
            >
              {blog.image && (
                <img src={mediaUrl(blog.image)} alt={blog.title} className="w-full h-56 object-cover rounded-lg mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2 group-hover:underline">{blog.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.description}</p>
              <div className="flex gap-2">
                {blog.tags && blog.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
