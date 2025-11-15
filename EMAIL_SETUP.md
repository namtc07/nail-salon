# Hướng dẫn setup Email (Resend)

## Bước 1: Tạo tài khoản Resend

1. Truy cập https://resend.com
2. Đăng ký/Đăng nhập tài khoản
3. Vào **API Keys** và tạo API key mới
4. Copy API key

## Bước 2: Cấu hình Domain (Optional nhưng khuyến nghị)

1. Vào **Domains** trong Resend dashboard
2. Thêm domain của bạn (ví dụ: `glamournails.com`)
3. Thêm DNS records như hướng dẫn
4. Đợi domain được verify

## Bước 3: Cập nhật .env

Thêm vào file `.env`:

```env
# Resend Email
RESEND_API_KEY="re_xxxxxxxxxxxxx"
CONTACT_EMAIL="your-email@example.com"
```

- `RESEND_API_KEY`: API key từ Resend dashboard
- `CONTACT_EMAIL`: Email nhận thông tin liên hệ (ví dụ: shop@glamournails.com)

## Bước 4: Cập nhật email sender

Sau khi verify domain, cập nhật `from` email trong `src/lib/email.ts`:

```typescript
from: "Contact Form <contact@yourdomain.com>", // Thay bằng domain đã verify
```

Nếu chưa có domain, có thể dùng:
```typescript
from: "Contact Form <onboarding@resend.dev>", // Chỉ dùng được trong development
```

## Lưu ý

- Resend miễn phí 3,000 emails/tháng
- Trong development, nếu không có API key, email sẽ được log ra console
- Production cần có domain verified để gửi email đáng tin cậy

