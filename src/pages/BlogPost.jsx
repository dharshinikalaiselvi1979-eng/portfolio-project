import { mediaUrl } from '../utils/media';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { TextSkeleton } from '../components/Skeleton';

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/content/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error('Error fetching blog', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <TextSkeleton lines={8} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <SEO title={blog.title} description={blog.description} image={blog.image} />
      
      <Link to="/blog" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-6 block">
        ← Back to all posts
      </Link>

      {blog.image && (
        <img src={mediaUrl(blog.image)} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-8 shadow-md" />
      )}
      
      <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>
      
      <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-3">
        <p className="text-lg italic">{blog.description}</p>
        <div className="flex gap-2">
          {blog.tags && blog.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed space-y-4">
        {blog.content && blog.content.split('\n').map((para, i) => (
          para.trim() && <p key={i} className="text-gray-700 dark:text-gray-300 mb-4">{para}</p>
        ))}
      </div>
    </div>
  );
}
