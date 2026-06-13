/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Nature' | 'Engineering' | 'Luxury' | 'Culture';
  coordinates?: [number, number];
  rating?: number;
  /** URL to an equirectangular (2:1) panorama image for the 360° virtual tour */
  panorama?: string;
  email?: string;
  phone?: string;
  bookingUrl?: string;
  website?: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'adomi-bridge',
    name: 'Adomi Bridge',
    description: 'A signature landmark and one of Ghana\'s most famous suspension bridges, spanning the Volta River at Atimpoku. The views of the river and surrounding hills are spectacular, and the bridge is often the centrepiece for cultural festivals and activities.',
    image: '/Images/adomi-bridge-aerial.jpg',
    category: 'Engineering',
    coordinates: [6.2386, 0.0958],
    rating: 4.9,
    panorama: '/Images/panorama-landscape.jpg'
  },
  {
    id: 'volta-lake',
    name: 'Volta Lake & Cruises',
    description: 'The Volta Lake is one of the world’s largest man-made lakes, created by the Akosombo Dam. You can enjoy boating, canoe races, guided cruises, and scenic sunsets on the water.',
    image: '/Images/Dodi4.jpg',
    category: 'Nature',
    coordinates: [6.3500, 0.0500],
    rating: 4.8,
    panorama: '/Images/panorama-mountain.jpg'
  },
  {
    id: 'dodi-Island',
    name: 'Dodi Island Cruise',
    description: 'The Dodi Island is one of the best tourist attractions in Asuogyaman. Tourists cruises in the Dodi Princess for an unforgettable experience on the Dodi Island.',
    image: '/Images/Dodi3.jpg',
    category: 'Nature',
    coordinates: [6.3500, 0.0500],
    rating: 4.8,
    panorama: '/Images/panorama-landscape.jpg'
  },
  {
    id: 'akosombo-dam',
    name: 'Akosombo Dam',
    description: 'The massive hydroelectric dam that supplies much of Ghana’s electricity. It’s not just an engineering marvel — the surrounding area offers great views of Lake Volta and photo opportunities.',
    image: '/Images/dam1.jpg',
    category: 'Engineering',
    coordinates: [6.3005, 0.0597],
    rating: 4.8,
    panorama: '/Images/panorama-mountain.jpg'
  },
  {
    id: 'akwamu-gorge',
    name: 'Akwamu Gorge Community Forest',
    description: 'A scenic natural area with rugged hills, forest trails and conservation efforts that make it ideal for hiking, birdwatching, and nature exploration.',
    image: '/Images/Akwamu Gorge1.jpg',
    category: 'Nature',
    coordinates: [6.2500, 0.0800],
    rating: 4.7,
    panorama: '/Images/panorama-landscape.jpg'
  },
  {
    id: 'akwamu-islet',
    name: 'Akwamu Gorge Islet',
    description: 'Located at Atimpoku, offering lush landscapes, wildlife, and cultural experiences — perfect for eco-tourism lovers.',
    image: '/Images/Akwamu Gorge2.jpg',
    category: 'Nature',
    coordinates: [6.2400, 0.0900],
    rating: 4.6
  },
  {
    id: 'lake-shore',
    name: 'Lake Shore Areas (Sajuna Beach)',
    description: 'The Gyakiti–Kudikope lakeshore area is perfect for river sports, fishing, relaxation and enjoying sandy lake views.',
    image: '/Images/sajuna.jpg',
    category: 'Nature',
    coordinates: [6.3200, 0.1200],
    rating: 4.5
  },
  {
    id: 'cultural-sites',
    name: 'Traditional & Cultural Sites',
    description: 'Rich cultural landscape including Mami Water Shrine at Adomi and the MDCC complex at Senchi.',
    image: '/Images/festival1.jpg',
    category: 'Culture',
    coordinates: [6.2200, 0.0900],
    rating: 4.9
  },
  {
    id: 'adomi-bridge-garden',
    name: 'Adomi Bridge Gardens',
    description: 'Enjoy the scenic view of the Adomi bridge, zoo, pool and cruise on the lake.',
    image: '/Images/623867663_2071003400300427_61196.jpg',
    category: 'Nature',
    coordinates: [6.3500, 0.0500],
    rating: 4.8
  },
  {
    id: 'santa-barbara',
    name: 'Santa Barbara Catholic Church',
    description: 'The first engineered catholic church ever built in Asuogyaman during the construction of the Akosombo dam with great histories.',
    image: '/Images/santa barbara catholic church.jpg',
    category: 'Engineering',
    coordinates: [6.3500, 0.0500],
    rating: 4.8
  },
];

export const REVIEWS = [
  {
    id: 1,
    user: "Kwame A.",
    text: "The views from the Adomi Bridge at sunset are simply unmatched. A must-visit!",
    rating: 5,
    avatar: "/Images/testimonial-kwame.jpg"
  },
  {
    id: 2,
    user: "Sarah M.",
    text: "The Penninsula Hotel and Resort provided the most relaxing weekend I've had in years. The service is top-notch.",
    rating: 5,
    avatar: "/Images/testimonial-sarah.jpg"
  }
];

export interface VideoTestimonial {
  id: string;
  user: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
  quote: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: '1',
    user: "Elena Rodriguez",
    location: "Spain",
    thumbnail: "https://picsum.photos/seed/elena/800/450",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "The Akosombo Dam is an engineering masterpiece. Seeing it in person was the highlight of my Ghana trip!"
  },
  {
    id: '2',
    user: "David Chen",
    location: "Singapore",
    thumbnail: "https://picsum.photos/seed/david/800/450",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Peaceful, serene, and absolutely beautiful. Lake Volta is a hidden gem that everyone should experience."
  },
  {
    id: '3',
    user: "Amara Okoro",
    location: "Nigeria",
    thumbnail: "https://picsum.photos/seed/amara/800/450",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "The hospitality at the resorts here is world-class. I felt like royalty from the moment I arrived."
  }
];

export interface Dining {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Local' | 'Continental' | 'Pub & Grill' | 'Cafe' | 'Resort Dining';
  coordinates?: [number, number];
  rating?: number;
  amenities?: string[];
  email?: string;
  phone?: string;
  bookingUrl?: string;
  longDescription?: string;
}

export interface Stay {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Luxury' | 'Mid-Range' | 'Budget';
  coordinates?: [number, number];
  rating?: number;
  amenities?: string[];
  email?: string;
  phone?: string;
  bookingUrl?: string;
  longDescription?: string;
}

export interface School {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  coordinates?: [number, number];
  type: string;
  email?: string;
  phone?: string;
  website?: string;
  longDescription?: string;
  programs?: string[];
}

export interface Business {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Tourism' | 'Hospitality' | 'Retail' | 'Transport' | 'Services' | 'Agriculture' | 'Manufacturing';
  coordinates?: [number, number];
  rating?: number;
  contact?: string;
  email?: string;
  phone?: string;
  bookingUrl?: string;
  website?: string;
  location?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Cultural' | 'Religious' | 'Harvest' | 'Arts' | 'National';
  coordinates?: [number, number];
  rating?: number;
  date: string;
  duration: string;
  email?: string;
  phone?: string;
  bookingUrl?: string;
  website?: string;
}

