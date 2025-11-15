export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { prisma } = await import("@/lib/prisma");

    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        duration: data.duration,
      },
    });
    return NextResponse.json(service);
  } catch (error) {
    console.error("POST /api/admin/services error", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const services = await prisma.service.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("GET /api/admin/services error", error);
    return NextResponse.json({ error: "Failed to get services" }, { status: 500 });
  }
}
