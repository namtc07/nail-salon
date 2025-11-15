import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail({
  name,
  phone,
  email,
  message,
}: {
  name: string;
  phone: string;
  email?: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[EMAIL MOCK]", { name, phone, email, message });
    return { success: true };
  }

  const shopEmail = process.env.CONTACT_EMAIL || "contact@glamournails.com";

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form Test <onboarding@resend.dev>", // Thay bằng domain của bạn
      to: [shopEmail],
      subject: `Liên hệ mới từ ${name}`,
      html: `
        <h2>Liên hệ mới từ website</h2>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        <p><strong>Lời nhắn:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

