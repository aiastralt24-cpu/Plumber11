import { launchCities, services } from "@/lib/content/seed";
import type { AreaPage, City, FAQ } from "@/types/domain";

const cityAreaOverrides: Record<string, string[]> = {
  mumbai: [
    "Andheri West",
    "Bandra",
    "Powai",
    "Dadar",
    "Borivali",
    "Chembur",
    "Goregaon",
    "Mulund",
    "Worli",
    "Kurla"
  ],
  delhi: [
    "Dwarka",
    "Rohini",
    "Lajpat Nagar",
    "Saket",
    "Karol Bagh",
    "Janakpuri",
    "Pitampura",
    "Vasant Kunj",
    "Paschim Vihar",
    "Greater Kailash"
  ],
  bangalore: [
    "Indiranagar",
    "Whitefield",
    "Koramangala",
    "HSR Layout",
    "JP Nagar",
    "Electronic City",
    "Marathahalli",
    "Sarjapur Road",
    "Jayanagar",
    "Hebbal"
  ],
  hyderabad: [
    "Gachibowli",
    "Madhapur",
    "Kukatpally",
    "Banjara Hills",
    "Miyapur",
    "Kondapur",
    "Manikonda",
    "Secunderabad",
    "Ameerpet",
    "Begumpet"
  ],
  ahmedabad: [
    "Vastrapur",
    "Navrangpura",
    "Bopal",
    "Maninagar",
    "Satellite",
    "Prahlad Nagar",
    "Thaltej",
    "Naranpura",
    "Bodakdev",
    "Chandkheda"
  ],
  chennai: [
    "Anna Nagar",
    "T Nagar",
    "Velachery",
    "Adyar",
    "Porur",
    "Medavakkam",
    "Tambaram",
    "OMR",
    "Chromepet",
    "Perungudi"
  ],
  kolkata: [
    "Salt Lake",
    "New Town",
    "Ballygunge",
    "Behala",
    "Dum Dum",
    "Howrah Maidan",
    "Park Street",
    "Garia",
    "Tollygunge",
    "Rajarhat"
  ],
  pune: [
    "Baner",
    "Kothrud",
    "Wakad",
    "Viman Nagar",
    "Hadapsar",
    "Hinjewadi",
    "Aundh",
    "Pimple Saudagar",
    "Kharadi",
    "Magarpatta"
  ],
  surat: [
    "Adajan",
    "Vesu",
    "Katargam",
    "Althan",
    "Piplod",
    "Pal",
    "Athwa",
    "Udhna",
    "Varachha",
    "City Light"
  ],
  jaipur: [
    "Malviya Nagar",
    "Vaishali Nagar",
    "Mansarovar",
    "Jagatpura",
    "C-Scheme",
    "Vidhyadhar Nagar",
    "Tonk Road",
    "Pratap Nagar",
    "Bani Park",
    "Raja Park"
  ],
  lucknow: [
    "Gomti Nagar",
    "Aliganj",
    "Indira Nagar",
    "Hazratganj",
    "Jankipuram",
    "Mahanagar",
    "Ashiyana",
    "Rajajipuram",
    "Alambagh",
    "Chinhat"
  ],
  noida: [
    "Sector 18",
    "Sector 62",
    "Sector 137",
    "Sector 76",
    "Sector 50",
    "Sector 78",
    "Sector 150",
    "Sector 104",
    "Sector 93",
    "Sector 121"
  ],
  gurgaon: [
    "DLF Phase 1",
    "DLF Phase 2",
    "Sohna Road",
    "Golf Course Road",
    "Sector 56",
    "Sector 57",
    "Sector 67",
    "Palam Vihar",
    "Sushant Lok",
    "New Gurgaon"
  ],
  ghaziabad: [
    "Indirapuram",
    "Vaishali",
    "Raj Nagar Extension",
    "Kaushambi",
    "Crossings Republik",
    "Vasundhara",
    "Sahibabad",
    "Kavi Nagar",
    "Nehru Nagar",
    "Shalimar Garden"
  ],
  "navi-mumbai": [
    "Vashi",
    "Nerul",
    "Belapur",
    "Kharghar",
    "Airoli",
    "Ghansoli",
    "Panvel",
    "Kamothe",
    "Seawoods",
    "CBD Belapur"
  ]
};

const fallbackAreaSuffixes = [
  "City Centre",
  "Civil Lines",
  "Station Road",
  "Main Market",
  "Industrial Area",
  "Lake View",
  "North Extension",
  "South Colony",
  "West Enclave",
  "East Nagar"
];

