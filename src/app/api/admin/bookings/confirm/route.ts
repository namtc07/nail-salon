import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/sms";

export async function POST(req: Request) {
  const { id } = await req.json();
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
}
