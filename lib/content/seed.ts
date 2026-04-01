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

const supportedCityNames = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri & Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan & Dombivali",
  "Vasai Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Haora",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Solapur",
  "Hubli and Dharwad",
  "Bareilly",
  "Moradabad",
  "Gurgaon",
  "Aligarh",
  "Jalandhar",
  "Tiruchirappalli",
  "Bhubaneswar",
  "Salem",
  "Mira and Bhayander",
  "Thiruvananthapuram",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Guntur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai Nagar",
  "Warangal",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Nanded Waghala",
  "Kolapur",
  "Ajmer",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Nellore",
  "Jammu",
  "Sangli Miraj Kupwad",
  "Belgaum",
  "Mangalore",
  "Ambattur",
  "Tirunelveli",
  "Malegoan",
  "Gaya",
  "Jalgaon",
  "Udaipur"
];

const cityImagePool = [
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"
];

const cityOverrides: Record<string, Partial<City>> = {
  mumbai: {
    state: "Maharashtra",
    responseTimeMinutes: 30,
    jobsCompleted: 1420,
    plumbersOnNetwork: 42,
    neighbourhoods: ["Andheri", "Borivali", "Thane", "Navi Mumbai", "Powai", "Dadar"],
    featuredReviewIds: ["review-1", "review-2"]
  },
  delhi: {
    state: "Delhi NCR",
    responseTimeMinutes: 32,
    jobsCompleted: 1325,
    plumbersOnNetwork: 39,
    neighbourhoods: ["Dwarka", "Rohini", "Lajpat Nagar", "Saket", "Karol Bagh"],
    featuredReviewIds: ["review-4"]
  },
  bangalore: {
    state: "Karnataka",
    responseTimeMinutes: 28,
    jobsCompleted: 1180,
    plumbersOnNetwork: 35,
    neighbourhoods: ["Indiranagar", "Whitefield", "Koramangala", "HSR Layout", "JP Nagar"],
    featuredReviewIds: ["review-3"]
  },
  hyderabad: {
    state: "Telangana",
    responseTimeMinutes: 29,
    jobsCompleted: 910,
    plumbersOnNetwork: 27,
    neighbourhoods: ["Gachibowli", "Madhapur", "Kukatpally", "Banjara Hills", "Miyapur"],
    featuredReviewIds: ["review-5"]
  },
  ahmedabad: {
    state: "Gujarat",
    responseTimeMinutes: 33,
    jobsCompleted: 760,
    plumbersOnNetwork: 21,
    neighbourhoods: ["Vastrapur", "Navrangpura", "Bopal", "Maninagar", "Satellite"],
    featuredReviewIds: ["review-7"]
  },
  surat: {
    state: "Gujarat",
    responseTimeMinutes: 34,
    jobsCompleted: 640,
    plumbersOnNetwork: 19,
    neighbourhoods: ["Adajan", "Vesu", "Katargam", "Althan", "Piplod"],
    featuredReviewIds: ["review-8"]
  },
  pune: {
    state: "Maharashtra",
    responseTimeMinutes: 31,
    jobsCompleted: 820,
    plumbersOnNetwork: 23,
    neighbourhoods: ["Baner", "Kothrud", "Wakad", "Viman Nagar", "Hadapsar"],
    featuredReviewIds: ["review-6"]
  },
  jaipur: {
    state: "Rajasthan",
    responseTimeMinutes: 35,
    jobsCompleted: 520,
    plumbersOnNetwork: 17,
    neighbourhoods: ["Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Jagatpura", "C-Scheme"],
    featuredReviewIds: ["review-9"]
  },
  chennai: { state: "Tamil Nadu" },
  kolkata: { state: "West Bengal" },
  lucknow: { state: "Uttar Pradesh" },
  kanpur: { state: "Uttar Pradesh" },
  nagpur: { state: "Maharashtra" },
  indore: { state: "Madhya Pradesh" },
  thane: { state: "Maharashtra" },
  bhopal: { state: "Madhya Pradesh" },
  visakhapatnam: { state: "Andhra Pradesh" },
  patna: { state: "Bihar" },
  vadodara: { state: "Gujarat" }
};