export const DINING: Dining[] = [
  {
    id: 'eat-feel',
    name: 'Eat & Feel',
    description: 'Well-rated local restaurant in Atimpoku serving Ghanaian and continental dishes with a friendly atmosphere. Great for lunch or dinner after sightseeing.',
    image: '/Images/lunch.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    phone: '+233 24 123 4567',
    email: 'eatandfeel@gmail.com',
    amenities: ['WiFi', 'Air Conditioning', 'Outdoor Seating', 'Family Friendly', 'Takeaway'],
    longDescription: 'A reliable Atimpoku standby serving both Ghanaian staples and continental dishes. The kitchen turns out consistent grilled tilapia with banku and pepper sauce, and their jollof rice holds its own against any in the district. The atmosphere is unfussy — tiled floors, ceiling fans, fluorescent lighting — the kind of place where the quality of the food, not the decor, brings people back. Well-suited for a post-sightseeing lunch or early dinner.'
  },
  {
    id: 'adomi-restaurant',
    name: 'Adomi Restaurant',
    description: 'Classic local eatery on Asuogyaman-Atimpoku Road serving grilled tilapia, jollof rice, and spicy stews.',
    image: '/Images/buffet.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0900],
    rating: 4.3,
    phone: '+233 24 234 5678',
    email: 'adomirestaurant@yahoo.com',
    amenities: ['Parking', 'Air Conditioning', 'TV', 'Local Cuisine', 'Catering'],
    longDescription: 'Adomi Restaurant has been working the same stretch of road for years, and the formula is straightforward: properly prepared Ghanaian classics, no shortcuts. The tilapia arrives fried to a deep gold with a crisp edge, and the jollof rice carries the faint smokiness of its cooking vessel. The kitchen also does a reliable light soup with fufu. The dining room is bare-bones — plastic chairs, TV mounted in the corner, ceiling fans fighting the afternoon heat. You come here to eat well, not to linger.'
  },
  {
    id: 'Adomi Bridge Gardens',
    name: 'Adomi Bridge Gardens',
    description: 'Casual restaurant with views of the Adomi Bridge and Volta River.',
    image: '/Images/jollof1.jpg',
    category: 'Continental',
    coordinates: [6.2400, 0.0900],
    rating: 4.6,
    phone: '+233 24 345 6789',
    email: 'info@adomibridgegardens.com',
    amenities: ['Scenic Views', 'Pool Access', 'Parking', 'WiFi', 'Family Friendly'],
    longDescription: 'The draw here is the setting: an open-air terrace looking directly at the Adomi Bridge suspension span over the Volta. The menu covers both Ghanaian and continental dishes — grilled tilapia, fried rice, chicken and chips — executed competently if not memorably. The gardens surrounding the terrace are well-kept, and the pool is available to diners. It works best as a lunch stop where the view outweighs the food as the primary consideration.'
  },
  {
    id: 'dam-city',
    name: 'Dam City Asanka Local',
    description: 'Local dining spot in Atimpoku ideal for authentic Ghanaian home-style meals.',
    image: '/Images/waakye2.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0900],
    rating: 4.4,
    phone: '+233 24 456 7890',
    amenities: ['Local Cuisine', 'Takeaway', 'Budget Friendly', 'Family Style'],
    longDescription: 'An unapologetically local kitchen where the menu turns on whatever the market delivered that morning. Fufu with groundnut soup, ampesi with kontomire stew, and a waakye that draws a lunch crowd are the main events. The open kitchen lets you watch the cooking — women working over large pots with the confidence of decades of practice. No air conditioning, no pretense, just honest Ghanaian home cooking at prices that make it the best value meal in Atimpoku.'
  },
  {
    id: 'de-kitchen',
    name: 'De kitchen',
    description: 'A popular restaurant slightly south in Kpong known for tasty meals (mix of local and continental).',
    image: '/Images/jollof.jpg',
    category: 'Continental',
    coordinates: [6.1500, 0.0600],
    rating: 4.2,
    phone: '+233 24 567 8901',
    email: 'dekitchenkpong@gmail.com',
    amenities: ['WiFi', 'Air Conditioning', 'Delivery', 'Catering', 'Private Events'],
    longDescription: 'De Kitchen operates out of a clean, air-conditioned dining room in Kpong and serves a dependable mix of Ghanaian and continental dishes. The grilled chicken with chips is a safe bet; the red-red and fried plantain satisfy when the craving hits. What distinguishes De Kitchen is the operational competence — online ordering, reliable delivery, and a catering service that handles events without the usual chaos. It is the kind of restaurant every town needs: unremarkable on paper, reliable in practice.'
  },
  {
    id: 'soul-berry',
    name: 'Soul Berry Café',
    description: 'Café with a mix of light meals, snacks and drinks — good for brunch or coffee.',
    image: '/Images/cafe.jpg',
    category: 'Cafe',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    phone: '+233 24 678 9012',
    email: 'hello@soulberrycafe.com',
    amenities: ['WiFi', 'Coffee Bar', 'Outdoor Seating', 'Pastries', 'Breakfast'],
    longDescription: 'Atimpoku\'s dedicated coffee address, run with the kind of care that regulars notice. Soul Berry serves properly extracted espresso drinks, pour-over coffee, and a food menu that punches above its weight — think breakfast served all day, fresh-baked pastries, sandwiches on good bread, and salads that show someone in the kitchen understands balance. WiFi is reliable, the outdoor seating is shaded by tropical plantings, and the general atmosphere is calm enough for remote work. It fills a genuine gap in Atimpoku\'s dining landscape: somewhere to sit with a drink and take your time.'
  },
  {
    id: 'alabama-pub',
    name: 'Alabama Pub & Grill',
    description: 'Popular bar and grill in Atimpoku, great for evening drinks and grilled food.',
    image: '/Images/gizzard.jpg',
    category: 'Pub & Grill',
    coordinates: [6.2400, 0.0900],
    rating: 4.4,
    phone: '+233 24 789 0123',
    amenities: ['Live Music', 'Sports TV', 'Outdoor Seating', 'Bar Games', 'Late Night'],
    longDescription: 'Alabama is Atimpoku\'s reliable evening option — a pub that understands its brief and executes it consistently. The grill does the heavy lifting: kebabs, smoked chicken, barbeque ribs, all coming off the fire with proper char. The bar is well-stocked, there are TVs for sports, and live music on weekends. The outdoor seating catches whatever breeze is moving. It is not a destination dining room; it is a place to eat grilled food and drink beer in company, and on those terms it delivers.'
  },
  {
    id: 'legacy-lounge',
    name: 'LEGACY LOUNGE & PUB',
    description: 'Bar/lounge with food and drinks — ideal for nightlife or social hangouts.',
    image: '/Images/grilled1.jpg',
    category: 'Pub & Grill',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    phone: '+233 24 890 1234',
    email: 'info@legacyloungepub.com',
    amenities: ['Live Music', 'VIP Lounge', 'Dance Floor', 'Cocktails', 'Private Events'],
    longDescription: 'The most polished nightlife option in Atimpoku. Legacy Lounge & Pub trades the rough edges of a standard local pub for mood lighting, a proper cocktail program, and a dance floor that sees action on weekends. The interior is deliberately styled — dark tones, comfortable seating, a VIP section for group bookings. The kitchen does bar food that is a cut above what the category demands. It is a venue designed for the evening hours, and in that context it succeeds.'
  },
  {
    id: 'royal-senchi-dining',
    name: 'The Royal Senchi Dining',
    description: 'Five-star resort dining on the Volta River with multiple restaurant options.',
    image: '/Images/buffet1.jpg',
    category: 'Resort Dining',
    coordinates: [6.1850, 0.0920],
    rating: 5.0,
    phone: '+233 34 229 5000',
    email: 'reservations@royalsenchi.com',
    bookingUrl: 'https://www.royalsenchi.com/dining',
    amenities: ['Riverside Dining', 'Fine Dining', 'Wine Cellar', 'Private Dining', 'Breakfast Buffet', 'Room Service'],
    longDescription: 'The Volta-facing dining operation at the Royal Senchi resort operates at a different standard from anything else in the district. The main restaurant runs an elaborate breakfast buffet and a dinner service with live cooking stations. The à la carte menu changes seasonally under the executive chef, who works Ghanaian ingredients into a contemporary framework — think smoked cassava purée paired with grilled river fish. The wine list is the most serious in the region, and the river terrace private dining is genuinely worth the premium. This is occasion dining, not everyday eating, and it owns that category completely.'
  },
  {
    id: 'aylos-bay-dining',
    name: 'Aylos Bay Garden Restaurant',
    description: 'Lake-view resort with dining facilities — perfect for meals with scenic surroundings.',
    image: '/Images/jollof2.jpg',
    category: 'Resort Dining',
    coordinates: [6.2300, 0.0900],
    rating: 4.7,
    phone: '+233 24 901 2345',
    email: 'aylosbay@gmail.com',
    amenities: ['Lake Views', 'Garden Setting', 'Outdoor Dining', 'Fresh Seafood', 'Family Friendly'],
    longDescription: 'The setting justifies the trip: a garden restaurant sloping toward the Volta Lake, with tables positioned to give every diner a water view. The kitchen leans into its lakeside location — tilapia and freshwater fish dominate the menu, simply prepared and let stand. The garden itself is a legitimate attraction, winding paths through mature tropical planting. Service operates on resort time. Worth it for a long lunch when the lake catches the afternoon light.'
  },
  {
    id: 'jamrok',
    name: 'Jamrok Pub',
    description: 'Local restaurant and catering service known for fufu and light soup.',
    image: '/Images/fuufu1.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0900],
    rating: 4.4,
    phone: '+233 24 012 3456',
    amenities: ['Catering', 'Local Cuisine', 'Event Hosting', 'Takeaway', 'Outdoor Seating'],
    longDescription: 'Jamrok operates a straightforward kitchen focused on Ghanaian staples, with fufu and light soup earning the most regular praise. The pub\'s primary distinction is its catering arm, which handles community events and corporate functions throughout Asuogyaman with reliability that has built a steady local clientele. The dining room itself is no-frills — the appeal is the food and the fact that it arrives quickly and tastes as expected. Tourists and regulars sit side by side, which is always a good sign in a local restaurant.'
  },
  {
    id: 'maritime-club',
    name: 'Maritime Club House',
    description: 'Popular restaurant in Akosombo with good food and lakeside vibes.',
    image: '/Images/kenkey.jpg',
    category: 'Local',
    coordinates: [6.3005, 0.0597],
    rating: 4.6,
    phone: '+233 24 111 2222',
    email: 'maritimeclub@yahoo.com',
    amenities: ['Lake Views', 'Live Sports', 'Bar', 'Parking', 'Family Friendly'],
    longDescription: 'Maritime Club House sits on the Akosombo lakefront and offers the kind of setting — open-sided bar overlooking the water — that makes it easy to stay longer than planned. The kitchen serves the full Ghanaian repertoire, but the kenkey with fried fish and shito has a genuine following. It draws a social crowd, with the bar doing steady business through the evening. The atmosphere is vocal and convivial, helped by a location that catches the lake breeze. Not a quiet dinner spot; a place to eat, drink, and be part of the room.'
  },
  {
    id: 'asuogyaman-foods',
    name: 'ASUOGYAMAN FOODS',
    description: 'Local food spot at the Atimpoku roundabout market — ideal for quick traditional eats.',
    image: '/Images/waakye1.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0900],
    rating: 4.2,
    phone: '+233 24 222 3333',
    amenities: ['Quick Service', 'Market Location', 'Local Cuisine', 'Takeaway', 'Budget Friendly'],
    longDescription: 'A market-side operation at the Atimpoku roundabout, doing one thing well: waakye. Rice and beans served with the full suite of accompaniments — spaghetti, gari, fried plantain, boiled egg, and your choice of meat or fish. The pace is fast, the turnover constant, and the queue at lunch confirms the reputation. This is street-level eating, eaten on plastic stools or taken away. It is not a restaurant; it is a food spot that understands exactly what it is and executes with speed and consistency.'
  },
  {
    id: 'vannelles-kitchen',
    name: 'Vannelles Kitchen',
    description: 'Small home-style kitchen with daily specials based on fresh market ingredients.',
    image: '/Images/rice1.jpg',
    category: 'Local',
    coordinates: [6.2400, 0.0000],
    rating: 4.7,
    phone: '+233 24 333 4444',
    email: 'vannelleskitchen@gmail.com',
    amenities: ['Home Cooking', 'Daily Specials', 'Takeaway', 'Family Style', 'Fresh Ingredients'],
    longDescription: 'Vannelles operates from a few-table dining room, and the menu reads like a shopping list from the morning market — because that is exactly what it is. The cook decides what to prepare based on what looked best at the stalls that day. The result is jollof rice with the proper smoked-bottom layer, meat stews that have cooked long enough for the flavors to settle, and daily specials that reward repeat visits. There is no menu board, no website, no pretense. You eat what is being cooked, and if the crowd of regulars is any indication, what is being cooked is worth building your day around.'
  },
  {
    id: 'akosombo-continental',
    name: 'Akosombo Continental Dining',
    description: 'Elegant dining experience with a mix of international and local cuisine overlooking the dam area.',
    image: '/Images/breakfast.jpg',
    category: 'Continental',
    coordinates: [6.3005, 0.0597],
    rating: 4.5,
    phone: '+233 24 444 5555',
    email: 'info@akosombocontinental.com',
    bookingUrl: 'https://akosombocontinental.com/reservations',
    amenities: ['Dam Views', 'Fine Dining', 'Wine List', 'Air Conditioning', 'Private Events', 'Valet Parking'],
    longDescription: 'Akosombo Continental occupies the formal-dining niche in the lakeside town, and it commits to the role. The dining room is air-conditioned and properly set, floor-to-ceiling windows frame the dam views, and the service follows a script that aims for professionalism. The menu splits between continental dishes — steaks, pastas, grilled fish — and Ghanaian offerings, presented with more plate discipline than the local norm. The wine list is short but sensible. It is the right call for a business dinner, an anniversary, or any meal that calls for a tablecloth and a reservation.'
  },
  {
    id: 'afrikiko-dining',
    name: 'Afrikiko River Front',
    description: 'Scenic riverside dining offering a variety of grills and local favorites in a relaxed atmosphere.',
    image: '/Images/food.jpg',
    category: 'Resort Dining',
    coordinates: [6.2400, 0.0900],
    rating: 4.6,
    phone: '+233 24 555 6666',
    email: 'info@afrikikoriverfront.com',
    amenities: ['Riverside Dining', 'Grill Specialties', 'Live Music', 'Bar', 'Outdoor Terrace', 'Parking'],
    longDescription: 'An open-air terrace perched over the Volta, a working grill, and live music on good nights — Afrikiko knows its strengths and sticks to them. The kitchen sends out grilled meats and fish with the proper char, alongside local staples done well enough to satisfy. The setting is the differentiator: the terrace sits directly above the water, and sunset turns the river into the kind of view that makes photography redundant. The live music programming leans local and adds genuine atmosphere without overwhelming the room. The kind of restaurant that would work anywhere with this view.'
  }
];

