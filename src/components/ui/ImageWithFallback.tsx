import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = '/assets/logo.png',
  fallbackText = 'Image not available'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  if (hasError && imgSrc === fallbackSrc && !imgSrc.includes('logo')) {
    // Final fallback - show text placeholder
    return (
      <div className={`flex items-center justify-center bg-dark-lighter border border-white/10 ${className}`}>
        <span className="text-gray-500 text-sm text-center px-4">{fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageWithFallback;
