export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  message: z.string().min(1, "Vui lòng nhập lời nhắn"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = contactSchema.parse(json);

    const result = await sendContactEmail({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      message: data.message,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Không thể gửi email. Vui lòng thử lại sau." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Gửi thành công! Chúng tôi sẽ liên hệ lại sớm." });
  } catch (e: any) {
    console.error("Contact form error:", e);
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

