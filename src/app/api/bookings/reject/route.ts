export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  const { id, reason } = await req.json();
  try {
    const { prisma } = await import("@/lib/prisma");
    try {
      const booking = await prisma.booking.update({
        where: { id },
        data: { status: "REJECTED" },
      });

      await sendSMS({
        to: booking.customerPhone,
        message: `Rat tiec lich ${booking.dateTime.toLocaleString("vi-VN")} khong the xep. Ly do: ${
          reason || "Lich da full"
        }. Vui long lien he lai shop.`,
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("POST /api/bookings/reject error", error);
      return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    }
  } catch (error) {
    console.error("POST /api/bookings/reject error", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