const bodyTemplates = [
  (city: City, areaName: string) =>
    `${areaName} in ${city.name} tends to generate urgent plumbing demand around leakage control, choke removal, bathroom fixture failures, and water pressure instability in both flats and independent homes.`,
  (city: City, areaName: string) =>
    `PlumbRight builds ${areaName} coverage around fast phone pickup, clear service pricing, and technician routing that matches the local density, building style, and same-day service expectation within ${city.name}.`,
  (city: City, areaName: string) =>
    `Instead of pushing users into a generic city page, this ${areaName} page is written to answer local intent directly, with service links, response expectations, and area-specific trust signals that help conversion without thin copy.`
];

const alternateTemplates = [
  (city: City, areaName: string) =>
    `Homes and commercial units in ${areaName} usually need a plumber who can move quickly from diagnosis to fix, especially for concealed seepage, kitchen drain blockages, motor fitting issues, and toilet repair work.`,
  (city: City, areaName: string) =>
    `This page positions ${areaName} as a micro-service zone within ${city.name}, so searchers get sharper context, relevant service journeys, and clearer reasons to call rather than bouncing back to broad marketplace listings.`,
  (city: City, areaName: string) =>
    `For SEO and usability, the copy here stays specific to ${areaName} while still connecting into the wider ${city.name} service network, giving users nearby service coverage, review proof, and next-click paths into detailed service pages.`
];

function slugifyArea(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hash(input: string) {
  let value = 0;
  for (const character of input) {
    value = (value * 31 + character.charCodeAt(0)) % 100000;
  }
  return value;
}

function buildFallbackAreas(city: City) {
  const seeded = [...city.neighbourhoods];
  let pointer = 0;
  while (seeded.length < 10) {
    const suffix = fallbackAreaSuffixes[pointer % fallbackAreaSuffixes.length];
    seeded.push(`${city.name} ${suffix}`);
    pointer += 1;
  }
  return seeded.slice(0, 10);
}

function buildAreaFaq(city: City, areaName: string): FAQ[] {
  return [
    {
      question: `Do you offer same-day plumber service in ${areaName}, ${city.name}?`,
      answer: `Yes. ${areaName} requests are routed through the ${city.name} dispatch desk and same-day slots are prioritised for leakage, blockage, overflow, and urgent bathroom issues.`
    },
    {
      question: `How much does a plumber cost in ${areaName}?`,
      answer: `Minor repairs in ${areaName} usually start from entry-level service pricing, while larger pipe fitting, waterproofing, or renovation-linked work is quoted after problem confirmation and site details.`
    },
    {
      question: `Can I book a plumber in ${areaName} through WhatsApp?`,
      answer: `Yes. You can call or use WhatsApp to share the issue, building type, and preferred time, and the ${city.name} team will guide the next step quickly.`
    },
    {
      question: `What kind of plumbing jobs are commonly booked in ${areaName}?`,
      answer: `The most common jobs include pipe leakage repair, drain choking, toilet repair, tap replacement, kitchen sink issues, and water motor or tank troubleshooting.`
    }
  ];
}

function createAreaPage(city: City, areaName: string, position: number): AreaPage {
  const selector = hash(`${city.slug}-${areaName}`);
  const primary = selector % bodyTemplates.length;
  const secondary = selector % alternateTemplates.length;
  const popularServices = services
    .filter((service) => service.isEmergencyEligible || position % 2 === 0)
    .slice(0, 4)
    .map((service) => service.name);

  return {
    id: `${city.slug}-${slugifyArea(areaName)}`,
    citySlug: city.slug,
    cityName: city.name,
    areaName,
    areaSlug: slugifyArea(areaName),
    heroHeadline: `Plumber Services in ${areaName}, ${city.name}`,
    metaTitle: `Plumber in ${areaName}, ${city.name} | Same-Day Plumbing Service | PlumbRight`,
    metaDescription: `Book a trusted plumber in ${areaName}, ${city.name} for pipe leakage, blockage, bathroom fitting, tank repair, and urgent same-day support with clear local response times.`,
    bodyCopy: [
      bodyTemplates[primary](city, areaName),
      alternateTemplates[secondary](city, areaName),
      `Popular requests around ${areaName} include ${popularServices.slice(0, 3).join(", ")}, along with inspection-led visits where the issue is not fully visible before arrival.`
    ],
    highlights: [
      `${city.responseTimeMinutes}-${city.responseTimeMinutes + 6} minute target across ${areaName}`,
      `Call and WhatsApp routing linked to the ${city.name} dispatch desk`,
      `Transparent pricing bands before larger repair work begins`,
      `Fast handoff to nearby service pages for specialised plumbing needs`
    ],
    faq: buildAreaFaq(city, areaName)
  };
}

export const cityAreaPages: AreaPage[] = launchCities.flatMap((city) => {
  const areas = cityAreaOverrides[city.slug] ?? buildFallbackAreas(city);
  return areas.slice(0, 10).map((areaName, index) => createAreaPage(city, areaName, index));
});
