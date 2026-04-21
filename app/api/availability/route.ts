import { NextResponse } from "next/server";
import { getCoverageByPincode, getCity } from "@/lib/domain/catalog";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get("pincode");

  if (!pincode) {
    return NextResponse.json({ serviceable: false, message: "Pincode is required." }, { status: 400 });
  }

  const dbCoverage = await prisma.serviceCoverageZone.findFirst({
    where: { pincode },
    include: { city: { select: { name: true, slug: true } } }
  });

  if (dbCoverage) {
    if (!dbCoverage.isServiceable) {
      return NextResponse.json({
        serviceable: false,
        message: "We are coming to your area soon. Leave your number."
      });
    }

    return NextResponse.json({
      serviceable: true,
      city: dbCoverage.city.name,
      area: dbCoverage.areaName,
      responseTime: dbCoverage.responseTimeMinutes
    });
  }

  const coverage = getCoverageByPincode(pincode);

  if (!coverage || !coverage.isServiceable) {
    return NextResponse.json({
      serviceable: false,
      message: "We are coming to your area soon. Leave your number."
    });
  }

  const city = getCity(coverage.citySlug);

  return NextResponse.json({
    serviceable: true,
    city: city?.name ?? coverage.citySlug,
    area: coverage.areaName,
    responseTime: coverage.responseTimeMinutes
  });
}
