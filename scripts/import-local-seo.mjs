import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TITLE_MIN = 45;
const TITLE_MAX = 70;
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 170;

const requiredCityColumns = [
  "city",
  "slug",
  "state",
  "phone",
  "whatsapp",
  "priority_tier",
  "response_minutes",
  "jobs_completed",
  "plumbers_on_network",
  "meta_title",
  "meta_description",
  "hero_h1",
  "hero_subheadline"
];

const requiredAreaColumns = [
  "city_slug",
  "area_name",
  "area_slug",
  "pincode",
  "priority",
  "is_serviceable",
  "area_meta_title",
  "area_meta_description"
];

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const next = line[index + 1];

    if (character === '"' && next === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  values.push(current.trim());
  return values;
}

function readCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  return lines.slice(1).map((line, index) => {
    const values = parseCsvLine(line);
    const row = { __line: index + 2 };
    headers.forEach((header, headerIndex) => {
      row[header] = values[headerIndex]?.trim() ?? "";
    });
    return row;
  });
}

function hasColumns(rows, columns, source, errors) {
  const first = rows[0] ?? {};
  for (const column of columns) {
    if (!(column in first)) {
      errors.push({ source, line: 1, field: column, message: `Missing required column: ${column}` });
    }
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toInteger(value, fallback = 0) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) ? number : fallback;
}

function toBoolean(value) {
  return ["1", "true", "yes", "y", "published"].includes(String(value).toLowerCase());
}

function validateMeta(value, min, max, source, line, field, errors) {
  if (value.length < min || value.length > max) {
    errors.push({
      source,
      line,
      field,
      message: `${field} should be ${min}-${max} characters; received ${value.length}`
    });
  }
}

function buildCityBody(row) {
  return [
    `${row.city} plumbing customers need fast help for leakage repair, blocked drains, toilet issues, tap replacement, water tank work, and emergency plumbing calls.`,
    `Plumberdost ${row.city} combines city-routed phone support, WhatsApp booking, transparent price bands, and area pages so users can confirm service coverage before booking.`,
    `The ${row.city} page is designed for local search intent with service links, pricing context, answer blocks, and locality coverage instead of thin directory-style content.`
  ];
}

function buildCityFaq(row) {
  return [
    {
      question: `How fast can a plumber reach in ${row.city}?`,
      answer: `The ${row.city} response target is around ${row.response_minutes} minutes in active service zones, with timing confirmed when you call or message.`
    },
    {
      question: `What is the starting price for plumber service in ${row.city}?`,
      answer: "Small plumbing fixes start from the listed service price bands, while larger pipe, seepage, and fitting jobs are quoted after issue confirmation."
    },
    {
      question: `Can I book a plumber in ${row.city} on WhatsApp?`,
      answer: `Yes. Use the ${row.city} WhatsApp number to share your area, issue, photos if available, and preferred service time.`
    },
    {
      question: `Do you serve all areas of ${row.city}?`,
      answer: `The page lists active ${row.city} areas. If your exact area is not listed, the support team can confirm availability before booking.`
    }
  ];
}

function buildAreaBody(city, area) {
  return [
    `${area.area_name} in ${city.city} receives frequent plumbing requests for pipe leakage, drain choking, toilet repair, tap installation, kitchen sink work, and water tank issues.`,
    `This locality page helps ${area.area_name} customers check service coverage, response expectations, and booking options without relying on a generic city page.`,
    `Plumberdost routes ${area.area_name} enquiries through the ${city.city} support flow, with phone and WhatsApp confirmation before a technician visit is finalised.`
  ];
}

function buildAreaFaq(city, area) {
  return [
    {
      question: `Do you offer plumber service in ${area.area_name}, ${city.city}?`,
      answer: `Yes. ${area.area_name} is listed as an active Plumberdost service area for ${city.city} when serviceability is enabled.`
    },
    {
      question: `How fast can a plumber reach ${area.area_name}?`,
      answer: `Response depends on live technician availability, but ${area.area_name} requests are routed through the ${city.city} dispatch workflow.`
    },
    {
      question: `Can I book by WhatsApp from ${area.area_name}?`,
      answer: `Yes. Share your exact address, problem, and preferred timing on WhatsApp before the visit is confirmed.`
    }
  ];
}

