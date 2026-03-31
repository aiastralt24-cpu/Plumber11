import type {
  City,
  CityServicePage,
  FAQ,
  Review,
  Service,
  ServiceCoverageZone
} from "@/types/domain";

const cityFaq = (city: string): FAQ[] => [
  {
    question: `How much does a plumber cost in ${city}?`,
    answer:
      "Most small fixes begin in the low hundreds, while larger repairs depend on site conditions, materials, and emergency timing."
  },
  {
    question: `Are your plumbers in ${city} available at night?`,
    answer:
      "Yes. Emergency call and WhatsApp channels stay open 24/7, with response time varying by neighbourhood coverage."
  },
  {
    question: `How fast can a plumber reach my area in ${city}?`,
    answer:
      "Launch zones are configured for a 30-minute average response window, and the pincode checker clarifies exact coverage."
  },
  {
    question: `Do you share pricing before work begins in ${city}?`,
    answer:
      "Yes. Teams confirm the issue, scope, and estimated price band before starting the job so there are no hidden surprises."
  },
  {
    question: `Do I get an invoice or service record after plumbing work?`,
    answer:
      "Admin and CRM workflows are set up to record the booking, completion, and follow-up, including review outreach after the job is closed."
  }
];

export const launchCities: City[] = [
  {
    id: "city-mumbai",
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    phoneNumber: "09810001001",
    whatsappNumber: "919810001001",
    responseTimeMinutes: 30,
    jobsCompleted: 1420,
    plumbersOnNetwork: 42,
    heroImage:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Mumbai | 24/7 Fast Response | PlumbRight",
    metaDescription:
      "Book verified plumbers in Mumbai for leakage, drainage, bathroom fitting, emergency repairs, and same-day visits.",
    neighbourhoods: ["Andheri", "Borivali", "Thane", "Navi Mumbai", "Powai", "Dadar"],
    heroHeadline: "Expert Plumbers in Mumbai — Available 24/7",
    heroSubheadline: "Trusted by 1,400+ households. Same-day service. Verified professionals.",
    bodyCopy: [
      "Mumbai plumbing demand is hyper-local and urgent, so the page architecture prioritises immediate action, transparent pricing, and trust signals before anything else.",
      "PlumbRight Mumbai is structured to convert mobile traffic into calls, WhatsApp inquiries, and fast lead submissions with clean routing across the city’s busiest residential zones.",
      "Every section on the city page is tuned to answer the three decisions users make in seconds: can someone come fast, can I trust them, and do I have a rough cost range before I commit."
    ],
    faq: cityFaq("Mumbai"),
    featuredReviewIds: ["review-1", "review-2"],
    launchReady: true
  },
  {
    id: "city-bangalore",
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    phoneNumber: "09810001002",
    whatsappNumber: "919810001002",
    responseTimeMinutes: 28,
    jobsCompleted: 1180,
    plumbersOnNetwork: 35,
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Bangalore | Emergency & Same-Day Service | PlumbRight",
    metaDescription:
      "Fast, verified plumbers in Bangalore for leaks, drain cleaning, bathroom repair, and emergency plumbing.",
    neighbourhoods: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "JP Nagar"],
    heroHeadline: "Expert Plumbers in Bangalore — Available 24/7",
    heroSubheadline: "Trusted by 1,100+ households. Transparent pricing. Fast local dispatch.",
    bodyCopy: [
      "Bangalore combines planned repair demand with high-intent emergency searches, so the city build balances rich SEO coverage with immediate conversion behavior.",
      "The page system highlights neighbourhood coverage, city-specific review proof, and visible call-first actions for renters, homeowners, and facilities managers alike."
    ],
    faq: cityFaq("Bangalore"),
    featuredReviewIds: ["review-3"],
    launchReady: true
  },
  {
    id: "city-delhi",
    slug: "delhi",
    name: "Delhi",
    state: "Delhi NCR",
    phoneNumber: "09810001003",
    whatsappNumber: "919810001003",
    responseTimeMinutes: 32,
    jobsCompleted: 1325,
    plumbersOnNetwork: 39,
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Delhi | 24/7 Citywide Support | PlumbRight",
    metaDescription:
      "Trusted Delhi plumbers for urgent leaks, fittings, drain cleaning, and transparent same-day support.",
    neighbourhoods: ["Dwarka", "Rohini", "Lajpat Nagar", "Saket", "Karol Bagh"],
    heroHeadline: "Expert Plumbers in Delhi — Available 24/7",
    heroSubheadline: "Trusted by 1,300+ households. Citywide support. Verified professionals.",
    bodyCopy: [
      "Delhi pages are built for broad intent coverage with city-specific copy, pricing context, and lead capture that escalates urgent jobs immediately.",
      "The supporting content gives both emergency and research-oriented users enough confidence to convert without burying the fastest path to contact."
    ],
    faq: cityFaq("Delhi"),
    featuredReviewIds: ["review-4"],
    launchReady: true
  },
  {
    id: "city-hyderabad",
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    phoneNumber: "09810001004",
    whatsappNumber: "919810001004",
    responseTimeMinutes: 29,
    jobsCompleted: 910,
    plumbersOnNetwork: 27,
    heroImage:
      "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Hyderabad | Same-Day Repairs | PlumbRight",
    metaDescription:
      "Book plumbers in Hyderabad for leak repair, tank cleaning, bathroom work, and fast emergency support.",
    neighbourhoods: ["Gachibowli", "Madhapur", "Kukatpally", "Banjara Hills", "Miyapur"],
    heroHeadline: "Expert Plumbers in Hyderabad — Available 24/7",
    heroSubheadline: "Trusted by 900+ households. Same-day service. No hidden charges.",
    bodyCopy: [
      "Hyderabad is modelled as a high-growth launch market with room for neighbourhood expansion, so the architecture preserves clear Phase 2 entry points.",
      "The launch page emphasizes speed, professionalism, and local service reliability across residential and mixed-use zones."
    ],
    faq: cityFaq("Hyderabad"),
    featuredReviewIds: ["review-5"],
    launchReady: true
  },
  {
    id: "city-pune",
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    phoneNumber: "09810001005",
    whatsappNumber: "919810001005",
    responseTimeMinutes: 31,
    jobsCompleted: 820,
    plumbersOnNetwork: 23,
    heroImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Pune | Bathroom & Repair Specialists | PlumbRight",
    metaDescription:
      "Verified plumbers in Pune for bathroom fitting, tap repair, drain cleaning, emergency plumbing, and more.",
    neighbourhoods: ["Baner", "Kothrud", "Wakad", "Viman Nagar", "Hadapsar"],
    heroHeadline: "Expert Plumbers in Pune — Available 24/7",
    heroSubheadline: "Trusted by 800+ households. Fast dispatch. Transparent pricing.",
    bodyCopy: [
      "Pune’s launch content balances homeowners researching costs with users who need immediate repair support, so page copy stays concise but commercially useful.",
      "Cross-linking between service pages and city-service pages is part of the core SEO strategy from the first release."
    ],
    faq: cityFaq("Pune"),
    featuredReviewIds: ["review-6"],
    launchReady: true
  },
  {
    id: "city-ahmedabad",
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    phoneNumber: "09810001006",
    whatsappNumber: "919810001006",
    responseTimeMinutes: 33,
    jobsCompleted: 760,
    plumbersOnNetwork: 21,
    heroImage:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Ahmedabad | Fast Local Response | PlumbRight",
    metaDescription:
      "Ahmedabad plumbers for tap repair, leakage fixes, pipe fitting, drainage issues, and urgent calls.",
    neighbourhoods: ["Vastrapur", "Navrangpura", "Bopal", "Maninagar", "Satellite"],
    heroHeadline: "Expert Plumbers in Ahmedabad — Available 24/7",
    heroSubheadline: "Trusted by 700+ households. Verified professionals. Same-day service.",
    bodyCopy: [
      "Ahmedabad pages lean into local search intent and clean mobile conversion paths, keeping the city structure scalable for future tier-two expansion playbooks.",
      "Launch content focuses on trust, speed, and problem-specific routing across high-demand residential clusters."
    ],
    faq: cityFaq("Ahmedabad"),
    featuredReviewIds: ["review-7"],
    launchReady: true
  },
  {
    id: "city-surat",
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    phoneNumber: "09810001007",
    whatsappNumber: "919810001007",
    responseTimeMinutes: 34,
    jobsCompleted: 640,
    plumbersOnNetwork: 19,
    heroImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Surat | Verified Service Teams | PlumbRight",
    metaDescription:
      "Book trusted plumbers in Surat for toilet repair, leakage issues, drainage work, and emergency support.",
    neighbourhoods: ["Adajan", "Vesu", "Katargam", "Althan", "Piplod"],
    heroHeadline: "Expert Plumbers in Surat — Available 24/7",
    heroSubheadline: "Trusted by 600+ households. Verified teams. Fast response.",
    bodyCopy: [
      "Surat is positioned as an underserved but high-intent search market, so launch coverage prioritises keyword depth and operational readiness over decorative UI.",
      "Conversion surfaces remain call-first with backup WhatsApp and short-form submission paths."
    ],
    faq: cityFaq("Surat"),
    featuredReviewIds: ["review-8"],
    launchReady: true
  },
  {
    id: "city-jaipur",
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    phoneNumber: "09810001008",
    whatsappNumber: "919810001008",
    responseTimeMinutes: 35,
    jobsCompleted: 520,
    plumbersOnNetwork: 17,
    heroImage:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    metaTitle: "Expert Plumbers in Jaipur | 24/7 Support | PlumbRight",
    metaDescription:
      "Jaipur plumbing services for bathroom repairs, pipe fitting, drain cleaning, and urgent help across launch zones.",
    neighbourhoods: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Jagatpura", "C-Scheme"],
    heroHeadline: "Expert Plumbers in Jaipur — Available 24/7",
    heroSubheadline: "Trusted by 500+ households. City-first support. Transparent quotes.",
    bodyCopy: [
      "Jaipur launches as a growth city with strong local search coverage and room for later Hindi content expansion without changing route architecture.",
      "The city template keeps the mobile viewport efficient, action-heavy, and tuned for high-intent service discovery."
    ],
    faq: cityFaq("Jaipur"),
    featuredReviewIds: ["review-9"],
    launchReady: true
  }
];

