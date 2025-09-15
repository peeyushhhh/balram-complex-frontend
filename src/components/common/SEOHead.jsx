const SEOHead = ({ 
  title = "Balram Complex - Shop Management", 
  description = "Professional shop management and rental services",
  canonicalUrl = "",
  keywords = "",
  imageUrl = "",
  type = "website"
}) => {
  return (
    <>
      {/* React 19 Native Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Balram Complex" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Balram Complex Management" />
      <meta httpEquiv="Content-Language" content="en" />
    </>
  );
};

export default SEOHead;
