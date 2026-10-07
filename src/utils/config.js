const getApiUrl = () => {
  const env = process.env.REACT_APP_API_URL;
  const isBrowserOnCloud = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');

  if (env && env.trim()) {
    const trimmed = env.trim();
    if (!(isBrowserOnCloud && trimmed.includes('localhost'))) {
      return trimmed.replace(/\/+$/, '');
    }
  }

  // Active live cloud backend on Render
  return 'https://portfolio-backend-4l27.onrender.com';
};

export const API_URL = getApiUrl();
export default API_URL;
