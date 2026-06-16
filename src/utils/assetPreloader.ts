/**
 * Hero background images used across the site.
 * Preloading these ensures they are in the browser cache
 * before page transitions trigger.
 */
const HERO_BACKGROUND_IMAGES: string[] = [
  '/Images/ghana-attractions-bg.jpg',
  '/Images/ghana-business-bg.jpg',
  '/Images/ghana-dining-bg.jpg',
  '/Images/ghana-events-bg.jpg',
  '/Images/ghana-stay-bg.jpg',
  '/Images/ghana-schools-bg.jpg',
  '/Images/dodi-princess.jpg',
  '/Images/download.jfif',
  '/Images/penninsula.jpg',
  '/Images/adomi gh.jpg',
  '/Images/photo.jpg',
  '/Images/Dodi4.jpg',
  '/Images/adomi-bridge-hero.jpg',
];

/**
 * Preloads an image by creating an Image() object and setting its src.
 * This tells the browser to fetch and cache the image immediately.
 */
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => {
      // Silently fail — background images are non-critical for functionality
      resolve();
    };
    img.src = src;
  });
}

/**
 * Preloads all hero background images. Runs in the background
 * and does not block rendering.
 */
export function preloadAllHeroImages(): void {
  // Use requestIdleCallback to avoid interfering with critical rendering
  const schedule = (fn: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => fn(), { timeout: 3000 });
    } else {
      setTimeout(fn, 1000);
    }
  };

  schedule(() => {
    HERO_BACKGROUND_IMAGES.forEach((src) => preloadImage(src));
  });
}
