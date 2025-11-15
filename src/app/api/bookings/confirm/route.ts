export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  const { id } = await req.json();
  const { prisma } = await import("@/lib/prisma");
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });
    await sendSMS({
      to: booking.customerPhone,
      message: `Lich lam nail cua ban vao ${booking.dateTime.toLocaleString(
        "vi-VN"
      )} DA DUOC XAC NHAN. Hen gap ban tai Glamour Nails!`,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/bookings/confirm error", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}
