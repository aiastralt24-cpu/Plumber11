import { NextResponse } from "next/server";
import { z } from "zod";
import { orchestrateMissedCallCallback } from "@/lib/trigger/workflows";

const payloadSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/),
  citySlug: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false }, { status: 422 });
  }

  await orchestrateMissedCallCallback(parsed.data);
  return NextResponse.json({ success: true });
}
