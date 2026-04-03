# SEO + AEO Audit for `www.plumberdost.com`

## Summary

This audit reviews the repo implementation and production-facing SEO/AEO surfaces for `www.plumberdost.com`. The codebase already has strong route depth, static URL coverage, basic metadata, structured data, and generated `robots.txt` / `sitemap.xml`, but there were critical canonical-domain inconsistencies and several AEO/metadata gaps that reduce search reliability and answer-engine clarity.

The highest-confidence production fixes implemented alongside this audit are:

- canonical domain source-of-truth moved to `https://www.plumberdost.com`
- `robots.ts` and `sitemap.ts` now emit the correct production domain
- default metadata now includes canonical, Open Graph, and Twitter metadata
- city/service/area metadata now includes page-level Open Graph and Twitter metadata
- admin login placeholder updated from legacy `plumbri.ght`
- `llms.txt` added as an AI-crawler guidance surface

## Prioritized Findings

### P0

1. Canonical domain mismatch in SEO surfaces
Impact: Search engines can index and attribute the site to the wrong host, fragment authority, and create duplicate-host canonical confusion.
Affected surface: [`/Volumes/Private data/Plumber11/app/robots.ts`](#/Volumes/Private%20data/Plumber11/app/robots.ts), [`/Volumes/Private data/Plumber11/app/sitemap.ts`](#/Volumes/Private%20data/Plumber11/app/sitemap.ts), [`/Volumes/Private data/Plumber11/lib/seo/metadata.ts`](#/Volumes/Private%20data/Plumber11/lib/seo/metadata.ts)
Recommendation: Use a single source-of-truth site config anchored to `https://www.plumberdost.com` for metadataBase, robots, sitemap, and canonical generation.
Status: Fixed locally in this pass.

2. Public build path depended on live Prisma reads
Impact: Marketing pages could fail prerender/build if DB reads break during deployment, which suppresses search visibility completely.
Affected surface: [`/Volumes/Private data/Plumber11/lib/domain/catalog-managed.ts`](#/Volumes/Private%20data/Plumber11/lib/domain/catalog-managed.ts)
Recommendation: Keep seed-data fallback for build-time DB errors, and treat DB overrides as enhancement rather than build-critical dependency.
Status: Previously fixed in the production branch.

### P1

1. Metadata coverage was incomplete for social/AEO surfaces
Impact: Pages had canonicals but inconsistent Open Graph / Twitter signals, reducing preview quality and weakening machine-readable page summaries.
Affected surface: [`/Volumes/Private data/Plumber11/lib/seo/metadata.ts`](#/Volumes/Private%20data/Plumber11/lib/seo/metadata.ts)
Recommendation: Standardize per-page-type metadata including title, description, canonical, OG, and Twitter metadata.
Status: Fixed locally in this pass.

2. Legacy brand/domain references remained in public-facing text
Impact: Search engines and users can see mixed brand signals, which hurts entity clarity and branded search consistency.
Affected surface: admin login placeholder and any remaining public references
Recommendation: Remove all `PlumbRight` / `plumbri.ght` remnants from public or quasi-public interfaces.
Status: Placeholder fixed locally; broader brand rename already completed earlier.

3. No AI-crawler guidance surface
Impact: LLMs and answer engines have no explicit, crawlable summary of what the site is, which pages matter, and what should or should not be indexed.
Affected surface: site root
Recommendation: Add `llms.txt` with concise business/entity/page guidance.
Status: Fixed locally in this pass.

### P2

1. Sitemap is monolithic and timestamp-driven
Impact: This is acceptable at current size, but as city/service/area coverage grows the sitemap may become noisier than necessary and send low-signal frequent updates.
Affected surface: [`/Volumes/Private data/Plumber11/app/sitemap.ts`](#/Volumes/Private%20data/Plumber11/app/sitemap.ts)
Recommendation: Consider splitting by page class and using more stable `lastModified` values once CMS/admin timestamps are available.

2. Homepage lacks dedicated homepage-specific metadata override
Impact: Root metadata is functional, but the homepage could rank better with a more explicit service + city intent formulation and richer homepage-level schema.
Affected surface: [`/Volumes/Private data/Plumber11/app/layout.tsx`](#/Volumes/Private%20data/Plumber11/app/layout.tsx), [`/Volumes/Private data/Plumber11/app/(marketing)/page.tsx`](#/Volumes/Private%20data/Plumber11/app/(marketing)/page.tsx)
Recommendation: Add homepage-specific metadata and consider a `WebSite` / `Organization` schema layer.

3. Template-driven local pages risk semantic repetition
Impact: Large city/service/area footprints can drift toward near-duplicate content, making ranking less stable and AEO extraction more generic.
Affected surface: [`/Volumes/Private data/Plumber11/lib/content/seed.ts`](#/Volumes/Private%20data/Plumber11/lib/content/seed.ts), [`/Volumes/Private data/Plumber11/lib/content/areas.ts`](#/Volumes/Private%20data/Plumber11/lib/content/areas.ts)
Recommendation: Increase unique factual content per city and area, especially pricing logic, serviceability notes, neighbourhood specifics, proof, and FAQs.

4. Internal linking is strong but still mostly template-led
Impact: Crawlability is decent, but editorial intent links between trust, reviews, services, and city pages can be more deliberate.
Affected surface: marketing route templates
Recommendation: Add more contextual links from city pages to reviews, from service pages to city variants, and from area pages to emergency/city trust sections.

## Subsystem Recommendations

### Crawl and Indexation

- Keep `/admin`, `/api`, `/preview`, and `/draft` disallowed in robots.
- Confirm production serves only one canonical host: `https://www.plumberdost.com`.
- Keep the sitemap limited to rankable public routes.

### Metadata and Social

- Maintain one site config source for canonical domain and brand naming.
- Add page-type specific OG/Twitter coverage everywhere ranking pages exist.
- Add homepage-specific metadata and consider page-type title formula standardization if more templates are added.

### Structured Data and AEO

- Existing schema coverage is good: `Plumber`, `Service`, `FAQPage`, `Review`.
- Next useful additions would be `Organization` / `WebSite` schema for brand/entity clarity.
- Keep FAQs written in direct-answer style; avoid vague or marketing-heavy answers.
- Consider exposing operating cities, support channels, and response claims in a more machine-readable summary section on key pages.

### Content and Internal Linking

- Reduce repetition in seeded city/area copy by adding city-specific proof, locality-specific service constraints, and unique FAQs.
- Increase link paths between city landing pages, service pages, reviews, and area pages based on intent rather than only template navigation.
- Keep the footer selective to avoid turning it into a low-quality crawl dump.

### Technical SEO

- Preserve the DB fallback approach so marketing pages can always build.
- Consider stable timestamps for sitemaps once data timestamps exist.
- Add an OG image strategy later if branded social sharing becomes important.

## Acceptance Checks

- `robots.txt` points to `https://www.plumberdost.com/sitemap.xml`
- `sitemap.xml` emits `https://www.plumberdost.com/...` URLs only
- no public SEO surfaces reference `plumbri.ght`
- homepage, city, service, and area pages emit canonical + OG + Twitter metadata
- `llms.txt` is reachable and aligned with the public site intent
- public marketing pages remain buildable even if DB overrides are unavailable
