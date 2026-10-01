const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Uploaded images are stored as "/uploads/xyz.webp" on the backend.
// Prefix them with the API origin; leave absolute URLs untouched.
export function mediaUrl(src) {
  if (!src) return '';
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  return API_URL + (src.startsWith('/') ? src : '/' + src);
}
