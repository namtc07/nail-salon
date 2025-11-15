export async function sendSMS({
  to,
  message,
}: {
  to: string;
  message: string;
}) {
  if (!to) return;

  if (process.env.NODE_ENV !== "production") {
    console.log("[SMS MOCK]", to, message);
    return;
  }

  const apiUrl = process.env.SMS_API_URL;
  const apiKey = process.env.SMS_API_KEY;
  const brand = process.env.SMS_BRAND_NAME;

  if (!apiUrl || !apiKey || !brand) {
    console.error("SMS env not configured");
    return;
  }

  const payload = {
    to,
    message,
    brandname: brand,
    api_key: apiKey,
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("SMS error", await res.text());
  }
}
