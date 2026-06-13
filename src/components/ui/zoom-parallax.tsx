import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

function Slide({ src, alt, index, total, progress }: Image & { index: number; total: number; progress: import('motion/react').MotionValue<number> }) {
  const active = useTransform(progress, (v) => {
    const perSlide = 1 / (total - 1);
    const center = index * perSlide;
    const range = perSlide * 1.2;
    const dist = Math.abs(v - center);
    if (dist > range) return 0;
    return 1 - Math.pow(dist / range, 2);
  });

  const scale = useTransform(active, [0, 1], [0.7, 1.15]);

  return (
    <motion.div
      style={{ scale, opacity: active }}
      className="flex-shrink-0 w-[80vw] h-[65vh] mx-[10vw] first:ml-[10vw] relative"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
        <img
          src={src}
          alt={alt || `Gallery image ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover block max-w-none"
          style={{ height: '100%' }}
          loading="lazy"
        />
      </div>
      {alt && (
        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-medium text-white inline-block">
            {alt}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const totalSlides = images.length;

  const transform = useTransform(scrollYProgress, (v) => {
    const tx = -v * (totalSlides - 1) * 100;
    return `translateX(${tx}vw)`;
  });

  return (
    <div ref={container} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-brand-dark flex items-center justify-center">
        <motion.div
          style={{ transform, willChange: 'transform' }}
          className="flex items-center h-full"
        >
          {images.map(({ src, alt }, index) => (
            <Slide
              key={index}
              src={src}
              alt={alt}
              index={index}
              total={totalSlides}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
