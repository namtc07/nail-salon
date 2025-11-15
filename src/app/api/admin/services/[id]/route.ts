export const runtime = "nodejs"; // chạy trên Node, không phải Edge
export const dynamic = "force-dynamic"; // bỏ qua static analysis

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// PUT /api/admin/services/[id]  – update service
export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const data = await req.json();

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        // đảm bảo là number nếu client gửi string
        price: Number(data.price),
        duration: Number(data.duration),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("PUT /api/admin/services/[id] error", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE /api/admin/services/[id] – xoá service
export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/services/[id] error", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