export const STAY: Stay[] = [
  {
    id: 'royal-senchi-stay',
    name: 'The Royal Senchi Resort/Hotel',
    description: 'Luxury lakeside resort in Senchi with excellent facilities, river views and fine dining.',
    image: '/Images/royal senchi room.jpg',
    category: 'Luxury',
    coordinates: [6.1850, 0.0920],
    rating: 5.0,
    phone: '+233 34 229 5000',
    email: 'reservations@royalsenchi.com',
    bookingUrl: 'https://www.royalsenchi.com',
    amenities: ['Lake View Rooms', 'Infinity Pool', 'Fine Dining', 'Spa & Wellness', 'Private Beach', 'WiFi', 'Room Service', 'Air Conditioning'],
    longDescription: 'The Royal Senchi Resort stands as the undisputed crown jewel of hospitality along the Volta River. This magnificent property seamlessly blends traditional Ghanaian architecture with contemporary luxury, offering guests an experience that is both culturally immersive and supremely comfortable. Each room and suite has been meticulously designed to maximize the breathtaking views of the lake, with floor-to-ceiling windows that frame the water like living art. The resort\'s infinity pool appears to merge with the lake itself, creating an unforgettable visual experience. Guests can indulge in the full-service spa, enjoy world-class dining at multiple restaurants, or simply relax on the private beach area. The Royal Senchi is not just a place to stay — it is a destination in itself.'
  },
  {
    id: 'bridgeview-resort',
    name: 'BridgeView Resort',
    description: 'Highly-rated hotel overlooking the Akosombo Dam & Volta Lake — ideal for romantic getaways or scenic stays.',
    image: '/Images/bridgeview.jpg',
    category: 'Luxury',
    coordinates: [6.2386, 0.0958],
    rating: 4.9,
    phone: '+233 24 666 7777',
    email: 'info@bridgeviewresort.com',
    bookingUrl: 'https://bridgeviewresort.com',
    amenities: ['Dam View Rooms', 'Swimming Pool', 'Restaurant', 'Bar', 'Parking', 'WiFi', 'Air Conditioning', 'Room Service'],
    longDescription: 'BridgeView Resort offers one of the most spectacular vantage points in all of Asuogyaman — a sweeping panorama that takes in both the majestic Akosombo Dam and the endless expanse of Lake Volta. The resort\'s architecture has been thoughtfully oriented to ensure that this view is the centerpiece of every guest\'s experience. Rooms are spacious and elegantly appointed, with private balconies that invite you to linger over morning coffee or evening cocktails while watching the sun set over the water. The resort has become particularly popular for romantic getaways, with special packages that include candlelit dinners on the terrace and couples\' spa treatments.'
  },
  {
    id: 'volta-hotel',
    name: 'Volta Hotel Akosombo',
    description: 'Historic hotel with comfortable rooms and proximity to local attractions like the dam and lake.',
    image: '/Images/vh.jpg',
    category: 'Mid-Range',
    coordinates: [6.3005, 0.0597],
    rating: 4.5,
    phone: '+233 34 229 3041',
    email: 'reservations@voltahotel.com',
    bookingUrl: 'https://voltahotel.com',
    amenities: ['Standard Rooms', 'Restaurant', 'Bar', 'Parking', 'WiFi', 'Air Conditioning', 'Conference Room'],
    longDescription: 'The Volta Hotel Akosombo holds a special place in the region\'s history as one of the original hotels built to accommodate visitors to the Akosombo Dam project. Today, it continues to welcome guests with the same spirit of hospitality, offering comfortable, well-maintained accommodations at a accessible price point. The hotel\'s location in the heart of Akosombo makes it an ideal base for exploring the area\'s attractions, including the dam, the lake, and the surrounding communities. Rooms are clean and functional, with all the essential amenities needed for a pleasant stay. The on-site restaurant serves both local and international dishes.'
  },
  {
    id: 'afrikiko-resort',
    name: 'AFRIKIKO RIVER FRONT RESORT',
    description: 'Popular resort with riverside views and relaxed atmosphere.',
    image: '/Images/afrikiko1.jpg',
    category: 'Luxury',
    coordinates: [6.2400, 0.0900],
    rating: 4.4,
    phone: '+233 24 777 8888',
    email: 'info@afrikikoresort.com',
    bookingUrl: 'https://afrikikoresort.com',
    amenities: ['Riverside Rooms', 'Outdoor Pool', 'Restaurant & Bar', 'Live Music', 'Garden', 'WiFi', 'Parking'],
    longDescription: 'AFRIKIKO RIVER FRONT RESORT embodies the laid-back luxury that defines the best of Volta River hospitality. The resort\'s design embraces its natural surroundings, with rooms and common areas that open onto the riverfront through expansive windows and verandas. The lush tropical gardens create a sense of privacy and tranquility, while the river provides a constantly changing backdrop of natural beauty. Guests can spend their days lounging by the pool, enjoying live music at the bar, or exploring the river by boat. The resort\'s restaurant is renowned for its grilled specialties and fresh local ingredients.'
  },
  {
    id: 'the-float',
    name: 'The FLOAT',
    description: 'Unique waterfront hotel in Akosombo with a modern vibe and great views of the Volta Lake.',
    image: '/Images/float.jpg',
    category: 'Luxury',
    coordinates: [6.3005, 0.0597],
    rating: 4.7,
    phone: '+233 24 888 9999',
    email: 'hello@thefloat.com',
    bookingUrl: 'https://thefloat.com',
    amenities: ['Waterfront Rooms', 'Modern Design', 'Rooftop Bar', 'Restaurant', 'WiFi', 'Air Conditioning', 'Boat Tours'],
    longDescription: 'The FLOAT brings a fresh, contemporary energy to the Akosombo hospitality scene. With its striking modern architecture and bold design choices, the property stands out as a destination for travelers who appreciate aesthetics as much as comfort. Each room features clean lines, minimalist furnishings, and floor-to-ceiling windows that flood the space with natural light and offer uninterrupted views of Lake Volta. The rooftop bar has quickly become one of the most popular spots in town, serving creative cocktails as the sun paints the sky in shades of gold and orange. The FLOAT also arranges boat tours for guests who want to experience the lake up close.'
  },
  {
    id: 'aylos-bay-stay',
    name: 'Aylos Bay Garden Restaurant & Lodge',
    description: 'Lakeside lodge and restaurant — perfect for meals with your stay.',
    image: '/Images/aylos room.jpg',
    category: 'Mid-Range',
    coordinates: [6.2300, 0.0900],
    rating: 4.3,
    phone: '+233 24 999 0000',
    email: 'aylosbaylodge@gmail.com',
    amenities: ['Garden View Rooms', 'Restaurant', 'Bar', 'Parking', 'WiFi', 'Outdoor Dining'],
    longDescription: 'Aylos Bay Garden Restaurant & Lodge offers a charming and intimate lodging experience that combines comfortable accommodations with exceptional dining. The lodge is set within beautifully maintained gardens that cascade down to the lakeshore, creating a serene environment that encourages relaxation and reflection. Rooms are cozy and thoughtfully appointed, with a style that reflects the natural surroundings. The on-site restaurant is a attraction in its own right, serving delicious meals that can be enjoyed in the garden or on the terrace overlooking the water. The combination of comfortable lodging and excellent food makes Aylos Bay a favorite for weekend getaways.'
  },
  {
    id: 'platinum-blue',
    name: 'PLATINUM BLUE ISLAND RESORT',
    description: 'Stylish resort in Atimpoku with a relaxed, upscale feel.',
    image: '/Images/platinum.jpg',
    category: 'Luxury',
    coordinates: [6.2400, 0.0900],
    rating: 4.6,
    phone: '+233 24 101 2020',
    email: 'reservations@platinumblue.com',
    bookingUrl: 'https://platinumblue.com',
    amenities: ['Pool', 'Restaurant', 'Bar', 'WiFi', 'Air Conditioning', 'Garden', 'Parking', 'Room Service'],
    longDescription: 'PLATINUM BLUE ISLAND RESORT brings a touch of contemporary elegance to the Atimpoku hospitality landscape. The resort\'s design philosophy centers on clean aesthetics and comfortable luxury, with each space carefully curated to create a sense of refined relaxation. The pool area is the social heart of the property, surrounded by loungers and shaded cabanas where guests can spend leisurely afternoons. The restaurant serves a sophisticated menu that draws inspiration from both Ghanaian and international culinary traditions. With its stylish ambiance and attentive service, Platinum Blue offers an upscale experience that feels both exclusive and welcoming.'
  },
  {
    id: 'penninsula-resort',
    name: 'Penninsula Resort and Hotel',
    description: 'A beautiful resort offering scenic views and comfortable accommodations in the heart of Asuogyaman.',
    image: '/Images/penninsula.jpg',
    category: 'Luxury',
    coordinates: [6.2500, 0.0800],
    rating: 4.8,
    phone: '+233 24 303 4040',
    email: 'info@penninsularesort.com',
    bookingUrl: 'https://penninsularesort.com',
    amenities: ['Lake View Rooms', 'Swimming Pool', 'Restaurant', 'Bar', 'Boat Cruises', 'WiFi', 'Parking', 'Air Conditioning'],
    longDescription: 'Penninsula Resort and Hotel occupies one of the most enviable locations in the Asuogyaman district, situated on a peninsula that offers unobstructed views of Lake Volta in nearly every direction. The resort takes full advantage of its setting, with rooms that open onto private balconies where guests can watch the boats drift across the lake. The property features a stunning swimming pool that seems to extend into the lake itself, a restaurant serving excellent local and international cuisine, and a bar that is the perfect spot for sunset cocktails. The resort also offers boat cruises that allow guests to explore the lake and its islands.'
  },
  {
    id: 'np-plaza',
    name: 'NP PLAZA HOTEL',
    description: 'Mid-range hotel in Atimpoku — good for business and casual travellers.',
    image: '/Images/np.jpg',
    category: 'Mid-Range',
    coordinates: [6.2400, 0.0900],
    rating: 4.1,
    phone: '+233 24 404 5050',
    email: 'npplaza@gmail.com',
    amenities: ['Standard Rooms', 'Restaurant', 'Bar', 'WiFi', 'Parking', 'Air Conditioning', 'Conference Room'],
    longDescription: 'NP PLAZA HOTEL offers reliable, comfortable accommodations in the center of Atimpoku, making it a practical choice for both business travelers and tourists exploring the region. The hotel provides clean, well-maintained rooms equipped with essential amenities at a reasonable price point. Its central location means that many of Atimpoku\'s attractions, restaurants, and transport links are within easy walking distance. The on-site restaurant serves satisfying meals throughout the day, and the bar provides a relaxed space for unwinding in the evening. For business travelers, the conference room offers a functional space for meetings and events.'
  },
  {
    id: 'raffin-royal',
    name: 'Raffin Royal Lodge',
    description: 'Affordable lodge in Akwamufie with a relaxed setting.',
    image: '/Images/raffin.jpg',
    category: 'Budget',
    coordinates: [6.2200, 0.0900],
    rating: 4.0,
    phone: '+233 24 505 6060',
    amenities: ['Basic Rooms', 'Parking', 'WiFi', 'Garden', 'Self Catering'],
    longDescription: 'Raffin Royal Lodge provides budget-conscious travelers with a comfortable and welcoming place to rest in the peaceful community of Akwamufie. The lodge offers simple, clean rooms that focus on the essentials — a good bed, clean linens, and a quiet environment for a restful night\'s sleep. The garden area provides a pleasant space for relaxing outdoors, and the self-catering facilities are ideal for guests who prefer to prepare their own meals. The lodge\'s location in Akwamufie offers a more tranquil alternative to the busier towns, while still being within reach of the region\'s main attractions.'
  },
  {
    id: 'bb-tributary',
    name: 'BB Tributary Hotel',
    description: 'Budget-friendly hotel close to Atimpoku.',
    image: '/Images/bb.jpg',
    category: 'Budget',
    coordinates: [6.2400, 0.0900],
    rating: 3.9,
    phone: '+233 24 606 7070',
    amenities: ['Basic Rooms', 'Restaurant', 'Bar', 'WiFi', 'Parking'],
    longDescription: 'BB Tributary Hotel offers straightforward, affordable accommodations just a short distance from the center of Atimpoku. The hotel is a solid choice for travelers who plan to spend most of their time exploring and simply need a comfortable base to return to at the end of the day. Rooms are basic but clean and functional, with all the necessary amenities for a comfortable stay. The on-site restaurant and bar provide convenient dining options without having to venture far. The friendly staff are knowledgeable about the local area and happy to offer recommendations for sightseeing and activities.'
  },
  {
    id: 'volta-safari',
    name: 'Volta Safari Guest House',
    description: 'Simple guest house near Senchi/Atimpoku offering basic amenities.',
    image: '/Images/safari.jpg',
    category: 'Budget',
    coordinates: [6.1850, 0.0920],
    rating: 3.8,
    phone: '+233 24 707 8080',
    amenities: ['Basic Rooms', 'WiFi', 'Parking', 'Garden'],
    longDescription: 'Volta Safari Guest House offers no-frills accommodations in a quiet location near Senchi, ideal for backpackers and budget travelers. The guest house provides clean, simple rooms with the essentials needed for a comfortable stay. The garden area offers a pleasant outdoor space for relaxing, and the peaceful surroundings ensure a good night\'s sleep. The location is convenient for visiting the nearby Royal Senchi Resort area and exploring the southern part of the Asuogyaman district. For travelers watching their budget, Volta Safari represents excellent value.'
  },
  {
    id: 'odo-so-royal',
    name: 'Odo So Royal Hotel',
    description: 'Comfortable mid-range choice on the Akosombo Road.',
    image: '/Images/odo.jpg',
    category: 'Mid-Range',
    coordinates: [6.2800, 0.0700],
    rating: 4.2,
    phone: '+233 24 808 9090',
    email: 'odosoroyal@gmail.com',
    amenities: ['Standard Rooms', 'Restaurant', 'Bar', 'WiFi', 'Parking', 'Air Conditioning', 'Room Service'],
    longDescription: 'Odo So Royal Hotel offers a comfortable mid-range option for travelers exploring the Akosombo area. Situated along the main Akosombo Road, the hotel is conveniently positioned for accessing both the dam and the surrounding attractions. Rooms are well-appointed with modern furnishings and amenities that ensure a pleasant stay. The restaurant serves a variety of local and continental dishes, and the bar offers a range of beverages in a relaxed setting. The staff are known for their warm hospitality and willingness to assist guests with any needs during their stay.'
  },
  {
    id: 'atta-korea',
    name: 'Atta Korea Guesthouse',
    description: 'Best and exceptional mid-range accomodation for travellers with comfortable feeling.',
    image: '/Images/Atta korea guest house.jpg',
    category: 'Mid-Range',
    coordinates: [6.2800, 0.0700],
    rating: 4.2,
    phone: '+233 24 909 0101',
    email: 'attakorea@yahoo.com',
    amenities: ['Standard Rooms', 'WiFi', 'Parking', 'Air Conditioning', 'Kitchen Access'],
    longDescription: 'Atta Korea Guesthouse has earned a reputation as one of the most comfortable mid-range accommodations in the Asuogyaman district. The guesthouse offers a home-away-from-home experience with thoughtfully designed rooms that prioritize comfort and relaxation. Guests particularly appreciate the cleanliness of the facilities and the warm, personal attention from the staff. The shared kitchen access is a valuable amenity for longer stays or for guests who prefer to prepare their own meals. The guesthouse\'s location provides easy access to both Akosombo and Atimpoku.'
  },
  {
    id: '3as-guesthouse',
    name: '3As Guesthouse',
    description: 'Budget hotel in Akosombo for travellers.',
    image: '/Images/3a.jpg',
    category: 'Budget',
    coordinates: [6.3005, 0.0597],
    rating: 3.7,
    phone: '+233 24 010 2020',
    amenities: ['Basic Rooms', 'WiFi', 'Parking'],
    longDescription: '3As Guesthouse provides essential accommodations for budget travelers visiting Akosombo. The guesthouse focuses on delivering clean, safe, and affordable rooms for guests who need a practical place to stay. While the amenities are basic, the guesthouse maintains good standards of cleanliness and the staff are helpful and accommodating. Its location in Akosombo puts guests within reach of the town\'s amenities and the nearby dam and lake attractions. For travelers on a tight budget, 3As offers a functional and economical choice.'
  },
  {
    id: 'alberjah-train',
    name: 'ALBERJAH TRAIN CITY GUEST HOUSE',
    description: 'Well-rated guest house near Atimpoku ideal for backpackers.',
    image: '/Images/alb.jpg',
    category: 'Budget',
    coordinates: [6.2400, 0.0900],
    rating: 4.3,
    phone: '+233 24 111 2222',
    email: 'alberjahtrain@gmail.com',
    amenities: ['Dormitory Beds', 'Private Rooms', 'WiFi', 'Common Area', 'Kitchen', 'Garden'],
    longDescription: 'ALBERJAH TRAIN CITY GUEST HOUSE stands out in the budget category for its exceptional ratings and welcoming atmosphere. The guest house has become a favorite among backpackers and solo travelers for its friendly social environment and helpful staff. Accommodation options range from affordable dormitory beds to private rooms, catering to different budgets and preferences. The common area and garden provide spaces for guests to socialize and share travel stories. The well-equipped kitchen is a valuable amenity for self-catering guests. The guest house\'s location near Atimpoku makes it convenient for exploring the region.'
  },
  {
    id: 'krotia-lodge',
    name: 'Krotia Lodge',
    description: 'Cozy lodge in Atimpoku.',
    image: '/Images/krotia.jpg',
    category: 'Budget',
    coordinates: [6.2400, 0.0900],
    rating: 3.9,
    phone: '+233 24 222 3333',
    amenities: ['Basic Rooms', 'WiFi', 'Parking', 'Garden'],
    longDescription: 'Krotia Lodge offers cozy, budget-friendly accommodations in the heart of Atimpoku. The lodge provides simple rooms that are clean and comfortable, perfect for travelers who need a convenient place to stay while exploring the town and surrounding attractions. The garden area provides a pleasant outdoor space for relaxation, and the location means that local restaurants, markets, and transport options are within easy walking distance. The staff are known for their friendly service and local knowledge.'
  },
  {
    id: 'santa-monica',
    name: 'Santa Monica Home Lodge',
    description: 'Boutique lodge in New Akrade, Akosombo.',
    image: '/Images/santa.jpg',
    category: 'Budget',
    coordinates: [6.3005, 0.0597],
    rating: 4.2,
    phone: '+233 24 333 4444',
    email: 'santamonicalodge@gmail.com',
    amenities: ['Standard Rooms', 'WiFi', 'Parking', 'Garden', 'Kitchen Access'],
    longDescription: 'Santa Monica Home Lodge in New Akrade offers a boutique budget experience with a personal touch. The lodge operates more like a extended-stay home than a traditional hotel, with comfortable rooms and shared spaces that encourage relaxation. The garden is a highlight, providing a tranquil outdoor space where guests can enjoy the fresh air and peaceful surroundings. The kitchen access is appreciated by guests who prefer to prepare their own meals. The lodge\'s location in New Akrade offers a quieter alternative to the main towns while still being within easy reach of Akosombo\'s attractions.'
  },
  {
    id: 'zito guest inn',
    name: 'Zito Guest Inn',
    description: 'Budget guest house at akosombo with excellent accomodation. It is closer to the Santa Barbara catholic Church.',
    image: '/Images/zito.jpg',
    category: 'Budget',
    coordinates: [6.3005, 0.0597],
    rating: 3.8,
    phone: '+233 24 444 5555',
    amenities: ['Basic Rooms', 'WiFi', 'Parking', 'Garden'],
    longDescription: 'Zito Guest Inn provides budget accommodations in Akosombo with a convenient location near the historic Santa Barbara Catholic Church. The guest house offers clean, functional rooms that provide good value for money. Its proximity to the church makes it a popular choice for visitors attending religious services or visiting the historic site. The staff are friendly and accommodating, ensuring that guests have everything they need for a comfortable stay. The garden area provides a pleasant space for relaxation after a day of exploration.'
  }
];