export const services: Service[] = [
  {
    id: "svc-pipe-leakage-repair",
    slug: "pipe-leakage-repair",
    name: "Pipe Leakage Repair",
    shortDescription: "Pipe burst, hidden seepage, and urgent leak fixes.",
    fullDescription: [
      "PlumbRight handles active leaks, wall seepage, and pipe bursts with city-dispatched technicians and transparent scope confirmation before work begins.",
      "Each service page explains the problem, typical causes, the visit process, and indicative local pricing so users can act without uncertainty."
    ],
    iconName: "Droplets",
    priceMin: 300,
    priceMax: 800,
    durationHours: 1.5,
    isEmergencyEligible: true
  },
  {
    id: "svc-bathroom-fitting",
    slug: "bathroom-fitting",
    name: "Bathroom Fitting & Renovation",
    shortDescription: "Fixture upgrades, bathroom fitting, and remodel support.",
    fullDescription: ["Professional fitting support for planned upgrades and renovation work."],
    iconName: "Bath",
    priceMin: 1200,
    priceMax: 4500,
    durationHours: 5,
    isEmergencyEligible: false
  },
  {
    id: "svc-tap-installation",
    slug: "tap-installation",
    name: "Tap & Faucet Installation",
    shortDescription: "Mixer fitting, tap replacement, and faucet repairs.",
    fullDescription: ["Quick fixes and replacements for faulty taps and faucets."],
    iconName: "Wrench",
    priceMin: 200,
    priceMax: 500,
    durationHours: 1,
    isEmergencyEligible: false
  },
  {
    id: "svc-drain-cleaning",
    slug: "drain-cleaning",
    name: "Drainage Blockage Removal",
    shortDescription: "Clogged drain and slow drainage clearing.",
    fullDescription: ["Drain cleaning support for homes, apartments, and recurring blockage issues."],
    iconName: "Pipette",
    priceMin: 500,
    priceMax: 1200,
    durationHours: 1.5,
    isEmergencyEligible: true
  },
  {
    id: "svc-water-tank-repair",
    slug: "water-tank-repair",
    name: "Overhead Tank Repair & Cleaning",
    shortDescription: "Overflow fixes, cracks, and tank cleaning.",
    fullDescription: ["Repair and maintenance support for residential overhead water tanks."],
    iconName: "Container",
    priceMin: 900,
    priceMax: 2200,
    durationHours: 3,
    isEmergencyEligible: false
  },
  {
    id: "svc-water-motor-fitting",
    slug: "water-motor-fitting",
    name: "Water Motor Fitting",
    shortDescription: "Pump installation, fitting, and repair support.",
    fullDescription: ["Water motor installation and maintenance for reliable water flow."],
    iconName: "Gauge",
    priceMin: 1100,
    priceMax: 2800,
    durationHours: 2.5,
    isEmergencyEligible: false
  },
  {
    id: "svc-kitchen-sink-plumbing",
    slug: "kitchen-sink-plumbing",
    name: "Kitchen Sink Plumbing",
    shortDescription: "Under-sink fitting, repair, and drainage fixes.",
    fullDescription: ["Kitchen sink leakage, choking, and fixture support."],
    iconName: "CookingPot",
    priceMin: 400,
    priceMax: 950,
    durationHours: 1.5,
    isEmergencyEligible: true
  },
  {
    id: "svc-geyser-plumbing",
    slug: "geyser-plumbing",
    name: "Geyser / Water Heater Connection",
    shortDescription: "Water heater plumbing, installation, and repair.",
    fullDescription: ["Safe connection and maintenance support for water heaters and geysers."],
    iconName: "Flame",
    priceMin: 650,
    priceMax: 1800,
    durationHours: 2,
    isEmergencyEligible: false
  },
  {
    id: "svc-toilet-repair",
    slug: "toilet-repair",
    name: "Toilet & Flush Tank Repair",
    shortDescription: "Flush mechanism, cistern, and toilet repair support.",
    fullDescription: ["Fast repair support for toilets, seats, tanks, and flushing issues."],
    iconName: "PocketKnife",
    priceMin: 350,
    priceMax: 900,
    durationHours: 1.2,
    isEmergencyEligible: true
  },
  {
    id: "svc-emergency-plumbing",
    slug: "emergency-plumbing",
    name: "Emergency Plumbing",
    shortDescription: "24/7 urgent response for leaks, bursts, and severe blockages.",
    fullDescription: ["Call-first emergency support optimized for fast dispatch."],
    iconName: "Siren",
    priceMin: 700,
    priceMax: 2000,
    durationHours: 1.5,
    isEmergencyEligible: true
  },
  {
    id: "svc-pipe-fitting",
    slug: "pipe-fitting",
    name: "Pipe Fitting & Installation",
    shortDescription: "New pipe laying, CPVC and PPR fitting work.",
    fullDescription: ["Installation-focused service for planned fitting jobs and upgrades."],
    iconName: "HardHat",
    priceMin: 900,
    priceMax: 3000,
    durationHours: 3.5,
    isEmergencyEligible: false
  },
  {
    id: "svc-waterproofing-plumbing",
    slug: "waterproofing-plumbing",
    name: "Waterproofing & Seepage Repair",
    shortDescription: "Seepage, damp walls, and waterproofing-linked plumbing work.",
    fullDescription: ["Combined plumbing and seepage mitigation support."],
    iconName: "ShieldCheck",
    priceMin: 1500,
    priceMax: 5000,
    durationHours: 5,
    isEmergencyEligible: false
  }
];

