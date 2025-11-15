export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const staff = await prisma.staff.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(staff);
}
