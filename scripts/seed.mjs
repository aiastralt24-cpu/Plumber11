import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  ["city-mumbai", "mumbai", "Mumbai", "Maharashtra", "09810001001", "919810001001", 30, 1420],
  ["city-bangalore", "bangalore", "Bangalore", "Karnataka", "09810001002", "919810001002", 28, 1180],
  ["city-delhi", "delhi", "Delhi", "Delhi NCR", "09810001003", "919810001003", 32, 1325],
  ["city-hyderabad", "hyderabad", "Hyderabad", "Telangana", "09810001004", "919810001004", 29, 910],
  ["city-pune", "pune", "Pune", "Maharashtra", "09810001005", "919810001005", 31, 820],
  ["city-ahmedabad", "ahmedabad", "Ahmedabad", "Gujarat", "09810001006", "919810001006", 33, 760],
  ["city-surat", "surat", "Surat", "Gujarat", "09810001007", "919810001007", 34, 640],
  ["city-jaipur", "jaipur", "Jaipur", "Rajasthan", "09810001008", "919810001008", 35, 520]
];

const services = [
  ["svc-pipe-leakage-repair", "pipe-leakage-repair", "Pipe Leakage Repair", "Pipe burst, hidden seepage, and urgent leak fixes.", "Droplets", 300, 800, 1.5, true],
  ["svc-bathroom-fitting", "bathroom-fitting", "Bathroom Fitting & Renovation", "Fixture upgrades, bathroom fitting, and remodel support.", "Bath", 1200, 4500, 5, false],
  ["svc-tap-installation", "tap-installation", "Tap & Faucet Installation", "Mixer fitting, tap replacement, and faucet repairs.", "Wrench", 200, 500, 1, false],
  ["svc-drain-cleaning", "drain-cleaning", "Drainage Blockage Removal", "Clogged drain and slow drainage clearing.", "Pipette", 500, 1200, 1.5, true],
  ["svc-water-tank-repair", "water-tank-repair", "Overhead Tank Repair & Cleaning", "Overflow fixes, cracks, and tank cleaning.", "Container", 900, 2200, 3, false],
  ["svc-water-motor-fitting", "water-motor-fitting", "Water Motor Fitting", "Pump installation, fitting, and repair support.", "Gauge", 1100, 2800, 2.5, false],
  ["svc-kitchen-sink-plumbing", "kitchen-sink-plumbing", "Kitchen Sink Plumbing", "Under-sink fitting, repair, and drainage fixes.", "CookingPot", 400, 950, 1.5, true],
  ["svc-geyser-plumbing", "geyser-plumbing", "Geyser / Water Heater Connection", "Water heater plumbing, installation, and repair.", "Flame", 650, 1800, 2, false],
  ["svc-toilet-repair", "toilet-repair", "Toilet & Flush Tank Repair", "Flush mechanism, cistern, and toilet repair support.", "PocketKnife", 350, 900, 1.2, true],
  ["svc-emergency-plumbing", "emergency-plumbing", "Emergency Plumbing", "24/7 urgent response for leaks, bursts, and severe blockages.", "Siren", 700, 2000, 1.5, true],
  ["svc-pipe-fitting", "pipe-fitting", "Pipe Fitting & Installation", "New pipe laying, CPVC and PPR fitting work.", "HardHat", 900, 3000, 3.5, false],
  ["svc-waterproofing-plumbing", "waterproofing-plumbing", "Waterproofing & Seepage Repair", "Seepage, damp walls, and waterproofing-linked plumbing work.", "ShieldCheck", 1500, 5000, 5, false]
];

async function main() {
  for (const [id, slug, name, state, phoneNumber, whatsappNumber, responseTimeMinutes, jobsCompleted] of cities) {
    await prisma.city.upsert({
      where: { slug },
      update: {
        name,
        state,
        phoneNumber,
        whatsappNumber,
        responseTimeMinutes,
        jobsCompleted,
        isActive: true
      },
      create: {
        id,
        slug,
        name,
        state,
        phoneNumber,
        whatsappNumber,
        responseTimeMinutes,
        jobsCompleted,
        isActive: true
      }
    });
  }

  for (const [id, slug, name, shortDescription, iconName, priceMin, priceMax, durationHours, isEmergencyEligible] of services) {
    await prisma.service.upsert({
      where: { slug },
      update: {
        name,
        shortDescription,
        iconName,
        priceMin,
        priceMax,
        durationHours,
        isEmergencyEligible,
        isActive: true
      },
      create: {
        id,
        slug,
        name,
        shortDescription,
        iconName,
        priceMin,
        priceMax,
        durationHours,
        isEmergencyEligible,
        isActive: true
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
