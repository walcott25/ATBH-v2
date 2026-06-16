import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import StructuredData from '../components/seo/structured-data'

const POSTS: Record<string, { title: string; content: string; image: string; author: string; date: string; readTime: string; category: string }> = {
  'exploring-adomi-bridge': {
    title: 'Exploring Adomi Bridge: Ghana\'s Iconic Suspension Bridge',
    content: `Standing 340 metres across the Volta River, the Adomi Bridge is more than a crossing — it is a landmark that defines the Asuogyaman skyline. Completed in 1957, this steel suspension bridge was the first of its kind in West Africa and remains one of Ghana's most photographed structures.

## A Marvel of Engineering

Designed by the British firm Freeman Fox & Partners (who also designed the Humber Bridge and the Sydney Harbour Bridge approach), the Adomi Bridge spans the Volta River at Atimpoku. Its central span of 245 metres was the longest in Africa at the time of construction.

## What to Do There

- **Walk the bridge** — Pedestrians can cross the bridge and take in panoramic views of the river below.
- **Photography** — Sunrise and sunset provide the best light for capturing the bridge's elegant silhouette.
- **Boat trips** — Local fishermen offer short boat rides under the bridge for a unique perspective.

## Getting There

The bridge is located on the main Accra–Akosombo road, approximately 90 minutes from Accra. Regular buses and tro-tros run from major terminals.`,
    image: '/Images/adomi-bridge-hero.jpg',
    author: 'ATBH Editorial',
    date: '2026-06-10',
    readTime: '4 min read',
    category: 'Attractions',
  },
  'lake-volta-cruise-guide': {
    title: 'The Ultimate Guide to Lake Volta Cruises',
    content: `Lake Volta is one of the world's largest man-made lakes, covering an area of 8,502 square kilometres. Created by the damming of the Volta River at Akosombo, the lake is now a premier destination for water-based tourism in Ghana.

## Cruise Options

- **Dodi Princess** — The most popular cruise experience, this double-decker boat takes visitors on a 3-hour journey to Dodi Island with onboard music, drinks, and panoramic views.
- **Private Charters** — For a more intimate experience, private boats can be hired for sunset cruises, fishing trips, or island picnics.
- **Canoe Tours** — Local guides offer traditional canoe trips through the flooded forests and hidden channels of the lake.

## Best Time to Go

The dry season (November to March) offers the calmest waters and clearest skies. Sunset cruises are particularly popular between 3 PM and 6 PM.

## What to Bring

Sunscreen, a hat, sunglasses, a camera, and light clothing. Most cruises provide life jackets and refreshments.`,
    image: '/Images/Dodi4.jpg',
    author: 'ATBH Editorial',
    date: '2026-06-05',
    readTime: '6 min read',
    category: 'Experiences',
  },
  'where-to-stay-asuogyaman': {
    title: 'Where to Stay in Asuogyaman: Luxury to Budget',
    content: `Asuogyaman offers a diverse range of accommodation options, from world-class lakeside resorts to intimate guesthouses that put you right in the heart of local life.

## Luxury Resorts

- **Akosombo Continental Hotel** — Perched on the hills overlooking Lake Volta, this 4-star hotel offers stunning views, a swimming pool, and fine dining. Rooms feature air conditioning, satellite TV, and private balconies.
- **Royal Senchi Resort** — A boutique riverfront resort with beautifully appointed rooms, a spa, infinity pool, and riverside dining. Perfect for honeymooners and couples.

## Mid-Range Options

- **Afrikiko River Resort** — Located on the banks of the Volta River, this resort offers comfortable chalets with lake views, a restaurant, and organised boat trips.
- **Dodi World Resort** — Situated on Dodi Island, this resort offers a unique island escape with rustic-chic cabins and stunning sunrise views.

## Budget Stays

- **Volta Haven Lodge** — Clean, affordable rooms with friendly service and a convenient location near the main attractions.
- **Guesthouses in Atimpoku** — Several family-run guesthouses offer basic but comfortable rooms at very reasonable rates, often including breakfast.

## Booking Tips

Book ahead during peak season (December–January and August). Many resorts offer discounts for midweek stays and group bookings.`,
    image: '/Images/volta-river-landscape.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-28',
    readTime: '5 min read',
    category: 'Stay',
  },
  'ghanaian-cuisine-guide': {
    title: 'A Food Lover\'s Guide to Asuogyaman',
    content: `From riverside fine dining to authentic local chop bars, Asuogyaman offers a culinary journey through the best of Ghanaian and international cuisine.

## Must-Try Local Dishes

- **Banku & Tilapia** — The signature dish of the Volta Region. Freshly grilled tilapia served with fermented corn and cassava dough (banku), pepper sauce, and sliced onions. Best enjoyed at lakeside spots.
- **Fufu & Light Soup** — Pounded cassava and plantain served with a light tomato-based soup with your choice of meat or fish.
- **Jollof Rice** — Ghana's beloved one-pot rice dish cooked with tomatoes, onions, and spices, often served with fried plantains and grilled chicken.
- **Kenkey & Fried Fish** — Fermented corn dumplings served with deep-fried fish and shito (spicy black pepper sauce).

## Best Restaurants

- **Volta Restaurant (Akosombo Continental)** — Fine dining with panoramic lake views. Offers both Ghanaian and international cuisine.
- **Riverside Grill (Royal Senchi)** — Open-air dining on the riverbank with grilled specialities and a relaxed atmosphere.
- **Dodi Island Beach Bar** — Casual beachside dining with fresh fish, cold drinks, and live music on weekends.
- **Local Chop Bars** — For an authentic experience, visit the small chop bars in Atimpoku serving home-cooked Ghanaian meals at very low prices.

## Food Tours

Ask your hotel about guided food tours that take you to local markets, farms, and cooking demonstrations. It is a fantastic way to learn about Ghanaian food culture.`,
    image: '/Images/ghana-dining-bg.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-20',
    readTime: '5 min read',
    category: 'Dining',
  },
  'festivals-eastern-region': {
    title: 'Festivals and Cultural Events in Asuogyaman',
    content: `The Asuogyaman District is rich in cultural heritage, and its festivals are vibrant expressions of the traditions of the Akwamu people.

## Major Festivals

- **Akwambu Festival** — Celebrated by the chiefs and people of Akwamu, this festival commemorates the migration of the Akwamu people from their original homeland. It features a grand durbar of chiefs, colourful processions, traditional music and dance, and the firing of muskets.
- **Ohum Festival** — A harvest festival celebrated by the people of the Eastern Region, marked by the offering of new yams to the gods and ancestors, followed by feasting and merrymaking.

## Annual Events

- **Easter Regatta** — Held on Lake Volta during the Easter weekend, this popular event features boat races, water sports, live music, and street food. Draws visitors from across Ghana.
- **Asuogyaman Food and Culture Festival** — A showcase of local cuisine, arts, crafts, and traditional performances, usually held in November.

## What to Expect

Festivals in Asuogyaman are colourful, loud, and welcoming. Visitors are encouraged to participate in the dancing and celebrations. Photography is generally welcomed, but always ask permission before taking close-up portraits of chiefs or elders.

## Planning Your Visit

Check with your hotel or the Asuogyaman District Assembly for exact dates, as many festivals follow the traditional calendar and dates vary from year to year.`,
    image: '/Images/ghana-events-bg.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-15',
    readTime: '7 min read',
    category: 'Events',
  },
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const post = id ? POSTS[id] : null
  if (!post) return <NotFound />

  return (
    <div className="min-h-screen bg-bg">
      <StructuredData
        type="TouristDestination"
        name={post.title}
        description={post.content.slice(0, 200)}
        image={post.image}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden bg-surface">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-[10px] text-white/60 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-3 h-3" /> Back to Blog
          </Link>
          <h1 className="text-xl md:text-3xl font-medium text-white tracking-tight">{post.title}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center gap-4 text-xs text-muted mb-8 pb-6 border-b border-border/40">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          <button onClick={() => navigator.share?.({ title: post.title, url: window.location.href })} className="ml-auto flex items-center gap-1 text-accent hover:text-accent/80 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
        <div className="prose prose-sm max-w-none text-fg leading-relaxed space-y-4 [&_h2]:text-base [&_h2]:font-medium [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_strong]:font-medium">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
            if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
            if (line.startsWith('- **')) {
              const match = line.match(/- \*\*(.+?)\*\* — (.+)/)
              if (match) return <li key={i}><strong>{match[1]}</strong> — {match[2]}</li>
              return <li key={i}>{line.slice(2)}</li>
            }
            if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>
            if (line.trim() === '') return null
            return <p key={i} className="text-sm">{line}</p>
          })}
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-muted mb-4">Post not found</p>
        <Link to="/blog" className="text-xs text-accent hover:text-accent/80 transition-colors">Back to blog</Link>
      </div>
    </div>
  )
}