export const BUSINESS: Business[] = [
  {
    id: 'volta-river-authority',
    name: 'Volta River Authority',
    description: 'The state-owned agency responsible for the generation and transmission of electricity from the Akosombo Dam, a cornerstone of Ghana\'s energy sector.',
    image: '/Images/VRA.jpg',
    category: 'Services',
    coordinates: [6.3005, 0.0597],
    rating: 4.7,
    contact: '+233 34 229 3041',
    location: 'Akosombo'
  },
  {
    id: 'volta-lake-transport',
    name: 'Volta Lake Transport Limited',
    description: 'A key transport operator providing ferry and cargo services across the Volta Lake, connecting communities and facilitating trade along the waterway.',
    image: '/Images/vltc.png',
    category: 'Transport',
    coordinates: [6.3000, 0.0600],
    rating: 4.4,
    contact: '+233 24 777 1234',
    location: 'Akosombo'
  },
  {
    id: 'akosombo-industrial',
    name: 'Akosombo Industrial Company Limited',
    description: 'A major industrial enterprise based in Akosombo, contributing to manufacturing and economic development within the Asuogyaman District.',
    image: '/Images/623867663_2071003400300427_61196.jpg',
    category: 'Manufacturing',
    coordinates: [6.3005, 0.0597],
    rating: 4.3,
    contact: '+233 24 555 6789',
    location: 'Akosombo'
  },
  {
    id: 'goodroll-africa',
    name: 'GoodRoll Africa Ltd',
    description: 'An innovative agribusiness company focused on producing high-quality cassava-based products for local and international markets.',
    image: '/Images/good roll.jpg',
    category: 'Agriculture',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    contact: '+233 24 333 2109',
    location: 'Atimpoku'
  },
  {
    id: 'tropo-farms',
    name: 'Tropo Farms Ltd',
    description: 'A leading aquaculture farm specialising in tilapia fish farming on Lake Volta, supplying fresh fish to markets across Ghana.',
    image: '/Images/tropo.jpg',
    category: 'Agriculture',
    coordinates: [6.3500, 0.0500],
    rating: 4.6,
    contact: '+233 24 666 8765',
    location: 'Akosombo'
  },
  {
    id: 'west-africa-fish',
    name: 'West Africa Fish Ltd',
    description: 'A major fish processing and export company based on the Volta Lake, providing premium fish products to regional and international markets.',
    image: '/Images/west.jpg',
    category: 'Agriculture',
    coordinates: [6.2500, 0.0800],
    rating: 4.5,
    contact: '+233 24 444 3210',
    location: 'Senchi'
  },
  {
    id: 'cassava-processing',
    name: 'Cassava Processing Center',
    description: 'A local agro-processing facility that transforms cassava into gari, flour, and other value-added products for domestic consumption and export.',
    image: '/Images/cassava-processing.jpg',
    category: 'Agriculture',
    coordinates: [6.2400, 0.0900],
    rating: 4.2,
    contact: '+233 24 888 5678',
    location: 'Atimpoku'
  },
  {
    id: 'quarrying-construction',
    name: 'Quarrying and Construction Services',
    description: 'A critical local industry providing granite, stone, and construction materials for infrastructure development across the Asuogyaman District and beyond.',
    image: '/Images/quarry-aerial.jpg',
    category: 'Services',
    coordinates: [6.2200, 0.0900],
    rating: 4.3,
    contact: '+233 24 999 4321',
    location: 'Atimpoku'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'easter-funfair',
    name: 'Easter Funfair',
    description: 'A lively community celebration during the Easter season featuring games, music, food vendors, and family-friendly activities for all ages.',
    image: '/Images/easter.jpg',
    category: 'Cultural',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    date: 'March-April (Easter)',
    duration: '3 days'
  },
  {
    id: 'constitution-quiz',
    name: 'Ghana Constitution Quiz',
    description: 'An educational competition that tests knowledge of Ghana\'s constitution, promoting civic awareness and legal literacy among students and citizens.',
    image: '/Images/constitution.jpg',
    category: 'National',
    coordinates: [6.2400, 0.0900],
    rating: 4.3,
    date: 'January',
    duration: '1 day'
  },
  {
    id: 'green-ghana',
    name: 'Green Ghana Day',
    description: 'A national tree-planting campaign aimed at restoring forest cover, combating climate change, and creating a greener environment for future generations.',
    image: '/Images/cleanup.jpg',
    category: 'National',
    coordinates: [6.2400, 0.0900],
    rating: 4.6,
    date: 'June',
    duration: '1 day'
  },
  {
    id: 'ampem-educamp',
    name: 'Ampem Educamp',
    description: 'An educational camp programme designed to mentor and empower young students through skills training, career guidance, and leadership development.',
    image: '/Images/educamp.jpg',
    category: 'Cultural',
    coordinates: [6.2400, 0.0900],
    rating: 4.7,
    date: 'August',
    duration: '1 week'
  },
  {
    id: 'clean-ghana',
    name: 'Clean Ghana Day',
    description: 'A nationwide sanitation exercise where communities come together to clean their surroundings, promote hygiene, and inspire environmental stewardship.',
    image: '/Images/pageant.jpg',
    category: 'National',
    coordinates: [6.2400, 0.0900],
    rating: 4.4,
    date: 'November',
    duration: '1 day'
  },
  {
    id: 'peace-day',
    name: 'International Peace Day',
    description: 'A global observance promoting peace and unity, marked by community dialogues, cultural performances, and activities that foster harmony and conflict resolution.',
    image: '/Images/peace.jpg',
    category: 'National',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    date: 'September 21',
    duration: '1 day'
  },
  {
    id: 'akwamu-odwira',
    name: 'Akwamu Odwira Festival',
    description: 'A traditional purification and thanksgiving festival of the Akwamu people, featuring durbar of chiefs, drumming, dancing, and ancestral reverence.',
    image: '/Images/Akwamu festival.jpg',
    category: 'Cultural',
    coordinates: [6.2400, 0.0900],
    rating: 4.9,
    date: 'October-November',
    duration: '5 days'
  },
  {
    id: 'abolo-festival',
    name: 'Abolo Festival',
    description: 'A vibrant traditional festival celebrated by the Akwamu people, featuring durbar of chiefs, colourful cultural displays, drumming, dancing, and community feasting to mark the harvest season.',
    image: '/Images/abolo-festival.jpg',
    category: 'Cultural',
    coordinates: [6.2400, 0.0900],
    rating: 4.7,
    date: 'September-October',
    duration: '3 days'
  },
  {
    id: 'asuogyaman-tourism-arts',
    name: 'Asuogyaman Tourism and Art Festival',
    description: 'An annual showcase of local arts, crafts, music, and dance that promotes tourism and celebrates the rich cultural heritage of the Asuogyaman District.',
    image: '/Images/tourism festival.jpg',
    category: 'Arts',
    coordinates: [6.3500, 0.0500],
    rating: 4.8,
    date: 'December',
    duration: '5 days'
  },
  {
    id: 'end-child-marriage',
    name: 'End Child Marriage Declaration',
    description: 'A campaign and community awareness event dedicated to ending child marriage through advocacy, education, and empowerment of young girls.',
    image: '/Images/child.png',
    category: 'National',
    coordinates: [6.2400, 0.0900],
    rating: 4.6,
    date: 'February',
    duration: '1 day'
  },
  {
    id: 'akosombo-carnival',
    name: 'Akosombo Street Carnival',
    description: 'A vibrant street parade filled with colourful costumes, live music, dance troupes, and festivities that bring the entire community together in celebration.',
    image: '/Images/street carnival.jpg',
    category: 'Cultural',
    coordinates: [6.2400, 0.0900],
    rating: 4.7,
    date: 'December',
    duration: '2 days'
  },
  {
    id: 'farmers-day',
    name: 'Farmers Day Celebration',
    description: 'A national honour to recognise and celebrate the contributions of farmers and agricultural workers to food security and economic development.',
    image: '/Images/farmers day.jpg',
    category: 'Harvest',
    coordinates: [6.2400, 0.0900],
    rating: 4.5,
    date: 'First Friday of December',
    duration: '1 day'
  }
];