function slugifyCity(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function phoneNumberFor(index: number) {
  return String(9810000001 + index).padStart(11, "0");
}

function buildCityBodyCopy(name: string, slug: string, index: number) {
  const variants = [
    [
      `${name} is mapped as a high-intent local plumbing market where users usually need quick reassurance on response time, price range, and whether a verified technician can reach their exact locality without delay.`,
      `PlumbRight ${name} is structured to convert those visits into calls, WhatsApp chats, and form enquiries by combining local service intent, visible trust markers, and deeper page coverage than a generic city listing.`
    ],
    [
      `In ${name}, plumbing demand often clusters around apartment maintenance, kitchen and bathroom leakage, drainage blockages, and urgent overflow situations that require a dispatch-led local page rather than a broad marketplace directory.`,
      `The ${name} content stack is intentionally built with city pages, service pages, and neighbourhood-style expansion paths so users can land on specific problems, evaluate credibility quickly, and move toward booking without friction.`
    ],
    [
      `${name} works best as a city-first SEO market because plumbing search intent is usually immediate, location-sensitive, and trust-sensitive at the same time.`,
      `That is why the PlumbRight ${name} page combines local response signals, structured service detail, and area coverage cues in a way that feels useful to real users while still creating room for scalable search coverage.`
    ]
  ];

  return variants[(slug.length + index) % variants.length];
}

function buildComboBody(city: City, service: Service, index: number) {
  const variants = [
    [
      `${service.name} in ${city.name} is written as a dedicated high-intent landing page for users who already know the problem category and need a local team that can respond quickly without sending them through irrelevant service menus.`,
      `The page combines practical scope explanation, city-specific pricing bands, and direct conversion paths so ${city.name} visitors can move from search to booking with less hesitation.`,
      `${service.name} demand across ${city.name} often overlaps with surrounding issues like older fitting wear, concealed leakage, drainage complications, or urgent bathroom disruption, so this page also links users into related service journeys when the issue evolves after inspection.`
    ],
    [
      `Users searching for ${service.name.toLowerCase()} in ${city.name} usually want proof that the provider actually serves the city, understands the job type, and can give a sensible price direction before work begins.`,
      `This city-service page is built around that behaviour, giving ${city.name} households a cleaner path into local plumber dispatch, follow-up through WhatsApp, and quick escalation for urgent cases.`,
      `By tying ${service.name.toLowerCase()} directly to ${city.name}, the content stays more useful and more SEO-friendly than a generic national page reused without local context.`
    ],
    [
      `${city.name} searchers looking for ${service.name.toLowerCase()} often compare speed, trust, and pricing transparency before they compare anything else.`,
      `PlumbRight uses this ${city.name} page to make those decisions easier with area-aware routing, service-specific context, and a layout focused on real plumbing intent instead of thin keyword stuffing.`,
      `That structure helps the page cover search depth, improve internal linking, and support better lead quality for ${service.name.toLowerCase()} requests inside ${city.name}.`
    ]
  ];

  return variants[index % variants.length];
}

export const launchCities: City[] = supportedCityNames.map((name, index) => {
  const slug = slugifyCity(name);
  const override = cityOverrides[slug] ?? {};
  const phoneNumber = override.phoneNumber ?? phoneNumberFor(index);
  const heroHeadline = override.heroHeadline ?? `Expert Plumbers in ${name} — Available 24/7`;
  const heroSubheadline =
    override.heroSubheadline ??
    `Trusted across ${name}. Same-day service. Verified professionals with clear local response windows.`;

  return {
    id: override.id ?? `city-${slug}`,
    slug,
    name,
    state: override.state ?? "India",
    phoneNumber,
    whatsappNumber: override.whatsappNumber ?? `91${phoneNumber.slice(1)}`,
    responseTimeMinutes: override.responseTimeMinutes ?? (28 + (index % 8)),
    jobsCompleted: override.jobsCompleted ?? Math.max(180, 1450 - index * 11),
    plumbersOnNetwork: override.plumbersOnNetwork ?? Math.max(10, 42 - Math.floor(index / 4)),
    heroImage: override.heroImage ?? cityImagePool[index % cityImagePool.length],
    metaTitle: override.metaTitle ?? `Expert Plumbers in ${name} | 24/7 Fast Response | PlumbRight`,
    metaDescription:
      override.metaDescription ??
      `Book trusted plumbers in ${name} for leakage, drainage, pipe fitting, bathroom repair, and urgent same-day support.`,
    neighbourhoods:
      override.neighbourhoods ?? ["Central District", "East Zone", "West Zone", "North Sector", "South Sector"],
    heroHeadline,
    heroSubheadline,
    bodyCopy:
      override.bodyCopy ?? buildCityBodyCopy(name, slug, index),
    faq: override.faq ?? cityFaq(name),
    featuredReviewIds: override.featuredReviewIds ?? [],
    launchReady: override.launchReady ?? true
  };
});

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
  services.map((service, index) => ({
    id: `${city.slug}-${service.slug}`,
    citySlug: city.slug,
    serviceSlug: service.slug,
    customH1: `${service.name} in ${city.name} | Fast Local Response`,
    customBody: buildComboBody(city, service, index),
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
