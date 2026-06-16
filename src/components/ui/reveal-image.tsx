interface RevealImageProps {
  src: string
  alt: string
  className?: string
}

export default function RevealImage({ src, alt, className = '' }: RevealImageProps) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
        loading="lazy"
      />
    </div>
  )
}
