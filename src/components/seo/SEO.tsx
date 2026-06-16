import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
}

const SITE_NAME = 'Asuogyaman Tourism & Business Hub';
const SITE_URL = 'https://atbh.vercel.app';
const DEFAULT_IMAGE = '/Images/adomi-bridge-hero.jpg';
const DEFAULT_DESC = 'Explore the beauty, culture, and adventure of Asuogyaman District — your gateway to the Volta Region. Discover attractions, dining, stay, events, and more.';

/** Structured data for the organization itself */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Asuogyaman Tourism & Business Hub',
  url: SITE_URL,
  logo: `${SITE_URL}/Images/a-minimalist-app-icon-design-of-a-tourist--vector-.png`,
  description: DEFAULT_DESC,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Atimpoku',
    addressRegion: 'Eastern Region',
    addressCountry: 'GH',
  },
  sameAs: [
    'https://web.facebook.com/people/Asuogyaman-Tourism-Hub/61573134887291/',
  ],
};

/** Structured data for the website */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${location.pathname}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const pageSchema = jsonLd
    ? { '@context': 'https://schema.org', ...jsonLd }
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Asuogyaman, tourism, Ghana, Volta, Adomi Bridge, Akosombo Dam, Atimpoku, travel, attractions, dining, stay, events" />
      <meta name="author" content="Asuogyaman Tourism Board" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GH" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {pageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      )}
    </Helmet>
  );
}

// Helper factories for structured data on different page types

export function attractionSchema(name: string, description: string, image: string, urlPath: string) {
  return {
    '@type': 'TouristAttraction',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: `${SITE_URL}${urlPath}`,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

export function eventSchema(
  name: string,
  description: string,
  startDate: string,
  locationName: string,
  image: string,
  urlPath: string,
) {
  return {
    '@type': 'Event',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: `${SITE_URL}${urlPath}`,
    startDate,
    location: {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locationName,
        addressRegion: 'Eastern Region',
        addressCountry: 'GH',
      },
    },
  };
}

export function restaurantSchema(name: string, description: string, image: string, urlPath: string) {
  return {
    '@type': 'Restaurant',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: `${SITE_URL}${urlPath}`,
    servesCuisine: 'Ghanaian, Continental',
    priceRange: 'GHS 20 - 200',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Atimpoku',
      addressRegion: 'Eastern Region',
      addressCountry: 'GH',
    },
  };
}

export function lodgingSchema(name: string, description: string, image: string, urlPath: string) {
  return {
    '@type': 'LodgingBusiness',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: `${SITE_URL}${urlPath}`,
    priceRange: 'GHS 200 - 2000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Atimpoku',
      addressRegion: 'Eastern Region',
      addressCountry: 'GH',
    },
  };
}
