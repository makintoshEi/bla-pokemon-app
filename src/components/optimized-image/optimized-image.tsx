import "./optimized-image.css";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  alt: string;
  ariaLabel: string;
  className?: string;
  src: string;
  width: number;
  height: number;
}

const OptimizedImage = ({
  alt,
  ariaLabel,
  className = "",
  src,
  width,
  height,
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState("/placeholder.webp");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      aria-label={ariaLabel}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-60"
      } ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
};

export default OptimizedImage;