export const comboPages: CityServicePage[] = launchCities.flatMap((city) =>
  services.slice(0, 5).map((service) => ({
    id: `${city.slug}-${service.slug}`,
    citySlug: city.slug,
    serviceSlug: service.slug,
    customH1: `${service.name} in ${city.name} | Fast Local Response`,
    customBody: [
      `${service.name} in ${city.name} is configured as a long-tail SEO landing page with pricing visibility, city-specific proof, and low-friction conversion paths.`,
      `The page template connects problem explanation, local context, related services, and immediate lead capture without sacrificing load speed.`
    ],
    localPriceMin: service.priceMin,
    localPriceMax: service.priceMax + 200,
    publish: true
  }))
);

export const reviews: Review[] = [
  {
    id: "review-1",
    citySlug: "mumbai",
    serviceSlug: "pipe-leakage-repair",
    reviewerName: "Neha S.",
    reviewerArea: "Andheri West",
    rating: 5,
    reviewText: "Quick response, clean work, and the pricing was explained before the repair started.",
    date: "2026-03-10",
    isFeatured: true
  },
  {
    id: "review-2",
    citySlug: "mumbai",
    serviceSlug: "drain-cleaning",
    reviewerName: "Rohit M.",
    reviewerArea: "Powai",
    rating: 5,
    reviewText: "Called late evening and still got a same-night fix for a severe blockage.",
    date: "2026-03-02",
    isFeatured: true
  },
  {
    id: "review-3",
    citySlug: "bangalore",
    reviewerName: "Asha K.",
    reviewerArea: "Indiranagar",
    rating: 5,
    reviewText: "The WhatsApp flow was smooth and the plumber arrived inside the promised window.",
    date: "2026-02-27",
    isFeatured: true
  },
  {
    id: "review-4",
    citySlug: "delhi",
    reviewerName: "Imran P.",
    reviewerArea: "Saket",
    rating: 4,
    reviewText: "Helpful team, transparent pricing, and good follow-up after the job.",
    date: "2026-02-18",
    isFeatured: true
  },
  {
    id: "review-5",
    citySlug: "hyderabad",
    reviewerName: "Meghana V.",
    reviewerArea: "Madhapur",
    rating: 5,
    reviewText: "Great service for an urgent pipeline issue with good communication throughout.",
    date: "2026-02-16",
    isFeatured: true
  },
  {
    id: "review-6",
    citySlug: "pune",
    reviewerName: "Varun D.",
    reviewerArea: "Baner",
    rating: 4,
    reviewText: "Bathroom fitting job was handled professionally and finished on time.",
    date: "2026-02-11",
    isFeatured: true
  },
  {
    id: "review-7",
    citySlug: "ahmedabad",
    reviewerName: "Hetal R.",
    reviewerArea: "Satellite",
    rating: 5,
    reviewText: "Very easy to book and the technician explained the root cause clearly.",
    date: "2026-02-07",
    isFeatured: true
  },
  {
    id: "review-8",
    citySlug: "surat",
    reviewerName: "Jay P.",
    reviewerArea: "Vesu",
    rating: 4,
    reviewText: "Fast response for a toilet issue and no hidden charges during billing.",
    date: "2026-02-05",
    isFeatured: true
  },
  {
    id: "review-9",
    citySlug: "jaipur",
    reviewerName: "Priya T.",
    reviewerArea: "Malviya Nagar",
    rating: 5,
    reviewText: "The call-back came in minutes and the repair was scheduled right away.",
    date: "2026-02-01",
    isFeatured: true
  }
];

export const coverageZones: ServiceCoverageZone[] = launchCities.flatMap((city) =>
  city.neighbourhoods.map((area, index) => ({
    id: `${city.slug}-${area.toLowerCase().replace(/\s+/g, "-")}`,
    citySlug: city.slug,
    areaName: area,
    pincode: `${400000 + index + city.slug.length}`.slice(0, 6),
    responseTimeMinutes: city.responseTimeMinutes,
    isServiceable: index < 4
  }))
);
