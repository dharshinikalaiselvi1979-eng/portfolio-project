import { API_URL } from './config';

// Uploaded images are stored as "/uploads/xyz.webp" on the backend.
// Prefix them with the API origin; leave absolute URLs untouched.
export function mediaUrl(src) {
  if (!src) return '';
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  return API_URL + (src.startsWith('/') ? src : '/' + src);
}
