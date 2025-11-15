export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const staff = await prisma.staff.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error("GET /api/staff error", error);
    return NextResponse.json({ error: "Failed to get staff" }, { status: 500 });
  }
}
