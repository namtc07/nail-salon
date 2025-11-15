export const runtime = "nodejs";
export const dynamic = "force-dynamic"; 

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(services);
}