export const SCHOOLS: School[] = [
  {
    id: 'anum-presby',
    name: 'Anum Presbyterian Senior High School (ANSEC)',
    description: 'A public mixed senior high school located in Anum that offers a range of academic programmes and operates both day and boarding options.',
    image: '/Images/anum1.jpg',
    location: 'Anum',
    type: 'Public Mixed',
    phone: '+233 34 229 5001',
    email: 'anum-presby@ges.gov.gh',
    coordinates: [6.1450, 0.0800],
    programs: ['General Arts', 'General Science', 'Business', 'Visual Arts', 'Home Economics'],
    longDescription: 'Anum Presbyterian Senior High School, affectionately known as ANSEC, has been a cornerstone of secondary education in the Asuogyaman District for decades. Established by the Presbyterian Church of Ghana, the school combines academic excellence with strong moral and spiritual foundations. The campus is set in the serene town of Anum, providing an ideal environment for learning and personal development. ANSEC offers a comprehensive curriculum across multiple academic tracks, preparing students for tertiary education and future careers. The school\'s boarding facilities accommodate students from across the region, creating a vibrant community of young learners.'
  },
  {
    id: 'adjena-shs',
    name: 'Adjena Senior High/Technical School',
    description: 'A senior high school with technical components based in Adjena; provides day and boarding education.',
    image: '/Images/adjena1.jpg',
    location: 'Adjena',
    type: 'High/Technical',
    phone: '+233 34 229 5002',
    email: 'adjena-shs@ges.gov.gh',
    coordinates: [6.1700, 0.0700],
    programs: ['General Arts', 'General Science', 'Technical', 'Visual Arts', 'Business'],
    longDescription: 'Adjena Senior High/Technical School stands as a vital educational institution in the Asuogyaman District, uniquely combining traditional secondary education with practical technical training. Located in the peaceful community of Adjena, the school provides students with both academic knowledge and hands-on technical skills that prepare them for diverse career paths. The technical curriculum includes courses in woodwork, metalwork, and building construction, alongside the standard academic subjects. This dual focus ensures that graduates leave with both theoretical understanding and practical competencies that are highly valued in the job market.'
  },
  {
    id: 'apeguso-shs',
    name: 'Apeguso Senior High School',
    description: 'A mixed public SHS in Apeguso offering day and boarding options, focused on academic and moral development since its establishment in 1985.',
    image: '/Images/apesec.jpg',
    location: 'Apeguso',
    type: 'Public Mixed',
    phone: '+233 34 229 5003',
    email: 'apeguso-shs@ges.gov.gh',
    coordinates: [6.2100, 0.0750],
    programs: ['General Arts', 'General Science', 'Business', 'Agriculture', 'Home Economics'],
    longDescription: 'Founded in 1985, Apeguso Senior High School has built a strong reputation for academic achievement and character formation in the Asuogyaman District. The school\'s motto, "Discipline and Hard Work," reflects its commitment to producing well-rounded graduates who are prepared for the challenges of tertiary education and beyond. The campus features modern classrooms, science laboratories, and well-maintained boarding facilities that create a conducive learning environment. Apeguso SHS places particular emphasis on agricultural education, leveraging the region\'s rich agricultural heritage to provide students with practical farming skills.'
  },
  {
    id: 'akwamuman-shs',
    name: 'Akwamuman Senior High School',
    description: 'One of the well-known senior high schools in the district located in Atimpoku-Akosombo; offers programmes across arts, science, business, and more, with both boarding and day facilities.',
    image: '/Images/akwamuman.jpg',
    location: 'Atimpoku-Akosombo',
    type: 'Public Mixed',
    phone: '+233 34 229 5004',
    email: 'akwamuman-shs@ges.gov.gh',
    website: 'https://akwamumanshs.edu.gh',
    coordinates: [6.2386, 0.0958],
    programs: ['General Arts', 'General Science', 'Business', 'Visual Arts', 'Home Economics', 'Agriculture'],
    longDescription: 'Akwamuman Senior High School is one of the most prominent educational institutions in the Asuogyaman District, strategically located between the towns of Atimpoku and Akosombo. The school has earned a distinguished reputation for academic excellence, consistently producing outstanding results in the West African Senior School Certificate Examination (WASSCE). The campus boasts well-equipped science laboratories, a comprehensive library, computer lab, and extensive sports facilities. Akwamuman SHS offers one of the widest ranges of academic programs in the district, allowing students to pursue their interests across arts, sciences, business, and vocational tracks. The school\'s location provides easy access to the region\'s major attractions and transport links.'
  },
  {
    id: 'boso-shs',
    name: 'Boso Senior High Technical School (BOSSTECH)',
    description: 'Located in Boso, this SHS has a strong technical focus alongside general education and operates as a mixed day and boarding school.',
    image: '/Images/boso.jpg',
    location: 'Boso',
    type: 'Mixed Day/Boarding',
    phone: '+233 34 229 5005',
    email: 'boso-shs@ges.gov.gh',
    coordinates: [6.2800, 0.0650],
    programs: ['General Arts', 'General Science', 'Technical', 'Business', 'Visual Arts'],
    longDescription: 'Boso Senior High Technical School, popularly known as BOSSTECH, is a leading technical secondary institution in the Asuogyaman District. The school distinguishes itself through its strong emphasis on technical and vocational education, equipping students with practical skills that are immediately applicable in the workforce. BOSSTECH offers a balanced curriculum that combines core academic subjects with specialized technical training in fields such as carpentry, masonry, electrical installation, and metal fabrication. The school\'s workshops and equipment provide students with hands-on experience under the guidance of experienced instructors. BOSSTECH graduates are well-prepared for both tertiary education and direct entry into technical professions.'
  }
];

