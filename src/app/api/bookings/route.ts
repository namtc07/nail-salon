export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendSMS } from "@/lib/sms";

const bookingSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(8),
  customerEmail: z.string().email().optional().or(z.literal("")),
  note: z.string().optional(),
  staffId: z.number().int().optional().nullable(),
  dateTime: z.string(),
  serviceIds: z.array(z.number().int()).min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bookingSchema.parse(json);

    const booking = await prisma.booking.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        note: data.note,
        staffId: data.staffId ?? null,
        dateTime: new Date(data.dateTime),
        services: {
          connect: data.serviceIds.map((id) => ({ id })),
        },
      },
      include: {
        services: true,
        staff: true,
      },
    });

    await sendSMS({
      to: booking.customerPhone,
      message: `Shop da nhan yeu cau dat lich vao ${booking.dateTime.toLocaleString(
        "vi-VN"
      )}. Chung toi se xac nhan som!`,
    });

    return NextResponse.json({ booking });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message ?? "Booking error" }, { status: 400 });
  }
}