function writeErrors(errors, outputPath) {
  const header = "source,line,field,message";
  const body = errors
    .map((error) =>
      [error.source, error.line, error.field, error.message]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
  fs.writeFileSync(outputPath, `${header}\n${body}\n`);
}

async function main() {
  const cityPath = getArg("--cities");
  const areaPath = getArg("--areas");
  const pricingPath = getArg("--pricing");
  const dryRun = process.argv.includes("--dry-run");
  const errors = [];

  if (!cityPath || !areaPath) {
    throw new Error("Usage: npm run seo:import -- --cities ./cities.csv --areas ./areas.csv [--pricing ./pricing.csv] [--dry-run]");
  }

  const cities = readCsv(cityPath);
  const areas = readCsv(areaPath);
  const pricing = pricingPath ? readCsv(pricingPath) : [];

  hasColumns(cities, requiredCityColumns, "cities", errors);
  hasColumns(areas, requiredAreaColumns, "areas", errors);

  const citySlugs = new Set();
  const cityBySlug = new Map();

  for (const row of cities) {
    const expectedSlug = slugify(row.city);
    if (!row.city || !row.slug || !row.phone || !row.whatsapp) {
      errors.push({ source: "cities", line: row.__line, field: "required", message: "City, slug, phone, and WhatsApp are required" });
    }

    if (citySlugs.has(row.slug)) {
      errors.push({ source: "cities", line: row.__line, field: "slug", message: `Duplicate city slug: ${row.slug}` });
    }

    if (row.slug !== expectedSlug) {
      errors.push({ source: "cities", line: row.__line, field: "slug", message: `Slug should be ${expectedSlug}` });
    }

    validateMeta(row.meta_title, TITLE_MIN, TITLE_MAX, "cities", row.__line, "meta_title", errors);
    validateMeta(row.meta_description, DESCRIPTION_MIN, DESCRIPTION_MAX, "cities", row.__line, "meta_description", errors);

    citySlugs.add(row.slug);
    cityBySlug.set(row.slug, row);
  }

  const areasByCity = new Map();
  const seenAreas = new Set();

  for (const row of areas) {
    const key = `${row.city_slug}:${row.area_slug}`;

    if (!cityBySlug.has(row.city_slug)) {
      errors.push({ source: "areas", line: row.__line, field: "city_slug", message: `Unknown city slug: ${row.city_slug}` });
    }

    if (seenAreas.has(key)) {
      errors.push({ source: "areas", line: row.__line, field: "area_slug", message: `Duplicate area slug in city: ${key}` });
    }

    if (["central-district", "east-zone", "west-zone", "north-sector", "south-sector"].includes(row.area_slug)) {
      errors.push({ source: "areas", line: row.__line, field: "area_slug", message: "Placeholder area names are not allowed" });
    }

    validateMeta(row.area_meta_title, TITLE_MIN, TITLE_MAX, "areas", row.__line, "area_meta_title", errors);
    validateMeta(row.area_meta_description, DESCRIPTION_MIN, DESCRIPTION_MAX, "areas", row.__line, "area_meta_description", errors);

    seenAreas.add(key);
    areasByCity.set(row.city_slug, [...(areasByCity.get(row.city_slug) ?? []), row]);
  }

  for (const city of cities) {
    const cityAreas = areasByCity.get(city.slug) ?? [];
    if (cityAreas.length !== 10) {
      errors.push({
        source: "areas",
        line: city.__line,
        field: "city_slug",
        message: `${city.slug} must have exactly 10 areas; received ${cityAreas.length}`
      });
    }
  }

  if (errors.length > 0) {
    const outputPath = path.resolve(process.cwd(), "seo-import-errors.csv");
    writeErrors(errors, outputPath);
    throw new Error(`Import blocked by ${errors.length} validation errors. See ${outputPath}`);
  }

  if (dryRun) {
    console.log(`Dry run passed: ${cities.length} cities, ${areas.length} areas, ${pricing.length} pricing rows.`);
    return;
  }

  await prisma.$transaction(async (tx) => {
    for (const row of cities) {
      await tx.city.upsert({
        where: { slug: row.slug },
        update: {
          name: row.city,
          state: row.state,
          isActive: true,
          priorityTier: toInteger(row.priority_tier, 3),
          phoneNumber: row.phone,
          whatsappNumber: row.whatsapp,
          responseTimeMinutes: toInteger(row.response_minutes, 35),
          jobsCompleted: toInteger(row.jobs_completed),
          plumbersOnNetwork: toInteger(row.plumbers_on_network),
          metaTitle: row.meta_title,
          metaDescription: row.meta_description,
          heroHeadline: row.hero_h1,
          heroSubheadline: row.hero_subheadline,
          bodyCopy: buildCityBody(row),
          faq: buildCityFaq(row)
        },
        create: {
          slug: row.slug,
          name: row.city,
          state: row.state,
          isActive: true,
          priorityTier: toInteger(row.priority_tier, 3),
          phoneNumber: row.phone,
          whatsappNumber: row.whatsapp,
          responseTimeMinutes: toInteger(row.response_minutes, 35),
          jobsCompleted: toInteger(row.jobs_completed),
          plumbersOnNetwork: toInteger(row.plumbers_on_network),
          metaTitle: row.meta_title,
          metaDescription: row.meta_description,
          heroHeadline: row.hero_h1,
          heroSubheadline: row.hero_subheadline,
          bodyCopy: buildCityBody(row),
          faq: buildCityFaq(row)
        }
      });
    }

    for (const row of areas) {
      const city = await tx.city.findUniqueOrThrow({ where: { slug: row.city_slug } });
      await tx.neighbourhood.upsert({
        where: {
          cityId_slug: {
            cityId: city.id,
            slug: row.area_slug
          }
        },
        update: {
          name: row.area_name,
          pincode: row.pincode,
          isServiceable: toBoolean(row.is_serviceable),
          priority: toInteger(row.priority, 10),
          metaTitle: row.area_meta_title,
          metaDescription: row.area_meta_description,
          bodyCopy: buildAreaBody(cityBySlug.get(row.city_slug), row),
          faq: buildAreaFaq(cityBySlug.get(row.city_slug), row)
        },
        create: {
          cityId: city.id,
          name: row.area_name,
          slug: row.area_slug,
          pincode: row.pincode,
          isServiceable: toBoolean(row.is_serviceable),
          priority: toInteger(row.priority, 10),
          metaTitle: row.area_meta_title,
          metaDescription: row.area_meta_description,
          bodyCopy: buildAreaBody(cityBySlug.get(row.city_slug), row),
          faq: buildAreaFaq(cityBySlug.get(row.city_slug), row)
        }
      });
    }

    for (const row of pricing) {
      const [city, service] = await Promise.all([
        tx.city.findUnique({ where: { slug: row.city_slug } }),
        tx.service.findUnique({ where: { slug: row.service_slug } })
      ]);

      if (!city || !service) {
        continue;
      }

      await tx.cityServicePage.upsert({
        where: {
          cityId_serviceId: {
            cityId: city.id,
            serviceId: service.id
          }
        },
        update: {
          localPriceMin: toInteger(row.price_min),
          localPriceMax: toInteger(row.price_max),
          isPublished: toBoolean(row.is_published),
          publishedAt: toBoolean(row.is_published) ? new Date() : null
        },
        create: {
          cityId: city.id,
          serviceId: service.id,
          localPriceMin: toInteger(row.price_min),
          localPriceMax: toInteger(row.price_max),
          isPublished: toBoolean(row.is_published),
          publishedAt: toBoolean(row.is_published) ? new Date() : null
        }
      });
    }
  });

  console.log(`Imported ${cities.length} cities, ${areas.length} areas, and ${pricing.length} pricing rows.`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
