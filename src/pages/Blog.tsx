import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Calendar, ArrowRight, Clock, User } from 'lucide-react'
import PageHero from '../components/ui/page-hero'
import AnimatedSection from '../components/animations/animated-section'
import StructuredData from '../components/seo/structured-data'

const POSTS = [
  {
    id: 'exploring-adomi-bridge',
    title: 'Exploring Adomi Bridge: Ghana\'s Iconic Suspension Bridge',
    excerpt: 'Standing 340 metres across the Volta River, the Adomi Bridge is more than a crossing — it is a landmark that defines the Asuogyaman skyline.',
    image: '/Images/adomi-bridge-hero.jpg',
    author: 'ATBH Editorial',
    date: '2026-06-10',
    readTime: '4 min read',
    category: 'Attractions',
  },
  {
    id: 'lake-volta-cruise-guide',
    title: 'The Ultimate Guide to Lake Volta Cruises',
    excerpt: 'From sunset dinner cruises to island hopping adventures, discover everything you need to know about exploring one of Africa\'s largest man-made lakes.',
    image: '/Images/Dodi4.jpg',
    author: 'ATBH Editorial',
    date: '2026-06-05',
    readTime: '6 min read',
    category: 'Experiences',
  },
  {
    id: 'where-to-stay-asuogyaman',
    title: 'Where to Stay in Asuogyaman: Luxury to Budget',
    excerpt: 'Whether you are looking for a world-class resort or a cozy guesthouse, Asuogyaman offers accommodation to suit every traveller.',
    image: '/Images/volta-river-landscape.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-28',
    readTime: '5 min read',
    category: 'Stay',
  },
  {
    id: 'ghanaian-cuisine-guide',
    title: 'A Food Lover\'s Guide to Asuogyaman',
    excerpt: 'From riverside fine dining to authentic local chop bars, explore the rich flavours of Ghanaian cuisine in the Eastern Region.',
    image: '/Images/ghana-dining-bg.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-20',
    readTime: '5 min read',
    category: 'Dining',
  },
  {
    id: 'festivals-eastern-region',
    title: 'Festivals and Cultural Events in Asuogyaman',
    excerpt: 'Experience the vibrant traditions of the Akwama people through their colourful festivals, durbar ceremonies, and community celebrations.',
    image: '/Images/ghana-events-bg.jpg',
    author: 'ATBH Editorial',
    date: '2026-05-15',
    readTime: '7 min read',
    category: 'Events',
  },
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-bg">
      <StructuredData
        type="TouristDestination"
        name="Asuogyaman Travel Blog"
        description="Travel guides, tips, and stories about Asuogyaman, Eastern Region, Ghana"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <PageHero
        title="Travel Blog"
        subtitle="Guides, tips, and stories from Asuogyaman"
        image="/Images/adomi-bridge-hero.jpg"
      />
      <div className="max-w-4xl mx-auto px-5 py-12 space-y-8">
        {POSTS.map((post, i) => (
          <AnimatedSection key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/blog/${post.id}`} className="group block md:flex gap-6 rounded-2xl bg-surface border border-border/60 hover:border-accent/20 transition-all duration-300 overflow-hidden">
                <div className="md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 md:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-accent">{post.category}</span>
                    <span className="text-[9px] text-muted flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-base md:text-lg font-medium text-fg mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent mt-3 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