export interface Experience {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Water Adventures' | 'Cultural Tours' | 'Nature & Hiking' | 'Heritage & History' | 'Food & Dining' | 'Wellness & Relaxation';
  duration: string;
  price: string;
  rating?: number;
  highlights?: string[];
  longDescription?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'dodi-princess',
    name: 'Dodi Princess Cruise',
    description: 'Sail aboard the iconic Dodi Princess cruise boat across Lake Volta to Dodi Island. Enjoy live music, dancing, a sumptuous buffet, and breathtaking views of the lake and surrounding mountains.',
    image: '/Images/Dodi1.jpg',
    category: 'Water Adventures',
    duration: '6 hours',
    price: 'From GH¢350',
    rating: 4.9,
    highlights: ['Buffet lunch on board', 'Live DJ and dancing', 'Swimming at Dodi Island', 'Panoramic lake views', 'Family-friendly atmosphere'],
    longDescription: 'The Dodi Princess cruise is the quintessential Asuogyaman experience — a journey across the vast expanse of Lake Volta aboard the region\'s most famous cruise vessel. The day begins with boarding at the Akosombo port, where guests are greeted with welcome drinks and the sounds of live music. As the boat glides across the shimmering waters, passengers can soak in the panoramic views of the lake, the distant mountains, and the traditional fishing villages that dot the shoreline. The cruise includes a generous buffet lunch featuring both Ghanaian and continental dishes, followed by dancing and entertainment. The highlight is the stop at Dodi Island, where guests can swim, relax on the beach, or explore the island\'s natural beauty.'
  },
  {
    id: 'adomi-bridge-walk',
    name: 'Adomi Bridge Walk',
    description: 'Walk across Ghana\'s iconic suspension bridge spanning the Volta River at Atimpoku. Capture stunning photos and learn about the bridge\'s fascinating engineering history.',
    image: '/Images/adomi-bridge-aerial.jpg',
    category: 'Heritage & History',
    duration: '1 hour',
    price: 'Free',
    rating: 4.7,
    highlights: ['Iconic suspension bridge views', 'Photo opportunities', 'Historical engineering marvel', 'River panorama', 'Sunset vistas'],
    longDescription: 'The Adomi Bridge is not just a means of crossing the Volta River — it is a monument to Ghanaian engineering and one of the most photographed landmarks in the country. Walking across this historic suspension bridge offers an unparalleled perspective of the Volta River, with the water glistening far below and the lush hills of the Asuogyaman landscape stretching into the distance. The bridge\'s distinctive steel arch and suspended roadway create striking geometric patterns that photographers love. Local guides can share stories of the bridge\'s construction and its significance to the region, making this short walk a deeply enriching experience.'
  },
  {
    id: 'akosombo-dam-tour',
    name: 'Akosombo Dam Tour',
    description: 'Take a guided tour of Ghana\'s largest hydroelectric facility — a monumental engineering achievement that powers the nation. See the turbine hall, control room, and the massive dam wall up close.',
    image: '/Images/dam1.jpg',
    category: 'Heritage & History',
    duration: '2-3 hours',
    price: 'Free (prior booking required)',
    rating: 4.8,
    highlights: ['Turbine hall access', 'Control room viewing', 'Dam wall walkway', 'Historical exhibits', 'Lake Volta overlook'],
    longDescription: 'The Akosombo Dam is one of Africa\'s largest man-made structures and the cornerstone of Ghana\'s energy infrastructure. This guided tour takes visitors behind the scenes of the Volta River Authority\'s flagship facility, offering a rare glimpse into the operations that generate electricity for millions of Ghanaians. The tour includes visits to the impressive turbine hall, where massive generators hum with the power of the Volta River, the control room that manages the entire power generation process, and the dam wall itself, which offers breathtaking views of both Lake Volta and the river downstream. The on-site museum provides historical context through photographs, documents, and artifacts from the dam\'s construction era.'
  },
  {
    id: 'lake-volta-boat',
    name: 'Private Lake Volta Boat Tour',
    description: 'Charter a private boat for a personalized exploration of Lake Volta. Visit fishing villages, spot wildlife, enjoy a picnic on a secluded beach, and watch the sunset over the water.',
    image: '/Images/Dodi4.jpg',
    category: 'Water Adventures',
    duration: '3-4 hours',
    price: 'From GH¢500',
    rating: 4.9,
    highlights: ['Private charter experience', 'Fishing village visits', 'Wildlife spotting', 'Secluded beach picnic', 'Sunset on the lake'],
    longDescription: 'For those seeking a more intimate and flexible experience on Lake Volta, a private boat tour is the perfect choice. These charters can be tailored to your preferences — whether you want to visit traditional fishing villages along the shoreline, explore the quieter coves and inlets, or find the perfect spot for a picnic on a secluded beach. Experienced local boat captains navigate the waters with skill, sharing their knowledge of the lake\'s ecology, history, and communities. The tours often include opportunities to see local wildlife, from water birds to monitor lizards basking on the rocks. As the afternoon turns to evening, the lake transforms with the colors of sunset, creating a magical conclusion to the adventure.'
  },
  {
    id: 'akwamu-hiking',
    name: 'Akwamu Gorge Hiking Adventure',
    description: 'Explore the rugged trails of the Akwamu Gorge Community Forest. Hike through dense vegetation, discover hidden waterfalls, and enjoy panoramic views of the Volta region.',
    image: '/Images/akw gorge.jpg',
    category: 'Nature & Hiking',
    duration: '3-5 hours',
    price: 'From GH¢100',
    rating: 4.7,
    highlights: ['Guided forest hike', 'Waterfall discovery', 'Bird watching', 'Panoramic viewpoints', 'Community conservation'],
    longDescription: 'The Akwamu Gorge Community Forest is a haven for nature lovers and adventure seekers. The hiking trails wind through lush tropical vegetation, past towering trees draped with vines, and alongside streams that cascade down the hillsides. The forest is home to a rich diversity of bird species, making it a prime destination for birdwatchers. The hike culminates at a series of viewpoints that offer sweeping panoramas of the Volta River and the surrounding landscape. The forest is managed as a community conservation project, so your visit directly supports local environmental protection efforts. Guides are knowledgeable about the forest\'s ecology and cultural significance.'
  },
  {
    id: 'cultural-village',
    name: 'Akwamu Traditional Village Tour',
    description: 'Immerse yourself in Akwamu culture with a guided tour of traditional villages. Witness ancient customs, visit the Akwamufie Palace, and participate in traditional drumming and dancing.',
    image: '/Images/Akwamufie palace.jpg',
    category: 'Cultural Tours',
    duration: '4 hours',
    price: 'From GH¢150',
    rating: 4.8,
    highlights: ['Akwamufie Palace visit', 'Traditional drumming session', 'Chief\'s court ceremony', 'Local craft demonstrations', 'Cultural storytelling'],
    longDescription: 'This cultural immersion experience takes you into the heart of Akwamu heritage. The tour begins with a visit to the Akwamufie Palace, the seat of the Akwamu traditional authority, where you will learn about the rich history of the Akwamu Kingdom. Depending on the schedule, you may witness a chief\'s court ceremony or meet with community elders who share stories passed down through generations. The experience includes a hands-on drumming and dancing session where you can learn traditional rhythms and movements. Local artisans demonstrate crafts such as bead-making, pottery, and kente weaving, offering insights into skills that have been preserved for centuries.'
  },
  {
    id: 'tilapia-fishing',
    name: 'Tilapia Fishing Experience',
    description: 'Join local fishermen on Lake Volta for an authentic fishing experience. Learn traditional and modern fishing techniques, and taste your catch grilled fresh on the lakeshore.',
    image: '/Images/tilapia1.jpg',
    category: 'Food & Dining',
    duration: '4 hours',
    price: 'From GH¢200',
    rating: 4.6,
    highlights: ['Traditional fishing methods', 'Lake Volta aquaculture', 'Fresh fish grilling', 'Local fisherman guidance', 'Lakeside dining'],
    longDescription: 'Lake Volta is one of Africa\'s most important inland fisheries, and this experience offers a window into the lives of the fishermen who work its waters. Accompanied by experienced local fishermen, you will venture onto the lake in a traditional canoe to learn fishing techniques that have been used for generations, as well as modern methods employed by the region\'s thriving aquaculture industry. You will learn about the different fish species in the lake, particularly the renowned tilapia that has made the region famous. After the catch, your guides will prepare the fish on the lakeshore, grilling it with traditional spices and serving it with banku, kenkey, or fried yams for an authentic lakeside meal.'
  },
  {
    id: 'sunset-cruise',
    name: 'Sunset River Cruise',
    description: 'An intimate evening cruise on the Volta River as the sun paints the sky in gold and crimson. Perfect for couples or small groups seeking a romantic experience.',
    image: '/Images/adomi gh.jpg',
    category: 'Water Adventures',
    duration: '2 hours',
    price: 'From GH¢250',
    rating: 4.9,
    highlights: ['Romantic sunset setting', 'Premium drinks included', 'Small group intimacy', 'Photography paradise', 'Live acoustic music'],
    longDescription: 'The Sunset River Cruise is designed for those who appreciate life\'s more refined pleasures. As the heat of the day gives way to the cool evening breeze, your boat sets off from the shore for a leisurely journey across the golden waters of the Volta River. The sky transforms through a palette of warm colors — from brilliant gold to deep orange to dusky purple — creating a constantly changing backdrop that photographers will adore. Premium drinks are served as you glide across the water, and on select evenings, a live acoustic musician provides the perfect soundtrack. This intimate experience is limited to small groups, ensuring a peaceful and personal connection with the river.'
  },
  {
    id: 'bird-watching',
    name: 'Bird Watching at Akwamu Gorge',
    description: 'Discover the rich avian diversity of the Akwamu Gorge Community Forest. Spot resident and migratory birds with the guidance of expert local naturalists.',
    image: '/Images/Akwamu Gorge1.jpg',
    category: 'Nature & Hiking',
    duration: '3 hours',
    price: 'From GH¢120',
    rating: 4.5,
    highlights: ['Expert naturalist guide', 'Rare bird species', 'Early morning sessions', 'Photography blinds', 'Conservation education'],
    longDescription: 'The Akwamu Gorge Community Forest is a hidden paradise for bird enthusiasts. The forest\'s diverse habitats — from riverine woodland to dense forest thickets — support an impressive array of bird species. Guided bird-watching walks start early in the morning when the forest is most active, with the calls of sunbirds, barbets, hornbills, and kingfishers filling the air. Your naturalist guide will help identify species by both sight and sound, sharing insights into their behavior and ecology. The forest\'s conservation program has made it a safe haven for both resident and migratory birds. Photography enthusiasts will appreciate the strategic blinds set up at prime viewing locations.'
  },
  {
    id: 'resort-day-pass',
    name: 'Luxury Resort Day Pass',
    description: 'Enjoy a full day of luxury at one of Asuogyaman\'s premier resorts. Access infinity pools, private beaches, spa facilities, and world-class dining for the ultimate relaxation day.',
    image: '/Images/penninsula.jpg',
    category: 'Wellness & Relaxation',
    duration: 'Full day',
    price: 'From GH¢300',
    rating: 4.8,
    highlights: ['Pool & beach access', 'Spa treatments', 'Gourmet lunch', 'Wellness activities', 'Scenic grounds'],
    longDescription: 'You don\'t need to be an overnight guest to experience the luxury of Asuogyaman\'s finest resorts. The Day Pass program gives you full access to the facilities of premier properties like The Royal Senchi, Peninsula Resort, or BridgeView Resort. Spend your morning lounging by the infinity pool with the lake stretching out before you, indulge in a spa treatment using locally inspired products, enjoy a gourmet lunch at the resort\'s signature restaurant, and explore the beautifully landscaped grounds. Many resorts also offer complimentary wellness activities such as yoga sessions, nature walks, or boat tours. It is the perfect way to experience the high life, even on a tight schedule.'
  }
];

