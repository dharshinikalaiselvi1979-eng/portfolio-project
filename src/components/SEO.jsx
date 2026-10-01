import React, { useEffect } from 'react';

export default function SEO({ title, description, keywords, image, type = 'website' }) {
  const siteTitle = title ? `${title} | Portfolio` : 'Developer Portfolio & Blog';
  const metaDescription = description || 'Welcome to my developer portfolio. Explore my projects, technical skills, and technical blog posts.';

  useEffect(() => {
    document.title = siteTitle;

    // Update meta description tag
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDescription);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', siteTitle);

    // Inject JSON-LD Schema
    const schemaScript = document.getElementById('json-ld-schema');
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Developer Portfolio",
      "description": metaDescription
    };

    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schemaData);
    } else {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [siteTitle, metaDescription]);

  return null;
}
