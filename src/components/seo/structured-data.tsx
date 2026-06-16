interface StructuredDataProps {
  type: 'TouristAttraction' | 'Restaurant' | 'Hotel' | 'Event' | 'LocalBusiness' | 'TouristDestination'
  name: string
  description: string
  image?: string
  url?: string
  telephone?: string
  email?: string
  address?: string
  geo?: { latitude: number; longitude: number }
  rating?: { value: number; count?: number }
  priceRange?: string
}

export default function StructuredData(props: StructuredDataProps) {
  const ld: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': props.type,
    name: props.name,
    description: props.description,
  }

  if (props.image) ld.image = props.image
  if (props.url) ld.url = props.url
  if (props.telephone) ld.telephone = props.telephone
  if (props.email) ld.email = props.email
  if (props.address) ld.address = { '@type': 'PostalAddress', streetAddress: props.address }
  if (props.geo) ld.geo = { '@type': 'GeoCoordinates', latitude: props.geo.latitude, longitude: props.geo.longitude }
  if (props.rating) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: props.rating.value,
      bestRating: 5,
      ratingCount: props.rating.count || 1,
    }
  }
  if (props.priceRange) ld.priceRange = props.priceRange

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  )
}
